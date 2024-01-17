"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Progress } from "../../components/ui/progress";
import CardView from "../../components/ui/card-view";
import { getDeck } from "../api/fake-data";
import type Card from "../../models/card";
import CardPreview from "../../components/ui/card-preview";

interface Resultat {
  carte: Card;
  succes: boolean;
}

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const router = useRouter();

  let idDeck = Number(params.get("deck"));
  if (isNaN(idDeck)) idDeck = 1;

  const deck = getDeck(); // avec id

  const [aRepondre, setARepondre] = useState(
    deck.cards.filter((carte) => isValid(carte))
  );
  const cartesPassees: Resultat[] = useMemo(() => [], []);

  function HandleClick(carte: Card, succes: boolean): void {
    aRepondre.shift();
    cartesPassees.push({ carte, succes });
    console.log(cartesPassees);
    const tmp = aRepondre.slice();
    const newArray = deck.cards.filter((item) => item.id !== carte.id);
    newArray.push(carte);
    deck.cards = newArray;
    //TODO deck.save() ou je ne sais quoi
    setARepondre(tmp);
  }
  const nbReussies = cartesPassees.filter((e) => e.succes).length ;

  function HandleFinish():void{
    // TODO mettre à jour les stats 
    router.push("/");
  };


  return (
    <div
      className="
     bg-gray-100 size-2/3 border-gray
        flex m-auto items-center text-black justify-center"
    >
      {aRepondre.length > 0 ? (
        <CardView
          activation={HandleClick}
          carte={aRepondre[0]}
          key={aRepondre[0].id}
        />
      ) : (
        <div className="w-2/3 h-3/4 flex flex-col justify-between ">
          <h2 className="text-3xl font-semibold"> Resultats : {deck.title}</h2>
          <div>
            <h2>cartes reussies : {nbReussies}/{cartesPassees.length}</h2>
            <Progress className="border-2 border-blue-500"
              value={
                (nbReussies * 100) /
                cartesPassees.length
              }
            />
          </div>
          <div className="flex flex-col overflow-y-scroll h-3/5 gap-y-[1vh]">
            {cartesPassees.map((e) => (
              <CardPreview carte={e.carte} key={e.carte.id} succes={e.succes} />
            ))}
          </div>
          <button className="bg-blue-500 rounded-sm h-[3vh] w-1/3 self-center text-white text-xl font-semibold" onClick={HandleFinish} type="button">Terminer</button>
        </div>
      )}
    </div>
  );
}

function isValid(carte: Card): boolean {
  const dateAcomparer: Date = carte.derniereRevision;
  switch (carte.palier) {
    case 1:
      dateAcomparer.setDate(dateAcomparer.getDate() + 1);
      break;
    case 2:
      dateAcomparer.setDate(dateAcomparer.getDate() + 3);
      break;
    case 3:
      dateAcomparer.setDate(dateAcomparer.getDate() + 7);
      break;
    case 4:
      dateAcomparer.setDate(dateAcomparer.getDate() + 14);
      break;
    case 5:
      dateAcomparer.setMonth(dateAcomparer.getMonth() + 1);
      break;
  }
  return dateAcomparer.getTime() < Date.now();
}
