import { ReactNode } from 'react';
import clsx from 'clsx';
import { CardProps, shadowMap, roundedMap, paddingMap, GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface Props extends CardProps {
  children: ReactNode;
  gradient?: GradientConfig;
}

export function Card({
  children,
  shadow = 'md',
  rounded = 'xl',
  padding = 'lg',
  border = false,
  borderColor = 'border-gray-200',
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  hoverEffect = false,
  gradient,
  className,
}: Props) {
  const gradientClasses = buildGradientClasses(gradient);
  const gradientStyle = buildGradientStyle(gradient);
  
  return (
    <div
      className={clsx(
        !gradient?.enabled && bgColor,
        gradient?.enabled && gradientClasses,
        textColor,
        shadowMap[shadow],
        roundedMap[rounded],
        paddingMap[padding],
        border && 'border',
        border && borderColor,
        hoverEffect && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      style={gradientStyle}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={clsx('mb-4', className)}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx(className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={clsx('mt-4 pt-4 border-t border-gray-100', className)}>{children}</div>;
}
