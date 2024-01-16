"use client";
import { useSearchParams } from "next/navigation";
import { getCard } from "../api/fake-data";
import type Card from "../models/card";

export default function Page(): JSX.Element {
  const params = useSearchParams();

  // accès à la bd depuis l'id du deck
  //const {Id,Title,Cards} = props;
  const idCard = Number(params.get("card"));
  let idDeck = Number(params.get("deck"));
  let carte: Card | undefined = getCard(1, 0);
  if (isNaN(idDeck)) idDeck = 1;
  if (!isNaN(idCard)) {
    carte = getCard(idDeck, idCard - 1);
  }

  function HandleClick():void {
    //TODO
  }

  return (
    <div
      className="
     bg-gray-100 size-2/3 border-gray
        flex m-auto items-center text-black justify-center"
    >
      <div className="flex flex-col items-start my-auto gap-y-[1.5vh] w-10/12 h-2/3">
        <h3 className=" w-full text-3xl">Question :</h3>
        <input
          className=" text-lg w-full row"
          readOnly
          value={carte?.question}
        />
        <h3 className=" w-full text-3xl">Réponse :</h3>
        <textarea
          className="text-lg w-full h-1/4 resize-none p-2"
          placeholder="Votre réponse ici !"
        />
        <button
          className="m-auto mt-2 p-2 w-2/6 bg-sky-700 text-white rounded-md"
          onClick={HandleClick}
          type="button"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
