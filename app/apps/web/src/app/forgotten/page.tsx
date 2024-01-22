"use client";
import NavBar from "../../components/ui/nav-bar.tsx";
import {useState} from "react";
import {signIn} from "next-auth/react";

export default function Page(): JSX.Element {

    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try {
            setSuccess("Une adresse e-mail contenant un lien de réinitialisation de mot de passe vous a été envoyé.");
            return;
        } catch (error) {
            console.log("Error during login: ", error);
        }
    }

    return <div className="size-full">
        <NavBar/>

        <div className="flex flex-col items-center justify-center bg-white h-[100vh]">
            <h1 className="font-Lexend font-bold text-3xl">Réinitialiser votre mot de passe</h1>
            <p>Saisissez l'adresse e-mail avec laquelle vous vous êtes inscrit. Nous vous enverrons un
                lien pour vous connecter et réinitialiser votre mot de passe.</p>
            <form className="flex flex-col space-y-5 w-1/2 mt-16" onSubmit={handleSubmit}>
                {success && (
                    <div className="border-2 border-green-400 bg-green-100 text-gray-800 text-sm p-3 rounded-md">
                        {success}
                    </div>
                )}
                <input type="email" placeholder="Votre adresse e-mail" className="p-3 rounded-md"
                       style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit" className="bg-blue-500 text-white p-5 rounded-md text-lg">Envoyer un lien
                </button>
            </form>
        </div>

    </div>

}