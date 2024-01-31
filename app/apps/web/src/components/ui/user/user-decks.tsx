'use client'
import { useSession } from "next-auth/react";
import { DeckInterface } from "../../../models/deck";
import { fetchCurrentUserDecks, fetchDeckByOwner } from "../../../models/deck-requests";
import deckList from "../deck-list";
import { useState, useEffect} from "react";
import { UserInterface } from "../../../models/user";

export default function UserDecks(): JSX.Element { 
  const [userDecks, setUserDecks] = useState<DeckInterface[]>([]);
  const [user, setUser] = useState<UserInterface|undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
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
        const d: DeckInterface[] = await fetchDeckByOwner(user._id);
      })
    }
  }
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
