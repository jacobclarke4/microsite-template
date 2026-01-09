import clsx from 'clsx';
import { ReactNode } from 'react';

// ============================================
// DIVIDER
// ============================================

interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

export function Divider({
  variant = 'solid',
  color = 'border-gray-200',
  spacing = 'md',
  label,
  className,
}: DividerProps) {
  const spacingMap = {
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12',
    xl: 'my-16',
  };

  const variantMap = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  if (label) {
    return (
      <div className={clsx('flex items-center', spacingMap[spacing], className)}>
        <div className={clsx('flex-1 border-t', variantMap[variant], color)} />
        <span className="px-4 text-sm text-gray-500">{label}</span>
        <div className={clsx('flex-1 border-t', variantMap[variant], color)} />
      </div>
    );
  }

  return (
    <hr
      className={clsx('border-t', variantMap[variant], color, spacingMap[spacing], className)}
    />
  );
}

// ============================================
// CONTAINER
// ============================================

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  centered?: boolean;
  className?: string;
}

export function Container({
  children,
  size = 'xl',
  padding = true,
  centered = true,
  className,
}: ContainerProps) {
  const sizeMap = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={clsx(
        sizeMap[size],
        centered && 'mx-auto',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// SPACER
// ============================================

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

export function Spacer({ size = 'md', className }: SpacerProps) {
  const sizeMap = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
    '2xl': 'h-24',
    '3xl': 'h-32',
  };

  return <div className={clsx(sizeMap[size], className)} />;
}

// ============================================
// ASPECT RATIO
// ============================================

interface AspectRatioProps {
  children: ReactNode;
  ratio?: '1:1' | '4:3' | '16:9' | '21:9' | '3:4' | '9:16';
  className?: string;
}

export function AspectRatio({
  children,
  ratio = '16:9',
  className,
}: AspectRatioProps) {
  const ratioMap = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '21:9': 'aspect-[21/9]',
    '3:4': 'aspect-[3/4]',
    '9:16': 'aspect-[9/16]',
  };

  return (
    <div className={clsx('relative overflow-hidden', ratioMap[ratio], className)}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

// ============================================
// IMAGE PLACEHOLDER
// ============================================

interface ImagePlaceholderProps {
  text?: string;
  icon?: ReactNode;
  bgColor?: string;
  textColor?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9';
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

export function ImagePlaceholder({
  text = 'Image',
  icon,
  bgColor = 'bg-gradient-to-br from-gray-100 to-gray-200',
  textColor = 'text-gray-400',
  aspectRatio = '16:9',
  rounded = 'xl',
  className,
}: ImagePlaceholderProps) {
  const roundedMap = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <AspectRatio ratio={aspectRatio} className={clsx(roundedMap[rounded], className)}>
      <div className={clsx('w-full h-full flex items-center justify-center', bgColor)}>
        <div className={clsx('flex flex-col items-center gap-2', textColor)}>
          {icon}
          <span className="text-sm font-medium">{text}</span>
        </div>
      </div>
    </AspectRatio>
  );
}

// ============================================
// SKELETON LOADER
// ============================================

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
  className?: string;
}

export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  animate = true,
  className,
}: SkeletonProps) {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={clsx(
        'bg-gray-200',
        width,
        height,
        roundedMap[rounded],
        animate && 'animate-pulse',
        className
      )}
    />
  );
}

// Skeleton variants for common use cases
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={clsx('space-y-2', className)}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? 'w-3/4' : 'w-full'}
          height="h-4"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx('p-6 bg-white rounded-xl shadow-md', className)}>
      <Skeleton width="w-12" height="h-12" rounded="lg" className="mb-4" />
      <Skeleton width="w-3/4" height="h-6" className="mb-2" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <Skeleton width={sizeMap[size].split(' ')[0]} height={sizeMap[size].split(' ')[1]} rounded="full" className={className} />;
}
