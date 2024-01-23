"use client"
import Image from "next/image";
import Link from "next/link";
import DeckUI from "../../components/ui/deck";

export default function Page(): JSX.Element {
    return(
        <div className="w-[90%] size-full">
            <div className="flex justify-between w-[100%] my-20">
              <p className="font-bold font-Lexend text-3xl grow">Mes decks</p>
              <Link className="flex items-center bg-slate-300 p-2 rounded-md" href="/newDeck">
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
            <div className="flex flex-wrap gap-3 justify-center">
                <DeckUI type="public"/>
                <DeckUI type="perso"/>
                <DeckUI type="perso"/>
            </div>
        </div>

    );
};