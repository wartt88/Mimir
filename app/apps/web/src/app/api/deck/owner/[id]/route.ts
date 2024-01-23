import { NextResponse } from "next/dist/server/web/spec-extension/response";
import Deck, { DeckInterface } from "../../../../../models/deck";
import connectDB from "../../../../utils/db";
import { ObjectId } from "mongoose";

export async function GET(request: Request, { params }) {
    const { id }:{id:ObjectId} = params;
    await connectDB();
    const deck: DeckInterface = await Deck.find({ owner_id: id });
    return NextResponse.json(deck);
  }