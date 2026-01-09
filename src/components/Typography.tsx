import { ReactNode } from 'react';
import clsx from 'clsx';
import { TypographyProps, fontSizeMap, fontWeightMap, textAlignMap } from '../types';

interface HeadingProps extends TypographyProps {
  children: ReactNode;
}

export function Heading({
  children,
  as: Tag = 'h2',
  fontSize = '4xl',
  fontWeight = 'bold',
  textAlign = 'left',
  textColor = 'text-gray-900',
  className,
}: HeadingProps) {
  return (
    <Tag
      className={clsx(
        fontSizeMap[fontSize],
        fontWeightMap[fontWeight],
        textAlignMap[textAlign],
        textColor,
        'tracking-tight',
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface TextProps extends TypographyProps {
  children: ReactNode;
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
}

export function Text({
  children,
  as: Tag = 'p',
  fontSize = 'base',
  fontWeight = 'normal',
  textAlign = 'left',
  textColor = 'text-gray-600',
  leading = 'relaxed',
  className,
}: TextProps) {
  const leadingMap = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  return (
    <Tag
      className={clsx(
        fontSizeMap[fontSize],
        fontWeightMap[fontWeight],
        textAlignMap[textAlign],
        textColor,
        leadingMap[leading],
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface BadgeProps {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  rounded?: 'md' | 'full';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  bgColor = 'bg-blue-100',
  textColor = 'text-blue-700',
  rounded = 'full',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium',
        bgColor,
        textColor,
        rounded === 'full' ? 'rounded-full' : 'rounded-md',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {children}
    </span>
  );
}
