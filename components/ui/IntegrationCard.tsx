'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface IntegrationCardProps {
  name: string;
  icon: string;
  status: 'available' | 'coming-soon' | 'beta';
  onClick?: () => void;
}

export default function IntegrationCard({
  name,
  icon,
  status,
  onClick,
}: IntegrationCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const statusColors = {
    available: 'bg-green-500',
    'coming-soon': 'bg-gray-500',
    beta: 'bg-yellow-500',
  };
  
  const statusLabels = {
    available: 'Available',
    'coming-soon': 'Coming Soon',
    beta: 'Beta',
  };

  // Check if icon is a URL or should use text-based icon
  const isImageUrl = icon.startsWith('http');
  
  return (
    <div
      onClick={onClick}
      className="
        bg-[#1a1a1a] 
        border 
        border-gray-800 
        rounded-lg 
        p-6 
        text-center 
        cursor-pointer 
        transition-all 
        duration-200 
        hover:scale-105 
        hover:border-[#e50914]
        relative
      "
    >
      <div className="flex justify-center mb-4 h-16 items-center">
        {isImageUrl && !imageError ? (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-2">
            <Image
              src={icon}
              alt={name}
              fill
              className="object-contain"
              sizes="64px"
              unoptimized
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-[#e50914] rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold mb-3 text-base sm:text-lg">{name}</h3>
      <span
        className={`
          ${statusColors[status]} 
          text-white 
          text-xs 
          px-2 
          py-1 
          rounded
        `}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
}

