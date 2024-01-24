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
        const friend = await User.findOne({email: data})

        if (!user) {
            return NextResponse.json({ok: false, text: "Erreur critique , reconnectez-vous"}, {status: 200});
        }

        if (!friend) {
            return NextResponse.json({ok: false, text: "Cet ami n'existe pas, son compte a été supprimé"}, {status: 200});
        }

        if (user.email === friend.email) {
            return NextResponse.json({ok: false, text: "Vous ne pouvez pas vous ajouter"}, {status: 200});
        }

        if (user.following.includes(data)) {
            return NextResponse.json({ok: false, text: `Vous êtes déjà amis`}, {status: 200});
        }

        user.following.push(friend.email)
        friend.followers.push(user.email)

        await User.findOneAndUpdate({email: user.email}, user)
        await User.findOneAndUpdate({email: friend.email}, friend)

        return NextResponse.json({ok: true, text: "Ami ajouté !"}, {status: 200});
    } catch (error) {
        return NextResponse.error();
    }
}

// supprimer un contact
export async function DELETE(req: Request, {params}: { params: { mail: string } }) {
    try {
        const {mail} = params;
        await connectDB();
        const data = await req.json()

        const user = await User.findOne({email: mail});
        const friend = await User.findOne({email: data})

        if (!user) {
            return NextResponse.json({ok: false, text: "Erreur critique , reconnectez-vous"}, {status: 200});
        }

        if (!friend) {
            return NextResponse.json({ok: false, text: "Cet ami n'existe pas, son compte a été supprimé"}, {status: 200});
        }

        if (!user.following.includes(data)) {
            return NextResponse.json({ok: false, text: `Vous n'êtes pas ami de base`}, {status: 200});
        }

        const userIndex = user.following.indexOf(friend.email);
        const friendIndex = friend.followers.indexOf(user.email);

        user.following.splice(userIndex, 1)
        friend.followers.splice(friendIndex, 1)

        await User.findOneAndUpdate({email: user.email}, user)
        await User.findOneAndUpdate({email: friend.email}, friend)

        return NextResponse.json({ok: true, text: "Ami supprimé !"}, {status: 200});
    } catch (error) {
        return NextResponse.error();
    }
}