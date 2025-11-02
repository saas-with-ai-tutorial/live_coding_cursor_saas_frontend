import React from 'react';
import FeatureCard from '../ui/FeatureCard';

export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Processing',
      description: 'Automatically extract todos from messages and emails using advanced AI technology',
      highlighted: true,
    },
    {
      icon: '🔗',
      title: 'Multi-Channel Sync',
      description: 'Connect all your communication channels in one unified platform',
      highlighted: false,
    },
    {
      icon: '📊',
      title: 'Smart Organization',
      description: 'Automatically categorize and prioritize your todos for maximum productivity',
      highlighted: false,
    },
    {
      icon: '⚡',
      title: 'Real-Time Updates',
      description: 'Get instant notifications when new todos are created from your channels',
      highlighted: false,
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry-leading security measures',
      highlighted: false,
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Access your todos from any device, anywhere, anytime',
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-black">
      <div className="w-full max-w-[1920px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              highlighted={feature.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

