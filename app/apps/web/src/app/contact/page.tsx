"use client"

import { type ChangeEvent, useState } from "react";
import UserPreviewShare from "../../components/ui/user-preview-share";
import UserPreviewGen from "../../components/ui/user-preview-gen";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { DrawerClose } from "../../components/ui/drawer";
import { getUser } from "../api/fake-data";
import type { UserInterface } from "../../models/user";
import ResearchBar from "../../components/ui/research-bar.tsx";

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
    {
      id: 5,
      nickname: "test",
      nom: "Test",
      prenom: "Tset",
      deck: [],
      contacts: [],
    }
  ],
};

interface ContactProps {
  ajouterUser: () => void;
}

export default function Page(props: ContactProps): JSX.Element {
  // TODO remplacer par l'id de la session ou directement le user en session
  const userMocked = getUser(1);
  const userMockedContact = userMocked.contacts.map(index=>(getUser(index)));

  const [contactAffich, setContactAffich] = useState(userMockedContact);
  let tmp: UserInterface[] = [];
  const [contactReturned, setContactReturned] = useState(tmp);

  const fromNewDeck = Boolean(props.ajouterUser);

  const toggleContact = (contact: UserInterface):void => {
    const index = contactReturned.indexOf(contactReturned.filter((e)=>(e.id===contact.id))[0]); //TODO a modifier quand BDD
    if (index !== -1) {
      tmp = [
        ...contactReturned.slice(0, index),
        ...contactReturned.slice(index + 1),
      ];
    } else tmp = [...contactReturned, contact];

    setContactReturned(tmp);
  };

  function HandleChange(event: ChangeEvent):void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setContactAffich(
      userMockedContact.filter(
        (e) =>
          e.nom.toLowerCase().includes(input.value.toLowerCase()) ||
          e.prenom.toLowerCase().includes(input.value.toLowerCase())
      )
    );
  }
  console.log(contactReturned)
  return (
      <div className="flex flex-col w-[80%] h-full items-center justify-around">
        <p className="font-[Lexend] text-5xl">
          Vos Contacts
        </p>
        <ResearchBar onChange={HandleChange} />
        <div className="flex w-full h-[50%] justify-around">
          {fromNewDeck ? (
            <div className=" flex flex-col overflow-y-scroll h-full w-2/5 gap-y-[1vh] px-[1vw]">
              {contactAffich.map((item) => (
                <UserPreviewShare
                  alreadyChecked={contactReturned.filter((e)=>(e.id===item.id)).length>0}
                  inList={toggleContact}
                  key={item.id}
                  user={item}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col size-full items-center">
              <p className="font-[Lexend] text-3xl">{contactAffich.length} résultats trouvés</p>
              <Carousel className="w-full h-[90%] items-center" id="carousel" opts={{ align: "start" }}>
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
                (item) => `${item.nom  } ${  item.prenom  } \n`
              )}
            />
          ) : null}
        </div>
        {fromNewDeck ? (
          <DrawerClose  className="text-white bg-blue-500 rounded-lg w-[20vw] h-[5vh] text-3xl font-semibold" onClick={props.ajouterUser}>Terminer</DrawerClose>
        ) : null}
      </div>
  );
}
