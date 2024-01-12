"use client"

import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {

    const router = useRouter();
    
    function HandleCancel(){
        //TODO
        router.push("/newDeck");
    }

    function HandleAdd(){
        //TODO
        router.push("/newDeck");
    }

  return (
    <div
      className="bg-gray-100 size-2/3 border-gray 
           flex flex-col gap-[1vh] px-[10dvw] text-xl font-semibold justify-around "
    >
      <div className="flex w-full h-1/3">
        <label htmlFor="txtQuestion" className="text-center w-1/3 underline underline-offset-2">Question : </label>
        <textarea
          id="txtQuestion"
          className="resize-none rounded-lg w-2/3"
        ></textarea>
      </div>
      <div className="flex w-full h-1/3">
        <label htmlFor="txtAnswer" className="text-center w-1/3 underline underline-offset-2">Réponse : </label>
        <textarea
          id="txtAnswer"
          className="resize-none rounded-lg w-2/3"
        ></textarea>
      </div>
      <div className="flex w-full items-center justify-center gap-x-[4vw] mb-[4vh] text-3xl">
        <button className="bg-blue-500 text-white border-blue-500 border-4 py-2 px-20 rounded-xl" onClick={HandleAdd}>Ajouter</button>
        <button className="bg-white border-4 border-blue-500 text-blue-500 py-2 px-20 rounded-xl" onClick={HandleCancel}>Annuler</button>
      </div>
    </div>
  );
}
