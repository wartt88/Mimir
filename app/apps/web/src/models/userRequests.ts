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
    if (!data || !data.contacts) return [];

    const resp: UserInterface[] = []

    for (const contact of data.contacts) {
        const data = await fetchCurrentUser(contact);
        resp.push(data);
    }

    return resp;

};

export {fetchCurrentUser, updateCurrentUser, fetchContactCurrentUser};