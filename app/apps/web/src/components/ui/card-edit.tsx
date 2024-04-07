import { useRef } from "react";
import type Card from "../../models/card";

export default function CardEdit({
  carte,
  valid,
  cancel,
  newer,
}: {
  carte: Card | undefined;
  valid: (carte: Card, newer: boolean) => void;
  cancel: () => void;
  newer: boolean;
}): JSX.Element {
  const qRef = useRef<HTMLTextAreaElement>(null);
  const aRef = useRef<HTMLTextAreaElement>(null);

  function HandleAdd(): void {
    const carteResult: Card = {
      id: 0,
      question: qRef.current ? qRef.current.value.toString() : "",
      answer: aRef.current ? aRef.current.value.toString() : "",
      users: [],
    };
    valid(carteResult, newer);
  }

  return (
    <div
      className="bg-gray-100 size-2/3 border-gray 
           flex flex-col gap-[1vh] px-[10dvw] text-xl font-semibold justify-around "
    >
      <div className="flex w-full h-1/3">
        <label
          className="text-center w-1/3 underline underline-offset-2"
          htmlFor="txtQuestion"
        >
          Question :{" "}
        </label>
        <textarea
          className="resize-none rounded-lg w-2/3 p-1"
          defaultValue={carte ? carte.question : ""}
          id="txtQuestion"
          ref={qRef}
        />
      </div>
      <div className="flex w-full h-1/3">
        <label
          className="text-center w-1/3 underline underline-offset-2"
          htmlFor="txtAnswer"
        >
          Réponse :{" "}
        </label>
        <textarea
          className="resize-none rounded-lg w-2/3 p-1"
          defaultValue={carte ? carte.answer : ""}
          id="txtAnswer"
          ref={aRef}
        />
      </div>
      <div className="flex w-full items-center justify-center gap-x-[4vw] mb-[4vh] text-3xl">
        <button
          className="bg-blue-500 text-white border-blue-500 border-4 py-2 px-20 rounded-xl"
          onClick={HandleAdd}
          type="submit"
        >
          Ajouter
        </button>
        <button
          className="bg-white border-4 border-blue-500 text-blue-500 py-2 px-20 rounded-xl"
          onClick={cancel}
          type="button"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
