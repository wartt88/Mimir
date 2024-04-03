"use client";
import Link from "next/link";
import ParamBox from "../../../components/ui/param-box.tsx";

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col p-10">
      <h1 className="font-Lexend text-3xl font-medium">Paramètres</h1>
      <div className="">
        <ParamBox
          button={
            <Link
              className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5"
              href="/profil"
            >
              Profil
            </Link>
          }
          content="Pour modifier vos informations personnelles comme votre nom, photo de profil et nom d’utilisateur, rendez-vous dans la page Profil"
          inputs={null}
          title="Modifier vos informations"
        />
        <ParamBox
          button={
            <Link
              className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5"
              href="/"
            >
              Confirmer
            </Link>
          }
          content="Votre adresse e-mail actuelle est MAIL@MAIL"
          inputs={
            <div className="flex flex-col gap-5 w-[95%] h-">
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Nouvelle adresse mail"
                type="text"
              />
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Confirmer la nouvelle adresse mail"
                type="text"
              />
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Mot de passe"
                type="password"
              />
            </div>
          }
          title="Modifier votre adresse e-mail"
        />
        <ParamBox
          button={
            <Link
              className="bg-[#3B7DFE] text-white font-lexend rounded-md p-3 mb-5"
              href="/"
            >
              Confirmer
            </Link>
          }
          content={null}
          inputs={
            <div className="flex flex-col gap-5 w-[95%] h-">
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Ancien mot de passe"
                type="password"
              />
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Nouveau mot de passe"
                type="password"
              />
              <input
                className="border-2 w-[100%] rounded p-2"
                placeholder="Confirmer le nouveau mot de passe"
                type="password"
              />
            </div>
          }
          title="Modifier votre mot de passe"
        />
        <ParamBox
          button={
            <Link
              className="bg-[#FF6B6B] text-white font-lexend rounded-md p-3 mb-5"
              href="/"
            >
              Supprimer
            </Link>
          }
          content="Pour modifier vos informations personnelles comme votre nom, photo de profil et nom d’utilisateur, rendez-vous dans la page Profil"
          inputs={null}
          title="Supprimer votre compte"
        />
      </div>
    </div>
  );
}
