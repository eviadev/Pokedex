import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  className,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-sky-500 text-white shadow hover:bg-sky-400',
    secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800/60',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      disabled={disabled}
      {...props}
    />
  );
};

export default Button;
