import "../globals.css";
import React from "react";
import {Menu} from "../../components/ui/menu.tsx";

export default function SidebarLayout({children}: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-row">

            <Menu/>

            <div className="bg-[#f6f6f6] h-dvh w-full overflow-auto">
                {children}
            </div>
        </div>
    );
}
