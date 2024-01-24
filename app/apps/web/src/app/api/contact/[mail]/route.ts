import {NextResponse} from "next/server";
import connectDB from "../../../utils/db.ts";
import User, {UserInterface} from "../../../../models/user.ts";

// ajouter un nouveau contact
export async function PUT(req: Request, {params}: { params: { mail: string } }) {
    try {
        const {mail} = params;
        await connectDB();
        const data = await req.json()

        const user = await User.findOne({email: mail});
        const friend = await User.findOne({email: data.newFriend})

        if (!user) {
            return NextResponse.json({error: "This email doesn't exist"}, {status: 404});
        }

        if (!friend) {
            return NextResponse.json({error: "Friend email doesn't exist"}, {status: 404});
        }

        if (user.contacts.includes(data.newFriend)) {
            return NextResponse.json({error: `You're already friends with ${data.newFriend}`}, {status: 404});
        }

        user.contacts.push(friend.email)
        friend.contacts.push(user.email)

        await User.findOneAndUpdate({email: user.email}, user)
        await User.findOneAndUpdate({email: friend.email}, friend)

        return NextResponse.json({text: "Friend added!"}, {status: 201});
    } catch (error) {
        return NextResponse.error();
    }
}