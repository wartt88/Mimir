import { NextResponse } from "next/dist/server/web/spec-extension/response";
import type { Types } from "mongoose";
import type { DeckInterface } from "../../../../../models/deck";
import Deck from "../../../../../models/deck";
import connectDB from "../../../../utils/db";

export async function GET(request: Request, { params }:{params:{id:Types.ObjectId}}) {
    const { id }:{id:Types.ObjectId} = params;
    await connectDB();
    const deck: DeckInterface[] = await Deck.find({ owner_id: id });
    return NextResponse.json(deck);
  }