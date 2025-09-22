import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-5 w-5 border-2',
  md: 'h-10 w-10 border-4',
  lg: 'h-16 w-16 border-[6px]',
};

export const Spinner = ({ size = 'md', className }: SpinnerProps) => (
  <span
    className={clsx(
      'inline-flex animate-spin rounded-full border-slate-700 border-t-transparent',
      sizeMap[size],
      className,
    )}
    aria-hidden="true"
  />
);

export default Spinner;
