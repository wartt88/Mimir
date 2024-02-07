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
        const allDeck: DeckInterface[] = await fetchDecks();
        const d = allDeck.filter((deck) => deck.owner_id === user._id.toString());

        setDecks(d);
        setLoaded(true);
      })();
    }
  }, []);

  return (
    <div className="w-full flex flex-col h-1/3 justify-around px-10">
      <h2 className="text-4xl font-bold">Decks</h2>
      <div className="w-full px-10">
        <DeckListView decks={decks} txtEmpty="personnel" type="perso" />
      </div>
    </div>
  );
}
