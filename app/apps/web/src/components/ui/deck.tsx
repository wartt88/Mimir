import React, { useState } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";
import type { DeckInterface } from "../../models/deck";
import { Modal } from "./modal";

interface TagProps {
  title: string;
  color: string;
}

function Tag({ title, color }: TagProps): JSX.Element {
  return (
    <div
      className="w-fit px-2 py-1 rounded-full"
      style={{ backgroundColor: color }}
    >
      <p className="font-Lexend font-medium text-xs">{title}</p>
    </div>
  );
}

interface ImgTagProps {
  title: string;
  img: ImageProps;
}

function ImgTag({ title, img }: ImgTagProps): JSX.Element {
  return (
    <div className="flex items-center space-x-1 w-fit">
      <Image
        alt={img.alt}
        height={img.height}
        src={img.src}
        width={img.width}
      />
      <p className="font-Lexend font-medium text-sm">{title}</p>
    </div>
  );
}

interface DeckUiProps {
  type: "public" | "perso" | "stats";
  deck: DeckInterface;
}

export default function DeckUI({type,deck}: DeckUiProps): JSX.Element {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenShare, setIsModalOpenShare] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const toggleModalEdit = (): void => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const toggleModalShare = (): void => {
    setIsModalOpenShare(!isModalOpenShare);
  };

  const toggleModalDelete = (): void => {
    setIsModalOpenDelete(!isModalOpenDelete);
  };

  return (
    <div className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
      <Link className="flex-grow" href="/deck/id/">
        <div className="space-y-1">
          <p className="font-Lexend font-medium text-lg">{deck.title}</p>
          <div className="flex space-x-1">
            {
                deck.tags.map((e,index)=><Tag color="#feefa3" key={index} title={e} />)
            }
            
          </div>
        </div>
      </Link>
      {type === "perso" && (
        <FooterPerso
          handleDelete={toggleModalDelete}
          handleEdit={toggleModalEdit}
          handleShare={toggleModalShare}
          isDelete={isModalOpenDelete}
          isEdit={isModalOpenEdit}
          isShare={isModalOpenShare}
          nbCards={deck.cards.length}
        />
      )}
      {type === "public" && <FooterPublic />}
      {type === "stats" && <FooterStats />}
    </div>
  );
}

function FooterPerso({
  handleEdit,
  isEdit,
  handleShare,
  isShare,
  handleDelete,
  isDelete,
  nbCards,
}: {
  handleEdit: () => void;
  isEdit: boolean;
  handleShare: () => void;
  isShare: boolean;
  handleDelete: () => void;
  isDelete: boolean;
  nbCards: number;
}): JSX.Element {
  return (
    <div className="flex">
      <div className="grow">
        <ImgTag
          img={{ src: "pages.svg", alt: "", width: 20, height: 20 }}
          title={nbCards.toString()}
        />
      </div>
      <div className="flex">
        <button onClick={handleEdit} type="button">
          <Image
            alt="Editer"
            className="mx-px"
            height={20}
            src="edit2.svg"
            width={20}
          />
        </button>

        <Modal isOpen={isEdit} onClose={handleEdit}>
          <p> No data to edit yet </p>
        </Modal>

        <button onClick={handleShare} type="button">
          <Image
            alt="Partager"
            className="mx-px"
            height={20}
            src="share.svg"
            width={20}
          />
        </button>

        <Modal isOpen={isShare} onClose={handleShare}>
          <p> No data to share yet </p>
        </Modal>

        <button onClick={handleDelete} type="button">
          <Image
            alt="Supprimer"
            className="mx-px"
            height={20}
            src="delete.svg"
            width={20}
          />
        </button>

        <Modal isOpen={isDelete} onClose={handleDelete}>
          <p> Voulez-vous vraiment supprimer ce deck ? </p>
          <div className="flex justify-center">
            <button
              className="m-5 p-2 border rounded bg-slate-100"
              type="button"
            >
              Oui
            </button>
            <button
              className="m-5 p-2 border rounded bg-slate-100"
              onClick={handleDelete}
              type="button"
            >
              Non
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

function FooterPublic(): JSX.Element {
  return (
    <div className="flex">
      <div className="grow">
        <ImgTag
          img={{ src: "profil2.svg", alt: "", width: 25, height: 25 }}
          title="auteur"
        />
      </div>
      <ImgTag
        img={{ src: "pages.svg", alt: "", width: 20, height: 20 }}
        title="20"
      />
    </div>
  );
}

function FooterStats(): JSX.Element {
  //TODO later stats
  return (
    <div className="flex justify-between items-center">
      <ImgTag
        img={{ src: "pages.svg", alt: "", width: 20, height: 20 }}
        title="20"
      />
    </div>
  );
}
