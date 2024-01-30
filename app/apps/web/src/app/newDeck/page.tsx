"use client";
import Image from "next/image";
import {Dispatch, RefObject, SetStateAction, useEffect} from "react";
import React, {createRef, useState} from "react";
import {useRouter} from "next/navigation";
import Footer from "../../components/ui/footer.tsx";
import type Card from "../../models/card.ts";
import type {DeckInterface} from "../../models/deck.ts";
import {Modal} from "../../components/ui/modal.tsx";
import GeneratePage from "./generate.tsx";
import { useSession } from "next-auth/react";
import { fetchCurrentUser } from "../../models/userRequests.ts";

function CardEditor(
    card: Card,
    cards: Card[],
    index: number,
    setCards: Dispatch<SetStateAction<Card[]>>
): JSX.Element {
    const questionRef = createRef<HTMLTextAreaElement>();
    const reponseRef = createRef<HTMLTextAreaElement>();

    const autoGrow = (ref: RefObject<HTMLTextAreaElement>): void => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    const deleteCard = (): void => {
        const newCards = cards.filter((c) => c.id !== card.id);
        setCards(newCards);
    };

    const onUnFocus = (): void => {
        const indexC = cards.indexOf(card);
        const question = questionRef.current?.value;
        card.question = question ? question : "";
        const reponse = reponseRef.current?.value;
        card.answer = reponse ? reponse : "";
        card.users = [{
            user_id : id_current_user,
            proficency: 0,
            lastSeen: new Date(),
            answers : []
        }];

        cards[indexC] = card;
        setCards(cards);
    };

    return (
        <div className="bg-white rounded-md" key={card.id}>
            <div className="flex justify-between px-5 pt-5">
                <h1 className="font-Lexend text-xl font-bold">{index}</h1>
                <div className="flex space-x-1">
                    <Image alt="" height={20} src="move.svg" width={20}/>
                    <Image
                        alt=""
                        className="cursor-pointer"
                        height={20}
                        onClick={deleteCard}
                        src="delete.svg"
                        width={20}
                    />
                </div>
            </div>
            <hr className="my-2"/>

            <div className="flex space-x-3">
                <div className="flex flex-col justify-between px-5 pb-5 grow">
          <textarea
              className="resize-none h-auto"
              defaultValue={card.question}
              onBlur={onUnFocus}
              onChange={() => {
                  autoGrow(questionRef);
              }}
              ref={questionRef}
          />
                    <hr className="border-2 border-black my-2"/>
                    <p className="font-Lexend">QUESTION</p>
                </div>
                <div className="flex flex-col justify-between px-5 pb-5 grow">
          <textarea
              className="resize-none h-auto"
              defaultValue={card.answer}
              onBlur={onUnFocus}
              onChange={() => {
                  autoGrow(reponseRef);
              }}
              ref={reponseRef}
          />
                    <hr className="border-2 border-black my-2"/>
                    <p className="font-Lexend">RÉPONSE</p>
                </div>
            </div>
        </div>
    );
}

var id_current_user = "unknown";

async function findUserID() : Promise<void> {
    const { data: session } = useSession();
    if (session?.user) {
        if (session.user.email) {
          const user = await fetchCurrentUser(session.user.email);
          if (user._id) {
            id_current_user = user._id;
          }
        }
    }
}

function Page(): JSX.Element {
    const [cards, setCards] = useState<Card[]>([]);
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState<Date | null>();
    const [isEduc, setIsEduc] = useState(false);
    const [isPriv, setIsPriv] = useState(false);
    const router = useRouter();
    findUserID();

    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
    const [file, setFile] = useState<File>(undefined);
    const [data, setData] = useState<Card[]>([]);

    const cardsJSX = cards.map((c, index) => {
        return CardEditor(c, cards, index + 1, setCards);
    });

    const toggleGenerate = (): void => {
        setIsGenerateOpen(!isGenerateOpen);
        setFile(undefined);
    }

    const addCard = (): void => {
        console.log("rentre ici");
        setCards([
            ...cards,
            {
                id: cards.length + 1,
                question: "",
                answer: "",
                users : [{
                    user_id : id_current_user,
                    proficency: 0,
                    lastSeen: new Date(),
                    answers : []
                }]
            },
        ]);
    };

    useEffect(() => {
        if (data.length > 0) {

            let taille = cards.length;

            data.forEach(value => {
                value.id = ++taille;
                value.users.push({
                    user_id : id_current_user,
                    proficency: 0,
                    lastSeen: new Date(),
                    answers : []
                });
            })

            setCards([
                ...cards,
                ...data
            ])
            setData([])
        }
    }, [cards, data]);

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
            owner_id: "",
            cards: [],
        };
        deck.title = title;
        deck.descr = descr;
        deck.isEducative = isEduc;
        deck.isPublic = !isPriv;
        deck.owner_id = id_current_user;
        deck.tags = tags;
        deck.cards = cards;
        if (date) {
            deck.deadline = date;
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

            <Modal isOpen={isGenerateOpen} onClose={toggleGenerate}>
                <GeneratePage file={file} onClose={toggleGenerate} setData={setData} setFile={setFile}/>
            </Modal>

            <div className="p-[5%]">
                <div className="flex justify-between">
                    <h1 className="font-Lexend text-3xl font-medium">
                        Créer un nouveau deck
                    </h1>
                    <div className="space-x-3">
                        <button
                            className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                            onClick={handleFinish} type="button"
                        >
                            Créer
                        </button>
                        <button
                            className="bg-gray-400 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                            type="button"
                        >
                            Annuler
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-5 my-[5%]">
                    <input
                        className="bg-white font-Lexend p-3 rounded-sm"
                        onBlur={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="Entrez un titre"
                        style={{color: "#626380"}}
                        type="text"
                    />

                    <div className="flex space-x-5">
            <textarea
                className="grow bg-white font-Lexend p-3 rounded-sm resize-none"
                onBlur={(e) => {
                    setDescr(e.target.value);
                }}
                placeholder="Ajouter une description"
                style={{color: "#626380"}}
            />

                        <div className="grow flex flex-col space-y-5">
                            <input
                                className="bg-white font-Lexend p-3 rounded-sm"
                                onBlur={(e) => {
                                    setTags(e.target.value.split(" "));
                                }}
                                placeholder="Entrez des tags"
                                style={{color: "#626380"}}
                                type="text"
                            />
                            <input
                                className="bg-white font-Lexend p-3 rounded-sm"
                                onChange={(e) => {
                                    setDate(e.target.valueAsDate);
                                }}
                                placeholder="Choisissez une date limite"
                                style={{color: "#626380"}}
                                type="date"
                            />

                            <div className="flex justify-between">
                                <div className="flex space-x-3">
                                    <input
                                        onChange={() => {
                                            setIsEduc(!isEduc);
                                        }}
                                        type="checkbox"
                                    />
                                    <p>Deck éducatif</p>
                                </div>
                                <div className="flex space-x-3">
                                    <input
                                        onChange={() => {
                                            setIsPriv(!isPriv);
                                        }}
                                        type="checkbox"
                                    />
                                    <p>Deck privé</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            Créer
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Page;
