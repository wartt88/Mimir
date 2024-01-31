"use client";

import type {FormEvent} from "react";
import {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const {data: session} = useSession();

    if (session) {
        router.replace("/");
    }


    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
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
        <>
        <div className="w-[50%] h-[100vh] -ml-80">
            <img src="/library.png" className="object-cover h-[100vh]" alt=""/>
        </div>
        <div className="w-[50%] h-[100vh] bg-white font-Lexend flex flex-col items-center">
            <div className="flex py-5 w-3/4  mt-16">
                <div className="grow space-x-20 text-2xl">
                    <a href="/login" className="underline underline-offset-8">Se connecter</a>
                    <a href="/register">S'inscrire</a>
                </div>
                <a href="/"><img src="/back.svg" alt=""></img></a>
            </div>
            <form className="flex flex-col space-y-5 w-3/4 mt-16" onSubmit={handleSubmit}>
                {error && (
                    <div className="border-2 border-red-400 bg-red-100 text-gray-800 text-sm p-3 rounded-md">
                        {error}
                    </div>
                )}
                <input type="email" placeholder="Votre adresse e-mail" className="p-3 rounded-md"
                       style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Votre mot de passe" className="p-3 rounded-md"
                       style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setPassword(e.target.value)}/>
                <a href="/forgotten" className="self-end text-blue-500">Mot de passe oublié</a>
                <button type="submit" className="bg-blue-500 text-white p-5 rounded-md text-lg">Se connecter
                </button>
                <a href="/register"
                   className="border-2 border-gray-400 text-gray-400 p-5 rounded-md text-md text-center">Pas
                    encore inscrit ? Inscrivez-vous
                </a>
            </form>
        </div>
        </>
    )
                }
    </>)
}
