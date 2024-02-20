"use client";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";

export default function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const ref = createRef<HTMLInputElement>();
  const router = useRouter();

  function handleSubmit(): void {
    if(ref.current?.checkValidity()){
        //envoie du lien par mail et maj de la bdd
        fetch(`/api/send/welcome/${email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }).catch((err) => {
          console.error(err);
        });
      
        //changement de page => se connecter
        router.push("/login");
    }
  }

  return (
    <div>
      <p>
        Afin de continuer votre expérience MIMIR, vous devez faire vérifier
        votre adresse mail. Consulter votre boite mail afin de finaliser
        l&apos;opération. Si aucun mail n&apos; a été reçu, redemandez-en un
        ci-dessous :
      </p>
      <input
      className="p-3 rounded-md bg-[#F6F7FB]"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Adresse à vérifier"
        ref={ref}
        type="email"
      />
      <button
        className="bg-blue-500 text-white p-5 rounded-md text-lg"
        onClick={handleSubmit}
        type="button"
      >
        Cliquez pour un nouveau lien
      </button>
    </div>
  );
}
