import UserInfos from "./user-infos";
import UserDecks from "./user-decks";

export default function UserFullProfile(): JSX.Element {
  return (
      <div className="flex flex-col size-full bg-gray-100 ">
        <UserInfos />
        <hr className="border-gray-601" />
        <UserDecks />
      </div>
  );
}
