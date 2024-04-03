"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, MouseEventHandler } from "react";

const linkList = [
  { href: "/dashboard", title: "Accueil", icon: "/home.svg" },
  { href: "/decks", title: "Mes decks", icon: "/decks.svg" },
  { href: "/statistiques", title: "Statistiques", icon: "/stats.svg" },
  { href: "/explore", title: "Explorer", icon: "/explore.svg" },
  { href: "/contact", title: "Contacts", icon: "/contact.svg" },
  { href: "/profile", title: "Profil", icon: "/profil.svg" },
  { href: "/settings", title: "Paramètres", icon: "/options.svg" },
];

function DesktopMenu(): JSX.Element {
  const router = useRouter();

  const handleDisconnect = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        const res = await signOut({ redirect: false, callbackUrl: "/login" });
        router.replace(res.url);
      } catch (error) {
        console.log("Error during logout: ", error);
      }
    })();
  };

  const linkListJsx = linkList.map((link) => {
    return (
      <LinkButton
        href={link.href}
        icon={link.icon}
        key={link.title}
        title={link.title}
      />
    );
  });

  return (
    <nav className="bg-white min-w-72 h-dvh hidden lg:flex flex-col space-y-10 py-10 px-7 overflow-auto">
      <h1 className="font-Lemon text-[#023047] text-5xl text-center">Mimir</h1>
      <div className="flex flex-col grow space-y-5">{linkListJsx}</div>
      <DisconnectButton event={handleDisconnect} />
    </nav>
  );
}

function LinkButton(props: {
  href: string;
  title: string;
  icon: string;
}): JSX.Element {
  const pathname = usePathname();
  const selected = pathname === props.href;
  const textColor = selected ? "text-black" : "text-[#777A83]";
  const textBackground = selected ? "bg-[#f3f4f6]" : "bg-transparent";
  const className = `font-Lexend text-lg px-3 py-2 rounded-lg ${textColor} ${textBackground} hover:bg-[#f3f4f6] hover:text-black`;
  return (
    <Link className={className} href={props.href}>
      <div className="flex space-x-3 items-center">
        <Image alt="Menu icon" height={20} src={props.icon} width={20} />
        <span>{props.title}</span>
      </div>
    </Link>
  );
}

function DisconnectButton({
  event,
}: {
  event: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="px-3 py-2 font-Lexend rounded-lg text-[#777A83] hover:bg-[#A43B3B] text-lg hover:text-white flex items-center space-x-3"
      onClick={event}
      type="button"
    >
      <Image alt="" height={20} src="/disconnect.svg" width={20} />
      <span>Se déconnecter</span>
    </button>
  );
}

function MobileMenu(): JSX.Element {
  const router = useRouter();

  const handleDisconnect = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        const res = await signOut({ redirect: false, callbackUrl: "/login" });
        router.replace(res.url);
      } catch (error) {
        console.log("Error during logout: ", error);
      }
    })();
  };

  const linkListJsx = linkList.map((link) => {
    return (
      <MobileLinkButton
        href={link.href}
        icon={link.icon}
        key={link.title}
        title={link.title}
      />
    );
  });

  return (
    <nav className="bg-white min-w-16 h-dvh flex lg:hidden flex-col space-y-10 p-3 overflow-auto">
      <h1 className="font-Lemon text-[#023047] text-xl text-center">M</h1>
      <div className="flex flex-col grow space-y-5">{linkListJsx}</div>
      <MobileDisconnectButton event={handleDisconnect} />
    </nav>
  );
}

function MobileLinkButton(props: {
  href: string;
  title: string;
  icon: string;
}): JSX.Element {
  const pathname = usePathname();
  const selected = pathname === props.href;
  const textColor = selected ? "text-black" : "text-[#777A83]";
  const textBackground = selected ? "bg-[#f3f4f6]" : "bg-transparent";
  const className = `font-Lexend text-lg px-3 py-2 rounded-lg ${textColor} ${textBackground} hover:bg-[#f3f4f6] hover:text-black`;
  return (
    <Link className={className} href={props.href}>
      <div className="flex space-x-3 items-center">
        <Image alt="Menu icon" height={32} src={props.icon} width={32} />
      </div>
    </Link>
  );
}

function MobileDisconnectButton({
  event,
}: {
  event: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="px-3 py-2 font-Lexend rounded-lg text-[#777A83] hover:bg-[#A43B3B] text-lg hover:text-white flex items-center space-x-3"
      onClick={event}
      type="button"
    >
      <Image alt="" height={32} src="/disconnect.svg" width={32} />
    </button>
  );
}

function Menu(): JSX.Element {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
}

export { Menu };
