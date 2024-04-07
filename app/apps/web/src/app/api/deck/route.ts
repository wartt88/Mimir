import { NextResponse } from "next/server";
import type { DeckInterface } from "../../../models/deck";
import Deck from "../../../models/deck";
import connectDB from "../../utils/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request): Promise<NextResponse> {
  await connectDB();
  const newDeck: DeckInterface = (await req.json()) as DeckInterface;
  // console.log(`req : ${req}`);
  await connectDB();
  await Deck.create(newDeck);
  return NextResponse.json({ message: "Deck pushed" }, { status: 201 }); // learn whats a header
}

export async function GET(): Promise<NextResponse> {
  await connectDB();
  const decks = await Deck.find({});
  return NextResponse.json(decks);
}
