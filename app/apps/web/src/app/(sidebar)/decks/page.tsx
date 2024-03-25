"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { DeckInterface } from "../../../models/deck.ts";
import { fetchDeckByOwner } from "../../../models/deck-requests.ts";
import { fetchCurrentUser } from "../../../models/userRequests.ts";
import { deckList } from "../../../components/ui/deck-list.tsx";
import Loader from "../../../components/ui/loader.tsx";
import type { UserInterface } from "../../../models/user.ts";
import { getSharedDecks } from "../../../models/share-request.ts";

export default function Page(): JSX.Element {
  const [user, setUser] = useState<UserInterface | undefined>(undefined);
  const { data: session } = useSession();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (!userLoaded) {
      void (async () => {
        if (session?.user?.email && !user) {
          const newUser: UserInterface = await fetchCurrentUser(
            session.user.email
          );
          setUser(newUser);
          setUserLoaded(true);
        }
      })();
    }
  }, [session, userLoaded]);

  return userLoaded  && user ? (
    <>
      <MyDecks user={user} />
      <hr />
      <SharedDecks user={user} />
    </>
  ) : (
    <div className="h-[70vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}

function MyDecks({ user }: { user: UserInterface }): JSX.Element {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        if (user) {
          // FETCH pour les decks de l'utilisateur courant
          const d: DeckInterface[] = await fetchDeckByOwner(
            user._id.toString()
          );
          const jsxElements: JSX.Element[] = deckList(d, "perso");
          setElements(jsxElements);
          setLoaded(true);
        }
      })();
    }
  }, [user, loaded]);

  return (
    <div className="p-10 space-y-10">
      <div className="flex justify-between">
        <h1 className="font-Lexend text-3xl font-medium">Mes decks</h1>
        <Link
          className="flex items-center bg-slate-300 p-2 rounded-md"
          href="/newDeck"
        >
          <Image
            alt="Creer"
            className=""
            height={20}
            src="addBlack.svg"
            width={20}
          />
          <p className="font-Lexend text-xl ml-2">Créer un nouveau deck</p>
        </Link>
      </div>

      {loaded ? (
        <div className="flex flex-wrap gap-3 justify-center">{elements}</div>
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

function SharedDecks({ user }: { user: UserInterface }): JSX.Element {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        if (user) {
          // FETCH pour les decks de l'utilisateur courant
          const d: DeckInterface[] = await getSharedDecks(user._id.toString());
          const jsxElements: JSX.Element[] = deckList(d, "public");
          setElements(jsxElements);
          setLoaded(true);
        }
      })();
    }
  }, [user, loaded]);

  return (
    <div className="p-10 space-y-10">
      <h1 className="font-Lexend text-3xl font-medium">
        Decks partagés avec vous
      </h1>

      {loaded ? (
        <div className="flex flex-wrap gap-3 justify-center">{elements}</div>
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
