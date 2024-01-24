"use client"

import {type ChangeEvent, useEffect, useState} from "react";
import UserPreviewGen from "../../components/ui/user-preview-gen";
import ResearchBar from "../../components/ui/research-bar.tsx";
import {DeckInterface} from "../../models/deck.ts";
import {fetchDecks} from "../../models/deck-requests.ts";
import DeckUI from "../../components/ui/deck-ui.tsx";
import {fetchContactCurrentUser, fetchCurrentUser} from "../../models/userRequests.ts";
import {UserInterface} from "../../models/user.ts";
import Loader from "../../components/ui/loader.tsx";

// fake data
const userMocked = {
    username: "julio",
    email: "j@g",
    password: "beaucoupdechainedecaractere",
    firstName: "Jules",
    lastName: "Hirtz",
    decks: [],
    bio: "Je suis un développeur web et un joueur de Magic.",
    profilePicture: "https//google.com",
    contacts: [
        {
            id: 2,
            nickname: "kiziow",
            nom: "Perrot",
            prenom: "Alexandre",
            deck: [],
            contacts: [],
        },
        {
            id: 3,
            nickname: "Oxswing",
            nom: "Mijatovic",
            prenom: "Yann",
            deck: [],
            contacts: [],
        },
        {
            id: 4,
            nickname: "wartt",
            nom: "Pinchon",
            prenom: "Théo",
            deck: [],
            contacts: [],
        },
        {
            id: 5,
            nickname: "test",
            nom: "Test",
            prenom: "Tset",
            deck: [],
            contacts: [],
        }
    ],
};

export default function Contact(): JSX.Element {

    function HandleChange(event: ChangeEvent<HTMLInputElement>): void {
        console.log(event.target.value);
    }

    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            void (async () => {
                const contacts = await fetchContactCurrentUser("alexandre.perrot54@gmail.com");
                const jsxElements = contacts.map((e) => {
                    return <UserPreviewGen user={e} key={e._id}/>
                })
                setElements(jsxElements)
                setLoaded(true);
            })();
        }
    }, []);

    return (
        <div className="size-full">
            <div className="p-[5vh]">
                <h1 className="font-Lexend text-3xl font-medium">Vos contacts</h1>
                <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
                    <ResearchBar onChange={HandleChange}/>
                    {loaded ?
                        <div className="w-full space-y-[5vh]">{elements}</div>
                        :
                        <div className="h-[70%] flex items-center justify-center"><Loader/></div>
                    }
                </div>
            </div>
        </div>

    );
}