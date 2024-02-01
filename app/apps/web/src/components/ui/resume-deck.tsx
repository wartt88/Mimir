import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Resultat } from "../../models/card";
import type { DeckInterface } from "../../models/deck";
import { fetchDecks, fetchMajDeck } from "../../models/deck-requests";
import Vignette from "./vignette";
import Loader from "./loader";
import { DeckListView } from "./deck-list";
import { useSession } from "next-auth/react";
import { fetchCurrentUser } from "../../models/userRequests.ts";

interface ResumeDeckProps {
  deck:DeckInterface,
  resultats: Resultat[];
  time: number;
}

export default function ResumeDeck({
  deck,
  resultats,
  time,
}: ResumeDeckProps): JSX.Element {
  const router = useRouter();
  const [loaded,setLoaded] = useState(false);
  const [decks, setDecks] = useState<DeckInterface[]>([]);
  
  const timer = new Date(Date.now() - time);
  const timerVisu = `${
    timer.getHours() > 1 ? `${timer.getHours() - 1}h` : ""
  } ${timer.getMinutes()}m ${timer.getSeconds()}s`;
  const bonnes = resultats.filter((v) => v.succes).length;
  const mauvaises = resultats.length - bonnes;

  function handleAgain():void {
    window.location.reload();
  }

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        //TODO un fetch pour chaque type de deck
        const d: DeckInterface[] = await fetchDecks();
        // const user:UserInterface = await fetchCurrentUser();

        setDecks(d);
        setLoaded(true);
      })();
    }
  }, []);

  function handlePalierUp():void {
    deck.cards.map((card)=>{if(card.proficency<5){card.proficency = card.proficency+1} return card})
    fetchMajDeck(deck);
    router.push("/decks");
  }

  return (
    <div className="flex w-[90%] items-center justify-center">
      {loaded? 
      <div className="w-full flex flex-col py-[5vh] gap-[5vh] xl:gap-[10vh]">
      <div className="flex w-full justify-between items-center">
        <h2 className="font-medium text-4xl font-Lexend">
          Bravo ! vous avez complété le deck
        </h2>
        <Image alt="" height={200} src="festif.svg" width={200} />
      </div>
      <div className="flex w-full justify-between font-medium font-Lexend text-xl gap-[3vh] flex-col lg:flex-row">
        <div className="flex flex-col gap-[2vh]">
          <h2 className="self-start">Votre progression</h2>
          <div className="flex flex-wrap gap-[2vw] justify-center">
            <Vignette
              image="false.svg"
              text={`${mauvaises} ${
                mauvaises === 1 ? "mauvaise réponse" : "mauvaises réponses"
              }`}
            />
            <Vignette
              image="true.svg"
              text={`${bonnes} ${
                bonnes === 1 ? "bonne réponse" : "bonnes réponses"
              }`}
            />
            <Vignette image="timeBlk.svg" text={timerVisu} />
          </div>
        </div>
        <div className="flex flex-col gap-[2vh]">
          <h2>Que voulez-vous faire ?</h2>
          <div className="flex flex-wrap gap-[2vw] justify-center">
            <Vignette action={handlePalierUp} image="plus1.svg" text="Augmenter le palier"/>
            <Vignette action={handleAgain} image="again.svg" text="Recommencer" />
          </div>
        </div>
        <div id="justForRender" />
      </div>
      <div className="w-full  flex flex-col items-center gap-[2vh]">
        <h2 className="text-2xl font-medium font-Lexend self-start">
          On vous recommande ces decks
        </h2>
        <div className="w-[90%]">
        <DeckListView
          decks={decks}
          txtEmpty="recommandés"
          type="public"
        />
        </div>
      </div>
      </div>
      :<Loader/>}
    </div>
  );
}
