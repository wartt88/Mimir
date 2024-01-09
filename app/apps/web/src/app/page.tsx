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

  const elements = [];
  //recevoir les deckPreview
  for (let i = 0; i < 3; i++) {
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
    <>
      <h3>{deck.titre}</h3>
      <div>
        <p>{props.learned} Learned</p>
        <p>{props.never} Never seen</p>
        <p>{props.other} Not Learned</p>
      </div>
    </>
  );
}
