"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { DeckInterface } from "../models/deck";
import { fetchDecks } from "../models/deck-requests";
import Redirecter from "../components/ui/redirecters-home";
import deckList from "../components/ui/deck-list";
import type { UserInterface } from "../models/user";
import { fetchCurrentUser } from "../models/userRequests";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "../components/ui/carousel";

export default function Page(): JSX.Element {
  const [sharedDecks, setSharedDecks] = useState<DeckInterface[]>([]);
  const [recommendedDecks, setRecommendedDecks] = useState<DeckInterface[]>([]);
  const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserInterface|undefined>(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email && !user) {
      void(async()=>{
        const newUser:UserInterface = await fetchCurrentUser(session.user.email);
        setUser(newUser);
      })()
    }
  }, [session]);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        //TODO un fetch pour chaque type de deck
        const d: DeckInterface[] = await fetchDecks();
        // const user:UserInterface = await fetchCurrentUser();

        setSharedDecks(d);
        setRecentDecks(d);
        setRecommendedDecks(d);
        setLoaded(true);
      })();
    }
  }, []);

  //recevoir les deckPreview
  const shared: JSX.Element[] = deckList(sharedDecks, "public", "partagés");
  const recent: JSX.Element[] = deckList(recentDecks, "public", "recents");
  const recommended: JSX.Element[] = deckList(
    recommendedDecks,
    "public",
    "recommandés"
  );

  return (
    <div className="flex flex-col gap-[6vh] items-center w-[75%] h-full py-[10%]">
      <div className="gap-[5vh] flex flex-col">
        <p className="font-Lexend text-4xl"> 👋 Bonjour {user?user.username:"UTILISATEUR"} !</p>
        <div className="flex h-fit items-start space-x-[1.5vw] ">
          <Redirecter
            couleur="#43ABF3"
            paragraphe="Créez votre propre deck dans le domaine que vous souhaitez"
            reference="/newDeck"
            titre="Créer un nouveau deck"
          />
          <Redirecter
            couleur="#E2F82C"
            paragraphe="Consultez, partagez et modifiez les decks que vous avez crées"
            reference="/decks"
            titre="Voir mes decks"
          />
          <Redirecter
            couleur="#9CF360"
            paragraphe="Visualisez l'évolution de votre apprentissage"
            reference="/statistiques"
            titre="Suivre ma progression"
          />
          <Redirecter
            couleur="#BE85F8"
            paragraphe="Découvrez la multitude de decks crées par nos utilisateurs"
            reference="/explore"
            titre="Explorer les decks"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[1vh]">
        <p className="font-Lexend text-2xl"> Historique récent</p>
        <Carousel className="w-full" id="carousel" opts={{ align: "start" }}>
          <CarouselContent>{recent.map((el)=><CarouselItem className="md:basis-1/2 lg:basis-1/4" key={el.key}>{el}</CarouselItem>)}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full flex flex-col gap-[1vh]">
        <p className="font-Lexend text-2xl"> Recommandantations</p>
        <Carousel className="w-full" id="carousel" opts={{ align: "start" }}>
          <CarouselContent>{recommended.map((el)=><CarouselItem className="md:basis-1/2 lg:basis-1/4" key={el.key}>{el}</CarouselItem>)}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full flex flex-col gap-[1vh]">
        <p className="font-Lexend text-2xl">Decks partagés avec vous</p>
        <Carousel className="w-full" id="carousel" opts={{ align: "start" }}>
          <CarouselContent>{shared.map((el)=><CarouselItem className="md:basis-1/2 lg:basis-1/4" key={el.key}>{el}</CarouselItem>)}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {
        //TODO Shiny button
        /* <Link
        className="bg-orange-300 w-2/3 self-center text-5xl font-black text-white p-7 rounded-xl"
        href={{ pathname: "/deck", query: { deck: 1, card: 1 } }}
        key={111}
      >
        STUDY DAILY CARDS
      </Link> */
      }
    </div>
  );
}
