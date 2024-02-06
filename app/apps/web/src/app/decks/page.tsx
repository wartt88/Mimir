"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {fetchDecks} from "../../models/deck-requests";
import {type DeckInterface} from "../../models/deck";
import Loader from "../../components/ui/loader";
import {deckList} from "../../components/ui/deck-list";
import {fetchCurrentUser} from "../../models/userRequests.ts";

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
                    const jsxElements: JSX.Element[] = deckList(d, "public");
                    setElements(jsxElements);
                    setLoaded(true);
                })();
            }
        }
    }, [loaded, session]);

    return (
        <div className="w-[90%] size-full">
            <div className="flex justify-between w-[100%] my-20">
                <p className="font-bold font-Lexend text-3xl grow">Mes decks</p>
                <Link
                    className="flex items-center bg-slate-300 p-2 rounded-md"
                    href="/newDeck"
                >
                    <Image
                        alt="Editer"
                        className=""
                        height={20}
                        src="addBlack.svg"
                        width={20}
                    />
                    <p className="font-Lexend text-xl ml-2">Créer un nouveau deck</p>
                </Link>
            </div>
            {loaded ? <div className="flex flex-wrap gap-3 justify-center">{elements}</div> :
                <div className="h-[70vh] flex items-center justify-center"><Loader/></div>}

        </div>
    );
}
