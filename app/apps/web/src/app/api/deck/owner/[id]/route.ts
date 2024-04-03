import { NextResponse } from "next/dist/server/web/spec-extension/response";
import type { ObjectId } from "mongoose";
import type { DeckInterface } from "../../../../../models/deck";
import Deck from "../../../../../models/deck";
import connectDB from "../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: ObjectId } }
): Promise<NextResponse> {
  const { id }: { id: ObjectId } = params;
  await connectDB();
  const decks: DeckInterface[] = await Deck.find({ owner_id: id });
  return NextResponse.json(decks);
}
