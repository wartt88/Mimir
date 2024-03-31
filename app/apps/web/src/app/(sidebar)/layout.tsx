import "../globals.css";
import React from "react";
import {Menu} from "../../components/ui/menu.tsx";
import Pomodoro from "../../components/ui/pomodoro.tsx";

export default function SidebarLayout({children}: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-row">

            <Menu/>
            <Pomodoro/>


            <div className="bg-[#f6f6f6] h-dvh w-full overflow-auto">
                {children}
            </div>
        </div>
    );
}
