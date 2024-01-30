"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DeckInterface } from "../../models/deck";
import { fetchDeckById } from "../../models/deck-requests";
import type { Resultat } from "../../models/card";
import Loader from "../../components/ui/loader";
import ReponseDeck from "../../components/ui/reponse-deck";
import ResumeDeck from "../../components/ui/resume-deck";

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const [deck, setDeck] = useState<DeckInterface>();
  const [resultats, setResultats] = useState<Resultat[]>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        const d = await fetchDeckById(params.get("id"));
        setLoaded(true);
        setDeck(d);
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
      component = <ResumeDeck deck={deck} resultats={resultats} />;
    } else {
        component = <div>problème de connexion à la base de donnée</div>
    }
    return component;
  }

  return <div className="w-full flex items-center justify-center">{getComposant()}</div>;
}
