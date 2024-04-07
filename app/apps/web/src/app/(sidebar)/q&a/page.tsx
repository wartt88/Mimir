"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { DeckInterface } from "../../../models/deck.ts";
import { fetchDeckById } from "../../../models/deck-requests.ts";
import type { Resultat } from "../../../models/card.ts";
import Loader from "../../../components/ui/loader.tsx";
import ReponseDeck from "../../../components/ui/reponse-deck.tsx";
import ResumeDeck from "../../../components/ui/resume-deck.tsx";

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const [deck, setDeck] = useState<DeckInterface>();
  const [resultats, setResultats] = useState<Resultat[]>();
  const [loaded, setLoaded] = useState(false);
  const time = useMemo(() => Date.now(), []);

  useEffect(() => {
    void (async () => {
      const d = await fetchDeckById(params.get("id"));
      setLoaded(true);
      setDeck(d);
      setResultats(undefined);
    })();
  }, [params]);

  function getComposant(): JSX.Element {
    let component: JSX.Element;
    if (!loaded) {
      component = (
        <div className="flex items-center h-[100vh]">
          <Loader />
        </div>
      );
    } else if (typeof resultats === "undefined" && deck) {
      component = (
        <ReponseDeck
          deck={deck}
          putResultats={setResultats}
          setDeck={setDeck}
        />
      );
    } else if (deck && resultats) {
      component = <ResumeDeck deck={deck} resultats={resultats} time={time} />;
    } else {
      component = <div>problème de connexion à la base de donnée</div>;
    }
    return component;
  }

  return (
    <div className="w-full flex items-center justify-center">
      {getComposant()}
    </div>
  );
}
