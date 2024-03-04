"use client";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import computer from "../../../public/pc.jpg";
import NavBar from "../../components/ui/nav-bar.tsx";
import Footer from "../../components/ui/footer.tsx";
import DeckUI from "../../components/ui/deck-ui.tsx";
import type {DeckInterface} from "../../models/deck.ts";
import {fetchDecks} from "../../models/deck-requests.ts";

function Preview() {
    return <div className="h-192 w-full relative">
        <Image alt="" className="object-cover" fill src={computer}/>
        <div className="w-1/3 h-1/2 absolute top-1/4 left-12 ">
            <div className="flex flex-col space-y-10">
                <h1 className="text-5xl font-bold font-Lexend text-white">Apprenez vos cours rapidement</h1>
                <p className="font-Lexend text-white font-light text-lg">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Proin vitae mollis nisl. Donec vel urna sed neque porta Lorem ipsum dolor sit
                    amet,
                    consectetur adipiscing elit. </p>
                <div>
                    <Link className="font-Lexend text-lg bg-amber-500 text-white p-6 rounded-lg"
                          href="/register">Nous
                        rejoindre</Link>
                </div>
            </div>
        </div>
    </div>
}

function Home() {

    const [decks, setDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            void (async () => {
                const allDeck: DeckInterface[] = await fetchDecks();
                // limit to 10
                const d = allDeck.filter((deck) => deck.isPublic).slice(0, 20);

                setDecks(d);
                setLoaded(true);
            })();
        }
    }, [loaded]);


    const element: JSX.Element[] = [];
    for(const deck of decks) {
        element.push(<DeckUI deck={deck} key={deck._id.toString()} type="public"/>)
    }

    return (
        <div className="size-full">
            <NavBar/>
            <Preview/>
            <div className="flex flex-col items-center space-y-10" id="marketplace">
                <h1 className="font-Lexend font-bold text-3xl mt-10">Explorer notre bibliothèque de decks</h1>
                <div className="flex flex-wrap gap-1 justify-center">
                    {element}
                </div>
                <a className="font-Lexend px-5 py-3 bg-black text-white rounded-lg shadow" href="/register">Voir
                    plus</a>
            </div>
            <Footer/>
        </div>

    );
}


export default Home;