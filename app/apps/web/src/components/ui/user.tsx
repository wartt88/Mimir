import React from 'react';
import Image from "next/image";

const Contact = () => {
    return (
        <div className='rounded border-0  bg-white m-2 w-[90%] h-[20%] flex items-center'>
            <Image
                 alt=""
                 className="m-4"
                 width={100}
                 height={100}
                 src="/zhizhou.png"
            />
            <p className='flex-1'> Username </p>
            <button>
                <Image
                     alt=""
                     className="m-4"
                     width={25}
                     height={25}
                     src="delFriend.svg"
                />
            </button>
        </div>
    );
}

export { Contact }