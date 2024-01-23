"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import DeckPreview from "../../components/ui/deck-preview";
import AreaChart from "../../components/ui/area-chart";
import BarChart from "../../components/ui/bar-chart";
import DetailsStats from "../../components/ui/details-stats";
import PieChart from "../../components/ui/pie-chart";
import { getDeck } from "../api/fake-data";

export default function Page(): JSX.Element {
  const elements = [];

  const deck = getDeck();

  for (let i = 1; i < 10; i++) {
    elements.push(
      <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i /*deck.id*/}>
        <DeckPreview idDeck={deck.id} link="/deck" />
      </CarouselItem>
    );
  }

  return (
    <div className="flex items-center justify-center size-full">
        <div>
          <p className="font-Lexend text-4xl m-5">Votre progression 📊</p>
          <div className="h-[20%] flex justify-center items-center">
            <Carousel className="h-[90%] w-9/12 items-center self-center" opts={{ align: "start" }}>
              <CarouselContent>{elements}</CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
    </div>
  );
}
