import { ReactNode } from 'react';
import clsx from 'clsx';
import { SectionProps, paddingYMap, paddingXMap, maxWidthMap, GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface Props extends SectionProps {
  children: ReactNode;
  id?: string;
  fullWidth?: boolean;
  gradient?: GradientConfig;
}

export function Section({
  children,
  id,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  paddingY = 'lg',
  paddingX = 'md',
  maxWidth = '7xl',
  fullWidth = false,
  gradient,
  className,
}: Props) {
  const gradientClasses = buildGradientClasses(gradient);
  const gradientStyle = buildGradientStyle(gradient);
  
  return (
    <section
      id={id}
      className={clsx(
        !gradient?.enabled && bgColor,
        gradient?.enabled && gradientClasses,
        textColor,
        paddingYMap[paddingY],
        className
      )}
      style={gradientStyle}
    >
      <div
        className={clsx(
          'mx-auto',
          paddingXMap[paddingX],
          !fullWidth && maxWidthMap[maxWidth]
        )}
      >
        {children}
      </div>
    </section>
  );
}
