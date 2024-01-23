import Link from "next/link";
import DeckPreview from "../components/ui/deck-preview";
import Redirecter from "../components/ui/redirecters-home";

export default function Page(): JSX.Element {
  const elements = [<NewDeck key={0} />];

  return (
    <div className="flex flex-col gap-[10vh] size-2/3 justify-center items-center w-[80%]">
      <div className="gap-[5vh] flex flex-col">
        <p className="font-Lexend text-4xl"> 👋 Bonjour UTILISATEUR !</p>
        <div className="flex h-[20%] items-center space-x-[1.5vw] ">
          {elements}
        </div>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Historique récent SI ACTIVITE</p>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Recommandantations SI ACTIVITE</p>
      </div>
      <div>
        <p className="font-Lexend text-2xl"> Decks partagés avec vous SI PARTAGE</p>
      </div>
    </div>
  );
}

function NewDeck(): JSX.Element {
  return (
    <div className="flex">
      <Redirecter couleur="#43ABF3" titre="Créer un nouveau deck" paragraphe="Créez votre propre deck dans le domaine que vous souhaitez" reference="/newDeck"/>
      <Redirecter couleur="#E2F82C" titre="Voir mes decks" paragraphe="Consultez, partagez et modifiez les decks que vous avez crées" reference="/decks"/>
      <Redirecter couleur="#9CF360" titre="Suivre ma progression" paragraphe="Visualisez l'évolution de votre apprentissage" reference="/statistiques"/>
      <Redirecter couleur="#BE85F8" titre="Explorer les decks" paragraphe="Découvrez la multitude de decks crées par nos utilisateurs" reference="/explore"/>
    </div>
  );
}

