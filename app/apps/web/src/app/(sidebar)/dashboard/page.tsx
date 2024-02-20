"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DeckEmpty, type DeckInterface } from "../../../models/deck";
import { fetchDeckById, fetchDeckByTag, fetchDecks } from "../../../models/deck-requests";
import Redirecter from "../../../components/ui/redirecters-home";
import { DeckListView } from "../../../components/ui/deck-list";
import type { UserInterface } from "../../../models/user";
import { fetchCurrentUser } from "../../../models/userRequests";
import Loader from "../../../components/ui/loader";

export default function Page(): JSX.Element {
    const [sharedDecks, setSharedDecks] = useState<DeckInterface[]>([]);
    const [recommendedDecks, setRecommendedDecks] = useState<DeckInterface[]>([]);
    const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.email && !user) {
            void (async () => {
                const newUser: UserInterface = await fetchCurrentUser(
                    session.user.email
                );
                setUser(newUser);
            })();
        }
    }, [session]);

    useEffect(() => {
        // DEFINIR LOADER USER
        if (user && !loaded) {
            void (async () => {
                //TODO un fetch pour chaque type de deck

                // FETCH pour les decks récents
                const recentDecksPromises:Promise<DeckInterface>[] | undefined = user?.decks?.map((idDeck) => fetchDeckById(idDeck));
                var decks: DeckInterface[] = [];
                if (recentDecksPromises) {
                    decks = await Promise.all(recentDecksPromises);
                    decks = decks.reverse();
                    setRecentDecks(decks);
                } else {
                    setRecentDecks([]);
                }

                // FETCH pour les decks partagés
                if (decks.length === 0) {
                    setRecommendedDecks([]);
                } else {
                    var recentTags : string[] = [];
                    var recoDecks : DeckInterface[] = [];
                    decks.forEach((deck) => {
                            recentTags = recentTags.concat(deck.tags);
                        }
                    );
                    const recommendedDecksPromises:Promise<DeckInterface[]>[] | undefined = recentTags.map((tag) => fetchDeckByTag(tag));
                    const tempDecks : DeckInterface[][] = await Promise.all(recommendedDecksPromises);

                    // Obtention d'un tableau avec tous les decks appartennant à chaque tag
                    tempDecks.forEach((arrayDeck) => {
                        recoDecks = recoDecks.concat(arrayDeck);
                    });

                    // Processus de filtration des decks

                    // Estimer le nombre de decks le plus trouvés
                    const freq:Record<string,number> = countIdOccurrences(recoDecks);
                    // Enlever les doublons
                    recoDecks = recoDecks.filter((deck, index, self) => {
                        const isFirstOccurrence = self.findIndex(d => d._id === deck._id) === index;
                        return isFirstOccurrence;
                    });
                    // Trier les decks selon le nombre d'occurrences de chaque deck
                    recoDecks.sort((a, b) => {
                        return freq[b._id] - freq[a._id];
                      });
                    // Enlever les decks déjà présents dans l'historique
                    recoDecks = recoDecks.filter((deck) => !decks.some(deckRecent => deckRecent._id === deck._id));

                    setRecommendedDecks(recoDecks);
                }

                setSharedDecks([]);
                setLoaded(true);
            })();
        }
    }, [user]);

    return (
            loaded ? (
                <div className="flex flex-col gap-[6vh] items-center p-16">
                    <div className="gap-[5vh] flex flex-col">
                        <p className="font-Lexend text-4xl">
                            {" "}
                            👋 Bonjour {user ? user.username : "UTILISATEUR"} !
                        </p>
                        <div className="flex h-fit items-start space-x-[1.5vw] ">
                            <Redirecter
                                couleur="#43ABF3"
                                paragraphe="Créez votre propre deck dans le domaine que vous souhaitez"
                                reference="/newDeck"
                                titre="Créer un nouveau deck"
                            />
                            <Redirecter
                                couleur="#E2F82C"
                                paragraphe="Consultez, partagez et modifiez les decks que vous avez crées"
                                reference="/decks"
                                titre="Voir mes decks"
                            />
                            <Redirecter
                                couleur="#9CF360"
                                paragraphe="Visualisez l'évolution de votre apprentissage au fil du temps"
                                reference="/statistiques"
                                titre="Suivre ma progression"
                            />
                            <Redirecter
                                couleur="#BE85F8"
                                paragraphe="Découvrez la multitude de decks crées par nos utilisateurs"
                                reference="/explore"
                                titre="Explorer les decks"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-[1vh]">
                        <p className="font-Lexend text-2xl"> Historique récent</p>
                        <DeckListView
                            decks={recentDecks}
                            txtEmpty="récents"
                            type="public"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-[1vh]">
                        <p className="font-Lexend text-2xl"> Recommandations</p>
                        <DeckListView
                            decks={recommendedDecks}
                            txtEmpty="recommandés"
                            type="public"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-[1vh]">
                        <p className="font-Lexend text-2xl">Decks partagés avec vous</p>
                        <DeckListView
                            decks={sharedDecks}
                            txtEmpty="partagés"
                            type="public"
                        />
                    </div>

                    {
                        //TODO Shiny button
                        /* <Link
                    className="bg-orange-300 w-2/3 self-center text-5xl font-black text-white p-7 rounded-xl"
                    href={{ pathname: "/deck", query: { deck: 1, card: 1 } }}
                    key={111}
                  >
                    STUDY DAILY CARDS
                  </Link> */
                    }
                </div>
            ) : (
                <div className="h-[100vh] flex items-center justify-center w-full"><Loader/></div>
            )
    );
}

function countIdOccurrences(decks: DeckInterface[]): Record<string, number> {
    return decks.reduce((accumulator, deck) => {
      const id = deck._id;
      accumulator[id] = (accumulator[id] ||  0) +  1;
      return accumulator;
    }, {} as Record<string, number>);
}
