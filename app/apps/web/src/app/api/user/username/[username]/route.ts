import User, { UserInterface } from "../../../../../models/user";
import  connectDB  from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { username: string } }) {
    try {
    const { username} = params;
    await connectDB();
    const user : UserInterface | null = await User.findOne({username});
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}

