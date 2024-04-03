import { NextResponse } from "next/server";
import type { UserInterface } from "../../../../../models/user";
import User from "../../../../../models/user";
import connectDB from "../../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
): Promise<Response> {
  try {
    const { username } = params;
    await connectDB();
    const user: UserInterface | null = await User.findOne({ username });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
