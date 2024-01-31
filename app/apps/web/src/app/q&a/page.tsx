"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { DeckInterface } from "../../models/deck";
import { fetchDeckById } from "../../models/deck-requests";
import type { Resultat } from "../../models/card";
import Loader from "../../components/ui/loader";
import ReponseDeck from "../../components/ui/reponse-deck";
import ResumeDeck from "../../components/ui/resume-deck";
import { UserInterface } from "../../models/user";
import { fetchCurrentUser } from "../../models/userRequests";
import { useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const [deck, setDeck] = useState<DeckInterface>();
  const [resultats, setResultats] = useState<Resultat[]>();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserInterface>();
  const {data: session} = useSession();
  const time = useMemo(() => Date.now(), []);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        const d = await fetchDeckById(params.get("id"));
        setLoaded(true);
        setDeck(d);
      })();
    }
    if (!user && session?.user) {
      void (async () => {
          const res = await fetchCurrentUser(session.user.email);
          setUser(res);
      })();
    }
  }, []);

  function getComposant(): JSX.Element {
    let component: JSX.Element;
    if (!loaded) {
      component = <div className="flex items-center h-[100vh]"><Loader /></div>;
    } else if (typeof resultats === "undefined" && deck) {
      component = <ReponseDeck deck={deck} putResultats={setResultats} setDeck={setDeck}/>;
    } else if(deck && resultats){
      component = <ResumeDeck deck={deck} resultats={resultats} time={time} />;
    } else {
        component = <div>problème de connexion à la base de donnée</div>
    }
    return component;
  }

  return <div className="w-full flex items-center justify-center">{getComposant()}</div>;
}
