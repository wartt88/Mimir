'use client'
import { useSession } from "next-auth/react";
import { DeckInterface } from "../../../models/deck";
import { fetchCurrentUserDecks } from "../../../models/deck-requests";
import deckList from "../deck-list";
import { useState, useEffect} from "react";

export default function UserDecks(): JSX.Element { 

  return (
    <div className="">
      <div className="flex justify-start my-10 px-10">
        <h2 className="text-4xl font-bold">Decks</h2>
      </div>
      <div className="flex flex-row items-center justify-center">
      </div>
    </div>
  );
}
