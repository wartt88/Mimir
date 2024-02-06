"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import Loader from "../../../components/ui/loader.tsx";
import DeckInfos from "../../../components/ui/deck-editor/deck-infos.tsx";
import type {DeckInterface} from "../../../models/deck.ts";
import {fetchDeckById} from "../../../models/deck-requests.ts";
import type {UserInterface} from "../../../models/user.ts";
import type Card from "../../../models/card.ts";
import {fetchCurrentUser} from "../../../models/userRequests.ts";
import CardEditor from "../../../components/ui/deck-editor/card-editor.tsx";

export default function Page(): JSX.Element {

    const params = useSearchParams();
    const router = useRouter();
    const {data: session} = useSession();

    const [user, setUser] = useState<UserInterface>();

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [isEduc, setIsEduc] = useState(false);
    const [isPriv, setIsPriv] = useState(false);

    const [cards, setCards] = useState<Card[]>([]);

    const deckId = params.get("id");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!user && session?.user) {
            void (async () => {
                const res = await fetchCurrentUser(session.user.email);
                setUser(res);
            })();
        }
    }, []);

    useEffect(() => {
        if (!loaded) {
            void (async () => {
                const d: DeckInterface = await fetchDeckById(deckId);

                setLoaded(true);

                if (d) {
                    setCards(d.cards);
                    setTitle(d.title);
                    setDescr(d.descr);
                    setTags(d.tags);
                    setDeadline(new Date(d.deadline));
                    setIsEduc(d.isEducative);
                    setIsPriv(!d.isPublic);
                } else {
                    router.push("/explore");
                }

            })();
        }
    }, []);

    const cardsJSX = cards.map((c, index) => {
        return CardEditor(c, cards, index + 1, setCards, true);
    });

    const handleImport = (): void => {

        const deck: DeckInterface = {
            id: 0,
            title: "this is a empty deck",
            descr: "",
            tags: [],
            isPublic: false,
            isEducative: false,
            votes: {
                up: 0,
                down: 0,
            },
            deadline: new Date(),
            owner_id: "",
            cards: [],
        };

        deck.title = title;
        deck.descr = descr;
        deck.isEducative = isEduc;
        deck.isPublic = !isPriv;
        deck.owner_id = user?._id.toString();
        deck.tags = tags;
        deck.cards = cards;
        if (deadline) {
            deck.deadline = deadline;
        }

        fetch("/api/deck", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deck),
        }).catch((err) => {
            console.error(err);
        });

        router.push("/decks");
    };

    return (
        <div className="size-full">
            {!loaded ? (
                <div className="h-[85vh] flex justify-center items-center">
                    <Loader/>
                </div>
            ) : (
                <div className="p-[5%]">
                    <div className="flex justify-between">
                        <h1 className="font-Lexend text-3xl font-medium">
                            Importer un deck
                        </h1>
                        <div className="space-x-3">
                            <button
                                className="bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                                onClick={handleImport}
                                type="button"
                            >
                                Importer
                            </button>
                            <Link
                                className="bg-gray-400 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow text-center"
                                href="/explore"
                                type="button"
                            >
                                Annuler
                            </Link>
                        </div>
                    </div>

                    <p className="font-Lexend text-red-600">Les informations ne peuvent pas être modifiées lors d'une
                        importation, mais vous pourrez les modifier après avoir importé ce deck.</p>

                    <DeckInfos deadline={deadline} descr={descr}
                               disabled isEduc={isEduc}
                               isPriv={isPriv} setDeadline={setDeadline}
                               setDescr={setDescr} setIsEduc={setIsEduc}
                               setIsPriv={setIsPriv} setTags={setTags}
                               setTitle={setTitle} tags={tags}
                               title={title}
                    />

                    <hr className="my-[5%]"/>

                    <div className="flex flex-col space-y-8">

                        {cardsJSX}

                        <div className="flex space-x-3 justify-center">

                            <button
                                className="bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                                onClick={handleImport}
                                type="button"
                            >
                                Importer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}