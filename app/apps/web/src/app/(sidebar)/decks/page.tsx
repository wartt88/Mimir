"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {DeckInterface} from "../../../models/deck.ts";
import {fetchDecks} from "../../../models/deck-requests.ts";
import {fetchCurrentUser} from "../../../models/userRequests.ts";
import {deckList} from "../../../components/ui/deck-list.tsx";
import Loader from "../../../components/ui/loader.tsx";

export default function Page(): JSX.Element {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [loaded, setLoaded] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        if (session?.user) {
            if (!loaded) {
                void (async () => {
                    const allDeck: DeckInterface[] = await fetchDecks();
                    const user = await fetchCurrentUser(session.user.email);
                    const d = allDeck.filter((deck) => deck.owner_id === user._id.toString());
                    const jsxElements: JSX.Element[] = deckList(d, "perso");
                    setElements(jsxElements);
                    setLoaded(true);
                })();
            }
        }
    }, [loaded, session]);

    return (
        <div className="p-10 space-y-10">
            <div className="flex justify-between">
                <h1 className="font-Lexend text-3xl font-medium">Mes decks</h1>
                <Link className="flex items-center bg-slate-300 p-2 rounded-md" href="/newDeck">
                    <Image alt="Creer" className="" height={20} src="addBlack.svg" width={20}/>
                    <p className="font-Lexend text-xl ml-2">Créer un nouveau deck</p>
                </Link>
            </div>

            {loaded ?
                <div className="flex flex-wrap gap-3 justify-center">{elements}</div>
                :
                <div className="h-[70vh] flex items-center justify-center"><Loader/></div>}

        </div>
    );
}
