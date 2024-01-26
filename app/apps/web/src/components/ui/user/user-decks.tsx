"use client";
import { useEffect, useState } from "react";
import type { UserInterface } from "../../../models/user";
import type { DeckInterface } from "../../../models/deck";
import { fetchDecks } from "../../../models/deck-requests";
import { DeckListView } from "../deck-list";

export default function UserDecks({
  user,
}: {
  user: UserInterface;
}): JSX.Element {
  const [decks, setDecks] = useState<DeckInterface[]>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        //TODO un fetch pour chaque type de deck
        const d: DeckInterface[] = await fetchDecks();

        setDecks(d);
        setLoaded(true);
      })();
    }
  }, []);

  return (
    <div className="w-5/6 flex flex-col h-1/3 justify-around">
      <h2 className="text-4xl font-bold">Decks</h2>
      <DeckListView decks={decks} txtEmpty="personnel" type="perso" />
    </div>
  );
}
