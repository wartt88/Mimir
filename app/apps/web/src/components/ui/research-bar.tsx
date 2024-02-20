import type {ChangeEvent} from "react";
import React from "react";

interface ResearchBarProps {
    placeholder: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export default function ResearchBar({placeholder, onChange}: ResearchBarProps): JSX.Element {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400"
                     fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"/>
                </svg>
            </div>
            <input className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50"
                   id="search" onChange={onChange}
                   placeholder={placeholder}
                   type="search"/>
        </div>
    );
}

