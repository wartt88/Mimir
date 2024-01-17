import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "../../utils/db";
import User from "../../models/user";

export async function POST(req) {
    try {

        const { username, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);
        
        await connectDB();
        await User.create({username, email, password: hashedPassword});

        
        return NextResponse.json({message: "user registered"}, {status:201})
    }
    catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}