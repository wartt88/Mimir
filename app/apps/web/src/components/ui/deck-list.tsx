import type { DeckInterface } from "../../models/deck";
import DeckUI from "./deck-ui";

export default function deckList(
  decks: DeckInterface[] | undefined,
  type: "public" | "perso" | "stats",
  txtEmpty?: string
): JSX.Element[] {
  return (decks && decks.length > 0)
    ? decks.map((deck) => <DeckUI deck={deck} key={deck._id} type={type} />)
    : [<p key={100000}>Vous n'avez pas encore de decks {txtEmpty}</p>];
}
