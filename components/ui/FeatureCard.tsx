import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

export default function FeatureCard({
  title,
  description,
  icon,
  highlighted = false,
}: FeatureCardProps) {
  return (
    <div
      className={`
        bg-[#1a1a1a] 
        rounded-lg 
        p-6 
        sm:p-8
        transition-all 
        duration-200 
        hover:shadow-lg 
        hover:-translate-y-1
        h-full
        ${highlighted ? 'border-2 border-[#e50914]' : 'border border-gray-800'}
      `}
    >
      <div className="text-[#e50914] mb-4 text-3xl sm:text-4xl">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </div>
  );
}

