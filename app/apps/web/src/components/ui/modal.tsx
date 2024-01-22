import React from 'react';
import Image from "next/image"

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}>
          <div className="bg-white p-8 max-w-md mx-auto rounded shadow-lg relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <Image
                 alt="Fermer"
                 className=""
                 width={20}
                 height={20}
                 src="cross.svg"
                />
            </button>
            {children}
          </div>
        </div>
    );
  };

export { Modal }