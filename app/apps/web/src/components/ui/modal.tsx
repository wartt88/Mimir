import React from "react";
import Image from "next/image";

function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
  children: JSX.Element[] | JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="bg-white p-8 w-[30vw] mx-auto rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          type="button"
        >
          <Image
            alt="Fermer"
            className=""
            height={20}
            src="cross.svg"
            width={20}
          />
        </button>
        {children}
      </div>
    </div>
  );
}

export { Modal };
