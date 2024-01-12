import { Card, CardContent } from "./card";

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
}

export default function UserPreviewGen({ user }: UserPreviewProps):JSX.Element {
  return (
    <Card className="size-[90%]" >
      <CardContent className="flex flex-col items-center p-6 size-full justify-around">
        <img
          alt={(user.nom.charAt(0) + user.prenom.charAt(0)).toUpperCase()}
          className="rounded-full bg-gray-300 p-[1.2vw] size-[7vw]"
          src="avatar.svg"
        />
        <h3 className="text-center text-xl font-semibold">{user.prenom} {user.nom}</h3>
        <button type="button" className="text-sm text-blue-600">Visiter le profil</button>
      </CardContent>
    </Card>
  );
}
