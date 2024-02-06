"use client";
import type { UserInterface } from "../../../../models/user";
import UserInfosView from "./user-infos-view";
import UserDecks from "../user-decks";

export default function UserProfileView({
  user,
}: Readonly<{ user: UserInterface }>): JSX.Element {
  return (
    <div className="size-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col size-full bg-gray-100 items-center gap-3 ml-64">
        <UserInfosView user={user} />
        <hr className="border-gray-200 w-full" />
        <UserDecks user={user} />
      </div>
    </div>
  );
}
