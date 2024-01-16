import {
  CarouselItem,
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/carousel";
import DeckPreview from "../../components/ui/deck-preview";
import InfoPerso from "../../components/ui/info-perso";
import { getDeck } from "../api/fake-data";

export default function Page(): JSX.Element {
  const elements = [];
  const deck = getDeck();

  for (let i = 1; i < 10; i++) { //TODO change id
    elements.push(
      <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={i /* deck.id*/}>
        <DeckPreview idCard={-1} idDeck={deck.id} link="/newDeck" />
      </CarouselItem>
    );
  }

  return (
    <div className="size-3/4 flex items-center justify-center border-gray bg-gray-200">
      <div className="size-[80%] flex flex-col justify-between">
        <div className="h-[45%] w-full">
          <InfoPerso />
        </div>
        <div className="h-[45%] w-full flex justify-between flex-col items-center">
          <h2 className="w-full text-2xl font-semibold underline">Vos decks :</h2>
          <Carousel
            className="h-[80%] w-[90%] items-center self-center"
            opts={{ align: "start" }}
          >
            <CarouselContent>{elements}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
