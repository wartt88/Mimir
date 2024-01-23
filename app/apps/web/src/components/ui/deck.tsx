import React, {useState} from 'react';
import {cn} from "../../lib/utils"
import Image, {ImageProps} from "next/image"
import Link from "next/link";
import {Modal} from "./modal"

const DeckUIPersonnel = () => {

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
                    <span
                        className="font-[Lexend] font-normal ml-[5px] bg-yellow-300 bg-opacity-50 px-1 rounded"> tag </span>
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

const DeckUIPublique = () => {
    return <div className="rounded border-0  bg-white m-2 h-[120px] w-[220px] flex flex-col">
        <a href="http://localhost:3000/deck/id/">
            <div className="m-[12px]">
                <p className="font-[Lexend] font-semibold"> Test </p>
                <div>
                    <span
                        className="font-[Lexend] font-normal ml-[5px] bg-yellow-300 bg-opacity-50 px-1 rounded"> tag </span>
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

interface TagProps {
    title: string;
    color: string;
}

const Tag = ({title, color}: TagProps) => {
    return <div className="w-fit px-2 py-1 rounded-full" style={{backgroundColor: color}}>
        <p className="font-Lexend font-medium text-xs">{title}</p>
    </div>
}

interface ImgTagProps {
    title: string;
    img: ImageProps;
}

const ImgTag = ({title, img}: ImgTagProps) => {
    return <div className="flex items-center space-x-1 w-fit">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height}/>
        <p className="font-Lexend font-medium text-sm">{title}</p>
    </div>
}

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

    return <div
        className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
        <Link className="flex-grow" href="http://localhost:3000/deck/id/">
            <div className="space-y-1">
                <p className="font-Lexend font-medium text-lg">Titre</p>
                <div className="flex space-x-1">
                    <Tag title="tag" color="#feefa3"/>
                </div>
            </div>
        </Link>
        <div className="flex">
            <div className="grow">
                <ImgTag title="20" img={{src: "pages.svg", alt: "", width: 20, height: 20}}/>
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

    return <div
        className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
        <div className="flex-grow space-y-1">
            <p className="font-Lexend font-medium text-lg">Titre</p>
            <div className="flex space-x-1">
                <Tag title="tag" color="#feefa3"/>
            </div>
        </div>
        <div className="flex">
            <div className="grow">
                <ImgTag title="auteur" img={{src: "profil2.svg", alt: "", width: 25, height: 25}}/>
            </div>
            <ImgTag title="20" img={{src: "pages.svg", alt: "", width: 20, height: 20}}/>
        </div>
    </div>
}

interface DeckUIStatsProps {
    nbCards: number;
    time: string;
    valid: boolean;
    title: string;
    tags: TagProps[];
    ImgTag: ImageProps;
}

const DeckUIStats: React.FC<DeckUIStatsProps> = ({nbCards, time, valid, title , tags}) => {
    return (
        <div className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
            <div className="flex-grow space-y-1">
                <p className="font-Lexend font-medium text-lg">Titre</p>
                <div className="flex space-x-1">
                    <Tag title="tag" color="#feefa3"/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <ImgTag title="20" img={{src: "pages.svg", alt: "", width: 20, height: 20}}/>
                <ImgTag title="??h??m" img={{src: "time.svg", alt: "", width: 20, height: 20}}/>
            </div>
        </div>
    );
}

export {DeckUIPerso, DeckUIPublic}