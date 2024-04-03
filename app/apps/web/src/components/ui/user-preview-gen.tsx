import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  addContactCurrentUser,
  deleteContactCurrentUser,
} from "../../models/user-requests.ts";
import type { Response } from "../../models/user-requests.ts";
import type { UserInterface as User } from "../../models/user";

interface UserPreviewProps {
  user: User;
  type: "friend" | "user";
}

export default function UserPreviewGen({
  user,
  type,
}: UserPreviewProps): JSX.Element {
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState<Response>({ ok: false, text: "" });

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (session?.user) {
      if (session.user.email) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  const addFriend = (): void => {
    const dataPromise = addContactCurrentUser(email, user.email);
    dataPromise
      .then((data) => {
        setResponse(data);
        setTimeout(() => {
          setHidden(true);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error while removing friend: ", err);
      });
  };

  const removeFriend = (): void => {
    const dataPromise = deleteContactCurrentUser(email, user.email);
    dataPromise
      .then((data) => {
        setResponse(data);
        setTimeout(() => {
          setHidden(true);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error while removing friend: ", err);
      });
  };

  const jsx = (
    <div className="bg-white flex rounded-lg shadow border px-10 py-5">
      <Link className="flex grow space-x-5" href={`/profile/${user.username}`}>
        <Image
          alt={user.username}
          className="rounded-full"
          height={100}
          src="/avatar.svg"
          width={100}
        />
        <div className="flex flex-col justify-center">
          <h3 className="font-Lexend text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="font-Lexend text-xl text-gray-500">@{user.username}</p>
        </div>
      </Link>
      {type === "friend" ? (
        <div className="flex flex-row items-center space-x-5">
          {response.ok ? (
            <p className="font-Lexend text-xl text-green-500 text-center">
              {response.text}
            </p>
          ) : (
            <p className="font-Lexend text-xl text-red-500 text-center">
              {response.text}
            </p>
          )}
          <Image
            alt=""
            className="h-fit self-center cursor-pointer"
            height={32}
            onClick={removeFriend}
            src="/remove_friend.svg"
            width={32}
          />
        </div>
      ) : (
        <div className="flex flex-row items-center space-x-5">
          {response.ok ? (
            <p className="font-Lexend text-xl text-green-500 text-center">
              {response.text}
            </p>
          ) : (
            <p className="font-Lexend text-xl text-red-500 text-center">
              {response.text}
            </p>
          )}
          <Image
            alt=""
            className="h-fit self-center cursor-pointer"
            height={32}
            onClick={addFriend}
            src="/addBlack.svg"
            width={32}
          />
        </div>
      )}
    </div>
  );

  return hidden ? <div /> : jsx;
}
