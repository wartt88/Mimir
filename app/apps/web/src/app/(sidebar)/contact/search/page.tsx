"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchAllUser } from "../../../../models/user-requests.ts";
import type { UserInterface } from "../../../../models/user.ts";
import UserPreviewGen from "../../../../components/ui/user-preview-gen.tsx";
import ResearchBar from "../../../../components/ui/research-bar.tsx";
import Loader from "../../../../components/ui/loader.tsx";

export default function Contact(): JSX.Element {
  const { data: session } = useSession();

  const [initialUsers, setInitialUsers] = useState<UserInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      if (session?.user) {
        if (session.user.email) {
          const dataPromise: Promise<UserInterface[]> = fetchAllUser();
          dataPromise
            .then((data: UserInterface[]): void => {
              const user = data.find((e) => e.email === session.user?.email);
              const dataFilter = data.filter(
                (e) =>
                  e.email !== session.user?.email &&
                  !user?.following?.includes(e.email)
              );

              setInitialUsers(dataFilter);
              setUsers(dataFilter);
            })
            .catch((e) => {
              console.error("Error while fetching users", e);
            });
        }

        setLoaded(true);
      }
    }
  }, [loaded, session]);

  const userElements = users.map((user: UserInterface) => {
    return <UserPreviewGen key={user._id.toString()} type="user" user={user} />;
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const filteredUsers = initialUsers.filter((user) => {
      return (
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(value.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  return (
    <div className="p-[5vh]">
      <div className="flex flex-row justify-between">
        <h1 className="font-Lexend text-3xl font-medium">Ajouter un contact</h1>
        <Link
          className="w-fit bg-black text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
          href="/contact"
        >
          Voir ses contacts
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <ResearchBar
          onChange={handleSearch}
          placeholder="Rechercher un contact par son nom, prénom, pseudo"
        />
      </div>
      <div className="flex flex-col space-y-[8vh] mt-[5vh] items-center">
        {loaded ? (
          <div className="w-full space-y-[5vh]">{userElements}</div>
        ) : (
          <div className="h-[70%] flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
