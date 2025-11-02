import React from 'react';
import IntegrationCard from '../ui/IntegrationCard';

export default function Integrations() {
  const integrations = [
    {
      name: 'Gmail',
      icon: 'https://logo.clearbit.com/gmail.com',
      status: 'available' as const,
    },
    {
      name: 'WhatsApp',
      icon: 'https://logo.clearbit.com/whatsapp.com',
      status: 'available' as const,
    },
    {
      name: 'Slack',
      icon: 'https://logo.clearbit.com/slack.com',
      status: 'available' as const,
    },
    {
      name: 'Microsoft Teams',
      icon: 'https://logo.clearbit.com/teams.microsoft.com',
      status: 'available' as const,
    },
    {
      name: 'Discord',
      icon: 'https://logo.clearbit.com/discord.com',
      status: 'beta' as const,
    },
    {
      name: 'Telegram',
      icon: 'https://logo.clearbit.com/telegram.org',
      status: 'coming-soon' as const,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-[#1a1a1a]">
      <div className="w-full max-w-[1920px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Available Integrations
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 text-center mb-8 sm:mb-12">
          Connect your favorite tools and channels
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={index}
              name={integration.name}
              icon={integration.icon}
              status={integration.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

