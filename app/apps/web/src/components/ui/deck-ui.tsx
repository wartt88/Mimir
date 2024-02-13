"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import type {DeckInterface} from "../../models/deck";
import {fetchUserById} from "../../models/userRequests.ts";
import type {UserInterface} from "../../models/user.ts";
import ContactModal from "../../app/(sidebar)/contact/contact-modal.tsx";
import {Modal} from "./modal";
import type {TagProps} from "./tags.tsx";
import {Tag, ImgTag} from "./tags.tsx"

interface DeckUiProps {
    type: "public" | "perso" | "stats" | "import";
    deck: DeckInterface;
}

export default function DeckUI({type, deck}: DeckUiProps): JSX.Element {
    const router = useRouter();
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const toggleModalShare = (): void => {
        setIsModalOpenShare(!isModalOpenShare);
    };

    const toggleModalDelete = (): void => {
        setIsModalOpenDelete(!isModalOpenDelete);
    };

    const handleLink = (): void => {
        let url = "/decks";
        switch (type) {
            case "perso":
                url = `/q&a?id=${deck._id}`;
                break;
            case "public":
                url = `/q&a?id=${deck._id}`;
                break;
            case "stats":
                url = "/";
                break;
            case "import":
                url = `/explore/import?id=${deck._id}`;
                break;
        }
        router.push(url);
    };

    const handleEdit = (): void => {
        const url = `/newDeck?id=${deck._id}`;
        router.push(url);
    };

    return (
        <div className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
            <button className="flex-grow text-start" onClick={handleLink} type="button">
                <div className="space-y-1 size-full">
                    <p className="font-Lexend font-medium text-lg truncate">{deck.title}</p>
                    <div className="flex space-x-1">
                        {deck.tags.length !== 0 ? (
                            deck.tags.map((tag, index) => (
                                <Tag deck={deck} key={index} title={tag}/>
                            ))
                        ) : (
                            <p className="text-[80%]"> No Tags</p>
                        )}
                    </div>
                </div>
            </button>
            {type === "perso" && (
                <FooterPerso
                    handleDelete={toggleModalDelete}
                    handleEdit={handleEdit}
                    handleShare={toggleModalShare}
                    isDelete={isModalOpenDelete}
                    isShare={isModalOpenShare}
                    deck={deck}
                />
            )}
            {type === "public" && <FooterPublic currentDeck={deck}/>}
            {type === "import" && <FooterPublic currentDeck={deck}/>}
            {type === "stats" && <FooterStats/>}
        </div>
    );
}

function FooterPerso({
                         handleEdit,
                         handleShare,
                         isShare,
                         handleDelete,
                         isDelete,
                         deck,
                     }: {
    handleEdit: () => void;
    handleShare: () => void;
    isShare: boolean;
    handleDelete: () => void;
    isDelete: boolean;
    deck: DeckInterface;
}): JSX.Element {
    return (
        <div className="flex">
            <div className="grow">
                <ImgTag
                    img={{src: "/pages.svg", alt: "", width: 20, height: 20}}
                    title={deck.cards.length.toString()}
                />
            </div>
            <div className="flex">

                <button onClick={handleEdit}>
                    <Image
                        alt="Editer"
                        className="mx-px"
                        height={20}
                        src="edit2.svg"
                        width={20}
                    />
                </button>

                <button onClick={handleShare} type="button">
                    <Image
                        alt="Partager"
                        className="mx-px"
                        height={20}
                        src="/share.svg"
                        width={20}
                    />
                </button>

                <Modal isOpen={isShare} onClose={handleShare}>
                    <ContactModal deck={deck}/>
                </Modal>

                <button onClick={handleDelete} type="button">
                    <Image
                        alt="Supprimer"
                        className="mx-px"
                        height={20}
                        src="/delete.svg"
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

interface FooterPublicProps {
    currentDeck: DeckInterface
}

function FooterPublic({currentDeck}: FooterPublicProps): JSX.Element {

    const [user, setUser] = useState<UserInterface>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const userPromise = fetchUserById(currentDeck.owner_id);
            userPromise.then((us) => { setUser(us); });
            setLoaded(true);
        }
    }, [loaded]);


    return (
        <div className="flex justify-between">
            <div>
                <ImgTag
                    img={{src: "/profil2.svg", alt: "", width: 25, height: 25}}
                    title={user?.username || "Anonyme"}
                />
            </div>
            <div className="flex gap-2">
                <ImgTag
                    img={{src: "/upvote.svg", alt: "", width: 20, height: 20}}
                    title={currentDeck.votes.up.toString()}
                />
                <ImgTag
                    img={{src: "/downvote.svg", alt: "", width: 20, height: 20}}
                    title={currentDeck.votes.down.toString()}
                />
            </div>
            <ImgTag
                img={{src: "/pages.svg", alt: "", width: 20, height: 20}}
                title={currentDeck.cards.length.toString()}
            />
        </div>
    );
}

function FooterStats(): JSX.Element {
    //TODO later stats
    return (
        <div className="flex justify-between items-center">
            <ImgTag
                img={{src: "/pages.svg", alt: "", width: 20, height: 20}}
                title="20"
            />
        </div>
    );
}

export type {TagProps}
export {Tag}
