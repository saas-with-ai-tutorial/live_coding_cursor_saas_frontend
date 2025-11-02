import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 px-6 sm:px-8 md:px-20 lg:px-36 bg-black border-t border-gray-800">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="TodoSaaS"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            <p className="text-gray-400">
              Centralize your todos from anywhere. AI-powered task management.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="/app" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {currentYear} TodoSaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

