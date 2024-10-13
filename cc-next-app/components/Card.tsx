import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

interface CardProps {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: string;
  recommender: string;
  watched: boolean;
  onMarkWatched: (id: string) => void;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  url,
  thumbnail,
  category,
  recommender,
  watched,
  onMarkWatched,
  onDelete
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Category: {category}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Recommender: {recommender}</p>
        <div className="flex justify-between">
          <Button
            onClick={() => onMarkWatched(id)}
            variant={watched ? "secondary" : "default"}
          >
            {watched ? "Watched" : "Mark as Watched"}
          </Button>
          <Button
            onClick={() => onDelete(id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

