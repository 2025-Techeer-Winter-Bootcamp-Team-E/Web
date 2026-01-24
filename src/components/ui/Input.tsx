import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-600">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[var(--color-gradient-purple)] focus:ring-1 focus:ring-[var(--color-gradient-purple)] ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
