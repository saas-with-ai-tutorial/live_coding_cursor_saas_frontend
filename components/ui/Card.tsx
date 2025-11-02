import React from 'react';
import Image from 'next/image';

interface CardProps {
  children?: React.ReactNode;
  rank?: number;
  image?: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  children,
  rank,
  image,
  alt = 'Card',
  onClick,
  className = '',
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        inline-flex 
        flex-col 
        flex-wrap 
        relative 
        min-w-[200px] 
        sm:min-w-[250px]
        flex-shrink-0
        cursor-pointer 
        transition-transform 
        duration-200 
        hover:scale-105
        ${className}
      `}
    >
      {image && (
        <div className="relative w-full aspect-[2/3] rounded overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 600px) 200px, 250px"
          />
        </div>
      )}
      {children}
      {rank !== undefined && (
        <span className="absolute bottom-2 left-2 text-6xl font-bold text-white/80 leading-none pointer-events-none">
          {rank}
        </span>
      )}
    </div>
  );
}

