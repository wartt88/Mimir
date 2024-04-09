"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AvatarImage, AvatarFallback, Avatar } from "../avatar";
import { Button } from "../button";
import type { UserInterface } from "../../../models/user";

export default function UserInfos({
  user,
}: {
  user: UserInterface | undefined;
}): JSX.Element {
  const router = useRouter();

  return (
    <>
      {!user && <p> error loading session </p>}
      {user ? (
        <div className="flex flex-col mb-11 w-full">
          <div className="relative h-[200px] bg-gray-300 overflow-hidden">
            <Image
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
              height="200"
              src="/banner.jpg"
              style={{
                aspectRatio: "800/200",
                objectFit: "cover",
              }}
              width="800"
            />
          </div>
          <div className="flex flex-col px-10">
            <div className="flex items-end justify-between">
              <div className="relative -top-14 ">
                <Avatar className="h-28 w-28 border-2 border-gray-100 bg-gray-100">
                  <AvatarImage alt="pdp" src="/profil2.svg" />
                  <AvatarFallback>Pfp</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-1 align-center">
                <Button
                  className="relative"
                  onClick={() => {
                    console.log("Edit profile");
                    router.push("/profile/edit");
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
            <div className="-top-5">
              <h2 className="text-2xl font-bold">{user.email} </h2>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-sm text-black mt-8">{user.bio}</p>
            </div>
            <div className="flex items-start justify-start mt-10 space-x-10">
              <div className="flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-bold">followers</h2>
                <p className="text-gray-900">{user.followers?.length}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-gray-900">
                <h2 className="text-2xl font-bold">following</h2>
                <p className="text-gray-900">{user.following?.length}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-gray-900">
                <h2 className="text-2xl font-bold">decks</h2>
                <p className="text-gray-900">{user.decks?.length}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
