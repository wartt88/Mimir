"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import type { UserInterface } from "../../../models/user";
import { fetchCurrentUser } from "../../../models/user-requests";
import Loader from "../loader";
import UserInfos from "./user-infos";
import UserDecks from "./user-decks";

export default function UserFullProfile(): JSX.Element {
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      if (session.user.email) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  useEffect(() => {
    if (email && loading) {
      void (async () => {
        const res = fetchCurrentUser(email);
        setUser(await res);
        setLoading(false);
      })();
    }
  }, [email, loading]);

  return loading ? (
    <div className="flex w-full h-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <>
      <UserInfos user={user} />
      <hr className="border-gray-200 w-full" />
      {user ? <UserDecks user={user} /> : null}
    </>
  );
}
