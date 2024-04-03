import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ButtonProps {
  title: string;
  url: string;
  bg?: boolean;
}

function Button({ title, url, bg = false }: ButtonProps): JSX.Element {
  return bg ? (
    <Link
      className="font-Lexend p-2 bg-sky-300 rounded-lg transition ease-in-out delay-150 hover:scale-110"
      href={url}
    >
      {title}
    </Link>
  ) : (
    <Link
      className="font-Lexend p-2 transition ease-in-out delay-150 hover:scale-110"
      href={url}
    >
      {title}
    </Link>
  );
}

function DesktopNavBar(): JSX.Element {
  return (
    <nav className="w-full bg-white hidden absolute z-10 lg:flex flex-row px-10 py-3 shadow">
      <div>
        <p className="font-Lemon text-5xl" style={{ color: "#023047" }}>
          Mimir
        </p>
      </div>
      <div className="flex grow justify-center items-center space-x-7 font-Lexend ">
        <Button title="Accueil" url="/" />
        <Button title="Explorer le marketplace" url="#marketplace" />
        <Button title="Nos solutions" url="#solutions" />
      </div>
      <div className="flex items-center space-x-7 font-Lexend">
        <Button title="Se connecter" url="/login" />
        <Button bg title="S'inscrire" url="/register" />
      </div>
    </nav>
  );
}

function MobileNavBar(): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggleMenu = (): void => {
    setOpen(!open);
  };

  return (
    <nav className="w-full bg-white absolute lg:hidden z-10 flex flex-col px-10 py-3 shadow">
      <button
        className="absolute w-8 h-8 right-6 top-6 z-50"
        onClick={toggleMenu}
        type="button"
      >
        <Image alt="menu" height={32} src="/menu.png" width={32} />
      </button>
      <p className="font-Lemon text-5xl text-center text-[#023047]">Mimir</p>
      {open ? (
        <div className="flex flex-col grow justify-center items-center font-Lexend ">
          <Button title="Accueil" url="/" />
          <Button title="Explorer le marketplace" url="#marketplace" />
          <Button title="Nos solutions" url="#solutions" />
          <Button title="Se connecter" url="/login" />
          <Button bg title="S'inscrire" url="/register" />
        </div>
      ) : null}
    </nav>
  );
}

function NavBar(): JSX.Element {
  return (
    <>
      <DesktopNavBar />
      <MobileNavBar />
    </>
  );
}

export default NavBar;
