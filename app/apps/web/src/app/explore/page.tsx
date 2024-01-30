"use client";
import ResearchBar from "../../components/ui/research-bar.tsx";
import React, {ChangeEvent, useState, useMemo, useEffect, MouseEventHandler} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../components/ui/carousel.tsx";
import Footer from "../../components/ui/footer.tsx";
import {Modal} from "../../components/ui/modal.tsx";
import { useRouter, useSearchParams } from "next/navigation";
import { DeckEmpty, type DeckInterface } from "../../models/deck";
import Image from "next/image";
import { fetchDecks } from "../../models/deck-requests.ts";
import Loader from "../../components/ui/loader";
import DeckUI from "../../components/ui/deck-ui";
import { allTags , Tag} from "../../components/ui/tags.tsx";

export default function Page(): JSX.Element {

    const params = useSearchParams();
    const router = useRouter();

    const [decks, setDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);

    const [allDecks, setAllDecks] = useState<DeckInterface[]>([]);

    const [isImportOpen, setImportOpen] = useState(false);

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

    function tagsOnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const tagName = event.currentTarget.name as string;
        console.log(tagName);
        setDecks(allDecks);
        setDecks(
            allDecks.filter(
                (deck) =>
                    deck.tags.includes(tagName)
            )
        );
    }

    function resetDecks(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
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
      }, []);

    const listeDecks = []
    const listeTags = []

    // Sort Decks by Upvotes - DownVotes
    decks.map((deck) => deck.isPublic == true);
    decks.sort((deck1,deck2) => (deck2.votes.up - deck2.votes.down) - (deck1.votes.up - deck1.votes.down));

    for (let deck of decks) {
        
        if (deck.isPublic == true) {

            listeDecks.push(<>
                    <DeckUI type="public" deck={deck}/>
                </>
            );
        }

    }

    for (let tag of allTags) {
        listeTags.push(<CarouselItem className="md:basis-1/6 lg:basis-1/12">
            <button name={tag.title} onClick={tagsOnClick}> <Tag title={tag.title}/></button>
        </CarouselItem>)
    }

    return <div className="flex flex-col w-full h-screen">
        <Image src={"/marketplace.png"} alt={"marketplace"} width={500} height={200} className="w-full h-24 object-cover"/>
        <div className="flex flex-col items-center mt-10 space-y-10">
            <h1 className="font-Lexend text-3xl font-medium">Bibliothèque de decks</h1>
            <ResearchBar onChange={handleChange}/>
            <button onClick={resetDecks} className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5">Enlever les filtres</button>
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
                <>
                    <div className="flex flex-wrap w-full justify-center gap-3">
                        {listeDecks}
                        {/** TODO : Réutiliser l'import dans la page de chaque deck (une fois le deck cliqué) */}
                        <Modal isOpen={isImportOpen} onClose={() => setImportOpen(false)}>
                            <h1 className="font-Lexend text-xl font-medium">Importer le deck</h1>
                            <div className="flex flex-col space-y-5 items-center mt-5">
                                // TODO remettre deck ui avec l'id du dek cliqué
                                <p className="text-center font-Lexend text-sm">Ce deck sera ajouté dans votre collection Mes decks. Vous pourrez modifier le contenu des
                                    cartes.</p>
                                <button onClick={() => setImportOpen(false)} className="px-5 py-2 bg-black text-white rounded-full font-Lexend w-fit">Importer</button>
                            </div>
                        </Modal>
                    </div>
                </>
            ) : (
                <Loader/>
            )}
            
        </div>
        <Footer/>
    </div>
}
