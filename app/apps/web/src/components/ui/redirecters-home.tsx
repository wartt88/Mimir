import React from 'react';
import { cn } from "../../lib/utils"
import Link from "next/link";

interface RedirecterProps {
    couleur: string;
    titre: string;
    paragraphe: string;
    reference: string;
}

const Redirecter: React.FC<RedirecterProps> = ({ couleur, titre, paragraphe, reference }) => {
    const styles: React.CSSProperties = {
      position: 'relative',
      backgroundColor: `rgba(${parseInt(couleur.slice(1, 3), 16)}, ${parseInt(couleur.slice(3, 5), 16)}, ${parseInt(couleur.slice(5, 7), 16)}, 0.2)`,
      width: '100%',
      border: '0px solid #000', // Remplacez par votre couleur de bordure
      borderRadius: '0.375rem',
      margin: '0.25rem',
      height: '100%',
      boxShadow: 'inset 0px 0px 4px 0px #00000025',
      padding: '5px'
    };
  
    const barreStyle: React.CSSProperties = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '5%', // Hauteur de la barre de couleur
        backgroundColor: couleur,
        borderRadius: '0.375rem'
    };
  
    return (
      <Link href={reference} style={styles}>
        <div style={barreStyle}></div>
        <div>
          <p className='font-bold font-[Lexend]'>{titre}</p>
          <p className='font-[Lexend]'>{paragraphe}</p>
        </div>
      </Link>  
    );
  };
  
  

export default Redirecter