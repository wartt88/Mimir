import type { UserInterface as User } from "../../app/models/user";

interface UserPreviewProps {
  user: User;
  inList: (contact: User) => void;
  alreadyChecked: boolean;
}

export default function UserPreviewShare({
  user,
  inList,
  alreadyChecked,
}: UserPreviewProps): JSX.Element {
  const toggleCheck = (): undefined => {
    inList(user);
  };

  return (
    <button className={`flex rounded-lg items-center h-[5vh] px-[2%] gap-x-2 font-semibold ${
        alreadyChecked ? "bg-blue-500 text-white" : "bg-gray-300"
      }`}
      onClick={toggleCheck}
      type="button"
    >
      <div className="rounded-full icoShare size-[4vh]" />
      <h3 className="flex-1">
        {user.prenom} {user.nom}
      </h3>
    </button>
  );
}
