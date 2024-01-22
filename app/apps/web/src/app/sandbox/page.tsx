"use client"
import {DeckUIPerso, DeckUIPublic} from "../../components/ui/deck";
import { Contact } from "../../components/ui/user";

export default function Page() : JSX.Element {

    return (
        <div>
            <div className="flex items-center">
                <DeckUIPerso />
                <DeckUIPerso />
                <DeckUIPerso />
            </div>
            <div className="flex items-center">
                <DeckUIPublic />
                <DeckUIPublic />
                <DeckUIPublic />
            </div>
            <div className="">
                <Contact />
            </div>
        </div>
    )
}