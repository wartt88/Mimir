import Image from "next/image";
import type { Resultat } from "../../models/card";
import type { DeckInterface } from "../../models/deck";

interface ResumeDeckProps {
  deck: DeckInterface;
  resultats: Resultat[];
}

export default function ResumeDeck({
  deck,
  resultats,
}: ResumeDeckProps): JSX.Element {
  return (
    <div className="w-[90%] py-[5vh]">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-4xl font-Lexend">
          Bravo ! vous avez complété le deck
        </h2>
        <Image alt="" height={200} src="festif.svg" width={200} />
      </div>
      <div className="flex w-[85%] ">
        <div>Votre progression</div>
        <div>Que voulez-vous faire ?</div>
      </div>
      <div>recommandations</div>
    </div>
  );
}
