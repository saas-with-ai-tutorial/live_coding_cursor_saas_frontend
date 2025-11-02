'use client';

import React, { useState } from 'react';

interface RefreshButtonProps {
  onRefresh: () => void | Promise<void>;
  className?: string;
}

export default function RefreshButton({ onRefresh, className = '' }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      // Add a small delay to make the spinning animation visible
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        bg-[#1a1a1a] border border-gray-800 text-gray-300
        hover:bg-gray-800 hover:text-white hover:border-gray-700
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="Refresh"
    >
      <svg
        className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span className="hidden sm:inline font-medium">
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </span>
    </button>
  );
}

