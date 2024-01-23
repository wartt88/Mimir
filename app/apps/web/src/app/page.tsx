"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeckPreview from "../components/ui/deck-preview";
import type { DeckInterface } from "../models/deck";
import { fetchDecks } from "../models/deck-requests";

export default function Page(): JSX.Element {
  const [decks, setDecks] = useState<DeckInterface[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const d = await fetchDecks();
      setDecks(d);
    })();
  }, []);

  const elements = [<NewDeck key={0} />];

  // //recevoir les deckPreview
  decks.forEach((deck) => {

    const cards = deck.cards;
    const learned = cards.filter((e) => e.proficency >= 4).length;
    const never = cards.filter((e) => e.proficency === 0).length;
    const other = cards.length - (never + learned);

    elements.push(
      <div className="h-full w-1/5">
        <DeckPreview idDeck={deck._id} key={deck._id} learned={learned} link="/deck" never={never} other={other} title={deck.title} />
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-[10vh] size-2/3 justify-center">
      <div className="flex h-[30%] items-center space-x-[1.5vw] ">
        {elements}
      </div>
      <Link
        className="bg-orange-300 w-2/3 self-center text-5xl font-black text-white p-7 rounded-xl"
        href={{ pathname: "/deck", query: { deck: 1, card: 1 } }}
        key={111}
      >
        STUDY DAILY CARDS
      </Link>
    </div>
  );
}

function NewDeck(): JSX.Element {
  return (
    <Link
      className="bg-gray-100 p-6 flex flex-col gap-2 border-gray items-center h-full"
      href="/newDeck"
    >
      <h3 className="text-xl text-center">Ajouter un nouveau deck</h3>
      <svg
        fill="none"
        height="67"
        viewBox="0 0 63 67"
        width="63"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.5 25.3125V41H0.125V25.3125H62.5ZM39.875 0.625V66.875H22.8125V0.625H39.875Z"
          fill="black"
        />
      </svg>
    </Link>
  );
}
