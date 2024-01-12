import { NextResponse } from "next/server";
import Deck from "../../models/deck";
import connectDB from "../../utils/db";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(req: Request) {
   const { id ,
    title,
    tags,
    isPublic,
    isEducational,
    votes,
    deadline,
    owner_id,
    cards } = await req.json();

    const deck = {
        id: id,
        title: title,
        tags: tags,
        isPublic: isPublic,
        isEducational: isEducational,
        votes: votes,
        deadline: deadline,
        owner_id: owner_id,
        cards: cards
    }; 
    
    console.log(`req : ${req}`)

   await connectDB();

   await Deck.create(deck)
   return NextResponse.json({message: "Deck pushed"}, {status: 201}) // learn whats a header 
}

export async function GET(req: Request) {
    await connectDB();
    const decks = await Deck.find({});
    return NextResponse.json(decks);
}