import { ReactNode } from 'react';
import clsx from 'clsx';
import { ButtonProps, roundedMap, shadowMap } from '../types';

interface Props extends ButtonProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  rounded = 'lg',
  shadow = 'none',
  fullWidth = false,
  disabled = false,
  bgColor,
  textColor,
  onClick,
  leftIcon,
  rightIcon,
  className,
}: Props) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    solid: clsx(
      bgColor || 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]',
      textColor || 'text-white'
    ),
    outline: clsx(
      'border-2',
      bgColor || 'border-[var(--primary)] hover:bg-gray-100',
      textColor || 'text-[var(--primary)]'
    ),
    ghost: clsx(
      bgColor || 'hover:bg-[var(--primary-dark)]/10',
      textColor || 'text-gray-700'
    ),
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        roundedMap[rounded],
        shadowMap[shadow],
        variantClasses[variant],
        fullWidth && 'w-full',
        className
      )}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

interface ButtonGroupProps {
  children: ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ButtonGroup({ children, gap = 'md', className }: ButtonGroupProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={clsx('flex flex-wrap items-center', gapClasses[gap], className)}>
      {children}
    </div>
  );
}
