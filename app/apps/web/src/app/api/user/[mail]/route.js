import  connectDB  from "../../../utils/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
    const { mail } = params;
    await connectDB();
    const user = await User.findOne({ email: mail });
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error(error);
    }
}