import type { Types } from "mongoose";

interface Card {
    id: Types.ObjectId;
    question: string;
    reponse: string;
    palier: number;
    derniereRevision: Date;
}


export default Card;