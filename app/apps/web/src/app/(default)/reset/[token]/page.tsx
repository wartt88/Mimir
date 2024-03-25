"use client";
import { isNullOrUndefined } from "node:util";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserInterface } from "../../../../models/user";
import NavBar from "../../../../components/ui/nav-bar";
import Loader from "../../../../components/ui/loader";
import { fetchCurrentUser, updatePasswordUser } from "../../../../models/userRequests";

export default function Page({ params }: { params: { token: string } }): JSX.Element {
  const urltoken:string[] = params.token.split("-");
  const router = useRouter();
  const [link, setLink] = useState<boolean>(false);
  const [good, setGood] = useState<boolean>();
  const [user,setUser] = useState<UserInterface>();
  const [passwd, setPasswd] = useState("");
  const [loaded,setLoaded] = useState(false);

  useEffect(() => {
    if (urltoken.length===2) {
      void (async () => {
        const newUser: UserInterface = await fetchCurrentUser(urltoken[0]);
        setUser(newUser);
        setLink(!isNullOrUndefined(newUser.tmpToken) && newUser.tmpToken === urltoken[1])
        setLoaded(true);
      })();
    }
  }, [urltoken]);

  async function handleSubmit():Promise<void> {
    if (good && user) {
        user.password = passwd;
        user.tmpToken = undefined;
        //mise a jour du mot de passe dans la base de données
        await updatePasswordUser(user);
        //changement de page 
        router.push("/login");
    }
  }

  return (
    <div className="size-full">
      <NavBar />
      {loaded?
      <div className="flex flex-col items-center justify-center bg-white h-[100vh]">
        <h1 className="font-Lexend font-bold text-3xl">
          Réinitialisation de votre mot de passe
        </h1>
        {link ? 
        <div
          className="flex flex-col space-y-5 w-1/2 mt-16"
        >
          <input
            className="p-3 rounded-md bg-[#F6F7FB]"
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
            placeholder="Nouveau mot de passe"
            type="password"
          />
          <input
            className="p-3 rounded-md bg-[#F6F7FB]"
            onChange={(e) => {
              setGood(e.target.value === passwd);
            }}
            placeholder="Confirmation du mot de passe"
            type="password"
          />
          {!good ? <p className="border-2 border-red-400 bg-red-100 text-gray-800 text-sm p-3 rounded-md">
              Les mots de passes doivent être identiques.
            </p> : null}
          <button
            className="bg-blue-500 text-white p-5 rounded-md text-lg"
            onClick={() => void handleSubmit()}
            type="button"
          >
            Confirmer la modification
          </button>
        </div>:
        <p>Ce lien a expiré !</p>
      }
      </div>:
      <div className="h-[100vh] w-full flex justify-center items-center"><Loader/></div>}
      
    </div>
  );
}
