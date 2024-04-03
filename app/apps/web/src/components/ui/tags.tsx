import React from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import type { DeckInterface } from "../../models/deck";

const allTags: TagProps[] = [];

function getRandomColor(): string {
  const colors = [
    "bg-gray-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-gray-300",
    "bg-red-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-indigo-300",
    "bg-purple-300",
    "bg-pink-300",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

interface TagProps {
  title: string;
  color?: string;
  deck?: DeckInterface;
  value?: number;
}

function Tag({ title, deck }: TagProps): JSX.Element {
  const tagExists = allTags.some((existingTag) => existingTag.title === title);
  let currentTag: TagProps | undefined = {
    title,
    color: getRandomColor(),
    deck,
    value: 0,
  };

  if (!tagExists) {
    if (deck) {
      allTags.push({
        title,
        color: getRandomColor(),
        value: deck.votes.up - deck.votes.down,
      });
      allTags.sort((tag1, tag2) => {
        // Si tag1.value est undefined, considérez-le comme le plus petit possible
        const value1 = tag1.value === undefined ? -Infinity : tag1.value;
        // Si tag2.value est undefined, considérez-le comme le plus petit possible
        const value2 = tag2.value === undefined ? -Infinity : tag2.value;
        return value2 - value1; // Pour un tri décroissant
      });
    } else {
      allTags.push({ title, color: getRandomColor() });
    }
  } else {
    if (deck) {
      allTags.map((tag) =>
        tag.title === title && tag.value
          ? {
              ...tag,
              color: tag.color,
              value: tag.value + (deck.votes.up - deck.votes.down),
            }
          : tag
      );
    }
    currentTag = allTags.find((tag) => tag.title === title);
  }

  if (currentTag) {
    return (
      <div
        className={`w-fit px-3 py-2 rounded-full max-w-[100%] ${currentTag.color}`}
      >
        <p className="font-Lexend font-medium text-xs truncate">
          {currentTag.title}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`w-fit px-3 py-2 rounded-full max-w-[90%] ${getRandomColor()}`}
    >
      <p className="font-Lexend font-medium text-xs truncate">{title}</p>
    </div>
  );
}

interface ImgTagProps {
  title: string;
  img: ImageProps;
}

function ImgTag({ title, img }: ImgTagProps): JSX.Element {
  return (
    <div className="flex items-center space-x-1 w-fit">
      <Image
        alt={img.alt}
        height={img.height}
        src={img.src}
        width={img.width}
      />
      <p className="font-Lexend font-medium text-sm">{title}</p>
    </div>
  );
}

export type { TagProps };
export { Tag, ImgTag, allTags };
