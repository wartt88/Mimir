import "../globals.css";
import React from "react";

export default function SidebarLayout({children}: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="bg-[#f6f6f6] h-dvh w-full overflow-auto">
            {children}
        </div>
    );
}
