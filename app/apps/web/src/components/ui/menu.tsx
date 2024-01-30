'use client'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useSession, signOut } from "next-auth/react";

export default function Menu(): JSX.Element {

  const { data: session } = useSession();

  const router = useRouter();
  const handleLogOut = async (e: Event): Promise<void> => {
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
    {!session &&
      (
        <>
     
        </>
      )
    }
    {session && 
        (
   <div className="h-screen w-[15vw] left-0 top-0 flex" id="menu">
      <nav className="w-full bg-white items-center justify-center flex flex-col p-[5%] gap-[5%] text-xl font-semibold text-gray-500">
        <div className="w-full bg-white h-[100%] self-center flex flex-col p-[10%] gap-[5%] text-xl font-semibold">
          <Image
            alt=""
            className="mx-[10px]"
            height={25}
            src="/mimir.svg"
            width={130}
          />
          <button className="flex align-items space-x-2 hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px] "
              height={20}
              src="/home.svg"
              width={20}
            />
            <Link href="/">Accueil</Link>
          </button>
          <button className="flex align-items space-x-2 hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/decks.svg"
              width={20}
            />
            <Link href="/decks">Mes decks</Link>
          </button>
          <button className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/stats.svg"
              width={20}
            />
            <Link href="/statistiques">Statistiques</Link>
          </button>
          <button className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/explore.svg"
              width={20}
            />
            <Link href="/explore">Explorer</Link>
          </button>
          <button className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/contact.svg"
              width={20}
            />
            <Link href="/contact">Contacts</Link>
          </button>
          <button className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/profil.svg"
              width={20}
            />
            <Link href="/profile">Profil</Link>
          </button>
          <button className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/options.svg"
              width={20}
            />
            <Link href="/options">Paramètres</Link>
          </button>
          <button onClick={handleLogOut} className="flex align-items space-x-2  hover:bg-red-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/disconnect.svg"
              width={20}
            />
              <button> Log Out</button>
          </button>
        </div>
      </nav>
    </div>
 
)
    }</>)};

  