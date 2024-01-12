interface User {
  id: number;
  nickname: string;
  nom: string;
  prenom: string;
  deck: string[];
  contacts: User[];
}

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
  const toggleCheck = () : undefined => {
    inList(user);
  };

  const getCss = () : string => {
    const retour =
      "flex rounded-lg flex items-center h-[5vh] px-[2%] gap-x-2 font-semibold " +
      (alreadyChecked ? "bg-blue-500 text-white" : "bg-gray-300");
    return retour;
  };

  return (
        <div className={getCss()} onClick={toggleCheck}>
          <img
            alt={(user.nom.charAt(0) + user.prenom.charAt(0)).toUpperCase()}
            className="rounded-full bg-gray-300 p-1"
            src="avatar.svg"
          />
          <h3 className="flex-1">
            {user.prenom} {user.nom}
          </h3>
        </div>
  );
}
