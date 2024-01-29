"use client";
import { useState } from "react";
import type Card from "../../models/card";

export default function ReponseCard({ card , correct, type}: { card: Card ,correct:boolean|undefined, type:string}): JSX.Element {
  const [faceFront, setFaceFront] = useState(true);

  function handleClick(): void {
    setFaceFront(!faceFront);
  }

  let color = "#00000088";
  if(correct===false)
    color="#D4000088";
  if(correct)
    color="#21990088"

  return (
    <div className="h-[50%] perspective w-full">
      <div
        className="relative size-full box-inner  "
        style={faceFront ? { transform: "rotateY(180deg)" } : {}}
      >
        <button
          className={`bg-white shadow-[0_0_23px_0_${color}] rounded-lg text-center items-center flex size-full box-back`}
          onClick={handleClick}
          type="button"
        >
          <div className="text-2xl font-medium w-full">
            <p>{card.answer}</p>
          </div>
        </button>
        <button
          className={`bg-white shadow-[0_0_23px_0_${color}] rounded-lg text-center flex flex-col size-full box-front`}
          onClick={handleClick}
          type="button"
        >
          <div className="flex-grow text-2xl font-medium flex justify-center items-center w-full">
            <p>{card.question}</p>
          </div>
          <div className="bg-[#11007A] text-white rounded-b-lg h-[8%] flex items-center justify-center w-full">
            <p>Cliquez sur la carte pour la retourner</p>
          </div>
        </button>
      </div>
    </div>
  );
}
