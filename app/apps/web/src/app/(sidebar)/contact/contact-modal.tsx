import React, {type ChangeEvent, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ResearchBar from "../../../components/ui/research-bar.tsx";
import Loader from "../../../components/ui/loader.tsx";
import type {UserInterface} from "../../../models/user.ts";
import {fetchContactCurrentUser} from "../../../models/userRequests.ts";
import UserPreviewShare from "../../../components/ui/user-preview-share.tsx";

interface ContactData {
    userId: string;
    selected: boolean;
    editor: boolean;
}

export default function ContactModal(): JSX.Element {

    const {data: session} = useSession();

    const [initialContacts, setInitialContacts] = useState<UserInterface[]>([]);
    const [contacts, setContacts] = useState<UserInterface[]>([]);

    const [loaded, setLoaded] = useState(false);

    const [contactData, setContactData] = useState<ContactData[]>([]);

    useEffect(() => {

        if (!loaded) {
            if (session?.user) {
                if (session.user.email) {

                    const contactsPromise = fetchContactCurrentUser(session.user.email);
                    contactsPromise.then((data: UserInterface[]): void => {
                        const array: ContactData[] = [];
                        data.forEach(user => {
                            array.push({userId: user._id.toString(), editor: false, selected: false})
                        })
                        setContactData(array);
                        setInitialContacts(data);
                        setContacts(data);
                    }).catch((e) => {
                        console.error("Error while fetching contacts", e);
                    });
                }

                setLoaded(true);

            }
        }
    }, [loaded, session]);


    const contactsElements = contacts.map((user: UserInterface) => {
        const contact = contactData.find(value => value.userId === user._id.toString())
        if (contact) {
            return <UserPreviewShare contactData={contact} key={user._id.toString()} user={user}/>
        }
        return <></>;
    })

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        const filteredContacts = initialContacts.filter((user: UserInterface) => {
            return user.username.toLowerCase().includes(value.toLowerCase()) ||
                user.email.toLowerCase().includes(value.toLowerCase()) ||
                user.firstName?.toLowerCase().includes(value.toLowerCase()) ||
                user.lastName?.toLowerCase().includes(value.toLowerCase())
        })
        setContacts(filteredContacts);
    }

    return (
        <div className="flex flex-col space-y-8 max-h-[50vh]">
            <h3 className="font-Lexend font-medium text-2xl">Partager à</h3>
            <ResearchBar onChange={handleSearch}
                         placeholder="Rechercher un contact par son nom, prénom, pseudo, e-mail"/>
            {loaded ?
                <div className="w-full space-y-5 overflow-auto">
                    {contacts.length > 0 ? contactsElements :
                        <p className="text-center font-Lexend text-xl">Vous n&apos;avez pas de contacts</p>
                    }
                </div>
                :
                <div className="h-[70%] flex items-center justify-center"><Loader/></div>
            }
            <button className="px-5 py-2 bg-blue-500 w-fit text-white font-Lexend text-lg self-center rounded-sm"
                    onClick={() => {
                        console.log(contactData)
                    }} type="button">Partager
            </button>
        </div>
    );
}