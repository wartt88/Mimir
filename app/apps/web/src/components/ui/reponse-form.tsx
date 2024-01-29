import { Slider } from "./slider";

interface ReponseFormProps {
  type: "input" | "gradient" | "multi-choice";
  reponse: string[];
  setReponse: (rep:string[])=>void;
}

export default function ReponseForm({ type, reponse, setReponse }: ReponseFormProps): JSX.Element {

  return (
    <div className="w-full flex justify-center">
      {type === "input" && (
        <input
          className="w-full border px-4 py-2 rounded-[10px]"
          onChange={(e)=>{setReponse([e.target.value,type])}}
          placeholder="Votre répoonse ici"
          type="text"
        />
      )}
      {type === "gradient" && (
        <div className="flex flex-col w-2/3 gap-2">
          <p>Evaluez votre connaissance sur la question : {reponse.length===0?"0":reponse[0]}%</p>
          <div className="flex justify-between">
            <p>0%</p>
            <Slider
              className="w-[90%]"
              defaultValue={[0]}
              max={100}
              min={0}
              onValueChange={(e)=>{setReponse([e[0].toString(),type])}}
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
