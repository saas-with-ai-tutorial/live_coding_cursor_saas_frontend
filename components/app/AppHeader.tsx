'use client';

import React from 'react';

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#1a1a1a] border-b border-gray-800 h-20 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Search or breadcrumbs can go here */}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications or other actions can go here */}

        {/* User menu placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="text-gray-300 hidden sm:block">User</span>
        </div>
      </div>
    </header>
  );
}

