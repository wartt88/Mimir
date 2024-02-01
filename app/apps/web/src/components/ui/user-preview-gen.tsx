import Image from "next/image";
import type {UserInterface as User} from "../../models/user";
import {
    Response,
    addContactCurrentUser,
    fetchContactCurrentUser,
    deleteContactCurrentUser
} from "../../models/userRequests.ts";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

interface UserPreviewProps {
    user: User;
    type: "friend" | "user";
}


export default function UserPreviewGen({user, type}: UserPreviewProps): JSX.Element {

    const {data: session} = useSession();

    const [email, setEmail] = useState("");
    const [response, setResponse] = useState<Response>({ok: false, text: ""});

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (session?.user) {
            if (session?.user?.email) {
                setEmail(session.user.email);
            }
        }
    }, [session]);

    const addFriend = async () => {
        const data = await addContactCurrentUser(email, user.email);
        setResponse(data);
        setTimeout(() => {
            setHidden(true);
        }, 1000);
    }

    const removeFriend = async () => {
        const data = await deleteContactCurrentUser(email, user.email);
        setResponse(data);
        setTimeout(() => {
            setHidden(true);
        }, 1000);
    }

    const jsx = (
        <a href={`/profile/${user.username}`}>
        <div className="bg-white flex rounded-lg shadow border px-10 py-5">
            <div className="flex grow space-x-5">
                <Image alt={user.username} className="rounded-full" height={100}
                       src="/avatar.svg" width={100}/>
                <div className="flex flex-col justify-center">
                    <h3 className="font-Lexend text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className="font-Lexend text-xl text-gray-500">@{user.username}</p>
                </div>
            </div>
            {type === "friend" ?
                <div className="flex flex-row items-center space-x-5">
                    {
                        response.ok ?
                            <p className="font-Lexend text-xl text-green-500 text-center">{response.text}</p>
                            :
                            <p className="font-Lexend text-xl text-red-500 text-center">{response.text}</p>
                    }
                    <Image onClick={removeFriend} className="h-fit self-center" alt="" height={32} src="/remove_friend.svg"
                           width={32}/>
                </div>                :
                <div className="flex flex-row items-center space-x-5">
                    {
                        response.ok ?
                            <p className="font-Lexend text-xl text-green-500 text-center">{response.text}</p>
                            :
                            <p className="font-Lexend text-xl text-red-500 text-center">{response.text}</p>
                    }
                    <Image onClick={addFriend} className="h-fit self-center" alt="" height={32} src="/addBlack.svg"
                           width={32}/>
                </div>
            }
        </div>
        </a>

    );

    return hidden ? <></> : jsx;
}
