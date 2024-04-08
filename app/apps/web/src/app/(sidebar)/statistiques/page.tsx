"use client";

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Chart} from "chart.js/auto";
import type {DeckInterface} from "../../../models/deck.ts";
import type {UserInterface} from "../../../models/user.ts";
import {fetchCurrentUser} from "../../../models/user-requests.ts";
import {getRecentDecks} from "../../../components/getters/deck-getters.ts";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel";
import DeckUI from "../../../components/ui/deck-ui.tsx";
import type Card from "../../../models/card.ts";

export default function Page(): JSX.Element {
    const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
    const {data: session} = useSession();
    const [currentDeck, setCurrentDeck] = useState<DeckInterface>();

    useEffect(() => {
        if (session?.user?.email && !user) {
            void (async () => {
                if (session.user?.email) {
                    const newUser: UserInterface = await fetchCurrentUser(
                        session.user.email
                    );
                    setUser(newUser);
                }
            })();
        }
    }, [session]);

    useEffect(() => {
        if (!loaded && user) {
            void (async () => {
                setRecentDecks(await getRecentDecks(user));
                setLoaded(true);
            })();
        }
    }, [user]);

    let myChart: Chart;

    useEffect(() => {
        if (currentDeck && user) {
            if (typeof myChart !== "undefined") {
                myChart.destroy();
                console.log("CHART IS DESTROYED");
            }

            const cards: Card[] = currentDeck.cards;
            const tries: number = currentDeck.cards[0].users.find(u => u.user_id.toString() === user._id.toString())?.answers.length ?? -1;
            const myLabels: string[] = [];

            for (let i = /**tries-4*/ 1; i <= tries; i++) {
                myLabels.push(`Essai ${i}`);
            }

            const userAnswers: boolean[][] = [];
            cards.forEach((card) => {
                const v = card.users.find(
                    (u) => u.user_id.toString() === user._id.toString()
                )?.answers;
                if (v) userAnswers.push(v);
            });

            const data: number[][] = [[], [], []];
            for (let i = /**tries-5*/ 0; i < tries; i++) {
                let countTrue = 0;
                let countFalse = 0;
                let countNull = 0;
                userAnswers.forEach((answers) => {
                    if ((answers[i] === null) || (i >= answers.length)) {
                        countNull += 1;
                    } else if (answers[i]) {
                        countTrue += 1;
                    } else {
                        countFalse += 1;
                    }
                })
                data[0].push(countTrue);
                data[1].push(countFalse);
                data[2].push(countNull);
            }

            // BUG SI MyChart inexistant
            const ctx = (
                document.getElementById("myChart") as HTMLCanvasElement
            ).getContext("2d");
            const chartStatus = Chart.getChart("myChart"); // Remplacez "myChart" par l'ID de votre canvas
            if (chartStatus !== undefined) {
                chartStatus.destroy();
            }
            if (ctx) {
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: myLabels,
                        datasets: [{
                            data: data[0],
                            label: "Bonne(s) réponse(s)",
                            borderColor: "rgb(20, 255, 20)",
                            borderWidth: 2,
                            tension: 0.5
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                ticks: {
                                    callback (value, index, values) {
                                        const percentage = (index / (values.length - 1)) * 100;
                                        return `${percentage.toFixed(0)  }%`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [currentDeck])

    // Fonction pour gérer les clics sur les boutons
    const handleButtonClick = (deck: DeckInterface) => {
        setCurrentDeck(deck);
    };

    return (
        <div className="flex flex-col gap-[6vh] items-center p-16">
            <h1 className="font-Lexend text-3xl font-medium">Votre progression</h1>
            <div className="w-full flex flex-col gap-[1vh]">
                <Carousel className="w-full" id="carousel" opts={{align: "start"}}>
                    <CarouselContent>
                        {recentDecks.map((deck) => {
                            return (
                                <button key={deck._id.toString()} onClick={() => { handleButtonClick(deck); }}>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={deck._id.toString()}>
                                        <DeckUI deck={deck} key={deck._id.toString()} type="stats"/>
                                    </CarouselItem>
                                </button>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
            <canvas id="myChart" />
        </div>
    );
}