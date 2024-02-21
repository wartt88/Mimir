"use client";
import { isNullOrUndefined } from "util";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserInterface } from "../../../../models/user";
import {
  fetchCurrentUser,
  updateCurrentUser,
} from "../../../../models/userRequests";
import NavBar from "../../../../components/ui/nav-bar";
import Loader from "../../../../components/ui/loader";

export default function Page({
  params,
}: {
  params: { token: string };
}): JSX.Element {
  const urltoken: string[] = params.token.split("-");
  const router = useRouter();
  const [link, setLink] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (urltoken.length === 2) {
      void (async () => {
        const user: UserInterface = await fetchCurrentUser(urltoken[0]);
        if (
          !isNullOrUndefined(user.tmpToken) &&
          user.tmpToken === urltoken[1]
        ) {
          //maj dans la bdd
          user.checkEmail = true;
          user.tmpToken = undefined;
          
          await updateCurrentUser(user.email, user);

          setLink(true);
        } else {
          router.push("/login/verif");
        }
        setLoaded(true);
      })();
    }
  }, []);

  function handleSubmit(): void {
    //changement de page
    router.push("/login");
  }

  return (
    <div className="size-full">
      <NavBar />
      {loaded ? (
        <div className="flex flex-col items-center justify-center bg-white h-[100vh]">
          <h1 className="font-Lexend font-bold text-3xl">
            Vérification de votre adresse mail réussie !
          </h1>
          {link ? (
            <div className="flex flex-col space-y-5 w-1/2 mt-16">
              <button
                className="bg-blue-500 text-white p-5 rounded-md text-lg"
                onClick={handleSubmit}
                type="button"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <p>Ce lien a expiré !</p>
          )}
        </div>
      ) : (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
