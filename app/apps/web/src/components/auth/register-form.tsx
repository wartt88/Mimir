/* eslint-disable @typescript-eslint/no-confusing-void-expression */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: Event) => {
    console.log("sumb")
    e.preventDefault();

    if (!username|| !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const {user} = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");

      }
      else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  }
  
  return (
    <div className="flex size-full">
      <div className="w-1/2 flex justify-center py-[10vh] flex-col items-center">
        <h1 className="text-9xl ">Mimir</h1>
        <img className="4/4" src="loginImg.jpg" alt="loginImg" />
      </div>
      <form className="flex flex-col w-1/2 bg-gray-200 p-[12%] gap-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className=" border-gray w-full p-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
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
        <button className="grid columns-3 bg-blue-600 p-5 text-white text-6xl place-items-center rounded-xl font-semibold" 
        type="submit"
        >
          SIGN UP
        </button>

        { error && (
          <div
            className="bg-red-500 text-white w-fit
        text-sm py-1 px-3 rounded-md mt-2"
          >
            {error}
          </div>
        )
        }
      </form>
    </div>
  );
}
