import { Types } from "mongoose";
import User, {UserInterface} from "../../../../../models/user";
import connectDB from "../../../../utils/db";
import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    try {
        const {id} = params;
        await connectDB();
        const user: UserInterface | null = await User.findOne({_id: new Types.ObjectId(id)});
        return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}

