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
    {session ? <div className="flex flex-row">
   <div className="fixed h-full min-w-[15vw] left-0 top-0 flex" id="menu">
      <nav className="w-full bg-white items-center justify-center flex flex-col p-[5%] gap-[5%] text-xl font-semibold text-gray-500">
        <div className="w-full bg-white h-[100%] self-center flex flex-col p-[10%] gap-[5%] text-xl font-semibold">
          <h1 className="text-4xl xl:text-5xl text-[#023047] font-Lemon">Mimir</h1>

            <Link className="flex align-items space-x-2 hover:bg-slate-100 rounded-sm" href="/">
              <Image
                  alt=""
                  className="mx-[10px] "
                  height={20}
                  src="/home.svg"
                  width={20}
              />
              Accueil
            </Link>
          <Link href="/decks" className="flex align-items space-x-2 hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/decks.svg"
              width={20}
            />
            Mes decks
          </Link>
          <Link href="/statistiques" className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/stats.svg"
              width={20}
            />
            Statistiques
          </Link>
          <Link href="/explore" className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/explore.svg"
              width={20}
            />
            Explorer
          </Link>
          <Link href="/contact" className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/contact.svg"
              width={20}
            />
            Contact
          </Link>
          <Link href="/profile" className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/profil.svg"
              width={20}
            />
            Profil
          </Link>
          <Link href="/options" className="flex align-items space-x-2  hover:bg-slate-100 rounded-sm">
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/options.svg"
              width={20}
            />
            Paramètres
          </Link>
          <button className="flex align-items space-x-2  hover:bg-red-100 rounded-sm" onClick={handleLogOut}>
            <Image
              alt=""
              className="mx-[10px]"
              height={20}
              src="/disconnect.svg"
              width={20}
            />
              <p> Log Out</p>
          </button>
        </div>
      </nav>
    </div>
    <br className="mr-60"/>
    </div> : null
    }</>)};

  