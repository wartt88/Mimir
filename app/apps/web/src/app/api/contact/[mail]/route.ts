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

        if(user.email === friend.email) {
            return NextResponse.json({ok: false, text: "Vous ne pouvez pas vous ajouter"}, {status: 200});
        }

        if (user.contacts.includes(data)) {
            return NextResponse.json({ok: false, text: `Vous êtes déjà amis`}, {status: 200});
        }

        user.contacts.push(friend.email)
        friend.contacts.push(user.email)

        await User.findOneAndUpdate({email: user.email}, user)
        await User.findOneAndUpdate({email: friend.email}, friend)

        return NextResponse.json({ok: true, text: "Ami ajouté !"}, {status: 200});
    } catch (error) {
        return NextResponse.error();
    }
}