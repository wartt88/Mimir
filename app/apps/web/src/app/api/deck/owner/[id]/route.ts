import { NextResponse } from "next/dist/server/web/spec-extension/response";
import mongoose from "mongoose";
import type { DeckInterface } from "../../../../../models/deck";
import Deck from "../../../../../models/deck";
import connectDB from "../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id }: { id: string } = params;
  try {
    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    // Convert id to a valid ObjectId if necessary
    const validId = new mongoose.Types.ObjectId(id);
    await connectDB();
    const decks: DeckInterface[] = await Deck.find({
      owner_id: validId,
    });
    return NextResponse.json(decks);
  } catch (e) {
    return NextResponse.error();
  }
}
