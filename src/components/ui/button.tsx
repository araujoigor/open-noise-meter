import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantStyles: Record<string, string> = {
  default: 'bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200 active:scale-[0.98]',
  destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-500 active:scale-[0.98]',
  outline: 'border border-zinc-800 bg-transparent text-zinc-200 shadow-sm hover:bg-zinc-800/80 hover:text-white',
  secondary: 'bg-zinc-800 text-zinc-100 shadow-sm hover:bg-zinc-700/80 hover:text-white',
  ghost: 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
  link: 'text-zinc-100 underline-offset-4 hover:underline',
  success: 'bg-emerald-600 text-white shadow hover:bg-emerald-500 active:scale-[0.98]',
};

const sizeStyles: Record<string, string> = {
  default: 'h-9 px-4 py-2 text-sm',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-11 rounded-md px-8 text-base font-semibold',
  icon: 'h-9 w-9',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantStyles[variant] || variantStyles.default,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
