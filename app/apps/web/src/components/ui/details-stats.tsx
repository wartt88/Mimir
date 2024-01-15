import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";


export default function DetailsStats():JSX.Element {

    const [data, setData] = useState({ cartes: 0, decks: 0, apprises: 0, enCours: 0 });

    useEffect(() => {
        setData({
            cartes: faker.number.int({min:3000000, max:100000000}),
            decks: faker.number.int({min:100, max:1000}),
            apprises: faker.number.int({min:1000, max:200000}),
            enCours: faker.number.int({min:2000000, max:3000000})
        });
    }, []);

    return(
        <div className="size-full flex flex-col justify-around items-center text-center text-xl font-bold">
            <h2 className="text-2xl">{data.cartes} cartes pour {data.decks} decks</h2>
            <h3>{data.apprises} apprises</h3>
            <h3>{data.enCours} en cours</h3>
        </div>
    );
}