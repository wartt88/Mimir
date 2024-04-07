import type { UserInterface } from "../../models/user";
import type { DeckInterface } from "../../models/deck";
import { fetchDeckById, fetchDeckByTag } from "../../models/deck-requests";

async function getRecentDecks(user: UserInterface): Promise<DeckInterface[]> {
    if (typeof user === "undefined") {
        return [];
    }

    const fetchDecks = async (decksIds: string[]): Promise<DeckInterface[]> => {
        const recentDecksPromises = decksIds.map(idDeck => fetchDeckById(idDeck));
        const decks = await Promise.all(recentDecksPromises);
        return decks.reverse().filter((d) => d != null);
    };

    if (user.decks && user.decks.length > 0) {
        const decks = await fetchDecks(user.decks);
        return decks;
    } else {
        return [];
    }
}

async function getRecommendedDecks(
  user: UserInterface
): Promise<DeckInterface[]> {
  // Assuming getRecentDecks is a function that takes a UserInterface and returns DeckInterface[]
  const recentDecks = await getRecentDecks(user);

  if (recentDecks.length === 0) {
    return [];
  }

  // Fetching decks for shared tags
  let recentTags: string[] = [];
  recentDecks.forEach((deck) => {
    if(deck !== null) {
      recentTags = recentTags.concat(deck.tags);
    }
  });

  const recommendedDecksPromises: Promise<DeckInterface[]>[] = recentTags.map(
    (tag) => fetchDeckByTag(tag)
  );
  const tempDecks: DeckInterface[][] = await Promise.all(
    recommendedDecksPromises
  );

  // Combining all decks belonging to each tag
  let recoDecks: DeckInterface[] = [];
  tempDecks.forEach((arrayDeck) => {
    recoDecks = recoDecks.concat(arrayDeck);
  });

  // Processing to filter decks
  // Estimating the number of decks found the most
  const freq: Record<string, number> = countIdOccurrences(recoDecks);
  // Removing duplicates
  recoDecks = recoDecks.filter((deck, index, self) => {
    const isFirstOccurrence =
      self.findIndex((d) => d._id === deck._id) === index;
    return isFirstOccurrence;
  });
  // Sorting decks according to the number of occurrences of each deck
  recoDecks.sort((a, b) => {
    return freq[b._id.toString()] - freq[a._id.toString()];
  });
  // Removing decks already present in the history
  recoDecks = recoDecks.filter(
    (deck) => !recentDecks.some((deckRecent) => deckRecent._id === deck._id)
  );

  return recoDecks;
}

function countIdOccurrences(decks: DeckInterface[]): Record<string, number> {
  return decks.reduce<Record<string, number>>((accumulator, deck) => {
    const id = deck._id.toString();
    accumulator[id] = (accumulator[id] || 0) + 1;
    return accumulator;
  }, {});
}

export { getRecentDecks, getRecommendedDecks };
