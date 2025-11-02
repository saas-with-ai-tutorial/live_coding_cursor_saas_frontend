import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-bold rounded transition-colors duration-200 border';
  
  const variantClasses = {
    primary: 'bg-[#e50914] text-white border-[#e50914] hover:bg-[#b20710] hover:border-[#b20710]',
    secondary: 'bg-transparent text-white border-white hover:bg-white/10',
    outline: 'bg-transparent text-white border-gray-500 hover:border-white',
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm whitespace-nowrap',
    md: 'py-3 px-6 text-base whitespace-nowrap',
    lg: 'py-4 px-8 text-lg whitespace-nowrap',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {icon && <span className="ml-2">›</span>}
    </button>
  );
}

