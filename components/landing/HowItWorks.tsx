import React from 'react';
import Button from '../ui/Button';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Connect Your Channels',
      description: 'Link your Gmail, WhatsApp, Slack, and other accounts with a few clicks',
    },
    {
      number: 2,
      title: 'AI Processes Messages',
      description: 'Our AI automatically extracts todos from your messages and emails in real-time',
    },
    {
      number: 3,
      title: 'Centralized Dashboard',
      description: 'View and manage all your todos in one unified, intuitive dashboard',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-black">
      <div className="w-full max-w-[1920px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-16 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 sm:mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e50914] text-white text-2xl font-bold mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" icon>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}

