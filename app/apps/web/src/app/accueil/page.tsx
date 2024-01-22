"use client";
import Image, {ImageProps} from "next/image";
import computer from "../../../public/pc.jpg";
import Link from "next/link";
import React, {ChangeEvent, ChangeEventHandler, MouseEventHandler, useState} from "react";
import NavBar from "../../components/ui/nav-bar.tsx";
import ResearchBar from "../../components/ui/research-bar.tsx";

const Preview = () => {
    return <div className="h-192 w-full relative">
            <Image src={computer} fill alt="" className="object-cover"/>
        <div className="w-1/3 h-1/2 absolute top-1/4 left-12 ">
            <div className="flex flex-col space-y-10">
                <h1 className="text-5xl font-bold font-Lexend text-white">Apprenez vos cours rapidement</h1>
                <p className="font-Lexend text-white font-light text-lg">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Proin vitae mollis nisl. Donec vel urna sed neque porta Lorem ipsum dolor sit
                    amet,
                    consectetur adipiscing elit. </p>
                <div>
                    <Link href="/register"
                          className="font-Lexend text-lg bg-amber-500 text-white p-6 rounded-lg">Nous
                        rejoindre</Link>
                </div>
            </div>
        </div>
    </div>
}

interface TagProps {
    title: string;
    color: string;
}

const Tag = ({title, color}: TagProps) => {
    return <div className="w-fit px-2 py-1 rounded-full" style={{backgroundColor: color}}>
        <p className="font-Lexend font-medium text-xs">{title}</p>
    </div>
}

interface ImgTagProps {
    title: string;
    img: ImageProps;
}

const ImgTag = ({title, img}: ImgTagProps) => {
    return <div className="flex items-center space-x-1 w-fit">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height}/>
        <p className="font-Lexend font-medium text-sm">{title}</p>
    </div>
}

const Card = (props: ElementProps) => {

    const tags = props.tags.map(value => {
        return <Tag title={value.title} color={value.color}/>
    })

    return <div
        className="bg-white w-72 h-40 rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] flex flex-col px-3 py-2">
        <div className="flex-grow space-y-1">
            <p className="font-Lexend font-medium text-lg">{props.title}</p>
            <div className="flex space-x-1">
                {tags}
            </div>
        </div>
        <div className="flex">
            <div className="grow">
                <ImgTag title={props.author} img={{src: "profil2.svg", alt: "", width: 25, height: 25}}/>
            </div>
            <ImgTag title={props.nbCards} img={{src: "pages.svg", alt: "", width: 20, height: 20}}/>
        </div>
    </div>
}

interface ElementProps {
    title: string;
    tags: TagProps[];
    author: string;
    nbCards: string;
}

function Footer() {
    return <div className="bg-white flex flex-col items-center py-3 text-lg font-Lexend mt-10">
        <p>Projet tutoré réalisé par Jules HIRTZ, Yann MIJATOVIC, Théo PINCHON, Alexandre PERROT</p>
        <p>Année 2023-2024 - IUT Nancy-Charlemagne</p>
    </div>
}

const Home = () => {

    const elements: ElementProps[] = [
        {
            title: "Logique propositionnelle",
            tags: [
                {
                    title: "Informatique",
                    color: "#FCF897"
                },
                {
                    title: "Examen",
                    color: "#FC9797"
                }
            ],
            author: "Alexandre P.",
            nbCards: "2"
        },
        {
            title: "Algèbre linéaire",
            tags: [
                {
                    title: "Mathématiques",
                    color: "#E897FC"
                },
            ],
            author: "Théo P.",
            nbCards: "20"
        },
        {
            title: "Passé composé",
            tags: [
                {
                    title: "Français",
                    color: "#CFFC97"
                },
            ],
            author: "Jules H.",
            nbCards: "36"
        },
        {
            title: "Passé simple",
            tags: [
                {
                    title: "Français",
                    color: "#CFFC97"
                },
            ],
            author: "Jules H.",
            nbCards: "17"
        },
        {
            title: "BONJOUR",
            tags: [
                {
                    title: "Rien",
                    color: "#567653"
                },
            ],
            author: "Yann M.",
            nbCards: "1"
        },
    ]


    const [cards, setCards] = useState(elements)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newCards = elements.filter((card) => {
            return card.title.toLowerCase().includes(value.toLowerCase())
        })
        setCards(newCards)
    }

    const element = cards.map(value => {
        return <Card {...value}/>
    });

    return (
        <div className="size-full">
            <NavBar/>
            <Preview/>
            <div id="marketplace" className="flex flex-col items-center space-y-10">
                <h1 className="font-Lexend font-bold text-3xl mt-10">Explorer notre bibliothèque de decks</h1>
                <ResearchBar onChange={handleChange}/>
                <div className="flex flex-wrap gap-1 justify-center">
                    {element}
                </div>
                <a href="/register" className="font-Lexend px-5 py-3 bg-black text-white rounded-lg shadow">Voir plus</a>
            </div>
            <Footer/>
        </div>

    );
}


export default Home;