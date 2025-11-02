'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How does the AI extract todos from messages?',
      answer: 'Our advanced AI analyzes your messages and emails to identify action items, deadlines, and tasks. It uses natural language processing to understand context and automatically creates todos with relevant details.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use end-to-end encryption and follow industry best practices for data security. Your messages are processed securely, and we never store sensitive content longer than necessary.',
    },
    {
      question: 'Which integrations are available?',
      answer: 'We currently support Gmail, WhatsApp, Slack, and Microsoft Teams. Discord is available in beta, and Telegram is coming soon. More integrations are being added regularly.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your billing period.',
    },
    {
      question: 'What happens to my todos if I cancel?',
      answer: 'Your todos will remain accessible for 30 days after cancellation. You can export your data at any time before your subscription ends.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes, we offer a free plan that includes up to 5 integrations and 100 todos per month. You can upgrade to Pro anytime to unlock unlimited features.',
    },
    {
      question: 'How accurate is the AI extraction?',
      answer: 'Our AI has a 95%+ accuracy rate for identifying todos. You can always review, edit, or delete any automatically created todos to ensure accuracy.',
    },
    {
      question: 'Can I use this for team collaboration?',
      answer: 'Yes, our Enterprise plan includes team collaboration features, shared workspaces, and advanced permissions. Contact us for team pricing options.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-[#1a1a1a]">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-800"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-5 sm:py-6 flex items-center justify-between text-white font-bold text-base sm:text-lg hover:text-[#e50914] transition-colors pr-4"
              >
                <span className="pr-4">{faq.question}</span>
                <span className="text-2xl flex-shrink-0 transform transition-transform">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-5 sm:pb-6 text-gray-400 text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

