// file to create the schema of the bd data
import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type Card from "./card";

export const DeckEmpty:DeckInterface = {
  id: 0,
  title: "this is a empty deck",
  descr: "",
  tags: ["informatique"],
  isPublic: false,
  isEducative: false,
  votes: {
    up: 0,
    down: 0,
  },
  deadline: new Date(),
  owner_id: "",
  cards: [],
  sharedTo : []
}

export interface DeckInterface {
  id: number;
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
  sharedTo : 
    {
      user_id : string;
      canEdit : boolean;
    }[];
}

interface DeckDocumentProps {
  cards: Types.DocumentArray<Card>;
}

type DeckModel = Model<DeckInterface, object, DeckDocumentProps>;

const deckSchema: Schema = new Schema<DeckInterface, DeckModel>(
  {
    id: Number,
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
            user_id : String,
            proficency: Number,
            lastSeen: Date,
            answers: [Boolean]
        }]
        },
        { _id: false }
      ),
    ], //TODO active _id et disabled id
    sharedTo : [
      {
        user_id : String,
        canEdit : Boolean
      }
    ]
  },
  { timestamps: true}
); //TODO active _id et disabled id

const Deck =  mongoose.models.Deck || mongoose.model<DeckInterface, DeckModel>("Deck", deckSchema) ;


export default Deck;