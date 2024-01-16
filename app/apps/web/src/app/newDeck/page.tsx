"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDeck } from "../api/fake-data";
import type Card from "../models/card";

export default function Page(): JSX.Element {
  const router = useRouter();
  const elements: JSX.Element[] = [];
  const deck = getDeck();
  const cartes = deck.cards;

  function HandleConfirm(): void {
    //TODO validation du deck et ajout à sa collection
    router.push("/newDeck/confirm");
  }

  function HandleDeleteAll(): void {
    //TODO
  }

  function HandleDelete():void {
    //TODO
  }

  cartes.forEach((c, i) => {
    elements.push(CardPreview(c, i, HandleDelete));
  });

  if (elements.length === 0) {
    elements.push(EmptyCards());
  }

  return (
    <div
      className="
     bg-gray-100 size-2/3 border-gray
        flex text-black flex-col items-center justify-center gap-[10vh]"
    >
      <div className="flex flex-col w-2/3 items-center justify-around overflow-scroll scrollbar-hide gap-[2vh]">
        <div className="grid grid-cols-4 grid-rows-2 items-center justify-center text-2xl font-semibold gap-y-[2vh]">
          <div className="flex flex-col col-span-2 ">
            <label htmlFor="deckName">
              Nom du deck
            </label>
            <input className="px-2 py-1" id="deckName" type="text" />
          </div>
          <label className="text-center" htmlFor="educatifCheck">
            Educatif
          </label>
          <input className="size-[3vh]" id="educatifCheck" type="checkbox" />
          <div className="flex flex-col col-span-2">
            <label  htmlFor="tagsIn">
              Tags
            </label>
            <input className="px-2 py-1" id="tagsIn" type="text" />
          </div>
          <label className="text-center" htmlFor="privateCheck">
            Private
          </label>
          <input className="size-[3vh]" id="privateCheck" type="checkbox" />
        </div>
        <hr className="w-full border-black" />
        <div className="w-3/4 flex flex-col gap-y-[1vh]">
          <div className="flex">
            <h3 className="text-2xl font-semibold">Liste des cartes : </h3>
            <div className="flex-1" />
            <Link href="/newDeck/card">
              <Image alt="" className="size-[3vh]" height={20} src="add.svg" width={20} />
            </Link>
            <button onClick={HandleDeleteAll} type="button">
              <Image alt="" className="size-[3vh]" height={20} src="trash.svg" width={20}/>
            </button>
          </div>
          <div className="flex flex-col gap-y-[0.2vh]">{elements}</div>
        </div>
      </div>
      <button
        className="p-2 w-1/3 h-[6vh] bg-sky-700 text-white rounded-md col-span-2 text-2xl font-semibold"
        onClick={HandleConfirm}
        type="button"
      >
        Valider
      </button>
    </div>
  );
}

function CardPreview(c: Card, index: number, HandleDelete :()=>void): JSX.Element {
  return (
    <div className="flex items-center gap-2 bg-white border-gray justify-between px-2" key={c.id}>
      <Link
        className="flex justify-between w-[90%] h-10 items-center"
        href={{ pathname: "/newDeck/card", query: { id: c.id } }}
        key={c.id}
      >
        <p>{index}</p>
        <p className="w-1/2 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {c.question}
        </p>
        <p>palier : {c.palier}/5</p>
      </Link>
      <button className="p-1 bg-red-600 rounded-full size-6" onClick={HandleDelete} type="button">
        <Image alt="" height={20} src="close.svg" width={20} />
      </button>
    </div>
  );
}

function EmptyCards(): JSX.Element {
  return <div className="text-gray-600">Ce deck ne contient pas encore de cartes ...</div>;
}
