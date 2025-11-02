import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function EmailInput({
  value,
  onChange,
  placeholder = 'Email address',
  className = '',
}: EmailInputProps) {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full sm:w-[300px] sm:flex-shrink-0
        bg-black/50 
        border border-gray-400 
        text-white 
        placeholder:text-gray-400 
        py-3 px-4 
        rounded 
        text-base
        focus:outline-none focus:border-white
        transition-colors
        ${className}
      `}
    />
  );
}

