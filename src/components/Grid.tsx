import { ReactNode } from 'react';
import clsx from 'clsx';
import { GridProps, gridColsMap, gapMap } from '../types';

interface Props extends GridProps {
  children: ReactNode;
}

export function Grid({
  children,
  cols = 3,
  gap = 'lg',
  bgColor,
  textColor,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'grid',
        gridColsMap[cols],
        gapMap[gap],
        bgColor,
        textColor,
        className
      )}
    >
      {children}
    </div>
  );
}

interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = 'row',
  justify = 'start',
  align = 'center',
  gap = 'md',
  wrap = false,
  className,
}: FlexProps) {
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={clsx(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        justifyMap[justify],
        alignMap[align],
        gapMap[gap],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
}

interface StackProps {
  children: ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export function Stack({ children, gap = 'md', align = 'stretch', className }: StackProps) {
  return (
    <Flex direction="col" gap={gap} align={align} className={className}>
      {children}
    </Flex>
  );
}
