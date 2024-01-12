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
      question: "Quelle âge à le monde ?",
      reponse: "4,54 milliards d'années",
      palier: 1,
      derniereRevision: 1704708559,
    },
  ],
};

export default function Page(): JSX.Element {
  const cards = deck.cartes;
  const learned = cards.filter((e) => e.palier >= 4).length;
  const never = cards.filter((e) => e.palier === 0).length;
  const other = cards.length - (never + learned);

  const elements = [<Link key={0} href='/'><NewDeck/></Link>];
  //recevoir les deckPreview
  for (let i = 1; i < 4; i++) {
    elements.push(
      <Link
        href={{
          pathname: "/deck",
          query: { deck: deck.id, card: i },
        }}
      >
        <DeckPreview key={i} learned={learned} never={never} other={other} />
      </Link>
    );
  }

  return <div>{elements}</div>;
}

function DeckPreview(
  props: Readonly<{ learned: number; never: number; other: number }>
): JSX.Element {
  return (
    <div className="flex flex-col gap-[10vh]">
    <div className="flex size-full items-center space-x-[1.5vw] ">
      {elements}
    </div>
    <Link key={111} href={{pathname:'/deck', query:{deck:1, card:1}}} className="bg-orange-300 w-2/3 self-center text-5xl font-black text-white p-7 rounded-xl">STUDY DAILY CARDS</Link>
    </div>
  );
}

function NewDeck(): JSX.Element {
  return (<div className="size-48 bg-gray-100 p-6 flex flex-col gap-2 border-2 border-gray-600 rounded-lg items-center">
      <h3 className="text-xl text-center">Ajouter un nouveau deck</h3>
      <svg width="63" height="67" viewBox="0 0 63 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M62.5 25.3125V41H0.125V25.3125H62.5ZM39.875 0.625V66.875H22.8125V0.625H39.875Z" fill="black"/>
      </svg>
    </div>
  )
}

