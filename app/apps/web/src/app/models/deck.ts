// file to create the schema of the bd data 
import type { Model, Types} from "mongoose";
import mongoose, { Schema } from "mongoose";
import type Card from "./card";

export interface DeckInterface {
    id: Types.ObjectId,
    title: string,
    tags : string[],
    isPublic: boolean,
    isEducational: boolean,
    votes: {
        up: number,
        down: number,
    },
    deadline: Date,
    owner_id: number,
    cards: Card[]
}

interface DeckDocumentProps  {
    cards: Types.DocumentArray<Card>;
}

type DeckModel = Model<DeckInterface, object, DeckDocumentProps>;

const deckSchema:Schema = new Schema<DeckInterface,DeckModel>({
    title: String,
    tags : [String],
    isPublic: Boolean,
    isEducational: Boolean,
    votes: {
        up: Number,
        down: Number,
    },
    deadline: Date,
    owner_id: Number,
    cards: [new Schema<Card>({
        question: String,
        reponse: String,
        palier: Number,
        derniereRevision: Date,
    })],
    
    },{timestamps: true});

const Deck = mongoose.model<DeckInterface,DeckModel>("Deck", deckSchema);

export default Deck;