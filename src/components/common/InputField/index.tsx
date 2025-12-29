'use client';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface InputProps {
  name: string;
  labelName: string;
  icon: string;
  error?: string;
  type?: string;
  placeholder: string;
  value?: string;
  variant?: 'default' | 'card';
  classNames?: { input?: string; label?: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputField = ({
  labelName,
  name,
  type = 'text',
  icon,
  error,
  value,
  placeholder,
  variant = 'default',
  classNames,
  onChange,
}: InputProps) => {
  const variants = {
    default: {
      label: 'text-secondary-100 text-xl font-bold',
      container:
        'h-12 border-secondary-100 shadow-md shadow-secondary-100 bg-primary-100 rounded-md',
      iconColor: 'text-secondary-100',
    },
    card: {
      label: 'text-tertiary-100 text-xs uppercase tracking-wider font-bold mb-0',
      container:
        'h-11 border-secondary-100/20 bg-card-bg rounded-xl shadow-none focus-within:border-secondary-100 transition-all',
      iconColor: 'text-tertiary-100',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={cn('flex flex-row gap-2 items-center', currentVariant.label, classNames?.label)}
      >
        <Icon icon={icon} width={16} height={16} className={currentVariant.iconColor} />
        {labelName}
      </label>
      <div
        className={cn(
          'flex flex-row items-center w-full my-2 border-2 px-3 py-2 text-sm placeholder:text-placeholder-',
          currentVariant.container,
          classNames?.input,
        )}
      >
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-light-text-100 placeholder:text-light-text-100/30"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
