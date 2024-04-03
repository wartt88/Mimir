"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { UserInterface } from "../../models/user";

export default function RegisterForm(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.replace("/dashboard");
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Veuillez remplir tous les champs nécessaires");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { user }: { user: UserInterface | undefined } =
        (await resUserExists.json()) as { user: UserInterface };

      if (typeof user !== "undefined") {
        setError(
          "Cet adresse e-mail est déjà utilisée, veuillez en choisir une autre."
        );
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login");
      } else {
        console.error("User registration failed");
      }
    } catch (err) {
      console.log("Error during registration: ", err);
    }
  };

  return (
    <div className="flex">
      <div className="min-w-[50%] h-[100vh] hidden lg:block">
        <img alt="" className="object-cover h-[100vh]" src="/library.png" />
      </div>
      <div className="w-full lg:min-w-[50%] h-[100vh] bg-white font-Lexend flex flex-col items-center">
        <div className="flex py-5 w-3/4  mt-16">
          <div className="grow space-x-20 text-2xl">
            <Link href="/login">Se connecter</Link>
            <Link className="underline underline-offset-8" href="/register">
              S&apos;inscrire
            </Link>
          </div>
          <Link href="/">
            <img alt="" src="/back.svg" />
          </Link>
        </div>
        <form
          className="flex flex-col space-y-5 w-3/4 mt-16"
          onSubmit={(e) => {
            handleSubmit(e).catch((err) => {
              err;
            });
          }}
        >
          {error ? (
            <div className="border-2 border-red-400 bg-red-100 text-gray-800 text-sm p-3 rounded-md">
              {error}
            </div>
          ) : null}
          <input
            className="p-3 rounded-md"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Votre nom d'utilisateur"
            style={{ backgroundColor: "#F6F7FB" }}
            type="text"
          />
          <input
            className="p-3 rounded-md"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Votre adresse e-mail"
            style={{ backgroundColor: "#F6F7FB" }}
            type="email"
          />
          <input
            className="p-3 rounded-md"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Votre mot de passe"
            style={{ backgroundColor: "#F6F7FB" }}
            type="password"
          />
          <span />
          <p className="text-gray-400 text-sm">
            En vous inscrivant, vous acceptez les{" "}
            <Link className="font-bold underline text-blue-500" href="/cgu">
              {" "}
              condition d&apos;utilisation
            </Link>
          </p>
          <button
            className="bg-blue-500 text-white p-5 rounded-md text-lg"
            type="submit"
          >
            S&apos;inscrire
          </button>
          <Link
            className="border-2 border-gray-400 text-gray-400 p-5 rounded-md text-md text-center"
            href="/login"
          >
            Vous avez déjà un compte ? Se connecter
          </Link>
        </form>
      </div>
    </div>
  );
}
