import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = ({ children, className = '', hover = false, padding = 'md' }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${paddingStyles[padding]} ${
        hover ? 'transition-shadow hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
