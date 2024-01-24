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
      boxShadow: 'inset 0px 0px 4px 0px #00000025',
      padding: '0px 0px 5px',
      flexBasis: 'auto'
    };
  
    const barreStyle: React.CSSProperties = {
        position: 'relative',
        top: '0',
        left: '0',
        width: '100%',
        height: '5px', // Hauteur de la barre de couleur
        backgroundColor: couleur,
        borderRadius: '0.375rem'
    };

    const textStyle: React.CSSProperties = {
      padding: '0px 5px'
  };
  
    return (
      <Link href={reference} style={styles}>
        <div style={barreStyle}></div>
        <div style={textStyle}>
          <p className='font-bold font-[Lexend]'>{titre}</p>
          <p className='font-[Lexend]'>{paragraphe}</p>
        </div>
      </Link>  
    );
  };
  
  

export default Redirecter