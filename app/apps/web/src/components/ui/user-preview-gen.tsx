import Image from "next/image";
import type {UserInterface as User} from "../../models/user";

interface UserPreviewProps {
    user: User;
}

export default function UserPreviewGen({user}: UserPreviewProps): JSX.Element {
    return (
        <div className="bg-white flex justify-between rounded-lg shadow border px-10 py-5">
            <div className="flex space-x-5">
                <Image alt={user.username} className="rounded-full bg-gray-300 p-[1.2vw] size-[7vw]" height={100}
                       src="avatar.svg" width={100}/>
                <div className="flex flex-col justify-center">
                    <h3 className="font-Lexend text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className="font-Lexend text-xl text-gray-500">@{user.username}</p>
                </div>
            </div>
            <Image alt="" height={32} src="/remove_friend.svg" width={32}/>
        </div>

    );
}
