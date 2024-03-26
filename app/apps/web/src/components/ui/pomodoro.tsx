"use client";
import { Dot, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Pomodoro(): JSX.Element {
  const longBreak = 900;
  const shortBreak = 300;
  const work = 1500;

  const [ite, setIte] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(work);
  const [auto, setAuto] = useState<boolean>(true);
  const [time, setTime] = useState<number>(duration);
  const [bullets, setBullets] = useState<JSX.Element[]>([]);

  useEffect(() => {
     const newBullets: JSX.Element[] = [];
     for (let index = 0; index < 4; index++) {
       if (index * 2 <= ite) {
         newBullets.push(<Dot  color="#023047" opacity={1} />);
       } else {
         newBullets.push(<Dot color="#023047" opacity={0.5} />);
       }
     }
     setBullets(newBullets);
  }, [ite]);

  function handlePauseResume(): void {
    setIsPlaying(!isPlaying);
  }

  function handleReset(): void {
    setDuration(work);
    setIsPlaying(false);
    if (ite === 0) setIte(14); // deux roulements de plus
    else setIte(0);
  }

  function handleComplete(): void {

    if(duration===longBreak) {
      setDuration(work);
      setIte(0);
    }

    //si ite divisible par 7 alors long break 900
    if ((ite + 1) ===7) setDuration(longBreak);
    //si ite divisible par 2 alors travail 1500
    else if ((ite + 1) % 2 === 0) setDuration(work);
    //sinon impair donc short break 300
    else setDuration(shortBreak);
    //mettre sur pause
    if (!auto) setIsPlaying(false);
    //repeter
    setIte(ite + 1);
  }

  function formatTimer(remainingTime: number): string {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  const isActive = !((ite === 0 || ite === 14) && time === work);

  let txt: string;

  switch (duration) {
    case shortBreak:
      txt = "short break";
      break;
    case longBreak:
      txt = "long break";
      break;
    default:
      txt = "work";
  }


  return (
    <div className="absolute bottom-10 right-14 bg-white aspect-[1/1.5] w-[180px] z-50 flex items-center justify-center flex-col rounded-xl shadow-[inset_0px_0px_4px_0px_#00000025] p-1">
      <div
        className="rounded-[50%] 
      outline-offset-[12px] outline-[#023047] outline-dashed outline-[5px]
      ring-[#023047] ring-offset-4 ring-[5px]
      relative my-6
      "
      >
        <CountdownCircleTimer
          colors="#023047"
          duration={duration}
          isPlaying={isPlaying}
          key={ite}
          onComplete={handleComplete}
          onUpdate={(remainingTime) => {
            setTime(remainingTime);
          }}
          rotation="counterclockwise"
          size={120}
          strokeLinecap="butt"
          strokeWidth={60}
          trailColor="#00000000"
        />
        <button
          className="absolute top-0 z-50 rounded-[50%] size-[100%]"
          onClick={handlePauseResume}
          type="button"
        >
          {!isPlaying && (
            <div className="bg-[#0000004A] flex justify-center items-center size-full rounded-[50%]">
              {!isActive ? (
                <Play fill="#FFFFFF" size={50} stroke="#FFFFFF" />
              ) : (
                <Pause fill="#FFFFFF" size={50} stroke="#FFFFFF" />
              )}
            </div>
          )}
        </button>
      </div>
      <div className="flex">
      {bullets}
      </div>
      <div className="flex w-[60%] gap-2 items-center justify-center">
        <p>{formatTimer(time)}</p>
        <p>{txt}</p>
      </div>

      <button
        className={isActive && !isPlaying ? "" : "v-hidden"}
        onClick={handleReset}
        type="button"
      >
        reset
      </button>
    </div>
  );
}
