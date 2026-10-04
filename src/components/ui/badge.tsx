import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

const badgeVariants: Record<string, string> = {
  default: 'border-transparent bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-100/80',
  secondary: 'border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-800/80',
  destructive: 'border-red-900/50 bg-red-950/50 text-red-300',
  outline: 'text-zinc-300 border-zinc-700',
  success: 'border-emerald-800/50 bg-emerald-950/50 text-emerald-300',
  warning: 'border-amber-800/50 bg-amber-950/50 text-amber-300',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  );
}
