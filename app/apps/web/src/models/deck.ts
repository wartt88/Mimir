// file to create the schema of the bd data
import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type Card from "./card";

export interface DeckInterface {
  id: number;
  title: string;
  descr: string;
  tags: string[];
  isPublic: boolean;
  isEducational: boolean;
  votes: {
    up: number;
    down: number;
  };
  deadline: Date;
  user_id: number;
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
    isEducational: Boolean,
    votes: {
      up: Number,
      down: Number,
    },
    deadline: Date,
    user_id: Number,
    cards: [
      new Schema<Card>(
        {
          id: Number,
          question: String,
          reponse: String,
          palier: Number,
          derniereRevision: Date,
        },
        { _id: false }
      ),
    ], //TODO active _id et disabled id
  },
  { timestamps: true, _id: false }
); //TODO active _id et disabled id

//const Deck = mongoose.models.Deck as unknown as DeckModel || mongoose.model<DeckInterface, DeckModel>("Deck", deckSchema);
let Deck: DeckModel;

try {
  Deck = mongoose.model<DeckInterface, DeckModel>("Deck");
} catch {
  Deck = mongoose.model<DeckInterface, DeckModel>("Deck", deckSchema);
}

export default Deck;
