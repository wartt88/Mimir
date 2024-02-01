import {useEffect, useState} from "react";
import Image from "next/image";
import {Slider} from "./slider";

interface ReponseFormProps {
    type: "input" | "ia" | "gradient" | "multi-choice";
    reponse: string[];
    setReponse: (rep: string[]) => void;
    correct: boolean | undefined;
}

export default function ReponseForm({
                                        type,
                                        reponse,
                                        setReponse,
                                        correct,
                                    }: ReponseFormProps): JSX.Element {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (correct === undefined) setValue("");
    }, [correct]);

    return (
        <div className="w-full flex justify-center">
            {(type === "input" || type === "ia") && (
                <div className="w-full relative">
                    <input
                        className="w-full border px-4 py-2 rounded-[10px] relative"
                        onChange={(e) => {
                            setReponse([e.target.value, type]);
                            setValue(e.target.value);
                        }}
                        placeholder="Votre réponse ici"
                        type="text"
                        value={value}
                    />
                    {correct === false && (
                        <Image
                            alt=""
                            className="absolute right-4 top-3"
                            height={20}
                            src="false.svg"
                            width={20}
                        />
                    )}
                    {correct ? <Image
                        alt=""
                        className="absolute right-4 top-3"
                        height={20}
                        src="true.svg"
                        width={20}
                    /> : null}
                    {type === "input" &&
                        <p className="font-Lexend text-sm mt-5 text-gray-500 italic">Cette réponse doit être écrite
                            exactement comme la réponse attendue</p>}
                </div>
            )}
            {type === "gradient" && (
                <div className="flex flex-col w-2/3 gap-2">
                    <p>
                        Evaluez votre connaissance sur la question :{" "}
                        {reponse.length === 0 ? "0" : reponse[0]}%
                    </p>
                    <div className="flex justify-between">
                        <p>0%</p>
                        <Slider
                            className="w-[90%]"
                            defaultValue={[0]}
                            max={100}
                            min={0}
                            onValueChange={(e) => {
                                setReponse([e[0].toString(), type]);
                            }}
                            step={10}
                        />
                        <p>100%</p>
                    </div>
                </div>
            )}
            {type === "multi-choice" && <div>choix multiple</div>}
        </div>
    );
}
