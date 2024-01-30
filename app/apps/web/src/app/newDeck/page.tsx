"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {useSession} from "next-auth/react";
import Footer from "../../components/ui/footer.tsx";
import type Card from "../../models/card.ts";
import type {DeckInterface} from "../../models/deck.ts";
import {fetchDeckById} from "../../models/deck-requests.ts";
import Loader from "../../components/ui/loader.tsx";
import type {UserInterface} from "../../models/user.ts";
import {fetchCurrentUser} from "../../models/userRequests.ts";
import {Modal} from "../../components/ui/modal.tsx";
import GeneratePage from "./generate.tsx";
import CardEditor from "../../components/ui/deck-editor/card-editor.tsx";
import DeckInfos from "../../components/ui/deck-editor/deck-infos.tsx";

function Page(): JSX.Element {

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

    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [data, setData] = useState<Card[]>([]);

    const oldDeck = params.get("id");
    const [loaded, setLoaded] = useState(!oldDeck);

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
                const d: DeckInterface = await fetchDeckById(oldDeck);

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
                    router.push("/error");
                }

            })();
        }
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            let taille = cards.length;

            data.forEach((value) => {
                value.id = ++taille;
            });

            setCards([...cards, ...data]);
            setData([]);
        }
    }, [cards, data]);

    const addCard = (): void => {
        setCards([
            ...cards,
            {
                id: cards.length + 1,
                question: "",
                answer: "",
                proficency: 0,
                lastSeen: new Date(),
            },
        ]);
    };

    const handleFinish = (): void => {
        //TODO validation du deck et ajout à sa session avant confirmation
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
            owner_id: 0,
            cards: [],
        };
        deck.title = title;
        deck.descr = descr;
        deck.isEducative = isEduc;
        deck.isPublic = !isPriv;
        // deck.owner_id = user?._id;
        deck.tags = tags;
        deck.cards = cards;
        if (deadline) {
            deck.deadline = deadline;
        }

        if (oldDeck) {
            fetch(`/api/deck/${oldDeck}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(deck),
            }).catch((err) => {
                console.error(err);
            });
        } else {
            fetch("/api/deck", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(deck),
            }).catch((err) => {
                console.error(err);
            });
            //TODO mettre à jour le champ decks du user
        }
        router.push("/decks");
    };

    const cardsJSX = cards.map((c, index) => {
        return CardEditor(c, cards, index + 1, setCards);
    });

    const toggleGenerate = (): void => {
        setIsGenerateOpen(!isGenerateOpen);
        setFile(undefined);
        console.log("azertyuiop");
    };

    const titleJsx = oldDeck ? "Modifier un deck" : "Créer un nouveau deck";
    const titleButtonJsx = oldDeck ? "Modifier" : "Créer";

    return (
        <div className="size-full">
            <Modal isOpen={isGenerateOpen} onClose={toggleGenerate}>
                <GeneratePage
                    file={file}
                    onClose={toggleGenerate}
                    setData={setData}
                    setFile={setFile}
                />
            </Modal>
            {!loaded ? (
                <div className="h-[85vh] flex justify-center items-center">
                    <Loader/>
                </div>
            ) : (
                <div className="p-[5%]">
                    <div className="flex justify-between">
                        <h1 className="font-Lexend text-3xl font-medium">
                            {titleJsx}
                        </h1>
                        <div className="space-x-3">
                            <button
                                className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                                onClick={handleFinish}
                                type="button"
                            >
                                {titleButtonJsx}
                            </button>
                            <Link
                                className="bg-gray-400 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow text-center"
                                href="/decks"
                                type="button"
                            >
                                Annuler
                            </Link>
                        </div>
                    </div>

                    <DeckInfos title={title} setTitle={setTitle}
                               descr={descr} setDescr={setDescr}
                               tags={tags} setTags={setTags}
                               deadline={deadline} setDeadline={setDeadline}
                               isEduc={isEduc} setIsEduc={setIsEduc}
                               isPriv={isPriv} setIsPriv={setIsPriv}
                               disabled={true}
                    />

                    <hr className="my-[5%]"/>

                    <div className="flex flex-col space-y-8">
                        <button
                            className=" w-fit flex items-center gap-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                            onClick={toggleGenerate}
                            type="button"
                        >
                            <Image alt="" height={32} src="/magic.svg" width={32}/>
                            Générer
                        </button>

                        {cardsJSX}

                        <div className="flex space-x-3 justify-center">
                            <button
                                className=" w-fit flex items-center gap-2 bg-gray-700 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                                onClick={addCard}
                                type="button"
                            >
                                <Image alt="" height={20} src="/add_white.svg" width={20}/>
                                Ajouter une nouvelle carte
                            </button>
                            <button
                                className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                                onClick={handleFinish}
                                type="button"
                            >
                                {titleButtonJsx}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default Page;
