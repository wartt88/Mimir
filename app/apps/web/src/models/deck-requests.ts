import type { DeckInterface } from "./deck";
import { fetchCurrentUser } from "./userRequests";

/**
 *
 * @param id id du deck à rechercher
 * @returns le deck en question
 */
export async function fetchDeckById(id: string | null): Promise<DeckInterface> {
  return (await fetch(`/api/deck/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    })) as Promise<DeckInterface>;
}

/**
 *
 * @returns tous les decks de la bdd
 */
export async function fetchDecks(): Promise<DeckInterface[]> {
  return (await fetch("/api/deck", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    })) as Promise<DeckInterface[]>;
}

/**
 *
 * @param id id de l'utilisateur
 * @returns tous les decks appartenant à l'utilisateur
 */
export async function fetchDeckByOwner(id: string): Promise<DeckInterface[]> {
  return (await fetch(`/api/deck/owner/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    })) as Promise<DeckInterface[]>;
}

/**
 *
 * @param deck deck à mettre à jour
 */
export function fetchMajDeck(deck: DeckInterface): void {
  fetch(`/api/deck/${deck._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deck),
  }).catch((err) => {
    console.error(err);
  });
}

/**
 *
 * @param id deck à supprimer
 */
export function fetchDeleteDeck(id: string): void {
  fetch(`/api/deck/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).catch((err) => {
    console.error(err);
  });
}

/**
 * 
 * @param deck deck à insérer
 */
export function fetchAddDeck(deck: DeckInterface): void {
  fetch("/api/deck/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deck),
  }).catch((err) => {
    console.error(err);
  });
}


export async function fetchCurrentUserDecks(mail: string): Promise<DeckInterface[]> {
  const user = fetchCurrentUser(mail);
  return (await fetch(`/api/deck/owner/${user._id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    })) as Promise<DeckInterface[]>;

}