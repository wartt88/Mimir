"use client"
import { DeckUIPerso } from "../../components/ui/deck";
import Image from "next/image";
import Link from "next/link";

export default function Page(): JSX.Element {
    return(
        <div className="w-[90%] size-full">
            <div className="flex justify-between w-[100%] my-20">
              <p className="font-bold font-Lexend text-3xl grow">Mes decks</p>
              <Link href="/newDeck" className="flex items-center bg-slate-300 p-2 rounded-md">
                <Image
                  alt="Editer"
                  className=""
                  width={20}
                  height={20}
                  src="addBlack.svg"
                />
                <p className="font-Lexend text-xl ml-2">Créer un nouveau deck</p>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                <DeckUIPerso/>
                <DeckUIPerso/>
                <DeckUIPerso/>
                <DeckUIPerso/>
                <DeckUIPerso/>
                <DeckUIPerso/>               
            </div>
        </div>

    );
};