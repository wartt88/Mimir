"use client"
import DeckPreview from "../../../components/ui/deck-preview.tsx";
import AreaChart from "../../../components/ui/area-chart.tsx";
import BarChart from "../../../components/ui/bar-chart.tsx";
import DetailsStats from "../../../components/ui/details-stats.tsx";
import PieChart from "../../../components/ui/pie-chart.tsx";
import { DeckListView, deckList } from "../../../components/ui/deck-list.tsx";
import { useEffect, useState } from "react";
import { DeckInterface } from "../../../models/deck.ts";
import { UserInterface } from "../../../models/user.ts";
import { useSession } from "next-auth/react";
import { fetchCurrentUser } from "../../../models/userRequests.ts";
import { getRecentDecks } from "../../../components/getters/deck-getters.ts";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../../../components/ui/carousel";
import DeckUI from "../../../components/ui/deck-ui.tsx";
import { Chart } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import Card from "../../../models/card.ts";

export default function Page(): JSX.Element {
    
    const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
    const {data: session} = useSession();
    const [currentDeck, setCurrentDeck] = useState<DeckInterface>();

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
        if (!loaded && user) {
            void (async () => {
               setRecentDecks(await getRecentDecks(user));
               setLoaded(true)
            })();
        }
    }, [user]);

    var myChart : Chart;

    useEffect(() => {
        if (currentDeck && user) {
            if (myChart) {
                myChart.destroy();
                console.log("CHART IS DESTROYED");
            }

            const cards : Card[] = currentDeck.cards;
            const tries: number = cards[0].users.find(u => u.user_id.toString() === user?._id.toString())?.answers.length ?? -1;
            const myLabels: string[] = [];

            for (let i = 1; i <= tries; i++) {
                myLabels.push(`Essai ${i}`);
            }

            const userAnswers : boolean[][] = [];
            cards.forEach((card) => {
                userAnswers.push(card.users.find(u => u.user_id.toString() === user?._id.toString())?.answers)
            });

            const data : number[][] = [[],[]];
            for (let i = 0; i < tries; i++) {
                var countTrue = 0;
                var countFalse = 0;
                userAnswers.forEach((answers) => {
                    if (answers[i]) {
                        countTrue += 1;
                    } else {
                        countFalse += 1;
                    }
                })
                data[0].push(countTrue) ; data[1].push(countFalse) ;
            }

            // BUG SI MyChart inexistant
            var ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: myLabels,
                    datasets: [{
                        data: data[0],
                        label: "Bonnes réponses",
                        borderColor: "rgb(109, 253, 181)",
                        backgroundColor: "rgb(109, 253, 181,0.5)",
                        borderWidth: 2
                    }, {
                        data: data[1],
                        label: "Mauvaises réponses",
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgb(75, 192, 192,0.5)",
                        borderWidth: 2
                    }
                    ]
                },
            });
        }
    }, [currentDeck])

    // Fonction pour gérer les clics sur les boutons
    const handleButtonClick = (deck: DeckInterface) => {
        setCurrentDeck(deck);
        console.log(currentDeck);
    };

    return (
        <div className="flex flex-col gap-[6vh] items-center p-16">
                <h1 className="font-Lexend text-3xl font-medium">Votre progression</h1>
                <div className="w-full flex flex-col gap-[1vh]">
                <Carousel className="w-full" id="carousel" opts={{ align: "start" }}>
                  <CarouselContent>
                    {recentDecks.map((deck) => (
                        <button onClick={() => handleButtonClick(deck)}>
                      <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={deck.id}>
                            <DeckUI deck={deck} key={deck._id} type="stats" />
                      </CarouselItem>
                      </button>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                </div>
                <canvas id="myChart"></canvas>
        </div>
    );
}