'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import EmailInput from '../ui/EmailInput';

export default function Hero() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Email submitted:', email);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-20 lg:px-36 pt-32 pb-16 text-center overflow-hidden">
      {/* Background image with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop&auto=format&q=80"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
          quality={80}
        />
        {/* Dark overlay to darken the image further */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Blur effect */}
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Unlimited todos, centralized, effortless
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-white mb-4 drop-shadow-md">
          Starts at $9/month. Cancel anytime.
        </p>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 drop-shadow-md">
          Ready to get organized? Enter your email to get started.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto px-4"
        >
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full sm:w-auto"
          />
          <Button type="submit" icon>
            Get Started
          </Button>
        </form>
      </div>
    </section>
  );
}

