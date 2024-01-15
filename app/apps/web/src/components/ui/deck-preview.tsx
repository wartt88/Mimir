import Link from "next/link";

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
  

export default function DeckPreview({idDeck,link,idCard}: {
    idDeck: number;
    link: string;
    idCard: number;
  }): JSX.Element {

    // à utiliser pour récupérer le deck
    idDeck

    const cards = deck.cartes;
    const learned = cards.filter((e) => e.palier >= 4).length;
    const never = cards.filter((e) => e.palier === 0).length;
    const other = cards.length - (never + learned);

    return (
      <Link className="bg-gray-100 p-6 flex flex-col gap-2 border-gray size-full" href={{
        pathname: link,
        query: { deck: deck.id, card: idCard },
      }}>
        <h3 className="text-2xl text-center">{deck.titre}</h3>
        <div className="text-[80%]">
          <p className="text-blue-600">{learned} Learned</p>
          <p className="text-gray-400">{never} Never seen</p>
          <p className="text-red-500">{other} Not Learned</p>
        </div>
      </Link>
    );
  }