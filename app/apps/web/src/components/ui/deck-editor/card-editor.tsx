import Card from "../../../models/card.ts";
import {createRef, Dispatch, RefObject, SetStateAction} from "react";
import Image from "next/image";

export default function CardEditor(
    card: Card,
    cards: Card[],
    index: number,
    setCards: Dispatch<SetStateAction<Card[]>>
): JSX.Element {

    const questionRef = createRef<HTMLTextAreaElement>();
    const reponseRef = createRef<HTMLTextAreaElement>();

    const autoGrow = (ref: RefObject<HTMLTextAreaElement>): void => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    const deleteCard = (): void => {
        const newCards = cards.filter((c) => c.id !== card.id);
        setCards(newCards);
    };

    const onUnFocus = (): void => {
        const indexC = cards.indexOf(card);
        const question = questionRef.current?.value;
        card.question = question ? question : "";
        const reponse = reponseRef.current?.value;
        card.answer = reponse ? reponse : "";

        cards[indexC] = card;
        setCards(cards);
    };

    return (
        <div className="bg-white rounded-md" key={card.id}>
            <div className="flex justify-between px-5 pt-5">
                <h1 className="font-Lexend text-xl font-bold">{index}</h1>
                <div className="flex space-x-1">
                    <Image alt="" height={20} src="move.svg" width={20}/>
                    <Image
                        alt=""
                        className="cursor-pointer"
                        height={20}
                        onClick={deleteCard}
                        src="delete.svg"
                        width={20}
                    />
                </div>
            </div>
            <hr className="my-2"/>

            <div className="flex space-x-3">
                <div className="flex flex-col justify-between px-5 pb-5 grow">
          <textarea
              className="resize-none h-auto"
              defaultValue={card.question}
              onBlur={onUnFocus}
              onChange={() => {
                  autoGrow(questionRef);
              }}
              ref={questionRef}
          />
                    <hr className="border-2 border-black my-2"/>
                    <p className="font-Lexend">QUESTION</p>
                </div>
                <div className="flex flex-col justify-between px-5 pb-5 grow">
          <textarea
              className="resize-none h-auto"
              defaultValue={card.answer}
              onBlur={onUnFocus}
              onChange={() => {
                  autoGrow(reponseRef);
              }}
              ref={reponseRef}
          />
                    <hr className="border-2 border-black my-2"/>
                    <p className="font-Lexend">RÉPONSE</p>
                </div>
            </div>
        </div>
    );
}