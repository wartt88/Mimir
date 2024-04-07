import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../utils/db";
import type { DeckInterface } from "../../../../models/deck";
import Deck from "../../../../models/deck";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  try {
    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    // Convert id to a valid ObjectId if necessary
    const validId = new mongoose.Types.ObjectId(id);
    const newDeck: DeckInterface = (await request.json()) as DeckInterface;
    await connectDB();
    newDeck._id = validId;

    await Deck.findByIdAndUpdate(validId, newDeck);
    console.log("deck updated");
    return NextResponse.json({ message: "Deck updated" }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  try {
    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    // Convert id to a valid ObjectId if necessary
    const validId = new mongoose.Types.ObjectId(id);
    await connectDB();
    const deck: DeckInterface | null = await Deck.findOne({
      _id: validId,
    });
    return NextResponse.json(deck);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;
  try {
    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    // Convert id to a valid ObjectId if necessary
    const validId = new mongoose.Types.ObjectId(id);
    await connectDB();
    await Deck.findByIdAndDelete(validId);
    return NextResponse.json({ message: "Deck deleted" }, { status: 200 }); // learn whats a header
  } catch (e) {
    return NextResponse.error();
  }
}
