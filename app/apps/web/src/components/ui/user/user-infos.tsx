"use client";
import { AvatarImage, AvatarFallback, Avatar } from "../avatar";
import { Button } from "../button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserInterface } from "../../../models/user";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../../models/userRequests";
export default function UserInfos(): JSX.Element {
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  const handleLogOut = async (e: Event) => {
    e.preventDefault();
    try {
      const res = await signOut({ redirect: false, callbackUrl: "/login" });
      router.replace(res.url);
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.email) {
        setEmail(session.user.email);
        setLoading(true);
      }
    }
  }, [session]);

  useEffect(() => {
    if (email && loading) {
      void (async () => {
        const res = fetchCurrentUser(email);
        setUser(await res);
      }) ();
    }
  }, [email, loading]);
  return (
    <>
      {!user && <p> error loading session </p>}
      {user && (
        <div className="flex flex-col mb-11">
          <div className="relative h-[200px] bg-gray-300 overflow-hidden">
            <img
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
              height="200"
              src="../../../../public/banner.jpg"
              style={{
                aspectRatio: "800/200",
                objectFit: "cover",
              }}
              width="800"
            />
          </div>
          <div className="flex flex-col  mx-10">
            <div className="flex items-end justify-between">
              <div className="relative -top-14 ">
                <Avatar className="h-28 w-28 border-2 border-gray-100">
                  <AvatarImage alt="pdp" src="pdp" />
                  <AvatarFallback>Pfp</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-1 align-center">
                <Button className="relative ">Edit Profile</Button>
                <button
                  className="bg-red-500 rounded-md text-white font-bold px-6 py-2 mt-3 hover:bg-red-300"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            </div>
            <div className="relative -top-5">
              <h2 className="text-2xl font-bold">{email} </h2>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-sm text-black mt-8">{user.bio}</p>
            </div>
            <div className="flex items-start justify-start mt-10 space-x-10 ">
              <div className="flex flex-row items-center space-x-2 ">
                <h2 className="text-2xl font-bold">followers</h2>
                <p className="text-gray-900">{user.followers}</p>
              </div>
              <div className="flex flex-row items-center space-x-2 text-gray-900">
                <h2 className="text-2xl font-bold">following</h2>
                <p className="text-gray-900">{user.following} </p>
              </div>
              <div className="flex flex-row items-center space-x-2 text-gray-900">
                <h2 className="text-2xl font-bold">decks</h2>
                <p className="text-gray-900">Decks</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}