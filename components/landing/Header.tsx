'use client';

import React from 'react';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 md:px-20 lg:px-36 h-20 flex items-center justify-between">
        <div className="text-2xl sm:text-3xl font-bold text-[#e50914]">
          TodoSaaS
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/signin'}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.location.href = '/app'}
          >
            To App
          </Button>
        </nav>
      </div>
    </header>
  );
}

