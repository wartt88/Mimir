"use client";

import {MutableRefObject, useRef, useState} from "react";
import Footer from "../../components/ui/footer.tsx";

interface Card {
    id_card: number;
    question: string;
    reponse: string;
    palier: number;
    derniereRevision: number;
}

//fake data
const initialCards: Card[] = [
    {
        id_card: 1,
        question: "Allons-nous réussir ?zekfbkzefbzebfjzbffljzelknzelkfzlfnlfnerfkzefbkegfuzefuzerbhzefzerub",
        reponse: "Oui",
        palier: 5,
        derniereRevision: 1704708559,
    },
    {
        id_card: 2,
        question: "2+2 ?",
        reponse: "4",
        palier: 1,
        derniereRevision: 1704708559,
    },
    {
        id_card: 3,
        question: "Quel âge à le monde ?",
        reponse: "4,54 milliards d'années",
        palier: 1,
        derniereRevision: 1704708559,
    },
];

const CardEditor = (card: Card): JSX.Element => {

    const questionRef = useRef(null);
    const reponseRef = useRef(null);

    const autoGrow = (ref: MutableRefObject<any>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }

    return <div className="bg-white rounded-md" key={card.id_card}>
        <div className="flex justify-between px-5 pt-5">
            <h1 className="font-Lexend text-xl font-bold">{card.id_card}</h1>
            <div className="flex space-x-1">
                <img src="/move.svg" alt=""/>
                <img src="/delete.svg" alt=""/>
            </div>
        </div>
        <hr className="my-2"/>

        <div className="flex space-x-3">
            <div className="flex flex-col justify-between px-5 pb-5 grow">
                    <textarea className="resize-none h-auto" onChange={() => {
                        autoGrow(questionRef);
                    }} ref={questionRef}>{card.question}</textarea>
                <hr className="border-2 border-black my-2"/>
                <p className="font-Lexend">QUESTION</p>
            </div>
            <div className="flex flex-col justify-between px-5 pb-5 grow">
                    <textarea className="resize-none h-auto" onChange={() => {
                        autoGrow(reponseRef);
                    }} ref={reponseRef}>{card.reponse}</textarea>
                <hr className="border-2 border-black my-2"/>
                <p className="font-Lexend">RÉPONSE</p>
            </div>
        </div>
    </div>

}

function Page(): JSX.Element {

    const [cards, setCards] = useState<Card[]>(initialCards);

    const cardsJSX = cards.map((c) => {
        return CardEditor(c);
    });

    const addCard = () => {
        setCards([...cards, {
            id_card: cards.length,
            question: "",
            reponse: "",
            palier: 0,
            derniereRevision: 0,
        }]);
    }


return <div className="size-full">
    <div className="p-[5%]">

        <div className="flex justify-between">
            <h1 className="font-Lexend text-3xl font-medium">Créer un nouveau deck</h1>
            <div className="space-x-3">
                <button className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">Créer
                </button>
                <button className="bg-gray-400 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">Annuler
                </button>
            </div>
        </div>

        <div className="flex flex-col space-y-5 my-[5%]">

            <input className="bg-white font-Lexend p-3 rounded-sm" placeholder="Entrez un titre"
                   style={{color: "#626380"}}
                   type="text"/>

            <div className="flex space-x-5">

                <textarea className="grow bg-white font-Lexend p-3 rounded-sm resize-none"
                          placeholder="Ajouter une description"
                          style={{color: "#626380"}}/>

                <div className="grow flex flex-col space-y-5">

                    <input className="bg-white font-Lexend p-3 rounded-sm" placeholder="Entrez des tags"
                           style={{color: "#626380"}}
                           type="text"/>
                    <input className="bg-white font-Lexend p-3 rounded-sm" placeholder="Choisissez une date limite"
                           style={{color: "#626380"}}
                           type="date"/>

                    <div className="flex justify-between">
                        <div className="flex space-x-3">
                            <input type="checkbox"/>
                            <p>Deck éducatif</p>
                        </div>
                        <div className="flex space-x-3">
                            <input type="checkbox"/>
                            <p>Deck privé</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr className="my-[5%]"/>


        <div className="flex flex-col space-y-8">

            <button
                className=" w-fit flex items-center gap-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                <img alt="" height={32} src="/magic.svg" width={32}/>
                Générer
            </button>

            {cardsJSX}

            <div className="flex space-x-3 justify-center">
                <button onClick={addCard}
                    className=" w-fit flex items-center gap-2 bg-gray-700 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                    <img alt="" height={20} src="/add_white.svg" width={20}/>
                    Ajouter une nouvelle carte
                </button>
                <button className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                    Créer
                </button>
            </div>

        </div>

    </div>
    <Footer/>
</div>

}

export default Page;
