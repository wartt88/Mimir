import { NextResponse } from "next/server";
import { useParams, useSearchParams } from "next/navigation";
import type { DeckInterface } from "../../../models/deck";
import Deck from "../../../models/deck";
import connectDB from "../../utils/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {

    type Deck = {
        id: string,
        title: string,
        tags: string[],
        isPublic: boolean,
        isEducational: boolean,
        votes: number,
        deadline: Date,
        owner_id: string,
        cards: string[]
    }

   const { id ,
    title,
    tags,
    isPublic,
    isEducational,
    votes,
    deadline,
    owner_id,
    cards } = await req.json();

    const deck: Deck = {
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
  const newDeck: DeckInterface = await req.json();
  console.log(`req : ${req}`);
  await connectDB();
  await Deck.create(newDeck);
  return NextResponse.json({ message: "Deck pushed" }, { status: 201 }); // learn whats a header

}

export async function GET() {
  await connectDB();
  const decks = await Deck.find({});
  return NextResponse.json(decks);
}


