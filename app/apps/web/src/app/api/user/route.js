import  connectDB  from "../../utils/db";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
    await connectDB();
    const user = await User.find({});
    return NextResponse.json(user, {status: 201});
    } catch (error) {
        return NextResponse.error(error);
    }
}