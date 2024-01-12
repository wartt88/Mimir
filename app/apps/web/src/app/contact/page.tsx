"use client";

import { ChangeEvent, useState } from "react";
import UserPreviewShare from "../../components/ui/user-preview-share";
import UserPreviewGen from "../../components/ui/user-preview-gen";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

interface User {
  id: number;
  nickname: string;
  nom: string;
  prenom: string;
  deck: string[];
  contacts: User[];
}

// fake data
const userMocked = {
  id: 1,
  nickname: "julio",
  nom: "Hirtz",
  prenom: "Jules",
  deck: [],
  contacts: [
    {
      id: 2,
      nickname: "kiziow",
      nom: "Perrot",
      prenom: "Alexandre",
      deck: [],
      contacts: [],
    },
    {
      id: 3,
      nickname: "Oxswing",
      nom: "Mijatovic",
      prenom: "Yann",
      deck: [],
      contacts: [],
    },
    {
      id: 4,
      nickname: "wartt",
      nom: "Pinchon",
      prenom: "Théo",
      deck: [],
      contacts: [],
    },
  ],
};

interface ContactProps {
  ajouterUser: () => void;
}

export default function Page(props: ContactProps): JSX.Element {
  const [contactAffich, setContactAffich] = useState(userMocked.contacts);
  let tmp: User[] = [];
  const [contactReturned, setContactReturned] = useState(tmp);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const fromNewDeck: boolean = props.ajouterUser !== undefined;

  const toggleContact = (contact: User) => {
    const index = contactReturned.indexOf(contact);
    if (index !== -1) {
      tmp = [
        ...contactReturned.slice(0, index),
        ...contactReturned.slice(index + 1),
      ];
    } else tmp = [...contactReturned, contact];

    setContactReturned(tmp);
  };

  function HandleChange(event: ChangeEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setContactAffich(
      userMocked.contacts.filter(
        (e) =>
          e.nom.toLowerCase().includes(input.value.toLowerCase()) ||
          e.prenom.toLowerCase().includes(input.value.toLowerCase())
      )
    );
  }

  return (
    <div className="size-2/3 flex justify-center items-center bg-gray-200  border-gray rounded-lg">
      <div className="flex flex-col w-[70%] h-full items-center justify-around">
        <h2 className="w-2/3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg text-center text-3xl font-semibold ">
          Contacts
        </h2>
        <input
          className="search-bg w-full p-[1%] border-gray bg pl-10"
          id="search"
          onChange={HandleChange}
          placeholder="chercher un contact "
          type="search"
        />
        <div className="flex w-full h-[50%] justify-around">
          {fromNewDeck ? (
            <div className=" flex flex-col overflow-y-scroll h-full w-2/5 gap-y-[1vh] px-[1vw]">
              {contactAffich.map((item) => (
                <UserPreviewShare
                  alreadyChecked={contactReturned.includes(item)}
                  inList={toggleContact}
                  key={item.id}
                  user={item}
                />
              ))}
            </div>
          ) : (
            <div className="size-full flex flex-col justify-between">
              <p>{contactAffich.length} résultats trouvés</p>
              <Carousel id="carousel" className="w-full h-[90%] items-center" opts={{ align: "start" }}>
                <CarouselContent >
                  {contactAffich.map((item) => (
                    <CarouselItem
                      className="md:basis-1/2 lg:basis-1/3"
                      key={item.id}
                    >
                      <UserPreviewGen user={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          {fromNewDeck ? (
            <textarea
              className="w-2/5 resize-none p-[1%]"
              readOnly
              value={contactReturned.map(
                (item) => item.nom + " " + item.prenom + " \n"
              )}
            />
          ) : null}
        </div>
        {fromNewDeck ? (
          <button
            className="text-white bg-blue-500 rounded-lg w-[20vw] h-[5vh] text-3xl font-semibold"
            type="button"
          >
            Terminer
          </button>
        ) : null}
      </div>
    </div>
  );
}
