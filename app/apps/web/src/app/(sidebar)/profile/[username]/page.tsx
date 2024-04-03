"use client";
import { useEffect, useState } from "react";
import { fetchUserByUsername } from "../../../../models/user-requests.ts";
import type { UserInterface } from "../../../../models/user";
import UserProfileView from "../../../../components/ui/user/view/user-profile-view";
import Loader from "../../../../components/ui/loader.tsx";

export default function Page({
  params,
}: Readonly<{ params: { username: string } }>): JSX.Element {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        try {
          const dataUser = await fetchUserByUsername(params.username);
          setUser(dataUser);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [params]);

  return (
    <>
      {user ? <UserProfileView user={user} /> : null}
      {loaded ? (
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-Lexend text-3xl">Utilisateur introuvable</h1>
        </div>
      ) : null}
      {!user && !loaded && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}
