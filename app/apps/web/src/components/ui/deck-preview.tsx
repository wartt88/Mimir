import Link from "next/link";

export default function DeckPreview({idDeck,link,learned,never,other,title}: {
    idDeck: number;
    link: string;
    learned:number;
    never:number;
    other:number;
    title:string;
  }): JSX.Element {

    console.log
    return (
      <Link className="bg-gray-100 p-6 flex flex-col gap-2 border-gray size-full" href={{
        pathname: link,
        query: { deck: idDeck },
      }}>
        <h3 className="text-2xl text-center">{title}</h3>
        <div className="text-[80%]">
          <p className="text-blue-600">{learned} Learned</p>
          <p className="text-gray-400">{never} Never seen</p>
          <p className="text-red-500">{other} Not Learned</p>
        </div>
      </Link>
    );
  }