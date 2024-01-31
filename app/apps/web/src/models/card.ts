
interface Card {
    id: number; //TODO active _id et disabled id
    question: string;
    answer: string;
    users: [{
        user_id : string;
        proficency: number;
        lastSeen: Date;
        answers: [];
    }]
}

export interface Resultat {
    carte: Card;
    succes: boolean;
}

export default Card;