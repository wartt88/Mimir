import Link from "next/link";
import Image from "next/image"

export default function Menu():JSX.Element {
    return (
        <div className="fixed h-full min-w-[15vw] left-0 top-0 flex " id="menu">
            <nav className="w-full bg-white h-full items-center justify-center flex flex-col p-[5%] gap-[5%] text-xl font-semibold text-gray-600">
                <div className="w-full bg-white h-[100%] self-center flex flex-col p-[10%] gap-[5%] text-xl font-semibold text-gray-600">
                    <Image
                    alt=""
                    className="mx-[10px]"
                    height={25}
                    src="mimir.svg"
                    width={130}
                    />
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px] "
                         height={20}
                         src="home.svg"
                         width={20}
                        />
                        <Link href="/">Accueil</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="decks.svg"
                         width={20}
                        />
                        <Link href="/decks" >Mes decks</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="stats.svg"
                         width={20}
                        />
                        <Link href="/statistiques">Statistiques</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="explore.svg"
                         width={20}
                        />
                        <Link href="/explore">Explorer</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="contact.svg"
                         width={20}
                        />
                        <Link href="/contact">Contacts</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="profil.svg"
                         width={20}
                        />
                        <Link href="/profil">Profil</Link>
                    </div>
                </div>
                <div className="">
                    <div className="flex align-items my-[15px]">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="options.svg"
                         width={20}
                        />
                        <Link href="/options">Paramètres</Link>
                    </div>
                    <div className="flex align-items my-[15px]">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         height={20}
                         src="disconnect.svg"
                         width={20}
                        />
                        <Link href="/disconnect">Se déconnecter</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}