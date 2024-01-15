import Link from "next/link";
import DeckPreview from "../components/ui/deck-preview";

//fake data
const deck = {
  id: 1,
  titre: "essais 1",
  tags: ["svt", "so cool"],
  isPublic: false,
  isEducative: true,
  votes: [],
  deadline: null,
  user_id: 123456789,
  cartes: [
    {
      id_card: 1,
      question: "Allons-nous reussir ?",
      reponse: "Oui",
      palier: 5,
      derniereRevision: 1704708559,
    },
    {
      id_card: 2,
      question: "2+2 ?",
      reponse: "4",
      palier: 1,
      derniereRevision: 1704708559,
    },
    {
      id_card: 3,
      question: "Quel âge à le monde ?",
      reponse: "4,54 milliards d'années",
      palier: 1,
      derniereRevision: 1704708559,
    },
  ],
};

export default function Page(): JSX.Element {
  const elements = [<NewDeck key={0} />];
  //recevoir les deckPreview
  for (let i = 1; i < 4; i++) {
    elements.push(
      <div className="h-full w-1/5">
        <DeckPreview idCard={i} idDeck={deck.id} key={i} link="/deck" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10vh] size-2/3 justify-center">
      <div className="flex h-[30%] items-center space-x-[1.5vw] ">
        {elements}
      </div>
      <Link
        className="bg-orange-300 w-2/3 self-center text-5xl font-black text-white p-7 rounded-xl"
        href={{ pathname: "/deck", query: { deck: 1, card: 1 } }}
        key={111}
      >
        STUDY DAILY CARDS
      </Link>

    </div>
  );
}

function NewDeck(): JSX.Element {
  return (
    <Link
      className="bg-gray-100 p-6 flex flex-col gap-2 border-gray items-center h-full"
      href="/newDeck"
    >
      <h3 className="text-xl text-center">Ajouter un nouveau deck</h3>
      <svg
        fill="none"
        height="67"
        viewBox="0 0 63 67"
        width="63"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.5 25.3125V41H0.125V25.3125H62.5ZM39.875 0.625V66.875H22.8125V0.625H39.875Z"
          fill="black"
        />
      </svg>
    </Link>
  );
}

