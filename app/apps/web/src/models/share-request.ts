import type {DeckInterface} from "./deck.ts";

export interface ContactData {
    userId: string;
    selected: boolean;
    editor: boolean;
}

export interface ShareBodyRequest {
    deckId: string;
    contactData: ContactData[];
}

export interface ShareResponse {
    success: boolean;
}

async function share(deckId: string, contactData: ContactData[]): Promise<ShareResponse> {
    const url = `/api/share`;

    const payload: ShareBodyRequest = {
        deckId,
        contactData,
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });
    return await response.json() as ShareResponse;
}

export interface SharedDecksResponse {
    decks: DeckInterface[];
}

async function getSharedDecks(userId: string): Promise<DeckInterface[]> {
    const url = `/api/share/${userId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const resp = await response.json() as SharedDecksResponse;

    return resp.decks;
}

export {share, getSharedDecks};
