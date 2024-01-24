import { UserInterface } from "./user";

const fetchCurrentUser = async (email: string): Promise<UserInterface> => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  const url = `/api/user/${email}`;
  console.log("url: ", url);
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
    console.log("url: ", url);
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

export { fetchCurrentUser, updateCurrentUser};