import { useSession } from "next-auth/react";
import {UserInterface} from "./user";

const fetchCurrentUser = async (email: string): Promise<UserInterface> => {
    const url = `/api/user/${email}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const data = await response.json();
    return data.user;
};

const fetchUserByUsername = async (username: string): Promise<UserInterface> => {

    const url = `/api/user/username/${username}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    console.log("ayayayayaayayayayyaa")
    const data = await response.json();
    return data.user;
}

const fetchAllUser = async (): Promise<UserInterface[]> => {
    const url = `/api/user/`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    return await response.json();
};

const updateCurrentUser = async (email: string, user: UserInterface): Promise<UserInterface> => {
    const url = `/api/user/${email}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        cache: "no-store",
    });
    const data = await response.json();
    return data.user;
};

const fetchContactCurrentUser = async (email: string): Promise<UserInterface[]> => {
    const data = await fetchCurrentUser(email);
    if (!data || !data.following) return [];

    const resp: UserInterface[] = []

    for (const contact of data.following) {
        const data = await fetchCurrentUser(contact);
        if (data) resp.push(data);
    }

    return resp;

};

export interface Response {
    ok: boolean;
    text: string;
}

const addContactCurrentUser = async (email: string, friend: string): Promise<Response> => {
    const url = `/api/contact/${email}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
        cache: "no-store",
    });
    return await response.json();
};

const deleteContactCurrentUser = async (email: string, friend: string): Promise<Response> => {
    const url = `/api/contact/${email}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
        cache: "no-store",
    });
    return await response.json();
};

export {fetchCurrentUser, fetchUserByUsername, updateCurrentUser, fetchContactCurrentUser, addContactCurrentUser, fetchAllUser, deleteContactCurrentUser};