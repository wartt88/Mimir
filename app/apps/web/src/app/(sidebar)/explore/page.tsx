"use client";
import type {ChangeEvent} from "react";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import ResearchBar from "../../../components/ui/research-bar.tsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../components/ui/carousel.tsx";
import {Modal} from "../../../components/ui/modal.tsx";
import {type DeckInterface} from "../../../models/deck.ts";
import {fetchDecks} from "../../../models/deck-requests.ts";
import Loader from "../../../components/ui/loader.tsx";
import DeckUI from "../../../components/ui/deck-ui.tsx";
import {allTags, Tag} from "../../../components/ui/tags.tsx";

export default function Page(): JSX.Element {

    const [decks, setDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);

    const [allDecks, setAllDecks] = useState<DeckInterface[]>([]);

    const [isImportOpen, setIsImportOpen] = useState(false);

    function handleChange(event: ChangeEvent): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        setDecks(allDecks);
        setDecks(
            allDecks.filter(
                (deck) =>
                    deck.title.toLowerCase().includes(input.value.toLowerCase())
            )
        );
    }

    function tagsOnClick(event: React.MouseEvent<HTMLButtonElement>): void {
        const tagName = event.currentTarget.name;
        console.log(tagName);
        setDecks(allDecks);
        setDecks(
            allDecks.filter(
                (deck) =>
                    deck.tags.includes(tagName)
            )
        );
    }

    function resetDecks(): void {
        setDecks(allDecks);
    }

    useEffect(() => {
        if (!loaded) {
            void (async () => {
                const d = await fetchDecks();
                setLoaded(true);
                setAllDecks(d);
                setDecks(d);
            })();
        }
    }, [loaded]);

    const listeDecks = []
    const listeTags = []

    // Sort Decks by Upvotes - DownVotes
    decks.map((deck) => deck.isPublic);
    decks.sort((deck1, deck2) => (deck2.votes.up - deck2.votes.down) - (deck1.votes.up - deck1.votes.down));

    for (const deck of decks) {

        if (deck.isPublic) {

            listeDecks.push(<DeckUI deck={deck} key={deck._id.toString()} type="import"/>
            );
        }

    }

    for (const tag of allTags) {
        listeTags.push(<CarouselItem className="md:basis-1/6 lg:basis-1/12" key={tag.title}>
            <button name={tag.title} onClick={tagsOnClick} type="button"><Tag title={tag.title}/></button>
        </CarouselItem>)
    }

    return <>
        <Image alt="marketplace" className="w-full h-24 object-cover" height={200} src="/marketplace.png"
               width={500}/>
        <div className="flex flex-col items-center space-y-10 p-10">
            <h1 className="font-Lexend text-3xl font-medium">Bibliothèque de decks</h1>
            <ResearchBar onChange={handleChange} placeholder="Rechercher un deck"/>
            <button className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5" onClick={resetDecks}
                    type="button">Enlever les
                filtres
            </button>
            <div className="flex flex-col size-full items-center">
                <Carousel className="w-[75%]" id="carousel" opts={{align: "start"}}>
                    <CarouselContent>
                        {listeTags}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
            {loaded ?
                (
                    <div className="flex flex-wrap w-full justify-center gap-3">
                        {listeDecks}
                        <Modal isOpen={isImportOpen} onClose={() => {
                            setIsImportOpen(false);
                        }}>
                            <h1 className="font-Lexend text-xl font-medium">Importer le deck</h1>
                            <div className="flex flex-col space-y-5 items-center mt-5">
                                <p className="text-center font-Lexend text-sm">Ce deck sera ajouté dans votre
                                    collection Mes decks. Vous pourrez modifier le contenu des
                                    cartes.</p>
                                <button className="px-5 py-2 bg-black text-white rounded-full font-Lexend w-fit"
                                        onClick={() => {
                                            setIsImportOpen(false);
                                        }}
                                        type="button">Importer
                                </button>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <Loader/>
                )}

        </div>
    </>
}
