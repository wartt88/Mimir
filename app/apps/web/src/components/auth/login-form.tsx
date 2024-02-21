"use client";

import type {FormEvent} from "react";
import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {fetchCurrentUser} from "../../models/userRequests";

interface Provider {
    callbackUrl: string;
    id: string;
    name: string;
    signInUrl: string;
    type: string;
}

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const {data: session} = useSession();

    if (session) {
        router.replace("/dashboard");
    }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            // si l'addresse est en verif ou non
            const user = await fetchCurrentUser(email);
            if (!user.checkEmail) {
                router.push("/login/verif");
                return;
            }


            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            if (res?.error) {
                setError("L'adresse e-mail ou le mot de passe n'est pas valide, veuillez réessayer");
                return;
            }

            router.replace("/profile");
        } catch (err) {
            console.log("Error during login: ", err);
        }
    }


    return (
        <>
            {!session && (
                <div className="flex">
                    <div className="hidden lg:block min-w-[50%] h-[100vh]">
                        <img alt="" className="object-cover h-[100vh]" src="/library.png"/>
                    </div>
                    <div className="w-full lg:min-w-[50%] h-[100vh] bg-white font-Lexend flex flex-col items-center">
                        <div className="flex py-5 w-3/4  mt-16">
                            <div className="grow space-x-20 text-2xl">
                                <Link className="underline underline-offset-8" href="/login">Se connecter</Link>
                                <Link href="/register">S&apos;inscrire</Link>
                            </div>
                            <Link href="/"><img alt="" src="/back.svg"/></Link>
                        </div>
                        <form className="flex flex-col space-y-5 w-3/4 mt-16" onSubmit={handleSubmit}>
                            {error ? <div
                                className="border-2 border-red-400 bg-red-100 text-gray-800 text-sm p-3 rounded-md">
                                {error}
                            </div> : null}
                            <input className="p-3 rounded-md" onChange={(e) => {
                                setEmail(e.target.value);
                            }} placeholder="Votre adresse e-mail"
                                   style={{backgroundColor: "#F6F7FB"}} type="email"/>
                            <input className="p-3 rounded-md" onChange={(e) => {
                                setPassword(e.target.value);
                            }} placeholder="Votre mot de passe"
                                   style={{backgroundColor: "#F6F7FB"}} type="password"/>
                            <Link className="self-end text-blue-500" href="/reset">Mot de passe oublié</Link>
                            <button className="bg-blue-500 text-white p-5 rounded-md text-lg" type="submit">Se connecter
                            </button>
                            <Link className="border-2 border-gray-400 text-gray-400 p-5 rounded-md text-md text-center"
                                  href="/register">Pas
                                encore inscrit ? Inscrivez-vous
                            </Link>
                            <div className="flex space-x-3">
                                <ProviderButton name="Google"/>
                                <ProviderButton name="GitHub"/>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </>)
}

const ProviderButton = ({name}: { name: string }): JSX.Element => {
    return (
        <button className="border-2 border-gray-400 text-gray-400 p-3 rounded-md text-md text-center"
                onClick={() => signIn(name.toLowerCase())}
                type="button">
            <div className="flex items-center justify-center space-x-3">
                <img src={`./${name}.svg`}/>
                <span>Se connecter avec {name}</span>
            </div>
        </button>
    )
}
