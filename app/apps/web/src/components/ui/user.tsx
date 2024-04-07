import React from "react";
import Image from "next/image";

function Contact(): JSX.Element {
  return (
    <div className="rounded border-0  bg-white m-2 w-[90%] h-[20%] flex items-center">
      <Image
        alt=""
        className="m-4"
        height={100}
        src="/zhizhou.png"
        width={100}
      />
      <p className="flex-1"> Username </p>
      <button type="button">
        <Image
          alt=""
          className="m-4"
          height={25}
          src="delFriend.svg"
          width={25}
        />
      </button>
    </div>
  );
}

export { Contact };
