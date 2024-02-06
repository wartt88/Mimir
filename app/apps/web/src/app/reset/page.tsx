"use client";
import type {FormEvent} from "react";
import { useState} from "react";
import NavBar from "../../components/ui/nav-bar.tsx";

export default function Page(): JSX.Element {

    const [success, setSuccess] = useState(false);
    const [, setEmail] = useState("");

    function handleSubmit (event: FormEvent) : void {
        event.preventDefault();
        try {
            fetch(`/api/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              }).catch((err) => {
                console.error(err);
              });
            setSuccess(true);
        } catch (error) {
            console.log("Error during login: ", error);
        }
    }

    return <div className="size-full">
        <NavBar/>

        <div className="flex flex-col items-center justify-center bg-white h-[100vh]">
            <h1 className="font-Lexend font-bold text-3xl">Réinitialiser votre mot de passe</h1>
            <p>Saisissez l&apos;adresse e-mail avec laquelle vous vous êtes inscrit. Nous vous enverrons un
                lien pour vous connecter et réinitialiser votre mot de passe.</p>
            <form className="flex flex-col space-y-5 w-1/2 mt-16" onSubmit={handleSubmit}>
                {success ? <p className="border-2 border-green-400 bg-green-100 text-gray-800 text-sm p-3 rounded-md">
                        Un mail contenant un lien de réinitialisation de mot de passe vous a été envoyé.
                    </p> : null}
                <input className="p-3 rounded-md bg-[#F6F7FB]" onChange={(e) => { setEmail(e.target.value); }} placeholder="Votre adresse e-mail"
                     type="email"/>
                <button className="bg-blue-500 text-white p-5 rounded-md text-lg" type="submit">Envoyer un lien
                </button>
            </form>
        </div>

    </div>

}