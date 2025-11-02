import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      rank: 1,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
      name: 'Sarah Chen',
      role: 'Product Manager at TechCorp',
      quote: 'This app has transformed how I manage my todos. The AI extraction from Gmail and Slack saves me hours every week. Highly recommend!',
      alt: 'Sarah Chen testimonial',
    },
    {
      rank: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      name: 'Michael Rodriguez',
      role: 'Engineering Lead',
      quote: 'Finally, a centralized system that works across all my communication channels. The WhatsApp integration is a game-changer for my team.',
      alt: 'Michael Rodriguez testimonial',
    },
    {
      rank: 3,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
      name: 'Emily Johnson',
      role: 'Freelance Designer',
      quote: 'As someone who juggles multiple clients and platforms, this tool keeps me organized without the headache. Love the clean interface!',
      alt: 'Emily Johnson testimonial',
    },
    {
      rank: 4,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
      name: 'David Kim',
      role: 'Operations Director',
      quote: 'The Microsoft Teams integration has streamlined our entire workflow. Tasks automatically appear in our dashboard - it\'s brilliant!',
      alt: 'David Kim testimonial',
    },
    {
      rank: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      name: 'Lisa Anderson',
      role: 'Marketing Manager',
      quote: 'The AI accuracy is impressive. It correctly identifies todos from context, not just keywords. This is the future of task management.',
      alt: 'Lisa Anderson testimonial',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-20 lg:px-36 bg-black">
      <div className="w-full max-w-[1920px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12">
          What Our Users Say
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 sm:-mx-8 md:-mx-20 lg:-mx-36 px-6 sm:px-8 md:px-20 lg:px-36">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rank={testimonial.rank}
              image={testimonial.image}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              alt={testimonial.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

