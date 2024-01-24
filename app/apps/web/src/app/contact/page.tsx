"use client"

import {type ChangeEvent, useState} from "react";
import UserPreviewGen from "../../components/ui/user-preview-gen";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";
import ResearchBar from "../../components/ui/research-bar.tsx";

interface User {
    id: number;
    nickname: string;
    nom: string;
    prenom: string;
    deck: string[];
    contacts: User[];
}

// fake data
const userMocked = {
    username: "julio",
    email: "j@g",
    password: "beaucoupdechainedecaractere",
    firstName: "Jules",
    lastName: "Hirtz",
    decks: [],
    following: 0,
    followers: 0,
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
    const [contactAffich, setContactAffich] = useState(userMocked.contacts);

    function HandleChange(event: ChangeEvent): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        setContactAffich(
            userMocked.contacts.filter(
                (e) =>
                    e.nom.toLowerCase().includes(input.value.toLowerCase()) ||
                    e.prenom.toLowerCase().includes(input.value.toLowerCase())
            )
        );
    }

    return (
        <div className="size-full">
            <div className="p-[5vh]">
                <h1 className="font-Lexend text-3xl font-medium">Vos contacts</h1>
                <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
                    <ResearchBar onChange={HandleChange}/>
                    <div className="w-full space-y-[5vh]">
                        <UserPreviewGen user={userMocked}/>
                        <UserPreviewGen user={userMocked}/>
                        <UserPreviewGen user={userMocked}/>
                        <UserPreviewGen user={userMocked}/>
                        <UserPreviewGen user={userMocked}/>
                        <UserPreviewGen user={userMocked}/>
                    </div>
                </div>
            </div>
        </div>
    );
}