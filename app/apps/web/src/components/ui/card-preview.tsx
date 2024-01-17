import type Card from "../../models/card";


export default function CardPreview({carte,succes}:{carte:Card,succes:boolean}) : JSX.Element {
    return (
        <div className={` px-4 w-full rounded-xl border-[1px] ${succes?"bg-green-300 border-green-700" : "bg-red-300 border-red-700"}`} >
            <h3 className="text-ellipsis font-semibold text-xl">{carte.question}</h3>
        </div>
    );
}