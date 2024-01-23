import User, { UserInterface } from "../../../../models/user";
import  connectDB  from "../../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { mail: string } }) {
    try {
    const { mail } = params;
    await connectDB();
    const user = await User.findOne({ email: mail });
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}

export async function PUT(req: Request, { params }: { params: { mail: string} }) {
    try {
    const { mail } = params;
    await connectDB();
    const newUser : UserInterface = await req.json();
    const user = await User.findOneAndUpdate({ email: mail }, newUser);
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}