import type { DeckInterface } from "../../models/deck";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import DeckUI from "./deck-ui";

export function deckList(
  decks: DeckInterface[] | undefined,
  type: "public" | "perso" | "stats",
  txtEmpty?: string
): JSX.Element[] {
  return decks && decks.length > 0
    ? decks.map((deck) => (
        <DeckUI deck={deck} key={deck._id.toString()} type={type} />
      ))
    : [<p key={100000}>Vous n&apos;avez pas encore de decks {txtEmpty}</p>];
}

export function DeckListView({
  decks,
  type,
  txtEmpty,
}: {
  decks: DeckInterface[] | undefined;
  type: "public" | "perso" | "stats";
  txtEmpty?: string;
}): JSX.Element {
  const list = deckList(decks, type, txtEmpty);
  return (
    <Carousel className="w-full" id="carousel" opts={{ align: "start" }}>
      <CarouselContent>
        {list.map((el) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            key={el.key}
          >
            {el}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
