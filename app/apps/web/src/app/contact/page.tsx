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

    const [initialContacts, setInitialContacts] = useState<UserInterface[]>([]);
    const [initialUsers, setInitialUsers] = useState<UserInterface[]>([]);

    const [loaded, setLoaded] = useState(false);

    const [isGlobalSearching, setIsGlobalSearching] = useState(false);

    const [contacts, setContacts] = useState<UserInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);


    useEffect(() => {
        if (session?.user) {
            if (session?.user?.email) {
                if (!loaded) {

                    void (async () => {
                        const dataContact = await fetchContactCurrentUser(session.user.email);
                        setInitialContacts(dataContact);
                        setContacts(dataContact);

                        const dataUser = await fetchAllUser();

                        const user = dataUser.find(e => e.email === session.user.email)
                        const dataFilter = dataUser.filter(e => e.email !== session.user.email && !user?.following?.includes(e.email))

                        setInitialUsers(dataFilter);
                        setUsers(dataFilter);

                    })();

                    setLoaded(true);

                }
            }
        }
    }, [session]);


    const userElements = users.map((e) => {
        return <UserPreviewGen user={e} key={e._id} type="user"/>
    })

    const contactsElements = contacts.map((e) => {
        return <UserPreviewGen user={e} key={e._id} type="friend"/>
    })

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredUsers = initialUsers.filter((e) => {
            return e.username.toLowerCase().includes(value.toLowerCase())
        })
        setUsers(filteredUsers);

        const filteredContacts = initialContacts.filter((e) => {
            return e.username.toLowerCase().includes(value.toLowerCase())
        })
        setContacts(filteredContacts);
    }


    const title = isGlobalSearching ? "Ajouter un contact" : "Vos contacts";

    return (
        <div className="size-full">
            <div className="p-[5vh]">
                <div className="flex flex-row justify-between">
                    <h1 className="font-Lexend text-3xl font-medium">{title}</h1>
                    <button onClick={() => {
                        setIsGlobalSearching(!isGlobalSearching)
                    }}
                            className="w-fit bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                        {isGlobalSearching ? <p>Voir ses contacts</p> : <p>Ajouter un contact</p>}
                    </button>
                </div>
                <div className="mt-10 flex justify-center">
                    <ResearchBar onChange={handleSearch}/>
                </div>
                <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
                    {loaded ?
                        <div className="w-full space-y-[5vh]">
                            {isGlobalSearching ? userElements : <>{contacts.length > 0 ? contactsElements :
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