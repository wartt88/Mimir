import React from 'react';
import { cn } from "../../lib/utils"
import Link from "next/link";

interface RedirecterProps {
    couleur: string;
    titre: string;
    paragraphe: string;
}

const Redirecter: React.FC<RedirecterProps> = ({couleur , titre, paragraphe}) => {

    return (
        <div className='bg-${couleur} opacity-50 w-[24%] border rounded'>
            <div className='bg-${couleur} h-[5%]'></div> 
            <div>
                
            </div>
        </div>
    )
}

export default Redirecter