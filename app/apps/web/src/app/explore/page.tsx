"use client";
import ResearchBar from "../../components/ui/research-bar.tsx";
import {ChangeEvent} from "react";
import {DeckUIPublic} from "../../components/ui/deck.tsx";

const Explore = (): JSX.Element => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("change");
    }

    const decks = []

    for (let i = 0; i < 25; i++) {
        decks.push(<DeckUIPublic key={i}/>)
    }

    return <div className="size-full">
        <img src="/marketplace.png" alt="marketplace" className="h-1/4 w-full object-cover"/>
        <div className="flex flex-col items-center mt-10 space-y-10">
            <h1 className="font-Lexend text-3xl font-medium">Bibliothèque de decks</h1>
            <ResearchBar onChange={handleChange}/>
            <div className="flex space-x-3">
                <img src="/arrow_left.svg" alt="arrow"/>
                <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                <img src="/arrow_right.svg" alt="arrow"/>
            </div>
            <div className="flex flex-wrap justify-center">
                {decks}
            </div>
        </div>
    </div>
}

export default Explore;