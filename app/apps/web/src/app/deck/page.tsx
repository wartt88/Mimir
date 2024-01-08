
"use client"
import { useSearchParams } from "next/navigation";
import style from "../new.module.css";

interface Card {
    id_card: number,
    question: string,
    reponse: string,
    palier: number,
    derniereRevision: number
}

//fake data
const cartes : Card[] = [
    {
        id_card: 1,
        question: "Allons-nous réussir ?",
        reponse: "Oui",
        palier: 5,
        derniereRevision: 1704708559
    },
    {
        id_card: 2,
        question: "2+2 ?",
        reponse: "4",
        palier: 1,
        derniereRevision: 1704708559
    },
    {
        id_card: 3,
        question: "Quelle âge à le monde ?",
        reponse: "4,54 milliards d'années",
        palier: 1,
        derniereRevision: 1704708559
    }
  ]

export default function Page() : JSX.Element {
    
    const params = useSearchParams();

    // accès à la bd depuis l'id du deck
    //const {Id,Title,Cards} = props;
    const index = Number(params.get("card"));
    let carte: Card |undefined = cartes[0];
    if (!isNaN(index)){
        carte = cartes[index];
    }
    


    return (<div className={style.mainContainer}>
        <div className={style.content}>
            <h3>Question :</h3>
            <input className={style.no_select} value={carte?.question} readOnly />
            <h3>Réponse :</h3>
            <input type="text" placeholder="Votre réponse ici !" />
            <div><button className={style.CardButton}>Suivant</button></div>
       </div>
    </div>)
}