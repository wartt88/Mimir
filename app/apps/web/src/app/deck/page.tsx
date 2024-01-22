"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { Progress } from "../../components/ui/progress";
import CardView from "../../components/ui/card-view";
import type Card from "../../models/card";
import CardPreview from "../../components/ui/card-preview";
import type { DeckInterface } from "../../models/deck";
import Loader from "../../components/ui/loader";

interface Resultat {
  carte: Card;
  succes: boolean;
}

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const router = useRouter();

  const [deck, setDeck] = useState<DeckInterface | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  const [aRepondre, setARepondre] = useState<Card[]>([]);
  const cartesPassees: Resultat[] = useMemo(() => [], []);

  useEffect(() => {
    if (!loaded) {
      fetch(`/api/deck/${params.get("deck")}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((d: DeckInterface) => {
          setLoaded(true);
          setDeck(d);
          setARepondre(d.cards.filter((carte) => isValid(carte)));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  function HandleClick(carte: Card, succes: boolean): void {
    console.log("id: "+carte.id + " | tmp : "+carte.lastSeen.toDateString());
    aRepondre.shift();
    cartesPassees.push({ carte, succes });
    console.log(cartesPassees);
    const tmp = aRepondre.slice();
    const newArray = deck?.cards.filter((item) => item.id !== carte.id);
    newArray?.push(carte);
    deck.cards = newArray;

    console.log(deck);
    //TODO deck.save() ou je ne sais quoi
    fetch(`/api/deck/${params.get("deck")}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deck),
    }).catch((err) => {
      console.error(err);
    });
    setARepondre(tmp);
  }
  const nbReussies = cartesPassees.filter((e) => e.succes).length;

  function HandleFinish(): void {
    // TODO mettre à jour les stats
    router.push("/");
  }

  return loaded ? (
    <div
      className="
     bg-gray-100 size-2/3 border-gray
        flex m-auto items-center text-black justify-center"
    >
      {aRepondre.length > 0 ? (
        <CardView
          activation={HandleClick}
          carte={aRepondre[0]}
          key={aRepondre[0].id}
        />
      ) : (
        <div className="w-2/3 h-3/4 flex flex-col justify-between ">
          <h2 className="text-3xl font-semibold"> Resultats : {deck?.title}</h2>
          <div>
            <h2>
              cartes reussies : {nbReussies}/{cartesPassees.length}
            </h2>
            <Progress
              className="border-2 border-blue-500"
              value={(nbReussies * 100) / cartesPassees.length}
            />
          </div>
          <div className="flex flex-col overflow-y-scroll h-3/5 gap-y-[1vh]">
            {cartesPassees.map((e) => (
              <CardPreview carte={e.carte} key={e.carte.id} succes={e.succes} />
            ))}
          </div>
          <button
            className="bg-blue-500 rounded-sm h-[3vh] w-1/3 self-center text-white text-xl font-semibold"
            onClick={HandleFinish}
            type="button"
          >
            Terminer
          </button>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
}

function isValid(carte: Card): boolean {
  const dateAcomparer: Date = new Date(carte.lastSeen);

  switch (carte.proficency) {
    case 1:
      dateAcomparer.setDate(dateAcomparer.getDate() + 1);
      break;
    case 2:
      dateAcomparer.setDate(dateAcomparer.getDate() + 3);
      break;
    case 3:
      dateAcomparer.setDate(dateAcomparer.getDate() + 7);
      break;
    case 4:
      dateAcomparer.setDate(dateAcomparer.getDate() + 14);
      break;
    case 5:
      dateAcomparer.setMonth(dateAcomparer.getMonth() + 1);
      break;
  }
  return dateAcomparer.getTime() < Date.now();
}
