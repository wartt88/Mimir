import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "../../../utils/db";
import type { DeckInterface } from "../../../../models/deck";
import Deck from "../../../../models/deck";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  if (ObjectId.isValid(id)) {
    const newDeck: DeckInterface = (await request.json()) as DeckInterface;
    await connectDB();
    await Deck.findByIdAndUpdate(new ObjectId(id), newDeck);
    console.log("deck updated");
    return NextResponse.json({ message: "Deck updated" }, { status: 200 });
  }
  return NextResponse.error();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  if (ObjectId.isValid(id)) {
    await connectDB();
    const deck: DeckInterface | null = await Deck.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json(deck);
  }
  return NextResponse.error();
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  if (ObjectId.isValid(id)) {
    await connectDB();
    await Deck.findByIdAndDelete(new ObjectId(id));
    return NextResponse.json({ message: "Deck deleted" }, { status: 200 }); // learn whats a header
  }
  return NextResponse.error();
}
