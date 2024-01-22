import Link from "next/link";
import Image from "next/image"

export default function Menu() {
    return (
        <div id="menu" className="fixed h-full w-[15vw] left-0 top-0 flex">
            <nav className="w-full bg-white h-full self-center flex flex-col p-[5%] gap-[5%] text-xl font-semibold text-gray-600">
                <div className="w-full bg-white h-[100%] self-center flex flex-col p-[10%] gap-[5%] text-xl font-semibold text-gray-600">
                    <Image
                    alt=""
                    className="mx-[10px]"
                    width={120}
                    height={20}
                    src="mimir.svg"
                    />
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px] "
                         width={20}
                         height={20}
                         src="home.svg"
                        />
                        <Link href="/">Accueil</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="decks.svg"
                        />
                        <Link href="/decks" >Mes decks</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="stats.svg"
                        />
                        <Link href="/statistiques">Statistiques</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="explore.svg"
                        />
                        <Link href="/explore">Explorer</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="contact.svg"
                        />
                        <Link href="/contact">Contacts</Link>
                    </div>
                    <div className="flex align-items">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="profil.svg"
                        />
                        <Link href="/profil">Profil</Link>
                    </div>
                </div>
                <div className="">
                    <div className="flex align-items my-[15px]">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="options.svg"
                        />
                        <Link href="/options">Paramètres</Link>
                    </div>
                    <div className="flex align-items my-[15px]">
                        <Image
                         alt=""
                         className="mx-[10px]"
                         width={20}
                         height={20}
                         src="disconnect.svg"
                        />
                        <Link href="/disconnect">Se déconnecter</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}