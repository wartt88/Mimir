"use client";
import Image from "next/image";
import computer from "../../../public/pc.jpg";
import Link from "next/link";
import React, {ChangeEvent} from "react";
import NavBar from "../../components/ui/nav-bar.tsx";
import ResearchBar from "../../components/ui/research-bar.tsx";
import Footer from "../../components/ui/footer.tsx";
import DeckUI from "../../components/ui/deck-ui.tsx";
import {DeckInterface} from "../../models/deck.ts";

const Preview = () => {
    return <div className="h-192 w-full relative">
        <Image src={computer} fill alt="" className="object-cover"/>
        <div className="w-1/3 h-1/2 absolute top-1/4 left-12 ">
            <div className="flex flex-col space-y-10">
                <h1 className="text-5xl font-bold font-Lexend text-white">Apprenez vos cours rapidement</h1>
                <p className="font-Lexend text-white font-light text-lg">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Proin vitae mollis nisl. Donec vel urna sed neque porta Lorem ipsum dolor sit
                    amet,
                    consectetur adipiscing elit. </p>
                <div>
                    <Link href="/register"
                          className="font-Lexend text-lg bg-amber-500 text-white p-6 rounded-lg">Nous
                        rejoindre</Link>
                </div>
            </div>
        </div>
    </div>
}

const Home = () => {

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


    const handleChange = () => {}

    let element: any[] = []
    for (let i: number = 0; i < 10; i++) {
        element.push(<DeckUI type="public" deck={DeckEmpty} key={i}/>)
    }

    return (
        <div className="size-full">
            <NavBar/>
            <Preview/>
            <div id="marketplace" className="flex flex-col items-center space-y-10">
                <h1 className="font-Lexend font-bold text-3xl mt-10">Explorer notre bibliothèque de decks</h1>
                <ResearchBar onChange={handleChange}/>
                <div className="flex flex-wrap gap-1 justify-center">
                    {element}
                </div>
                <a href="/register" className="font-Lexend px-5 py-3 bg-black text-white rounded-lg shadow">Voir
                    plus</a>
            </div>
            <Footer/>
        </div>

    );
}


export default Home;