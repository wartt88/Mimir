"use client";
import { useEffect, useState } from "react";
import type Card from "../../models/card";

export default function ReponseCard({
  card,
  correct,
  type,
}: {
  card: Card;
  correct: boolean | undefined;
  type: string;
}): JSX.Element {
  const [faceFront, setFaceFront] = useState(true);
  const [color,setColor] = useState("shadow-[0_0_23px_0_rgba(0,0,0,0.5)]")

  function handleClick(): void {
    if(correct !== undefined || type==="gradient")
      setFaceFront(!faceFront);
  }

  useEffect(()=>{
    setFaceFront(true);
    let newColor = "shadow-[0_0_23px_0_rgba(0,0,0,0.5)]";
    if (correct === false) newColor = "shadow-[0_0_23px_0_rgba(255,0,0,0.5)]";
    if (correct) newColor = "shadow-[0_0_23px_0_rgba(22,157,0,0.5)]";
    setColor(newColor);
  },[correct]);

  return (
    <div className="h-[50%] perspective w-full">
      <div
        className="relative size-full box-inner  "
        style={faceFront ? { transform: "rotateY(180deg)" } : {}}
      >
        <button
          className={`bg-white ${color} rounded-lg text-center items-center flex size-full box-back`}
          onClick={handleClick}
          type="button"
        >
          <div className={`text-2xl font-medium w-full ${faceFront?"hidden":""}`}>
            <p>{card.answer}</p>
          </div>
        </button>
        <button
          className={`bg-white ${color} rounded-lg text-center flex flex-col size-full box-front`}
          onClick={handleClick}
          type="button"
        >
          <div className="flex-grow text-2xl font-medium flex justify-center items-center w-full">
            <p>{card.question}</p>
          </div>
          <div className={`bg-[#11007A] text-white rounded-b-lg h-[8%] flex items-center justify-center w-full ${correct !== undefined || type==="gradient"?"":"hidden"}`}>
            <p>Cliquez sur la carte pour la retourner</p>
          </div>
        </button>
      </div>
    </div>
  );
}
