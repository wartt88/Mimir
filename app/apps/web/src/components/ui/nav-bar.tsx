import React from "react";
import Link from "next/link";

interface ButtonProps {
    title: string;
    url: string;
    bg?: boolean;
}

const Button = ({title, url, bg = false}: ButtonProps) => {
    return bg ? (
            <Link className="font-Lexend p-2 bg-sky-300 rounded-lg transition ease-in-out delay-150 hover:scale-110"
               href={url}>{title}</Link>
        ) :
        (
            <Link className="font-Lexend p-2 transition ease-in-out delay-150 hover:scale-110" href={url}>{title}</Link>
        )
}

const NavBar = () => {
    return <nav className="w-full bg-white absolute z-10 flex flex-row px-10 py-3 shadow">
        <div>
            <p className="font-Lemon text-5xl" style={{color: "#023047"}}>Mimir</p>
        </div>
        <div className="flex grow justify-center items-center space-x-7 font-Lexend ">
            <Button title={"Accueil"} url={"/accueil"}/>
            <Button title={"Explorer le marketplace"} url={"/accueil#marketplace"}/>
            <Button title={"Nos solutions"} url={"#solutions"}/>
        </div>
        <div className="flex items-center space-x-7 font-Lexend">
            <Button title={"Se connecter"} url={"/login"}/>
            <Button title={"S'inscrire"} url={"/register"} bg={true}/>
        </div>
    </nav>;
}

export default NavBar;