import  connectDB  from "../../utils/db";
import User from "../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const {email } = await req.json();
        const user = await User.findOne({email}).select("_id");
        console.log(user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}