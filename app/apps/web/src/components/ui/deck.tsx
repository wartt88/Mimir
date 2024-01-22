import React, { useState } from 'react';
import { cn } from "../../lib/utils"
import Image from "next/image"
import Link from "next/link";
import { Modal } from "./modal"

const DeckUIPerso = () => {

    const [isModalOpenEdit, setModalOpenEdit] = useState(false);
    const [isModalOpenShare, setModalOpenShare] = useState(false);
    const [isModalOpenDelete, setModalOpenDelete] = useState(false);

  const openModalEdit = () => {
    setModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setModalOpenEdit(false);
  };

  const openModalShare = () => {
    setModalOpenShare(true);
  };

  const closeModalShare = () => {
    setModalOpenShare(false);
  };

  const openModalDelete = () => {
    setModalOpenDelete(true);
  };

  const closeModalDelete = () => {
    setModalOpenDelete(false);
  };

    return <div className="rounded border-0  bg-white m-2 h-[120px] w-[220px] flex flex-col">
        <Link href="http://localhost:3000/deck/id/">
            <div className="m-[12px]"> 
                <p className="font-[Lexend] font-semibold"> Test </p>
                <div>
                   <span className="font-[Lexend] font-normal ml-[5px] bg-yellow-300 bg-opacity-50 px-1 rounded"> tag </span>
                </div>
            </div>
        </Link>
        <div className="flex justify-between h-[15px] mt-auto m-[15px]">
            <div className="flex items-center">
                <Image
                 alt="Nombres de pages"
                 className=""
                 width={20}
                 height={20}
                 src="pages.svg"
                />
                <h5 className="text-[12px]"> 20 </h5>
            </div>
            <div className="flex">
                <button onClick={openModalEdit}>
                    <Image
                    alt="Editer"
                    className="mx-px"
                    width={18}
                    height={20}
                    src="edit2.svg"
                    />
                </button>

                <Modal isOpen={isModalOpenEdit} onClose={closeModalEdit}>
                    <p> No data to edit yet </p>
                </Modal>
                
                <button onClick={openModalShare}>
                    <Image
                    alt="Partager"
                    className="mx-px"
                    width={20}
                    height={20}
                    src="share.svg"
                    />
                </button>

                <Modal isOpen={isModalOpenShare} onClose={closeModalShare}>
                    <p> No data to share yet </p>
                </Modal>
            
                <button onClick={openModalDelete}>
                    <Image
                     alt="Supprimer"
                     className="mx-px"
                     width={20}
                     height={20}
                     src="delete.svg"
                    />
                </button>

                <Modal isOpen={isModalOpenDelete} onClose={closeModalDelete}>
                    <p> Voulez-vous vraiment supprimer ce deck ? </p>
                    <div className='flex justify-center'>
                        <button className='m-5 p-2 border rounded bg-slate-100'>
                            Oui
                        </button>
                        <button onClick={closeModalDelete} className='m-5 p-2 border rounded bg-slate-100'>
                            Non
                        </button>
                    </div>
                </Modal>

            </div>
        </div>
    </div>
}

const DeckUIPublic = () => {
    return <div className="rounded border-0  bg-white m-2 h-[120px] w-[220px] flex flex-col">
        <a href="http://localhost:3000/deck/id/">
            <div className="m-[12px]"> 
                <p className="font-[Lexend] font-semibold"> Test </p>
                <div>
                   <span className="font-[Lexend] font-normal ml-[5px] bg-yellow-300 bg-opacity-50 px-1 rounded"> tag </span>
                </div>
            </div>
        </a>
        <div className="flex justify-between h-[15px] mt-auto m-[15px]">
            <div className="flex items-center">
                <Image
                 alt=""
                 className="mr-[5px]"
                 width={20}
                 height={20}
                 src="profil2.svg"
                />
                <h5 className="text-[12px]"> Mijatovic Y. </h5>
            </div>
            <div className="flex items-center">
                <Image
                 alt="Nombres de pages"
                 className=""
                 width={20}
                 height={20}
                 src="pages.svg"
                />
                <h5 className="text-[12px]"> 20 </h5>
            </div>
        </div>
    </div>
}

export { DeckUIPerso, DeckUIPublic }