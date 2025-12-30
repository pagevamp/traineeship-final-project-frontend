'use client';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'border-2 border-secondary-100 text-sm text-white font-bold rounded-lg w-fit',
        handler:
          'bg-secondary-100 border-2 border-secondary-100 rounded-3xl flex flex-row gap-3 h-12 text-white font-semibold px-2 place-self-end',
        ghost: 'bg-transparent text-placeholder-100',
        icon: 'bg-transparent p-0 m-0',
        navigation:
          'bg-tertiary-100 border-2 border-secondary-100 rounded-md shadow-sm shadow-primary-100 text-md flex flex-row items-center gap-3 h-12 w-50 text-white font-semibold px-2 place-self-end',
        popper:
          'h-fit w-30 p-2 border-2 border-black rounded-md font-semibold bg-radial-[at_25%_25%] from-secondary-100 to-tertiary-100/60 to-75% hover:bg-secondary-100/20 text-left cursor-pointer',
    
      },
      size: {
        default: 'px-10 py-2',
        icon: 'h-5 w-5 p-0 m-0',
        'icon-sm': 'h-8 w-8 p-0 m-0',
        'icon-lg': 'h-16 w-16 p-0 m-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const Button = ({
  children,
  variant,
  disabled,
  size,
  className,
  type = 'button',
  onClick,
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
};
