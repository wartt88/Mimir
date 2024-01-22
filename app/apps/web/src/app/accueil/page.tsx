"use client";
import Image, {ImageProps} from "next/image";
import computer from "../../../public/pc.jpg";
import Link from "next/link";
import React, {ChangeEvent, ChangeEventHandler, MouseEventHandler, useState} from "react";

interface ButtonProps {
    title: string;
    url: string;
    bg?: boolean;
}

const Button = ({title, url, bg = false}: ButtonProps) => {
    return bg ? (
            <a className="font-Lexend p-2 bg-sky-300 rounded-lg transition ease-in-out delay-150 hover:scale-110"
               href={url}>{title}</a>
        ) :
        (
            <a className="font-Lexend p-2 transition ease-in-out delay-150 hover:scale-110" href={url}>{title}</a>
        )
}

const NavBar = () => {
    return <nav className="bg-white flex flex-row px-10 py-3 shadow">
        <div>
            <p className="font-Lemon text-5xl" style={{color: "#023047"}}>Mimir</p>
        </div>
        <div className="flex grow justify-center items-center space-x-7 font-Lexend ">
            <Button title={"Accueil"} url={"#"}/>
            <Button title={"Explorer le marketplace"} url={"#marketplace"}/>
            <Button title={"Nos solutions"} url={"#solutions"}/>
        </div>
        <div className="flex items-center space-x-7 font-Lexend">
            <Button title={"Se connecter"} url={"/login"}/>
            <Button title={"S'inscrire"} url={"/register"} bg={true}/>
        </div>
    </nav>;
}

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

const ResearchBar = ({onChange}: { onChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="relative w-144">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input onChange={onChange} type="search" id="search"
                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                   placeholder="Rechercher une carte"/>
        </div>
    );
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