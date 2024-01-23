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
  titre: "euhhhh",
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
