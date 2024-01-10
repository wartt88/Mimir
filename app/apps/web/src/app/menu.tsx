import Link from "next/link";
import "./menu.css";


export default function Menu() {
    return (
        <div id="menu" className="fixed h-full w-[10vw] left-0 top-0 flex">
            <nav className="w-full bg-gray-200 h-[70%] self-center flex flex-col p-[10%] rounded-r-lg gap-[5%] text-xl font-semibold text-gray-600">
                <Link href="/settings" className="flex justify-between" >Settings
                    <img src="rouages.svg" alt="" />
                </Link>
                <Link href="/" >Home</Link>
                <Link href="/statistiques">Stats</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </div>
    )
}