import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import type {SharedDecksResponse, ShareResponse} from "../../../../models/share-request.ts";
import connectDB from "../../../utils/db.ts";
import type {UserInterface} from "../../../../models/user.ts";
import User from "../../../../models/user.ts";
import type {DeckInterface} from "../../../../models/deck.ts";
import Deck from "../../../../models/deck.ts";
import { Types } from "mongoose";

export async function GET(req: NextRequest, {params}: { params: { userId: string } }): Promise<NextResponse> {
    const {userId} = params;

    if (!userId) {
        return NextResponse.json({success: false} as ShareResponse, {status: 400});
    }

    await connectDB();

    const user: UserInterface | null = await User.findOne({_id: new Types.ObjectId(userId)});

    if (!user) {
        return NextResponse.json({success: false} as ShareResponse, {status: 404});
    }

    const decks = [] as DeckInterface[];
    for (const sharedDeck of user.sharedDecks) {
        const deck: DeckInterface | null = await Deck.findOne({_id: new Types.ObjectId(sharedDeck.deck_id)});
        if (deck) {
            decks.push(deck);
        }
    }

    return NextResponse.json({decks} as SharedDecksResponse, {status: 201});

}