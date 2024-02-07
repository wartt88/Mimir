import User, {UserInterface} from "../../../../../models/user";
import connectDB from "../../../../utils/db";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    try {
        const {id} = params;
        await connectDB();
        const user: UserInterface | null = await User.findOne({_id: new ObjectId(id)});
        return NextResponse.json({user}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}

