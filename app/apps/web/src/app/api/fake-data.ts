import type Card from "../../models/card";
import type { DeckInterface } from "../../models/deck";
import Deck from "../../models/deck";
import type { UserInterface } from "../../models/user";
import User from "../../models/user";


//singleton
let deck: DeckInterface | undefined;
let userCurrent: UserInterface | undefined;

export function getDeck(): DeckInterface {
  if (!deck){ deck = new Deck({
    id: 1,
    title: "essais 1",
    descr: "voici un nouveau deck de créé ! ",
    tags: ["svt", "so cool"],
    isPublic: false,
    isEducative: true,
    votes: {up:4,down:5},
    deadline: null,
    user_id: 123456789,
    cards: [
      {
        id: 1,
        question: "Allons-nous reussir ?",
        reponse: "Oui",
        palier: 5,
        derniereRevision: 1704708559,
      },
      {
        id: 2,
        question: "2+2 ?",
        reponse: "4",
        palier: 1,
        derniereRevision: 1704708559,
      },
      {
        id: 3,
        question: "Quel âge a le monde ?",
        reponse: "4,54 milliards d'années",
        palier: 1,
        derniereRevision: 1704708559,
      },
    ],
  });}
  return deck;
}

export function getUser(i: number, isDefault?: boolean): UserInterface {
  //const retour = User.findById(i);
  let retour: UserInterface;
  switch (i) {
    case 2:
      retour = new User({
        id: 2,
        nickname: "kiziow",
        nom: "Perrot",
        prenom: "Alexandre",
        deck: [],
        contacts: [],
      });
      break;
    case 3:
      retour = new User({
        id: 3,
        nickname: "Oxswing",
        nom: "Mijatovic",
        prenom: "Yann",
        deck: [],
        contacts: [],
      });
      break;
    case 4:
      retour = new User({
        id: 4,
        nickname: "wartt",
        nom: "Pinchon",
        prenom: "Théo",
        deck: [],
        contacts: [],
      });
      break;
    default:
      retour = new User({
        id: 1,
        nickname: "julio",
        nom: "Hirtz",
        prenom: "Jules",
        deck: [],
        contacts: [2, 3, 4],
      });
      break;
  }
  if (isDefault) userCurrent = retour;
  return retour;
}

export function getCurrentUser(): UserInterface | undefined {
  return userCurrent;
}

export function setDeck(d:Document):void{
    deck = new Deck(d);
}

export function getCard(idDeck: number, idCard: number): Card | undefined {
  //const deck = getDeck(idDeck);
  //const card: Card | undefined = deck.cards.find((e) => e.id === idCard);
  let card: Card | undefined;
  switch (idCard) {
    case 2:
        card = 
        {
            id: 2,
            question: "2+2 ?",
            reponse: "4",
            palier: 1,
            derniereRevision: new Date(1704708559*1000),
        };
      break;
    case 3:
        card = {
            id: 3,
            question: "Quel âge à le monde ?",
            reponse: "4,54 milliards d'années",
            palier: 1,
            derniereRevision: new Date(1704708559*1000)
        }
      break;
    default:
        card = {
            id: 1,
            question: "Allons-nous réussir ?",
            reponse: "Oui",
            palier: 5,
            derniereRevision: new Date(1704708559*1000)
        };
      break;
  }

  return card;
}
