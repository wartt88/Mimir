"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Card {
  id_card: number;
  question: string;
  reponse: string;
  palier: number;
  derniereRevision: number;
}

//fake data
let cartes: Card[] = [
  {
    id_card: 1,
    question: "Allons-nous réussir ?zekfbkzefbzebfjzbffljzelknzelkfzlfnlfnerfkzefbkegfuzefuzerbhzefzerub",
    reponse: "Oui",
    palier: 5,
    derniereRevision: 1704708559,
  },
  {
    id_card: 2,
    question: "2+2 ?",
    reponse: "4",
    palier: 1,
    derniereRevision: 1704708559,
  },
  {
    id_card: 3,
    question: "Quel âge à le monde ?",
    reponse: "4,54 milliards d'années",
    palier: 1,
    derniereRevision: 1704708559,
  },
];

export default function Page(): JSX.Element {
  const router = useRouter();
  const elements: JSX.Element[] = [];

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
            <input id="deckName" type="text" className="px-2 py-1" />
          </div>
          <label className="text-center" htmlFor="educatifCheck">
            Educatif
          </label>
          <input id="educatifCheck" type="checkbox" className="size-[3vh]" />
          <div className="flex flex-col col-span-2">
            <label  htmlFor="tagsIn">
              Tags
            </label>
            <input id="tagsIn" type="text" className="px-2 py-1" />
          </div>
          <label className="text-center" htmlFor="privateCheck">
            Private
          </label>
          <input id="privateCheck" type="checkbox" className="size-[3vh]" />
        </div>
        <hr className="w-full border-black" />
        <div className="w-3/4 flex flex-col gap-y-[1vh]">
          <div className="flex">
            <h3 className="text-2xl font-semibold">Liste des cartes : </h3>
            <div className="flex-1" />
            <Link href="/newDeck/card">
              <img className="size-[3vh]" src="add.svg" alt="" />
            </Link>
            <button type="button" onClick={HandleDeleteAll}>
              <img className="size-[3vh]" src="trash.svg" alt="" />
            </button>
          </div>
          <div className="flex flex-col gap-y-[0.2vh]">{elements}</div>
        </div>
      </div>
      <button
        type="button"
        className="p-2 w-1/3 h-[6vh] bg-sky-700 text-white rounded-md col-span-2 text-2xl font-semibold"
        onClick={HandleConfirm}
      >
        Valider
      </button>
    </div>
  );
}

function CardPreview(c: Card, index: number, HandleDelete :()=>void): JSX.Element {
  return (
    <div key={c.id_card} className="flex items-center gap-2 bg-white border-gray justify-between px-2">
      <Link
        key={c.id_card}
        href={{ pathname: "/newDeck/card", query: { id: c.id_card } }}
        className="flex justify-between w-[90%] h-10 items-center"
      >
        <p>{index}</p>
        <p className="w-1/2 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {c.question}
        </p>
        <p>palier : {c.palier}/5</p>
      </Link>
      <button type="button" onClick={HandleDelete} className="p-1 bg-red-600 rounded-full size-6">
        <img src="close.svg" alt="" />
      </button>
    </div>
  );
}

function EmptyCards(): JSX.Element {
  return <div className="text-gray-600">Ce deck ne contient pas encore de cartes ...</div>;
}
