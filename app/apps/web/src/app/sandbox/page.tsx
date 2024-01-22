"use client"
import {DeckUIPerso, DeckUIPublic} from "../../components/ui/deck";
import Menu from "../../components/ui/menu";
import { Contact } from "../../components/ui/user";

export default function Page() : JSX.Element {

    return (
        <div className="w-[100%] place-content-center">
            <div className="flex items-center justify-center">
                <DeckUIPerso />
                <DeckUIPerso />
                <DeckUIPerso />
            </div>
            <div className="flex items-center justify-center">
                <DeckUIPublic />
                <DeckUIPublic />
                <DeckUIPublic />
            </div>
            <div className="place-content-center">
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
    )
}