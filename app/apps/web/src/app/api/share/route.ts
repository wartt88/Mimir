import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "../../utils/db.ts";
import type {
  ShareBodyRequest,
  ShareResponse,
} from "../../../models/share-request.ts";
import Deck from "../../../models/deck.ts";
import User from "../../../models/user.ts";
import type { DeckShare, UserShare } from "../../../models/share.ts";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = (await req.json()) as ShareBodyRequest;

  if (!data.deckId || data.contactData.length === 0) {
    return NextResponse.json({ success: false } as ShareResponse, {
      status: 400,
    });
  }

  await connectDB();

  const sharedTo = [] as DeckShare[];
  for (const contact of data.contactData) {
    if (contact.selected) {
      sharedTo.push({ user_id: contact.userId, canEdit: contact.editor });
      const sharedDecks = {
        deck_id: data.deckId,
        canEdit: contact.editor,
      } as UserShare;
      User.findOneAndUpdate(
        {
          _id: contact.userId.trim(),
          sharedDecks: { $not: { $elemMatch: { deck_id: data.deckId } } },
        },
        { $push: { sharedDecks } }
      ).catch(() => {
        return NextResponse.json({ success: false } as ShareResponse, {
          status: 500,
        });
      });
    } else {
      User.findOneAndUpdate(
        { _id: contact.userId.trim() },
        { $pull: { sharedDecks: { deck_id: data.deckId } } }
      ).catch(() => {
        return NextResponse.json({ success: false } as ShareResponse, {
          status: 500,
        });
      });
    }
  }

  await Deck.findOneAndUpdate(
    { _id: data.deckId.trim() },
    { $set: { sharedTo } }
  );

  return NextResponse.json({ success: true } as ShareResponse, { status: 201 });
}
