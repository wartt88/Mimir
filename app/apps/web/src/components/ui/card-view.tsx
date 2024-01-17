import { useRef, useState } from "react";
import type Card from "../../models/card";

let succes = false;

export default function CardView({
  activation,
  carte,
}: {
  activation: (carte:Card,succes:boolean) => void;
  carte: Card;
}): JSX.Element {
  const [isCorrection, setIsCorrection] = useState(false);
  const reponse = useRef<HTMLTextAreaElement>(null);
  

  function handleClick(): void {
    if (isCorrection) {
      carte.derniereRevision = new Date();
      activation(carte,succes);
      setIsCorrection(false);
      if (reponse.current) {
        reponse.current.value = '';
    }
    } else {
      setIsCorrection(true);
      succes = verifierRep();
      if (reponse.current) {
        reponse.current.value += `\n ___________________________________\nAttendu : \n ${carte.reponse}`;
      }
    }

  }

  function verifierRep(): boolean {
    console.log(carte.reponse===reponse.current?.value, carte.reponse, reponse.current?.value);
    return reponse.current?.value === carte.reponse;
  }

  return (
    <div className="flex flex-col items-start my-auto gap-y-[1.5vh] w-10/12 h-2/3">
      <h3 className=" w-full text-3xl">Question :</h3>
      <input className=" text-lg w-full row" defaultValue={carte.question} />
      <h3 className=" w-full text-3xl">Réponse :</h3>
      <textarea
        className="text-lg w-full h-1/4 resize-none p-2"
        placeholder="Votre réponse ici !"
        ref={reponse}
      />
      <div className={`w-full text-5xl font-semibold h-[5vh] flex justify-center items-center ${!isCorrection? "hidden" : ""}`}>
        {succes ? <h3 className="text-green-500">Correct</h3> : <h3 className="text-red-500">Incorrect</h3>}
      </div>
      <button
        className="m-auto mt-2 p-2 w-2/6 bg-sky-700 text-white rounded-md text-xl font-semibold"
        onClick={handleClick}
        type="button"
      >
        {isCorrection? "Suivante":"Correction" }
      </button>
    </div>
  );};
