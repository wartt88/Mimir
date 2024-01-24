"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeckPreview from "../components/ui/deck-preview";
import type { DeckInterface } from "../models/deck";
import { fetchDecks } from "../models/deck-requests";
import Redirecter from "../components/ui/redirecters-home";

export default function Page(): JSX.Element {
  const [decks, setDecks] = useState<DeckInterface[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const d = await fetchDecks();
      setDecks(d);
    })();
  }, []);

  const elements = [];

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
    <div className="flex flex-col gap-[10vh] size-2/3 justify-center items-center w-[80%]">
      <div className="gap-[5vh] flex flex-col">
        <p className="font-Lexend text-4xl"> 👋 Bonjour UTILISATEUR !</p>
        <div className="flex h-[20%] items-center space-x-[1.5vw] ">
          <div className="flex">
            <Redirecter couleur="#43ABF3" titre="Créer un nouveau deck" paragraphe="Créez votre propre deck dans le domaine que vous souhaitez" reference="/newDeck"/>
            <Redirecter couleur="#E2F82C" titre="Voir mes decks" paragraphe="Consultez, partagez et modifiez les decks que vous avez crées" reference="/decks"/>
            <Redirecter couleur="#9CF360" titre="Suivre ma progression" paragraphe="Visualisez l'évolution de votre apprentissage" reference="/statistiques"/>
            <Redirecter couleur="#BE85F8" titre="Explorer les decks" paragraphe="Découvrez la multitude de decks crées par nos utilisateurs" reference="/explore"/>
          </div>
        </div>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Historique récent SI ACTIVITE</p>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Recommandantations SI ACTIVITE</p>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Decks partagés avec vous SI PARTAGE</p>
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

