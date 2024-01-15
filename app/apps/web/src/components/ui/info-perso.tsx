"use client";
import Image from "next/image";
import { useState } from "react";

// fake data
const userMocked = {
  id: 1,
  nickname: "julio",
  nom: "Hirtz",
  prenom: "Jules",
  deck: [],
  contacts: [
    {
      id: 2,
      nickname: "kiziow",
      nom: "Perrot",
      prenom: "Alexandre",
      deck: [],
      contacts: [],
    },
    {
      id: 3,
      nickname: "Oxswing",
      nom: "Mijatovic",
      prenom: "Yann",
      deck: [],
      contacts: [],
    },
    {
      id: 4,
      nickname: "wartt",
      nom: "Pinchon",
      prenom: "Théo",
      deck: [],
      contacts: [],
    },
  ],
};

export default function InfoPerso(): JSX.Element {
  const [editMode, setEditMode] = useState(false);

  const HandleClick = (): void => {
    setEditMode(!editMode);
  };

  const getCssMinus = (): string => {
    let retour = "size-[5vh] border-gray bg-white ";
    if (editMode) retour += "v-hidden";
    return retour;
  };

  return (
    <div className="h-full w-full flex items-start justify-between">
      <div className="border-gray bg-white size-[30vh]">
        <Image alt="profil" height={300} src="avatar.svg" width={300} />
      </div>
      {editMode ? (
        <div className="w-1/2 flex flex-col items-start text-2xl font-semibold h-full gap-[2vh]">
          <div>
            <label htmlFor="nomInput">Nom : </label>
            <input defaultValue={userMocked.nom} id="nomInput" type="text" />
          </div>
          <div>
            <label htmlFor="prenomInput">Prenom : </label>
            <input defaultValue={userMocked.prenom} id="prenomInput" type="text" />
          </div>
          <div>
            <label htmlFor="pseudoInput">Pseudo : </label>
            <input defaultValue={userMocked.nickname} id="pseudoInput" type="text" />
          </div>
          <button
            className="rounded-lg bg-blue-500 text-white p-1 "
            onClick={HandleClick}
            type="button"
          >
            Sauvegarder
          </button>
        </div>
      ) : (
        <div className="w-1/2 flex flex-col items-start text-2xl font-semibold h-full gap-[2vh]">
          <h2>
            <u>Nom :</u> {userMocked.nom} <br/> <u>Prénom :</u> {userMocked.prenom}
          </h2>
          <h2>
            <u>Pseudo :</u> {userMocked.nickname}
          </h2>
        </div>
      )}

      <button className={getCssMinus()} onClick={HandleClick} type="button">
        <Image alt="modif" height={100} src="edit.svg" width={100} />
      </button>
    </div>
  );
}
