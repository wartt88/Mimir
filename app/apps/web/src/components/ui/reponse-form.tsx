import { useEffect, useRef, useState } from "react";
import { Slider } from "./slider";
import Image from "next/image";

interface ReponseFormProps {
  type: "input" | "gradient" | "multi-choice";
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
      {type === "input" && (
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
              src="wrong.svg"
              width={20}
            />
          )}
          {correct && (
            <Image
              alt=""
              className="absolute right-4 top-3"
              height={20}
              src="valid.svg"
              width={20}
            />
          )}
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
