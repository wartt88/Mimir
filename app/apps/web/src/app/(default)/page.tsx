"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import computer from "../../../public/pc.jpg";
import NavBar from "../../components/ui/nav-bar.tsx";
import ResearchBar from "../../components/ui/research-bar.tsx";
import Footer from "../../components/ui/footer.tsx";
import DeckUI from "../../components/ui/deck-ui.tsx";
import type {DeckInterface} from "../../models/deck.ts";

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

    const DeckEmpty: DeckInterface = {
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


    const handleChange = () : void => {
        console.log("Research bar to do")
    }

    const element: JSX.Element[] = []
    for (let i = 0; i < 10; i++) {
        element.push(<DeckUI deck={DeckEmpty} key={i} type="public"/>)
    }

    return (
        <div className="size-full">
            <NavBar/>
            <Preview/>
            <div className="flex flex-col items-center space-y-10" id="marketplace">
                <h1 className="font-Lexend font-bold text-3xl mt-10">Explorer notre bibliothèque de decks</h1>
                <ResearchBar onChange={handleChange}/>
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