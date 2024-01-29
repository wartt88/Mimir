
interface Card {
    id: number; //TODO active _id et disabled id
    question: string;
    answer: string;
    proficency: number;
    lastSeen: Date;
}

export interface Resultat {
    carte: Card;
    succes: boolean;
}

export default Card;