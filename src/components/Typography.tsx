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

