'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button } from '../Button';
import { cn } from '@/lib/utils';

export interface InputProps {
  name: string;
  labelName: string;
  icon: string;
  error?: string | '';
  type?: string | '';
  placeholder: string;
  value?: string | '';
  classNames?: { input?: string; label?: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputField = ({
  labelName,
  name,
  type,
  icon,
  error,
  value,
  placeholder,
  classNames,
  onChange,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type == 'password';
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          'text-shadow-md text-shadow-lime-950 flex flex-row gap-2 items-center text-primary-100',
          classNames?.label
        )}
      >
        <Icon
          icon={icon}
          width={16}
          height={16}
          className="text-undraw-secondary-100"
        />
        {labelName}
      </label>
      <div
        className={cn(
          'flex flex-row items-center h-12 w-full my-2 rounded-md border-2 border-undraw-secondary-100 shadow-md shadow-lime-950 bg-primary-100 text-undraw-secondary-100 font-light px-2 py-2 text-sm placeholder:text-placeholder-100 placeholder:text-sm',
          classNames?.input
        )}
      >
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Icon icon="mdi-light:eye-off" width={22} height={22} />
            ) : (
              <Icon icon="mdi-light:eye" width={22} height={22} />
            )}
            {/* <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span> */}
          </Button>
        )}
        <input
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-none bg-transparent focus:outline-none focus:ring-0 w-full"
        />
      </div>
      {error && (
        <p className="text-xs text-red-700 flex items-center gap-1 mt-1">
          <span className="w-fit">
            <Icon
              icon="solar:close-square-bold"
              width="14"
              height="14"
              className="text-red-950"
            />
          </span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
