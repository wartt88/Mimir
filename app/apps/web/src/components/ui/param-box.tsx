interface ParamBoxProps {
  title: string;
  content: string | null;
  inputs: React.ReactNode | null;
  button: React.ReactNode | null;
}

function ParamBox({
  title,
  content,
  inputs,
  button,
}: ParamBoxProps): JSX.Element {
  return (
    <div className="bg-white w-full my-8">
      <p className="font-Lexend text-2xl p-5">{title}</p>
      {content !== null ? (
        <p className="font-Lexend mx-5 mb-5">{content}</p>
      ) : null}
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="bg-zinc-400 w-[95%] h-[1px] opacity-50" />
        {inputs}
        {button}
      </div>
    </div>
  );
}

export default ParamBox;
