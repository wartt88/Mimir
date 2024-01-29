import type { Resultat } from "../../models/card";
import type { DeckInterface } from "../../models/deck";

interface ResumeDeckProps {
  deck: DeckInterface;
  resultats: Resultat[];
}

export default function ResumeDeck({
  deck,
  resultats,
}: ResumeDeckProps): JSX.Element {
  return <div>resume du deck</div>;
}
