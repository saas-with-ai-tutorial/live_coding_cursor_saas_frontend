import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  rank?: number;
  image: string;
  name: string;
  role: string;
  quote: string;
  alt?: string;
  className?: string;
}

export default function TestimonialCard({
  rank,
  image,
  name,
  role,
  quote,
  alt = 'Testimonial',
  className = '',
}: TestimonialCardProps) {
  return (
    <div
      className={`
        inline-flex 
        flex-col 
        relative 
        min-w-[280px] 
        sm:min-w-[320px]
        flex-shrink-0
        transition-transform 
        duration-200 
        hover:scale-105
        ${className}
      `}
    >
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1a1a]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 280px, 320px"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Rank number */}
        {rank !== undefined && (
          <span className="absolute top-4 left-4 text-6xl font-bold text-white/60 leading-none pointer-events-none">
            {rank}
          </span>
        )}
        
        {/* Testimonial content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <p className="text-white text-sm sm:text-base mb-3 line-clamp-3 font-medium">
            "{quote}"
          </p>
          <div className="border-t border-white/20 pt-3">
            <p className="text-white font-bold text-sm sm:text-base">{name}</p>
            <p className="text-gray-300 text-xs sm:text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

