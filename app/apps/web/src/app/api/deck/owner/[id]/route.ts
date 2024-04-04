import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { ObjectId } from "mongodb";
import type { DeckInterface } from "../../../../../models/deck";
import Deck from "../../../../../models/deck";
import connectDB from "../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id }: { id: string } = params;
  if (ObjectId.isValid(id)) {
    await connectDB();
    const decks: DeckInterface[] = await Deck.find({
      owner_id: new ObjectId(id.trim()),
    });
    return NextResponse.json(decks);
  }
  return NextResponse.error();
}
