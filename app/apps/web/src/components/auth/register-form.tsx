"use client";

import {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RegisterForm(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
      router.replace("/");
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("sumb")
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Veuillez remplir tous les champs nécessaires");
      return;
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      })

      const {user} = await resUserExists.json();

      if (user) {
        setError("Cet adresse e-mail est déjà utilisée, veuillez en choisir une autre.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password}),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");

      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  }

  return <>
    <div className="w-[50%] h-[100vh] -ml-80">
      <img src="/library.png" className="object-cover h-[100vh]" alt=""/>
    </div>
    <div className="w-[50%] h-[100vh] bg-white font-Lexend flex flex-col items-center">
      <div className="flex py-5 w-3/4  mt-16">
        <div className="grow space-x-20 text-2xl">
          <Link href="/login">Se connecter</Link>
          <Link href="/register" className="underline underline-offset-8">S&apos;inscrire</Link>
        </div>
        <Link href="/accueil"><img src="/back.svg" alt=""></img></Link>
      </div>
      <form className="flex flex-col space-y-5 w-3/4 mt-16" onSubmit={handleSubmit}>
        {error && (
            <div className="border-2 border-red-400 bg-red-100 text-gray-800 text-sm p-3 rounded-md">
              {error}
            </div>
        )}
        <input type="text" placeholder="Votre nom d'utilisateur" className="p-3 rounded-md"
               style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Votre adresse e-mail" className="p-3 rounded-md"
               style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Votre mot de passe" className="p-3 rounded-md"
               style={{backgroundColor: "#F6F7FB"}} onChange={(e) => setPassword(e.target.value)}/>
        <span></span>
        <p className="text-gray-400 text-sm">En vous inscrivant, vous acceptez les <Link className="font-bold underline text-blue-500" href="/cgu"> condition d'utilisation</Link></p>
        <button type="submit" className="bg-blue-500 text-white p-5 rounded-md text-lg">S'inscrire</button>
        <Link href="/login"
           className="border-2 border-gray-400 text-gray-400 p-5 rounded-md text-md text-center">Vous avez déjà
          un compte ? Se connecter
        </Link>
      </form>
    </div>
  </>
}
