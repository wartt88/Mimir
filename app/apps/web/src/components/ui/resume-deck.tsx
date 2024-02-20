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
import { fetchCurrentUser, updateCurrentUser } from "../../models/userRequests.ts";
import { UserInterface } from "../../models/user.ts";

interface ResumeDeckProps {
  deck: DeckInterface;
  resultats: Resultat[];
  time: number;
}

export default function ResumeDeck({
  deck,
  resultats,
  time,
}: ResumeDeckProps): JSX.Element {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [decks, setDecks] = useState<DeckInterface[]>([]);

  const {data: session} = useSession();
  const [user, setUser] = useState<UserInterface>();

  const timer = new Date(Date.now() - time);
  const timerVisu = `${
    timer.getHours() > 1 ? `${timer.getHours() - 1}h` : ""
  } ${timer.getMinutes()}m ${timer.getSeconds()}s`;
  const bonnes = resultats.filter((v) => v.succes).length;
  const mauvaises = resultats.length - bonnes;

  function handleAgain(): void {
    window.location.reload();
  }

  useEffect(() => {
    if (session?.user?.email && !user) {
      void (async () => {
        const newUser: UserInterface = await fetchCurrentUser(session.user.email);
        setUser(newUser);
      })();
    }
  }, [session]);

  useEffect(() => {
    if (user && !loaded) {
      void (async () => {
        //TODO un fetch pour chaque type de deck
        const d: DeckInterface[] = await fetchDecks();
        setDecks(d);
        setLoaded(true);

        // Update des decks courants (Historique récent)
        user.decks = user.decks?.filter((deckId) => deckId !== deck._id);
        user.decks?.push(deck._id);
        if (user.decks?.length > 10) {
          user.decks?.shift();
        }
        updateCurrentUser(user.email, user);
        // Actualisation des cartes avec les réponses
        resultats.forEach((carteCourante) => {
          deck.cards = deck.cards.filter((e) => e.id !== carteCourante.carte.id);
          deck.cards.push(carteCourante.carte);
        })
        fetchMajDeck(deck);
      })();
    }
  }, [user]);

  function handlePalierUp(): void {
    resultats.forEach((card) => {
      // Récupère la bonne carte
      const carteCourante = deck.cards.filter((e) => e.id === card.carte.id)[0];
      // Traitement du cas de l'utilisateur
      const userCard = carteCourante.users.filter((item) => item.user_id === user._id.toString());
      // Créer un nouvel élément si l'user n'a pas encore complété le deck
      if (userCard.length === 0)
        userCard[0] = {
          user_id : user._id.toString(),
          proficency: 0,
          lastSeen: new Date(),
          answers: []
      };
      // Si l'user est liée à la carte
      if (userCard[0]) {
        // Mettre à jour les informations de l'utilisateur connecté en session
          userCard[0].lastSeen = new Date();
          if (card.succes) {
            userCard[0].proficency += 1;
          } else {
            userCard[0].proficency -= 1;
          }
          carteCourante.users = carteCourante.users.filter((item) => item.user_id !== user._id.toString());
          carteCourante.users.push(userCard[0]);
          // Supprime la carte et la rerajoute, modifiée
          deck.cards = deck.cards.filter((e) => e.id !== card.carte.id);
          deck.cards.push(carteCourante);
      } else {
        router.push("/error");
      }
    });
    fetchMajDeck(deck);
    router.push("/decks");
  }

  return (
    <div className="flex w-[70%] items-center justify-center">
      {loaded ? (
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
                <Vignette
                  action={handlePalierUp}
                  alert={bonnes/(bonnes+mauvaises)>0.7?<h2 className="text-green-600">recommandé</h2>:undefined}
                  image="plus1.svg"
                  text="Augmenter le palier"
                />
                <Vignette
                  action={handleAgain}
                  image="again.svg"
                  text="Recommencer"
                />
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
      ) : (
        <div className="h-[100vh] flex items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
