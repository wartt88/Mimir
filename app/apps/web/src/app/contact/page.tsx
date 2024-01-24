"use client"

import {type ChangeEvent, useEffect, useState} from "react";
import UserPreviewGen from "../../components/ui/user-preview-gen";
import ResearchBar from "../../components/ui/research-bar.tsx";
import {fetchAllUser, fetchContactCurrentUser, fetchCurrentUser} from "../../models/userRequests.ts";
import Loader from "../../components/ui/loader.tsx";
import {useSession} from "next-auth/react";
import {UserInterface} from "../../models/user.ts";

export default function Contact(): JSX.Element {

    const {data: session} = useSession();

    const [contacts, setContacts] = useState<JSX.Element[]>([]);
    const [users, setUsers] = useState<JSX.Element[]>([]);
    const [loaded, setLoaded] = useState(false);

    const [isGlobalSearching, setIsGlobalSearching] = useState(false);

    useEffect(() => {
        if (session?.user) {
            if (session?.user?.email) {
                if (!loaded) {

                    void (async () => {
                        const contacts = await fetchContactCurrentUser(session.user.email);
                        const jsxElements = contacts.map((e) => {
                            return <UserPreviewGen user={e} key={e._id} type="friend"/>
                        })
                        setContacts(jsxElements)
                    })();

                    void (async () => {
                        const contacts = await fetchAllUser();
                        const jsxElements = contacts.map((e) => {
                            return <UserPreviewGen user={e} key={e._id} type="user"/>
                        })
                        setUsers(jsxElements)
                    })();

                    setLoaded(true);
                }
            }
        }
    }, [session]);

    return (
        <div className="size-full">
            <div className="p-[5vh]">
                <div className="flex flex-row justify-between">
                    <h1 className="font-Lexend text-3xl font-medium">Vos contacts</h1>
                    <button onClick={() => { setIsGlobalSearching(!isGlobalSearching) }}
                            className="w-fit bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                        {isGlobalSearching ? <p>Voir ses contacts</p> : <p>Ajouter un contact</p>}
                    </button>
                </div>
                <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
                    {loaded ?
                        <div className="w-full space-y-[5vh]">
                            {isGlobalSearching ? users : <>{contacts.length > 0 ? contacts :
                                <p className="text-center font-Lexend text-xl">Vous n'avez pas de contacts</p>}</>}
                        </div>
                        :
                        <div className="h-[70%] flex items-center justify-center"><Loader/></div>
                    }
                </div>
            </div>
        </div>

    );
}