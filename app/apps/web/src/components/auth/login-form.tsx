"use client";

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            if (res.error) {
                setError("L'adresse e-mail ou le mot de passe n'est pas valide, veuillez réessayer");
                return;
            }

            router.replace("/profil");
        } catch (error) {
            console.log("Error during login: ", error);
        }
    }

  return (
    <div className="flex w-1/2 justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col  bg-gray-200 p-[12%] gap-10 rounded-md">
        <input
          type="text"
          className=" border-gray w-full p-3"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className=" border-gray w-full p-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="grid columns-3 bg-blue-600 p-2 text-white text-4xl rounded-xl font-semibold items-center" type="submit">
          LOGIN
        </button>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <Link className="text-sm mt-3 text-right" href={"/register"}>
          Don't have an account?{" "}
          <span className="underline">Register here</span>
        </Link>
        <div className="hidden space-y-4 ">
          <hr className="border-gray-601" />

          <button className="p-6 text-xl rounded-xl text-white font-bold w-full bg-orange-300">
            LOGIN WITH ARCHE
          </button>
          <button className="p-6 text-xl rounded-xl text-white font-bold w-full bg-rose-400">
            LOGIN WITH GOOGLE
          </button>
          <button className="p-6 text-xl rounded-xl text-white font-bold w-full bg-gray-600">
            LOGIN WITH DISCORD
          </button>
        </div>
    </>
}
