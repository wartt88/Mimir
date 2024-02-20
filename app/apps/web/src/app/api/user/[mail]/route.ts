import { NextResponse } from "next/server";
import type { UserInterface } from "../../../../models/user";
import User from "../../../../models/user";
import  connectDB  from "../../../utils/db";

export async function GET(req: Request, { params }: { params: { mail: string } }) : Promise<NextResponse|Response> {
    try {
    const { mail } = params;
    await connectDB();
    const user:UserInterface|null = await User.findOne({ email: mail });
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}

export async function PUT(req: Request, { params }: { params: { mail: string} }) : Promise<NextResponse|Response> {
    try {
    const { mail } = params;
    await connectDB();
    const newUser : UserInterface = await req.json() as UserInterface;
    const user:UserInterface|null = await User.findOneAndUpdate({ email: mail }, newUser);
    return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}