'use client'

import { AvatarImage, AvatarFallback, Avatar } from "../avatar";
import { Button } from "../button";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UserInfos(): JSX.Element {
    const { data: session } = useSession();

    // Check if the session is loaded and the user is authenticated
    if (!session) {
        return <div>Loading...</div>;
    }

    const { user } = session;

    return (
        <div className="flex flex-col mb-11">
            <div className="relative h-[200px] bg-gray-300 overflow-hidden">
                <img
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                    height="200"
                    src="../../../../public/banner.jpg"
                    style={{
                        aspectRatio: "800/200",
                        objectFit: "cover",
                    }}
                    width="800"
                />
            </div>
            <div className="flex flex-col  mx-10">
                <div className="flex items-end justify-between">
                    <div className="relative -top-14 ">
                        <Avatar className="h-28 w-28 border-2 border-gray-100">
                            <AvatarImage alt={user.name} src={user.image} />
                            <AvatarFallback>Pfp</AvatarFallback>
                        </Avatar>
                    </div>
                    <Button className="relative -top-10">Edit Profile</Button>
                </div>
                <div className="relative -top-5">
                    <h2 className="text-2xl font-bold">{user.email}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                    <p className="text-sm text-black mt-8">
                        {user.bio}
                    </p>
                </div>
                <div className="flex items-start justify-start mt-10 space-x-10 ">
                    <div className="flex flex-row items-center space-x-2 ">
                        <h2 className="text-2xl font-bold">{user.followers}</h2>
                        <p className="text-gray-900">Followers</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2 text-gray-900">
                        <h2 className="text-2xl font-bold">{user.following}</h2>
                        <p className="text-gray-900">Following </p>
                    </div>
                    <div className="flex flex-row items-center space-x-2 text-gray-900">
                        <h2 className="text-2xl font-bold">{user.decks}</h2>
                        <p className="text-gray-900">Decks</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
    


