import { NextResponse } from "next/server";
import connectDB from "../../utils/db";
import User from "../../../models/user";

export async function GET() {
  try {
    await connectDB();
    const user = await User.find({});
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.error(error);
  }
}
