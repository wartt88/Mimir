"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getDeck } from "../api/fake-data";
import type Card from "../../models/card";
import CardEdit from "../../components/ui/card-edit";

interface Etat {
  carte: Card|undefined;
  new: boolean;
}

export default function Page(): JSX.Element {
  const router = useRouter();
  const param = useSearchParams();
  let type: undefined | Etat;
  const [currentCard, setCurrentCard] = useState(type);
  const [cartes, setCartes] = useState<Card[]>([]);
  const deckId = param.get("deck");
  const deck = getDeck();

  if (deckId ) cartes.push(...deck.cards);

  function HandleConfirm(): void {
    //TODO validation du deck et ajout à sa session avant confirmation
    router.push("/newDeck/confirm");
  }

  function HandleDeleteAll(): void {
    setCartes([]);
  }

  function HandleDelete(c:Card): void {
    setCartes(cartes.filter(e=>e.question!==c.question));
  }
  function HandleSave(c:Card,newer:boolean): void {
    if(!newer && typeof currentCard?.carte !== "undefined"){
      cartes.splice(cartes.indexOf(currentCard.carte),1);
    }
    cartes.push(c);
    setCartes(cartes);
    setCurrentCard(undefined);
  }

  function HandleCancel(): void {
    setCurrentCard(undefined);
  }
  function HandleSelect(carte: Card): void {
    setCurrentCard({ carte, new: false });
  }
  function HandleNewer():void {
    setCurrentCard({carte:undefined,new:true});
  }

  return (
    <div className="size-full flex justify-center items-center">
      { typeof currentCard !== "undefined" ? (
        <CardEdit cancel={HandleCancel} carte={currentCard.carte} newer={currentCard.new} valid={(c:Card,b:boolean)=>{HandleSave(c,b)}}/>
      ) : (
        <div
          className="
     bg-gray-100 h-2/3 w-2/3 border-gray
        flex text-black flex-col items-center justify-center gap-[4vh]"
        >
          <div className="flex flex-col w-2/3 items-center justify-around gap-[2vh]">
            <div className="grid grid-cols-4 grid-rows-2 items-center justify-center text-2xl font-semibold gap-y-[2vh]">
              <div className="flex flex-col col-span-2 ">
                <label htmlFor="deckName">Nom du deck</label>
                <input
                  className="px-2 py-1 font-normal text-lg"
                  defaultValue={deckId ? deck.title : ""}
                  id="deckName"
                  type="text"
                />
              </div>
              <label className="text-center" htmlFor="educatifCheck">
                Educatif
              </label>
              <input
                className="size-[3vh]"
                defaultChecked={deckId ? deck.isEducative : false}
                id="educatifCheck"
                type="checkbox"
              />
              <div className="flex flex-col col-span-2">
                <label htmlFor="tagsIn">Description</label>
                <input
                  className="px-2 py-1 font-normal text-lg"
                  defaultValue={deckId ? deck.descr : ""}
                  id="descrIn"
                  type="text"
                />
              </div>
              <label className="text-center" htmlFor="privateCheck">
                Private
              </label>
              <input
                className="size-[3vh]"
                defaultChecked={deckId ? deck.isPublic : false}
                id="privateCheck"
                type="checkbox"
              />
            </div>
            <hr className="w-full border-black" />
            <div className="w-3/4 flex flex-col gap-y-[1vh]">
              <div className="flex">
                <h3 className="text-2xl font-semibold">Liste des cartes : </h3>
                <div className="flex-1" />
                <button onClick={HandleNewer} type="button">
                  <Image
                    alt=""
                    className="size-[3vh]"
                    height={20}
                    src="add.svg"
                    width={20}
                  />
                </button>
                <button onClick={HandleDeleteAll} type="button">
                  <Image
                    alt=""
                    className="size-[3vh]"
                    height={20}
                    src="trash.svg"
                    width={20}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-y-[0.2vh] overflow-y-scroll scrollbar-hide h-[27vh]">
                {cartes.length > 0 ? (
                  cartes.map((e, index) => (
                    <CardPreview
                      c={e}
                      index={index}
                      key={index}
                      selection={HandleSelect}
                      suppression={HandleDelete}
                    />
                  ))
                ) : (
                  <EmptyCards />
                )}
              </div>
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
      )}
    </div>
  );
}

function CardPreview({
  c,
  index,
  suppression,
  selection,
}: {
  c: Card;
  index: number;
  suppression: (carte:Card) => void;
  selection: (carte: Card) => void;
}): JSX.Element {
  function HandleClick(): void {
    selection(c);
  }
  function HandleDelete():void{
    suppression(c);
  }

  return (
    <div
      className="flex items-center gap-2 bg-white border-gray justify-between px-2"
      key={c.id}
    >
      <button
        className="flex justify-between w-[90%] h-10 items-center"
        onClick={HandleClick}
        type="button"
      >
        <p>{index}</p>
        <p className="flex w-1/2 text-ellipsis whitespace-nowrap overflow-hidden items-center">
          {c.question}
        </p>
        <p>palier : {c.palier}/5</p>
      </button>
      <button
        className="p-1 bg-red-600 rounded-full size-6"
        onClick={HandleDelete}
        type="button"
      >
        <Image alt="" height={20} src="close.svg" width={20} />
      </button>
    </div>
  );
}

function EmptyCards(): JSX.Element {
  return (
    <div className="text-gray-600">
      Ce deck ne contient pas encore de cartes ...
    </div>
  );
}
