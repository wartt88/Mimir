
"use client"
import { useSearchParams } from "next/navigation";

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
        question: "Quel âge à le monde ?",
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
        carte = cartes[index-1];
    }
    


    return (<div className="
     bg-gray-100 size-2/3 border-gray
        flex m-auto items-center text-black justify-center">
        <div className="flex flex-col items-start my-auto gap-y-[1.5vh] w-10/12 h-2/3">
            <h3 className=" w-full text-3xl">Question :</h3>
            <input className=" text-lg w-full row" value={carte.question} readOnly />
            <h3 className=" w-full text-3xl">Réponse :</h3>
            <textarea className="text-lg w-full h-1/4 resize-none p-2" placeholder="Votre réponse ici !" />
            <button className="m-auto mt-2 p-2 w-2/6 bg-sky-700 text-white rounded-md">Suivant</button>
       </div>
    </div>)
}