import { NextResponse } from "next/server";
import mongoose from "mongoose";
import type { UserInterface } from "../../../../../models/user";
import User from "../../../../../models/user";
import connectDB from "../../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;
    await connectDB();

    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    // Convert id to a valid ObjectId if necessary
    const validId = new mongoose.Types.ObjectId(id);
    
    const user: UserInterface | null = await User.findOne({
      _id: validId,
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
