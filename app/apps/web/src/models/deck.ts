// file to create the schema of the bd data
import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type Card from "./card";

export const DeckEmpty = {
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
  owner_id: 0,
  cards: [],
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
  owner_id: number;
  cards: Card[];
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
    owner_id: Number,
    cards: [
      new Schema<Card>(
        {
          id: Number,
          question: String,
          answer: String,
          proficency: Number,
          lastSeen: Date,
        },
        { _id: false }
      ),
    ], //TODO active _id et disabled id
  },
  { timestamps: true}
); //TODO active _id et disabled id

const Deck =  mongoose.model<DeckInterface, DeckModel>("Deck", deckSchema) || mongoose.models.Deck ;


export default Deck;