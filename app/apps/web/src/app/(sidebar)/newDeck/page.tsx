"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Types } from "mongoose";
import type Card from "../../../models/card.ts";
import type { DeckInterface } from "../../../models/deck.ts";
import { fetchDeckById } from "../../../models/deck-requests.ts";
import Loader from "../../../components/ui/loader.tsx";
import type { UserInterface } from "../../../models/user.ts";
import { Modal } from "../../../components/ui/modal.tsx";
import { fetchCurrentUser } from "../../../models/user-requests.ts";
import CardEditor from "../../../components/ui/deck-editor/card-editor.tsx";
import DeckInfos from "../../../components/ui/deck-editor/deck-infos.tsx";
import GeneratePage from "./generate.tsx";

const isValidInput = (title: string, cards: Card[]): boolean => {
  return (
    title.length > 0 &&
    cards.length > 0 &&
    cards[0].question.length > 0 &&
    cards[0].answer.length > 0
  );
};

function Page(): JSX.Element {
  const params = useSearchParams();
  const { data: session } = useSession();

  const [user, setUser] = useState<UserInterface>();

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isEduc, setIsEduc] = useState(false);
  const [isPriv, setIsPriv] = useState(false);
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [cards, setCards] = useState<Card[]>([]);

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<Card[]>([]);

  const oldDeck = params.get("id");
  const [loaded, setLoaded] = useState(!oldDeck);

  useEffect(() => {
    if (!user && session?.user?.email) {
      void (async () => {
        const res = await fetchCurrentUser(session.user.email);
        setUser(res);
      })();
    }
  }, []);

  useEffect(() => {
    if (!loaded) {
      void (async () => {
        const d: DeckInterface = await fetchDeckById(oldDeck);

        setLoaded(true);

        if (typeof d !== "undefined") {
          setCards(d.cards);
          setTitle(d.title);
          setDescr(d.descr);
          setTags(d.tags);
          setDeadline(new Date(d.deadline));
          setIsEduc(d.isEducative);
          setIsPriv(!d.isPublic);
        } else {
          router.push("/error");
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let taille = cards.length;

      data.forEach((value) => {
        value.id = ++taille;
      });

      setCards([...cards, ...data]);
      setData([]);
    }
  }, [cards, data]);

  const addCard = (): void => {
    if (user) {
      setCards([
        ...cards,
        {
          id: cards.length + 1,
          question: "",
          answer: "",
          users: [
            {
              user_id: user._id.toString(),
              proficency: 0,
              lastSeen: new Date(),
              answers: [],
            },
          ],
        },
      ]);
    }
  };

  useEffect(() => {
    if (data.length > 0 && user) {
      let taille = cards.length;

      data.forEach((value) => {
        value.id = ++taille;
        value.users.push({
          user_id: user._id.toString(),
          proficency: 0,
          lastSeen: new Date(),
          answers: [],
        });
      });

      setCards([...cards, ...data]);
      setData([]);
    }
  }, [cards, data]);

  const handleFinish = (): void => {
    setErrorMsg("");

    if (!user) {
      setErrorMsg("Vous devez être connecté pour créer un deck");
      return;
    }

    if (!isValidInput(title, cards)) {
      setErrorMsg(
        "Veuillez remplir tous les champs obligatoires (au moins un titre et une carte)"
      );
      return;
    }

    const deck: DeckInterface = {
      _id: Types.ObjectId.createFromHexString("0"),
      title: "this is a empty deck",
      descr: "",
      tags: [],
      isPublic: false,
      isEducative: false,
      votes: {
        up: 0,
        down: 0,
      },
      deadline: new Date(),
      owner_id: "",
      cards: [],
      sharedTo: [],
    };
    deck.title = title;
    deck.descr = descr;
    deck.isEducative = isEduc;
    deck.isPublic = !isPriv;
    if (typeof user !== "undefined") deck.owner_id = user._id.toString();
    deck.tags = tags;
    deck.cards = cards;
    if (deadline) {
      deck.deadline = deadline;
    }

    if (oldDeck) {
      fetch(`/api/deck/${oldDeck}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deck),
      }).catch((err) => {
        console.error(err);
      });
    } else {
      fetch("/api/deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deck),
      }).catch((err) => {
        console.error(err);
      });
      //TODO mettre à jour le champ decks du user
    }
    router.push("/decks");
  };

  const cardsJSX = cards.map((c, index) => {
    return CardEditor(c, cards, index + 1, setCards, false);
  });

  const toggleGenerate = (): void => {
    setIsGenerateOpen(!isGenerateOpen);
    setFile(undefined);
  };

  const titleJsx = oldDeck ? "Modifier un deck" : "Créer un nouveau deck";
  const titleButtonJsx = oldDeck ? "Modifier" : "Créer";

  return (
    <>
      <Modal isOpen={isGenerateOpen} onClose={toggleGenerate}>
        <GeneratePage
          file={file}
          onClose={toggleGenerate}
          setData={setData}
          setFile={setFile}
        />
      </Modal>

      <>
        {!loaded ? (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="p-10">
            <div className="flex justify-between">
              <h1 className="font-Lexend text-3xl font-medium">{titleJsx}</h1>
              <div className="space-x-3">
                <button
                  className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                  onClick={handleFinish}
                  type="button"
                >
                  {titleButtonJsx}
                </button>
                <Link
                  className="bg-gray-400 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow text-center"
                  href="/decks"
                  type="button"
                >
                  Annuler
                </Link>
              </div>
            </div>

            {errorMsg ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5">
                <p>{errorMsg}</p>
              </div>
            ) : null}

            <DeckInfos
              deadline={deadline}
              descr={descr}
              disabled={false}
              isEduc={isEduc}
              isPriv={isPriv}
              setDeadline={setDeadline}
              setDescr={setDescr}
              setIsEduc={setIsEduc}
              setIsPriv={setIsPriv}
              setTags={setTags}
              setTitle={setTitle}
              tags={tags}
              title={title}
            />

            <hr className="my-[5%]" />

            <div className="flex flex-col space-y-8">
              <button
                className=" w-fit flex items-center gap-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                onClick={toggleGenerate}
                type="button"
              >
                <Image alt="" height={32} src="/magic.svg" width={32} />
                Générer
              </button>

              {cardsJSX}

              <div className="flex space-x-3 justify-center">
                <button
                  className=" w-fit flex items-center gap-2 bg-gray-700 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                  onClick={addCard}
                  type="button"
                >
                  <Image alt="" height={20} src="/add_white.svg" width={20} />
                  Ajouter une nouvelle carte
                </button>
                <button
                  className="bg-blue-500 text-white font-Lexend text-lg px-4 py-2 rounded-sm shadow"
                  onClick={handleFinish}
                  type="button"
                >
                  {titleButtonJsx}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Page;
