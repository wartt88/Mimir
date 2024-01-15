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



//fake data
const deck = {
  id: 1,
  titre: "essais 1",
  tags: ["svt", "so cool"],
  isPublic: false,
  isEducative: true,
  votes: [],
  deadline: null,
  user_id: 123456789,
  cartes: [
    {
      id_card: 1,
      question: "Allons-nous reussir ?",
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
  ],
};

export default function Page(): JSX.Element {
  const elements = [];

  for (let i = 1; i < 10; i++) {
    elements.push(
      <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i /*deck.id*/}>
        <DeckPreview idCard={i} idDeck={deck.id} link="/deck" />
      </CarouselItem>
    );
  }

  return (
    <div className="size-3/4 flex items-center justify-center border-gray bg-transparent">
      <div className="size-[90%] grid grid-cols-3 grid-rows-6 gap-x-[4%] gap-y-[2%]">
        <div
          className="
                        size-full bg-gray-200 col-start-1 col-span-2 row-start-1 row-span-2
                        border-gray flex  justify-center
                        "
        >
          <Carousel
            className="h-[90%] w-9/12 items-center self-center"
            opts={{ align: "start" }}
          >
            <CarouselContent>{elements}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="border-gray size-full col-start-1 col-span-2 row-start-3 row-span-2 bg-gray-200 flex justify-center">
          <BarChart/>
        </div>
        <div className="border-gray size-full col-start-1 col-span-2 row-start-5 row-span-2 bg-gray-200 flex justify-center">
          <AreaChart />
        </div>
        <div className="border-gray size-full columns-3 row-span-3 row-start-1 bg-gray-200 flex">
          <DetailsStats />
        </div>
        <div className="border-gray size-full columns-3 row-span-3 row-start-4 bg-gray-200 flex">
          <PieChart />
        </div>
      </div>
    </div>
  );
}
