import type { UserInterface } from "./user";

const fetchCurrentUser = async (email: string): Promise<UserInterface> => {
  const url = `/api/user/${email}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json()) as { user: UserInterface };
  return data.user;
};

const fetchUserByUsername = async (
  username: string
): Promise<UserInterface> => {
  const url = `/api/user/username/${username}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json()) as { user: UserInterface };
  return data.user;
};

const fetchUserById = async (id: string): Promise<UserInterface> => {
  const url = `/api/user/id/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json()) as { user: UserInterface };
  return data.user;
};

const fetchAllUser = async (): Promise<UserInterface[]> => {
  const url = `/api/user/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return (await response.json()) as Promise<UserInterface[]>;
};

const updateCurrentUser = async (
  email: string,
  user: UserInterface
): Promise<UserInterface> => {
  const url = `/api/user/${email}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    cache: "no-store",
  });
  const data = (await response.json()) as { user: UserInterface };
  return data.user;
};

const updatePasswordUser = async (user: UserInterface): Promise<number> => {
  const url = `/api/send/changepwd`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    cache: "no-store",
  });
  const data = (await response.json()) as {
    status: number;
  };
  return data.status;
};

const fetchContactCurrentUser = async (
  email: string
): Promise<UserInterface[]> => {
  const data = await fetchCurrentUser(email);
  if (!data.following) return [];

  const fetchPromises = data.following.map((contact) =>
    fetchCurrentUser(contact)
  );
  const resp = await Promise.all(fetchPromises);

  return resp;
};

export interface Response {
  ok: boolean;
  text: string;
}

const addContactCurrentUser = async (
  email: string,
  friend: string
): Promise<Response> => {
  const url = `/api/contact/${email}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(friend),
    cache: "no-store",
  });
  return (await response.json()) as Response;
};

const deleteContactCurrentUser = async (
  email: string,
  friend: string
): Promise<Response> => {
  const url = `/api/contact/${email}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(friend),
    cache: "no-store",
  });
  return (await response.json()) as Response;
};

export {
  fetchCurrentUser,
  fetchUserByUsername,
  fetchUserById,
  updateCurrentUser,
  fetchContactCurrentUser,
  addContactCurrentUser,
  fetchAllUser,
  deleteContactCurrentUser,
  updatePasswordUser,
};
