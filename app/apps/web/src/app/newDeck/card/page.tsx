"use client"

import { useRouter, useSearchParams } from "next/navigation";

export default function Page(): JSX.Element {
    const param = useSearchParams();
    const router = useRouter();
    
    const cardId = param.get("id");

    function HandleCancel():void{
        //TODO
        router.push("/newDeck");
    }

    function HandleAdd():void{
        //TODO
        router.push("/newDeck");
    }

  return (
    <div
      className="bg-gray-100 size-2/3 border-gray 
           flex flex-col gap-[1vh] px-[10dvw] text-xl font-semibold justify-around "
    >
      <div className="flex w-full h-1/3">
        <label className="text-center w-1/3 underline underline-offset-2" htmlFor="txtQuestion">Question : </label>
        <textarea
          className="resize-none rounded-lg w-2/3"
          id="txtQuestion"
         />
      </div>
      <div className="flex w-full h-1/3">
        <label className="text-center w-1/3 underline underline-offset-2" htmlFor="txtAnswer">Réponse : </label>
        <textarea
          className="resize-none rounded-lg w-2/3"
          id="txtAnswer"
         />
      </div>
      <div className="flex w-full items-center justify-center gap-x-[4vw] mb-[4vh] text-3xl">
        <button className="bg-blue-500 text-white border-blue-500 border-4 py-2 px-20 rounded-xl" onClick={HandleAdd} type="button">Ajouter</button>
        <button className="bg-white border-4 border-blue-500 text-blue-500 py-2 px-20 rounded-xl" onClick={HandleCancel} type="button">Annuler</button>
      </div>
    </div>
  );
}
