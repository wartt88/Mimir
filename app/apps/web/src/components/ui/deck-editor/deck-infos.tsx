interface DeckInfosProps {
  title: string;
  setTitle: (title: string) => void;
  descr: string;
  setDescr: (descr: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  deadline: Date | null;
  setDeadline: (deadline: Date) => void;
  isEduc: boolean;
  setIsEduc: (isEduc: boolean) => void;
  isPriv: boolean;
  setIsPriv: (isPriv: boolean) => void;
  disabled: boolean;
}

function formatDate(date: Date): string {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

export default function DeckInfos(props: DeckInfosProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-5 my-[5%]">
      <input
        className={`bg-white font-Lexend p-3 rounded-sm ${
          props.disabled ? "cursor-not-allowed" : ""
        }`}
        defaultValue={props.title}
        disabled={props.disabled}
        onBlur={(e) => {
          props.setTitle(e.target.value);
        }}
        placeholder="Entrez un titre"
        style={{ color: "#626380" }}
        type="text"
      />

      <div className="flex space-x-5">
        <textarea
          className={`grow bg-white font-Lexend p-3 rounded-sm resize-none ${
            props.disabled ? "cursor-not-allowed" : ""
          }`}
          defaultValue={props.descr}
          disabled={props.disabled}
          onBlur={(e) => {
            props.setDescr(e.target.value);
          }}
          placeholder="Ajouter une description"
          style={{ color: "#626380" }}
        />

        <div className="grow flex flex-col space-y-5">
          <input
            className={`bg-white font-Lexend p-3 rounded-sm ${
              props.disabled ? "cursor-not-allowed" : ""
            }`}
            defaultValue={props.tags.toString().replaceAll(",", " ")}
            disabled={props.disabled}
            onBlur={(e) => {
              props.setTags(e.target.value.split(" "));
            }}
            placeholder="Entrez des tags"
            style={{ color: "#626380" }}
            type="text"
          />
          <input
            className={`bg-white font-Lexend p-3 rounded-sm ${
              props.disabled ? "cursor-not-allowed" : ""
            }`}
            defaultValue={props.deadline ? formatDate(props.deadline) : ""}
            disabled={props.disabled}
            onChange={(e) => {
              if (e.target.valueAsDate) props.setDeadline(e.target.valueAsDate);
            }}
            placeholder="Choisissez une date limite"
            style={{ color: "#626380" }}
            type="date"
          />

          <div className="flex justify-between">
            <div className="flex space-x-3">
              <input
                className={props.disabled ? "cursor-not-allowed" : ""}
                defaultChecked={props.isEduc}
                disabled={props.disabled}
                onChange={() => {
                  props.setIsEduc(!props.isEduc);
                }}
                type="checkbox"
              />
              <p>Deck éducatif</p>
            </div>
            <div className="flex space-x-3">
              <input
                className={props.disabled ? "cursor-not-allowed" : ""}
                defaultChecked={props.isPriv}
                disabled={props.disabled}
                onChange={() => {
                  props.setIsPriv(!props.isPriv);
                }}
                type="checkbox"
              />
              <p>Deck privé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
