import UserInfos from "./user-infos";
import UserDecks from "./user-decks";

export default function UserFullProfile(): JSX.Element {
  return (
      <div className="flex flex-col w-full h-screen bg-zinc-100 ">
        <UserInfos />
        <hr className="border-gray-601" />
        <UserDecks />
      </div>
  );
}
