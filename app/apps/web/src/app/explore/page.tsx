"use client";
import ResearchBar from "../../components/ui/research-bar.tsx";
import React, {ChangeEvent, useState} from "react";
import {DeckUIPublic} from "../../components/ui/deck.tsx";
import { fetchDecks } from "../../models/deck-requests.ts"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../components/ui/carousel.tsx";
import Footer from "../../components/ui/footer.tsx";
import {Modal} from "../../components/ui/modal.tsx";

const Explore = (): JSX.Element => {

    const [isImportOpen, setImportOpen] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("change");
    }

    const decks = []

    for (let i = 0; i < 25; i++) {
        decks.push(<>
                <button onClick={() => setImportOpen(true)} className="text-left">
                    <DeckUIPublic key={i}/>
                </button>
            </>
        );
    }

    const tags = []

    for (let i = 0; i < 20; i++) {
        tags.push(<CarouselItem className="md:basis-1/6 lg:basis-1/12" key={i}>
            <button className="bg-yellow-200 px-5 py-3 rounded-lg font-Lexend text-sm">Tags</button>
        </CarouselItem>)
    }

    return <div className="size-full">
        <img src="/marketplace.png" alt="marketplace" className="h-1/4 w-full object-cover"/>
        <div className="flex flex-col items-center mt-10 space-y-10">
            <h1 className="font-Lexend text-3xl font-medium">Bibliothèque de decks</h1>
            <ResearchBar onChange={handleChange}/>

            <div className="flex flex-col size-full items-center">
                <Carousel className="w-[75%]" id="carousel" opts={{align: "start"}}>
                    <CarouselContent>
                        {tags}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {decks}

                // TODO: Put id deck in useState and use it in the modal
                <Modal isOpen={isImportOpen} onClose={() => setImportOpen(false)}>
                    <h1 className="font-Lexend text-xl font-medium">Importer le deck</h1>
                    <div className="flex flex-col space-y-5 items-center mt-5">
                        <DeckUIPublic/>
                        <p className="text-center font-Lexend text-sm">Ce deck sera ajouté dans votre collection Mes decks. Vous pourrez modifier le contenu des
                            cartes.</p>
                        <button onClick={() => setImportOpen(false)} className="px-5 py-2 bg-black text-white rounded-full font-Lexend w-fit">Importer</button>
                    </div>
                </Modal>

            </div>
        </div>
        <Footer/>
    </div>
}

export default Explore;