"use client"
import DeckPreview from "../../../components/ui/deck-preview.tsx";
import AreaChart from "../../../components/ui/area-chart.tsx";
import BarChart from "../../../components/ui/bar-chart.tsx";
import DetailsStats from "../../../components/ui/details-stats.tsx";
import PieChart from "../../../components/ui/pie-chart.tsx";
import { DeckListView } from "../../../components/ui/deck-list.tsx";
import { useEffect, useState } from "react";
import { DeckInterface } from "../../../models/deck.ts";
import { UserInterface } from "../../../models/user.ts";
import { useSession } from "next-auth/react";
import { fetchCurrentUser } from "../../../models/userRequests.ts";
import { getRecentDecks } from "../../../components/getters/deck-getters.ts";


// ORDRE DE LA PAGE
// DECKS RECENTS (COMME DANS LE DASHBOARD)
// Modal si deck cliqué, affichant le suivi du deck (questions/réponses)
// ------------------------------- (TOUT LE TEMPS AFFICHE)
// Graphique avec taux de bonnes réponses / mauvaises réponses des decks les plus récents

export default function Page(): JSX.Element {
    
    const [recentDecks, setRecentDecks] = useState<DeckInterface[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
    const {data: session} = useSession();

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
            })();
        }
    }, [user]);

    return (
        <div className="h-full p-10">
            <h1 className="font-Lexend text-3xl font-medium">Votre progression</h1>
            <div className="flex justify-center items-center mt-10">
                <DeckListView
                    decks={recentDecks}
                    txtEmpty="récents"
                    type="stats"
                />
            </div>
        </div>
    );
}