"use client";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InfoPerso(): JSX.Element {
  const { data: session } = useSession();

  const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const handleLogOut = async (e: Event) => {
    e.preventDefault();
    try {
      const res = await signOut({ redirect: false, callbackUrl: "/login" });
      router.replace(res.url);
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };
  return (
    <>
      <div>
        <u> Email :</u> {session?.user?.email}
        <button
          className="bg-red-500 rounded-md text-white font-bold px-6 py-2 mt-3"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
