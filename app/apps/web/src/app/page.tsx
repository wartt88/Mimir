import Link from "next/link";
import DeckPreview from "../components/ui/deck-preview";
import Image, {ImageProps} from "next/image";

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

  return (
    <div className="flex flex-col gap-[10vh] size-2/3 justify-center items-center">
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
      className="bg-white p-6 flex items-align border-gray items-center "
      href="/newDeck"
    >
      <h3 className="text-xl text-center"> Créez votre propre deck </h3>
      <Image
         alt="Nombres de pages"
         className=""
         width={50}
         height={50}
         src="add.svg"
      />
    </Link>
  );
}

