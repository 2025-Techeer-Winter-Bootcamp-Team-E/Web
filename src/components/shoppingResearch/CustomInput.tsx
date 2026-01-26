import React from 'react';
import { Edit3 } from 'lucide-react';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="group relative w-full">
      <div className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 transition-all duration-300 focus-within:border-(--color-gradient-purple) focus-within:ring-[4px] focus-within:ring-[var(--color-gradient-purple)]/10">
        <div className="flex shrink-0 items-center justify-center text-gray-400 transition-colors duration-300 group-focus-within:text-(--color-gradient-purple)">
          <Edit3 className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[19px] font-semibold tracking-tight text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-300"
        />

        {value && <div className="flex h-1.5 w-1.5 rounded-full bg-(--color-gradient-purple) opacity-80" />}
      </div>
    </div>
  );
};

export default CustomInput;
