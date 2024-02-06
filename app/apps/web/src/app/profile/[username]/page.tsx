"use client"
import { fetchUserByUsername } from "../../../models/userRequests";
import { UserInterface } from "../../../models/user";
import UserProfileView from "../../../components/ui/user/view/user-profile-view";
import { useEffect, useState } from "react";

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
      {user ? (
        <UserProfileView user={user} />
      ) : loaded ? (
        <div className="flex flex-col justify-center items-center">
          User not found.
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          Loading...
        </div>
      )}
    </>
  );
}
