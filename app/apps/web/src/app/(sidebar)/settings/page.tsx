"use client"
import ParamBox from "../../../components/ui/param-box.tsx";
import Link from "next/link";

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col p-10">
            <h1 className="font-Lexend text-3xl font-medium">Paramètres</h1>
            <div className="">
                <ParamBox 
                    title="Modifier vos informations" 
                    content="Pour modifier vos informations personnelles comme votre nom, photo de profil et nom d’utilisateur, rendez-vous dans la page Profil"
                    inputs={null} 
                    button={<Link href="/profil" className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5">Profil</Link>}
                />
                <ParamBox 
                    title="Modifier votre adresse e-mail" 
                    content="Votre adresse e-mail actuelle est MAIL@MAIL"
                    inputs={<div className="flex flex-col gap-5 w-[95%] h-"> 
                                <input className="border-2 w-[100%] rounded p-2" type="text" placeholder="Nouvelle adresse mail" />
                                <input className="border-2 w-[100%] rounded p-2" type="text" placeholder="Confirmer la nouvelle adresse mail" /> 
                                <input className="border-2 w-[100%] rounded p-2" type="password" placeholder="Mot de passe" />
                            </div>} 
                    button={<Link href="/" className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5">Confirmer</Link>}
                />
                <ParamBox 
                    title="Modifier votre mot de passe" 
                    content={null}
                    inputs={<div className="flex flex-col gap-5 w-[95%] h-"> 
                                <input className="border-2 w-[100%] rounded p-2" type="password" placeholder="Ancien mot de passe" />
                                <input className="border-2 w-[100%] rounded p-2" type="password" placeholder="Nouveau mot de passe" />
                                <input className="border-2 w-[100%] rounded p-2" type="password" placeholder="Confirmer le nouveau mot de passe" /> 
                            </div>} 
                    button={<Link href="/" className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5">Confirmer</Link>}
                />
                <ParamBox 
                    title="Supprimer votre compte" 
                    content="Pour modifier vos informations personnelles comme votre nom, photo de profil et nom d’utilisateur, rendez-vous dans la page Profil"
                    inputs={null} 
                    button={<Link href="/" className="bg-[#FF6B6B] text-white font-lexend rounded-md p-3 mb-5">Supprimer</Link>}
                />
            </div>
        </div>
    );
};