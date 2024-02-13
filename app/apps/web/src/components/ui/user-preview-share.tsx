import Image from "next/image";
import type {MouseEvent} from "react";
import {useState} from "react";
import type {UserInterface as User} from "../../models/user";
import type {ContactData} from "../../models/share-request.ts";

interface UserPreviewShareProps {
    user: User;
    contactData: ContactData;
}


export default function UserPreviewShare({user, contactData}: UserPreviewShareProps): JSX.Element {

    const [selected, setSelected] = useState(false);
    const [editor, setEditor] = useState(false);

    const handleSelect = (_: MouseEvent<HTMLButtonElement>): void => {
        contactData.selected = !selected;
        setSelected(!selected);
    }

    const handleEditor = (_: MouseEvent<HTMLButtonElement>): void => {
        contactData.editor = !editor;
        setEditor(!editor);
    }

    const selectedBgJsx = selected ? "bg-blue-500" : "bg-white";
    const selectedTextJsx = selected ? "text-white" : "text-black";
    const selectedSubtextJsx = selected ? "text-gray-200" : "text-gray-500";

    return (
        <div className={`${selectedBgJsx} flex rounded-lg shadow border items-center p-5 w-full`}>
            <button className="flex space-x-3 items-center grow" onClick={handleSelect} type="button">
                <div>
                    <Image alt={user.username} className="rounded-full" height={64}
                           src="/avatar.svg" width={64}/>
                </div>
                <div className={`flex flex-col justify-center text-left ${selectedTextJsx}`}>
                    <h3 className="font-Lexend text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className={`font-Lexend text-xl ${selectedSubtextJsx}`}>@{user.username}</p>
                </div>
            </button>
            <button className="space-x-2 font-Lexend py-2 px-3 shadow border rounded-lg bg-white" onClick={handleEditor}
                    type="button">
                <span>{editor ? "Éditeur" : "Lecteur"}</span>
            </button>
        </div>
    );
}
