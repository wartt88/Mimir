'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { UserInterface } from "../../../models/user";
import { fetchCurrentUser, updateCurrentUser } from "../../../models/userRequests";
import { AvatarImage, AvatarFallback, Avatar } from "../avatar";
import { Button } from "../button";
import Image from "next/image"; // Import the 'Image' component from 'next/image'

export default function UserEdit(): JSX.Element {
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.email) {
        setEmail(session.user.email);
        setLoading(true);
      }
    }
  }, [session]);

  useEffect(() => {
    if (email && loading) {
      void (async () => {
        const res = fetchCurrentUser(email);
        setUser(await res);
      })();
    }
  }, [email, loading]);


  const handleUpdatedProfile = async (e: Event) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const bio = (document.getElementById("bio") as HTMLInputElement).value;

    // use the current user to update the user

    const updatedUser: UserInterface = {
      ...user,
      username: username,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    };
    console.log("updated user: ", updatedUser);

    const res = await updateCurrentUser(email, updatedUser);
    console.log("res: ", res)


    router.push("/profile");
  }
  return (
    <>
      {!user && <p> error loading session </p>}
      {user ? (

        <div className="flex flex-col">
          <div className="relative h-[200px] bg-gray-300 overflow-hidden">
            <Image
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
              height={200} // Use curly braces to pass the height as a number
              src="/banner.jpg" // Update the image source path
              style={{
                aspectRatio: "800/200",
                objectFit: "cover",
              }}
              width={800} // Use curly braces to pass the width as a number
            />
          </div>
          <div className="flex flex-col  mx-10">
            <div className="flex items-end justify-between">
              <div className="relative -top-14 ">
                <Avatar className="h-28 w-28 border-2 border-gray-100">
                  <AvatarImage alt="pdp" src="pdp" />
                  <AvatarFallback>Pfp</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-1 align-center">
                <Button
                  className="relative"
                  form="edit-profile"
                  onClick={handleUpdatedProfile}
                  type="submit"
                >
                 Save changes 
                </Button>
              </div>
            </div>
            <form className="relative -top-5 size-1/2 space-y-7"
              id="edit-profile"
              onSubmit={(e) => {console.log("submitting form"); e.preventDefault();}}
              >
              <h2 className="text-2xl font-bold">{email} </h2>
              <label className="block">
                <span className="text-gray-700">Username</span>
                <input
                  className="form-input mt-1 block w-full"
                  defaultValue={user.username}
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">First name</span>
                <input
                  className="form-input mt-1 block w-full"
                  defaultValue={user.firstName}
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Last name</span>
                <input
                  className="form-input mt-1 block w-full"
                  defaultValue={user.lastName}
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Bio</span>
                <textarea
                  className="form-input mt-1 block w-full h-48 resize-none"
                  defaultValue={user.bio}
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  type="text"
                />
              </label>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
