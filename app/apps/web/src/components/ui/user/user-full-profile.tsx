"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import type { UserInterface } from "../../../models/user";
import { fetchCurrentUser } from "../../../models/userRequests";
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
      if (session.user?.email) {
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
      }) ();
    }
  }, [email, loading]);
  return (
    <div className="size-full h-[100vh] flex items-center justify-center">
      {loading?<Loader/>:
      <div className="flex flex-col size-full bg-gray-100 items-center gap-3 ml-64">
        <UserInfos user={user}/>
        <hr className="border-gray-200 w-full" />
        <UserDecks user={user}/>
      </div>
      }
    </div>
      
  );
}
