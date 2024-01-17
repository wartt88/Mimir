"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import ContactContainer from "../../contact/page";

//fake data
const deck = {
  id: 1,
  titre: "essais 1",
  description: "voici un nouveau deck de créé ! ",
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

export default function Page():JSX.Element {
  const router = useRouter();

  function HandleConfirm():void {
    //TODO
    router.push("/");
  }

  function HandleShare():void {
    //TODO
  }

  return (
    <div className="flex bg-gray-200 border-gray w-[66vw] h-[66vh] justify-center items-center text-xl font-semibold">
      <div className="w-[70%] flex flex-col justify-center items-center h-full gap-y-[2vh]">
        <div className=" flex flex-col w-[70%] gap-[3vh]">
          <h2 className="text-3xl font-bold">{deck.titre}</h2>
          <div>
            <h3>Description</h3>
            <p className="overflow-y-scroll ">{deck.description}</p>
          </div>

          <h3>0 member(s)</h3>
          <h3>{deck.cartes.length} cards</h3>
          <div className="flex gap-[0.5vw]">
            <h3>tags : </h3>
            {deck.tags.map((item) => (
              <div key={item} className="bg-white rounded-lg px-2">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className=" flex w-[100%] justify-around">
          <Link
            href="/newDeck"
            className="w-2/5 border-4 border-blue-500 rounded-xl text-white bg-blue-500 text-center py-[0.5vh]"
          >
            Modifier
          </Link>
          <Drawer>
            <DrawerTrigger className="w-2/5 border-4 border-blue-500 rounded-xl text-blue-500 bg-white py-[0.5vh]">
              Partager
            </DrawerTrigger>
            <DrawerContent className=" bg-transparent border-none size-full items-end">
              <div className="self-center size-full flex justify-center mb-[5vh] items-end">
                <ContactContainer ajouterUser={HandleShare} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <button
          className="w-[50%] text-center border-4 border-blue-500 rounded-xl text-white bg-blue-500 py-[1vh] text-3xl "
          onClick={HandleConfirm}
          type="button"
        >
          Terminer
        </button>
      </div>
    </div>
  );
}