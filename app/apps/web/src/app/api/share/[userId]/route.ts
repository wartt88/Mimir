import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type {
  SharedDecksResponse,
  ShareResponse,
} from "../../../../models/share-request.ts";
import connectDB from "../../../utils/db.ts";
import type { UserInterface } from "../../../../models/user.ts";
import User from "../../../../models/user.ts";
import type { DeckInterface } from "../../../../models/deck.ts";
import Deck from "../../../../models/deck.ts";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ success: false } as ShareResponse, {
      status: 400,
    });
  }

  await connectDB();

  const user: UserInterface | null = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return NextResponse.json({ success: false } as ShareResponse, {
      status: 404,
    });
  }

  const decksPromises = user.sharedDecks.map(async (sharedDeck) => {
    const deck: DeckInterface | null = await Deck.findOne({
      _id: sharedDeck.deck_id,
    });
    return deck;
  });

  const decks = await Promise.all(decksPromises);

  return NextResponse.json({ decks } as SharedDecksResponse, { status: 201 });
}
