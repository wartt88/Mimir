"use client"

import {type ChangeEvent, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {fetchAllUser} from "../../../models/userRequests.ts";
import {UserInterface} from "../../../models/user.ts";
import UserPreviewGen from "../../../components/ui/user-preview-gen.tsx";
import ResearchBar from "../../../components/ui/research-bar.tsx";
import Loader from "../../../components/ui/loader.tsx";
import Link from "next/link";

export default function Contact(): JSX.Element {

    const {data: session} = useSession();

    const [initialUsers, setInitialUsers] = useState<UserInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (session?.user) {
            if (session?.user?.email) {
                if (!loaded) {

                    void (async () => {
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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredUsers = initialUsers.filter((e) => {
            return e.username.toLowerCase().includes(value.toLowerCase()) ||
                e.email.toLowerCase().includes(value.toLowerCase()) ||
                e.firstName?.toLowerCase().includes(value.toLowerCase()) ||
                e.lastName?.toLowerCase().includes(value.toLowerCase())
        })
        setUsers(filteredUsers);

    }

    return (
        <div className="size-full">
            <div className="p-[5vh]">
                <div className="flex flex-row justify-between">
                    <h1 className="font-Lexend text-3xl font-medium">Ajouter un contact</h1>
                    <Link href="/contact" className="w-fit bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow">
                        Voir ses contacts
                    </Link>
                </div>
                <div className="mt-10 flex justify-center">
                    <ResearchBar onChange={handleSearch}/>
                </div>
                <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
                    {loaded ?
                        <div className="w-full space-y-[5vh]">
                            {userElements}
                        </div>
                        :
                        <div className="h-[70%] flex items-center justify-center"><Loader/></div>
                    }
                </div>
            </div>
        </div>

    );
}