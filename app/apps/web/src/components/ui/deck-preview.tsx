import Link from "next/link";
import { getDeck } from "../../app/api/fake-data";

export default function DeckPreview({idDeck,link}: {
    idDeck: number;
    link: string;
  }): JSX.Element {

    // à utiliser pour récupérer le deck
    idDeck
    const deck = getDeck();

    const cards = deck.cards;
    const learned = cards.filter((e) => e.palier >= 4).length;
    const never = cards.filter((e) => e.palier === 0).length;
    const other = cards.length - (never + learned);

    return (
      <Link className="bg-gray-100 p-6 flex flex-col gap-2 border-gray size-full" href={{
        pathname: link,
        query: { deck: deck.id },
      }}>
        <h3 className="text-2xl text-center">{deck.title}</h3>
        <div className="text-[80%]">
          <p className="text-blue-600">{learned} Learned</p>
          <p className="text-gray-400">{never} Never seen</p>
          <p className="text-red-500">{other} Not Learned</p>
        </div>
      </Link>
    );
  }