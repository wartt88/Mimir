import { NextResponse } from "next/server";
import { useParams, useSearchParams } from "next/navigation";
import type { DeckInterface } from "../../../models/deck";
import Deck from "../../../models/deck";
import connectDB from "../../utils/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const newDeck: DeckInterface = await req.json();
  console.log(`req : ${req}`);
  await connectDB();
  await Deck.create(newDeck);
  return NextResponse.json({ message: "Deck pushed" }, { status: 201 }); // learn whats a header

}

export async function GET() {
  await connectDB();
  const decks = await Deck.find({});
  return NextResponse.json(decks);
}


