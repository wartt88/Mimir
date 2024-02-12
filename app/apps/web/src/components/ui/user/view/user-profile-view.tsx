"use client";
import type { UserInterface } from "../../../../models/user";
import UserInfosView from "./user-infos-view";
import UserDecks from "../user-decks";

export default function UserProfileView({
  user,
}: Readonly<{ user: UserInterface }>): JSX.Element {
  return (
      <>
        <UserInfosView user={user} />
        <hr className="border-gray-200 w-full" />
        <UserDecks user={user} />
      </>
  );
}
