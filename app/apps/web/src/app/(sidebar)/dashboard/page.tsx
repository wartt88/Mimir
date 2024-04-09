"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { DeckInterface } from "../../../models/deck";
import { fetchDeckById } from "../../../models/deck-requests";
import Redirecter from "../../../components/ui/redirecters-home";
import { DeckListView } from "../../../components/ui/deck-list";
import type { UserInterface } from "../../../models/user";
import { fetchCurrentUser } from "../../../models/user-requests.ts";
import Loader from "../../../components/ui/loader";
import {
  getRecentDecks,
  getRecommendedDecks,
} from "../../../components/getters/deck-getters.ts";

export default function Page(): JSX.Element {
  const [sharedDecks, setSharedDecks] = useState<DeckInterface[]>([]);
  const [recommendedDecks, setRecommendedDecks] = useState<DeckInterface[]>([]);
  const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserInterface | undefined>(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email && !user) {
      void (async () => {
        if (session.user?.email) {
          const newUser: UserInterface = await fetchCurrentUser(
            session.user.email
          );
          setUser(newUser);
        }
      })();
    }
  }, [session]);

  useEffect(() => {
    if (!loaded && user) {
      void (async () => {
        let decks: DeckInterface[] = [];
        setRecentDecks(await getRecentDecks(user));
        setRecommendedDecks(await getRecommendedDecks(user));

        const sharedDecksPromises: Promise<DeckInterface>[] | undefined =
          user.sharedDecks.map((deck) => fetchDeckById(deck.deck_id));

        if (typeof sharedDecksPromises !== "undefined") {
          decks = await Promise.all(sharedDecksPromises);
          decks = decks.reverse();
          setSharedDecks(decks);
        } else {
          setSharedDecks([]);
        }
        setLoaded(true);
      })();
    }
  }, [user]);

  return loaded ? (
    <div className="flex flex-col gap-[6vh] items-center p-16">
      <div className="gap-[5vh] flex flex-col">
        <p className="font-Lexend text-4xl">
          {" "}
          👋 Bonjour {user ? user.username : "UTILISATEUR"} !
        </p>
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
            paragraphe="Visualisez l'évolution de votre apprentissage au fil du temps"
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
        <DeckListView decks={recentDecks} txtEmpty="récents" type="public" />
      </div>
      <div className="w-full flex flex-col gap-[1vh]">
        <p className="font-Lexend text-2xl"> Recommandations</p>
        <DeckListView
          decks={recommendedDecks}
          txtEmpty="recommandés"
          type="public"
        />
      </div>
      <div className="w-full flex flex-col gap-[1vh]">
        <p className="font-Lexend text-2xl">Decks partagés avec vous</p>
        <DeckListView decks={sharedDecks} txtEmpty="partagés" type="public" />
      </div>
    </div>
  ) : (
    <div className="h-[100vh] flex items-center justify-center w-full">
      <Loader />
    </div>
  );
}

// function countIdOccurrences(decks: DeckInterface[]): Record<string, number> {
//   return decks.reduce(
//     (accumulator, deck) => {
//       const id = deck._id;
//       accumulator[id] = (accumulator[id] || 0) + 1;
//       return accumulator;
//     },
//     {} as Record<string, number>
//   );
// }
