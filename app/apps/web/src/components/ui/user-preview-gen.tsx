import Image from "next/image";
import type { UserInterface as User } from "../../app/models/user";
import { Card, CardContent } from "./card";

interface UserPreviewProps {
  user: User;
}

export default function UserPreviewGen({ user }: UserPreviewProps):JSX.Element {
  return (
    <Card className="size-[90%]" >
      <CardContent className="flex flex-col items-center p-6 size-full justify-around">
        <Image
          alt={(user.nom.charAt(0) + user.prenom.charAt(0)).toUpperCase()}
          className="rounded-full bg-gray-300 p-[1.2vw] size-[7vw]"
          height={100}
          src="avatar.svg"
          width={100}
        />
        <h3 className="text-center text-xl font-semibold">{user.prenom} {user.nom}</h3>
        <button  className="text-sm text-blue-600" type="button">Visiter le profil</button>
      </CardContent>
    </Card>
  );
}
