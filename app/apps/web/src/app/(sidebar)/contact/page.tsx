"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserPreviewGen from "../../../components/ui/user-preview-gen.tsx";
import ResearchBar from "../../../components/ui/research-bar.tsx";
import { fetchContactCurrentUser } from "../../../models/user-requests.ts";
import Loader from "../../../components/ui/loader.tsx";
import type { UserInterface } from "../../../models/user.ts";

export default function Contact(): JSX.Element {
  const { data: session } = useSession();

  const [initialContacts, setInitialContacts] = useState<UserInterface[]>([]);
  const [contacts, setContacts] = useState<UserInterface[]>([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      if (session?.user) {
        if (session.user.email) {
          const contactsPromise = fetchContactCurrentUser(session.user.email);
          contactsPromise
            .then((data: UserInterface[]): void => {
              setInitialContacts(data);
              setContacts(data);
            })
            .catch((e) => {
              console.error("Error while fetching contacts", e);
            });
        }

        setLoaded(true);
      }
    }
  }, [loaded, session]);

  const contactsElements = contacts.map((user: UserInterface) => {
    return (
      <UserPreviewGen key={user._id.toString()} type="friend" user={user} />
    );
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    const filteredContacts = initialContacts.filter((user: UserInterface) => {
      return (
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(value.toLowerCase())
      );
    });
    setContacts(filteredContacts);
  };

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-Lexend text-3xl font-medium">Vos contacts</h1>
        <Link
          className="w-fit bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
          href="/contact/search"
        >
          Ajouter un contact
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <ResearchBar
          onChange={handleSearch}
          placeholder="Rechercher un contact par son nom, prénom, pseudo, email"
        />
      </div>
      <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
        {loaded ? (
          <div className="w-full space-y-[5vh]">
            {contacts.length > 0 ? (
              contactsElements
            ) : (
              <p className="text-center font-Lexend text-xl">
                Vous n&apos;avez pas de contacts
              </p>
            )}
          </div>
        ) : (
          <div className="h-[70%] flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
