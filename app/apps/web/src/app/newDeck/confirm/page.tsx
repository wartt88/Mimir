"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import ContactContainer from "../../contact/page";
import { getDeck } from "../../api/fake-data";
import type { DeckInterface } from "../../models/deck";

export default function Page():JSX.Element {
  const router = useRouter();

  const deck:DeckInterface = getDeck();

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
          <h2 className="text-3xl font-bold">{deck.title}</h2>
          <div>
            <h3>Description</h3>
            <p className="overflow-y-scroll ">{deck.descr}</p>
          </div>

          <h3>0 member(s)</h3>
          <h3>{deck.cards.length} cards</h3>
          <div className="flex gap-[0.5vw]">
            <h3>tags : </h3>
            {deck.tags.map((item) => (
              <div className="bg-white rounded-lg px-2" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className=" flex w-[100%] justify-around">
          <Link
            className="w-2/5 border-4 border-blue-500 rounded-xl text-white bg-blue-500 text-center py-[0.5vh]"
            href="/newDeck"
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
