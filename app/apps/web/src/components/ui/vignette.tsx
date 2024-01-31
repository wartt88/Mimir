import Image from "next/image";

interface VignetteProps {
  image: string;
  text: string;
  action?: ()=>void;
  alert?: JSX.Element;
}

export default function Vignette({
  image,
  text,
  action,
  alert
}: VignetteProps): JSX.Element {
  return (
    <>
      {action ? (
        <button
          className="w-[200px] shadow-[0_4px_4px_0_rgba(0,0,0,0.3)] bg-white rounded-[10px] flex flex-col justify-center items-center p-4 gap-1"
          onClick={action}
          type="button"
        >
          <Image alt="" height={65} src={image} width={65} />
          <h2 className="text-center">{text}</h2>
          {alert ? alert : null}
        </button>
      ) : (
        <div className="w-[200px] shadow-[0_4px_4px_0_rgba(0,0,0,0.3)] bg-white rounded-[10px] flex flex-col justify-center items-center py-4 px-5 gap-1 h-fit">
          <Image alt="" height={65} src={image} width={65} />
          <h2 className="text-center">{text}</h2>
          {alert ? alert : null}
        </div>
      )}
    </>
  );
}
