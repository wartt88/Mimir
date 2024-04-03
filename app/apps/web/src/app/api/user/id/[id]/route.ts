import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
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
    const user: UserInterface | null = await User.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
