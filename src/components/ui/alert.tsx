import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
}

const alertVariants: Record<string, string> = {
  default: 'bg-zinc-900/60 border-zinc-800 text-zinc-100',
  destructive: 'border-red-900/50 bg-red-950/30 text-red-200 [&>svg]:text-red-400',
  warning: 'border-amber-900/50 bg-amber-950/30 text-amber-200 [&>svg]:text-amber-400',
  success: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-200 [&>svg]:text-emerald-400',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-md border p-4 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-100',
        alertVariants[variant] || alertVariants.default,
        className
      )}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs [&_p]:leading-relaxed text-zinc-300', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
