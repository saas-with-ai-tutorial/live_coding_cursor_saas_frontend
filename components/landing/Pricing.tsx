import React from 'react';
import Button from '../ui/Button';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Up to 5 integrations',
        '100 todos/month',
        'Basic AI processing',
        'Community support',
      ],
      cta: 'Get Started',
      variant: 'outline' as const,
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      features: [
        'Unlimited integrations',
        'Unlimited todos',
        'Advanced AI processing',
        'Priority support',
        'Custom categories',
      ],
      cta: 'Get Started',
      variant: 'primary' as const,
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
      ],
      cta: 'Contact Sales',
      variant: 'outline' as const,
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-[#1a1a1a]">
      <div className="w-full max-w-[1920px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                bg-black 
                rounded-lg 
                p-6 sm:p-8 
                border-2 
                ${plan.highlighted ? 'border-[#e50914]' : 'border-gray-800'}
                relative
                h-full
                flex
                flex-col
              `}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#e50914] text-white text-sm font-bold px-4 py-1 rounded">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-sm sm:text-base">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-[#e50914] mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} className="w-full" icon={plan.variant === 'primary'}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

