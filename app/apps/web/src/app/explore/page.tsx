"use client";
import ResearchBar from "../../components/ui/research-bar.tsx";
import {ChangeEvent} from "react";
import {DeckUIPublic} from "../../components/ui/deck.tsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../components/ui/carousel.tsx";
import UserPreviewGen from "../../components/ui/user-preview-gen.tsx";

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

            <div className="flex flex-col size-full items-center">
                <Carousel className="w-[75%]" id="carousel" opts={{align: "start"}}>
                    <CarouselContent>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <button className="bg-yellow-200 p-5 rounded-md font-Lexend text-sm">Tags</button>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {decks}
            </div>
        </div>
    </div>
}

export default Explore;