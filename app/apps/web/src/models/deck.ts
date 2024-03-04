// file to create the schema of the bd data
import type {Model, Types} from "mongoose";
import mongoose, {Schema} from "mongoose";
import type { ObjectId } from "mongodb";
import type Card from "./card";
import type {DeckShare} from "./share.ts";

export interface DeckInterface {
    id: ObjectId;
    title: string;
    descr: string;
    tags: string[];
    isPublic: boolean;
    isEducative: boolean;
    votes: {
        up: number;
        down: number;
    };
    deadline: Date;
    owner_id: string;
    cards: Card[];
    sharedTo:
        {
            user_id: string;
            canEdit: boolean;
        }[];
}

interface DeckDocumentProps {
    cards: Types.DocumentArray<Card>;
}

type DeckModel = Model<DeckInterface, object, DeckDocumentProps>;

const deckSchema: Schema = new Schema<DeckInterface, DeckModel>(
    {
        title: String,
        descr: String,
        tags: [String],
        isPublic: Boolean,
        isEducative: Boolean,
        votes: {
            up: Number,
            down: Number,
        },
        deadline: Date,
        owner_id: String,
        cards: [
            new Schema<Card>(
                {
                    id: Number,
                    question: String,
                    answer: String,
                    users: [{
                        user_id: String,
                        proficency: Number,
                        lastSeen: Date,
                        answers: [Boolean]
                    }]
                },
                {_id: false}
            ),
        ], //TODO active _id et disabled id
        sharedTo: [
            new Schema<DeckShare>(
                {
                    user_id: String,
                    canEdit: Boolean
                },
                {_id: false}
            )
        ]
    },
    {timestamps: true,_id:true}
); //TODO active _id et disabled id

const Deck = mongoose.models.Deck || mongoose.model<DeckInterface, DeckModel>("Deck", deckSchema);


export default Deck;