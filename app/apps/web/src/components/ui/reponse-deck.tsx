import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Resultat } from "../../models/card";
import type Card from "../../models/card";
import type { DeckInterface } from "../../models/deck";
import { fetchMajDeck } from "../../models/deck-requests";
import { verifyAnswer } from "../../models/answer-requests.ts";
import type { UserInterface } from "../../models/user.ts";
import { fetchCurrentUser } from "../../models/user-requests.ts";
import ReponseCard from "./reponse-card";
import ReponseForm from "./reponse-form";

interface ReponseDeckProps {
  deck: DeckInterface;
  putResultats: (res: Resultat[]) => void;
  setDeck: (deck: DeckInterface) => void;
}

export default function ReponseDeck({
  deck,
  putResultats,
  setDeck,
}: ReponseDeckProps): JSX.Element {
  const [currentDeck, setCurrentDeck] = useState<DeckInterface>(deck);
  const [aRepondre, setARepondre] = useState<Card[]>(currentDeck.cards);
  const [cartesPassees, setCartesPassees] = useState<Resultat[]>([]);
  const [reponse, setReponse] = useState<string[]>([]);
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const { data: session } = useSession();
  const [user, setUser] = useState<UserInterface>();

  // Permet de récupérer le user
  useEffect(() => {
    if (!user && session?.user?.email) {
      void (async () => {
        if (session.user?.email) {
          const res = await fetchCurrentUser(session.user.email);
          setUser(res);
        }
      })();
    }
  }, [session, user]);

  // TODO choisir le type de reponse je ne sais pas encore comment
  const type = (): "ia" | "input" | "gradient" => {
    if (aRepondre.length % 3 === 0) return "ia";
    if (aRepondre.length % 2 === 0) return "input";
    return "gradient";
  };
  // * input | ia | gradient

  async function handleValid(): Promise<void> {
    if (correct === undefined)
      setCorrect(await verifierReponse(aRepondre[0], reponse));
    else {
      const carte = aRepondre[0];
      const userCard = carte.users.filter(
        (item) => item.user_id === user?._id.toString()
      );
      // Créer un nouvel élément si l'user n'a pas encore complété le deck
      if (userCard.length === 0 && user)
        userCard[0] = {
          user_id: user._id.toString(),
          proficency: 0,
          lastSeen: new Date(),
          answers: [],
        };
      // Si l'user est liée à la carte
      if (userCard[0]) {
        // Ajoute le booléen de la carte courante
        userCard[0].answers.push(correct);
        carte.users = carte.users.filter(
          (item) => item.user_id !== user?._id.toString()
        );
        carte.users.push(userCard[0]);
      }
      aRepondre.shift();
      cartesPassees.push({ carte, succes: correct });
      setCartesPassees(cartesPassees);
      const newArray = currentDeck.cards.filter((item) => item.id !== carte.id);
      const tmp = aRepondre.slice();
      // Gestion du suivi si on appuie sur le bouton palier à la fin
      newArray.push(carte);
      currentDeck.cards = newArray;
      setCurrentDeck(currentDeck);
      fetchMajDeck(currentDeck);
      setARepondre(tmp);
      setCorrect(undefined);

      //s il n y a plus de cartes alors on renvoie les resultats et on affiche le résumé
      if (tmp.length === 0) {
        putResultats(cartesPassees);
        setDeck(currentDeck);
      }
    }
  }

  function handleQuit(): void {
    putResultats(cartesPassees);
    setDeck(currentDeck);
  }

  return (
    <div className=" w-5/6 my-[5vh] flex flex-col justify-around h-[90vh] items-center">
      <div className="flex justify-between font-medium text-3xl font-Lexend w-full">
        <h2>{deck.title}</h2>
        <h2>{`${cartesPassees.length + 1}/${
          aRepondre.length + cartesPassees.length
        }`}</h2>
      </div>
      <ReponseCard card={aRepondre[0]} correct={correct} type={type()} />
      <ReponseForm
        correct={correct}
        reponse={reponse}
        setReponse={setReponse}
        type={type()}
      />
      <div className="flex w-1/3 justify-around font-semibold text-xl text-white h-[5vh]">
        <button
          className="bg-blue-500 rounded-[10px] px-10"
          onClick={() => {
            handleValid().catch((err) => {
              err;
            });
          }}
          type="button"
        >
          {correct === undefined ? "Valider" : "Continuer"}
        </button>
        <button
          className="bg-gray-400 rounded-[10px] px-10"
          onClick={handleQuit}
          type="button"
        >
          Quitter
        </button>
      </div>
    </div>
  );
}

async function verifierReponse(
  card: Card,
  reponse: string[]
): Promise<boolean> {
  let retour: boolean;
  switch (reponse[1]) {
    case "input":
      retour = card.answer === reponse[0];
      break;
    case "ia":
      retour = await verifyAnswer(card.answer, reponse[0]);
      break;
    case "gradient":
      retour = parseInt(reponse[0]) > 60;
      break;
    default:
      retour = false;
  }
  return retour;
}
