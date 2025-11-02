'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/app' },
  { name: 'All Todos', href: '/app/todos' },
  { name: 'Integrations', href: '/app/integrations' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-800 justify-between">
          <Link href="/app" className="flex items-center">
            <Image
              src="/logo.png"
              alt="TodoSaaS"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/app' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-[#e50914] text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
}

