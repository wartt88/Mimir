import Link from "next/link";


export default function Menu() {
    return (
        <div id="menu" className="fixed h-full w-[10vw] left-0 top-0 flex">
            <nav className="w-full bg-gray-200 h-[70%] self-center flex flex-col p-[10%] rounded-r-lg gap-[5%] text-xl font-semibold text-gray-600">
                <Link href="/" >Home</Link>
                <Link href="/statistiques">Stats</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/profil">Profil</Link>
            </nav>
        </div>
    )
}