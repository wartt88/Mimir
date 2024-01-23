import { NextResponse } from "next/server";
import connectDB from "../../../utils/db";
import type { DeckInterface } from "../../../../models/deck";
import Deck from "../../../../models/deck";
import { ObjectId } from "mongoose";

export async function PUT(request: Request, { params }:{params:{id:ObjectId}}) {
  const { id } = params;
  const newDeck: DeckInterface = await request.json();
  await connectDB();
  await Deck.findByIdAndUpdate(id,newDeck);
  console.log("deck updated");
  return NextResponse.json({message: "Deck updated"},{status: 200});
}

export async function GET(request: Request, { params }:{params:{id:ObjectId}}) {
  const { id }= params;
  await connectDB();
  const deck: DeckInterface = await Deck.findOne({ _id: id });
  return NextResponse.json(deck);
}

export async function DELETE(request: Request, { params }:{params:{id:ObjectId}}) {
  const {id} = params;
  await connectDB();
  await Deck.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deck deleted" }, { status: 200 }); // learn whats a header
}
