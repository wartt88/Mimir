import { NextResponse } from "next/server";
import connectDB from "../../../../utils/db";
import Deck from "../../../../../models/deck";

export async function GET(
  request: Request,
  { params }: { params: { tag: string } }
): Promise<NextResponse> {
  const { tag } = params;
  await connectDB();
  const decks = await Deck.find({ tags: { $in: [tag] } });
  return NextResponse.json(decks);
}
