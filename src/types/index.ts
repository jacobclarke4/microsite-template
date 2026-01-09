import { ReactNode } from 'react';

// ============================================
// SHARED STYLE PROP TYPES
// ============================================

export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type GradientDirection = 'to-t' | 'to-tr' | 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl';
export type GradientStop = { color: string; position?: number }; // position is 0-100

export interface GradientConfig {
  enabled: boolean;
  direction?: GradientDirection;
  from?: string;      // Tailwind color class without 'from-' prefix, e.g. 'blue-500'
  via?: string;       // Optional middle color
  to?: string;        // Tailwind color class without 'to-' prefix
  // For custom gradients with more control:
  stops?: GradientStop[];
  customCss?: string; // Allow fully custom gradient CSS
}
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6;
export type Gap = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextAlign = 'left' | 'center' | 'right';

// ============================================
// STYLE MAPS FOR TAILWIND CLASSES
// ============================================

export const shadowMap: Record<ShadowSize, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

export const gradientDirectionMap: Record<GradientDirection, string> = {
  'to-t': 'bg-gradient-to-t',
  'to-tr': 'bg-gradient-to-tr',
  'to-r': 'bg-gradient-to-r',
  'to-br': 'bg-gradient-to-br',
  'to-b': 'bg-gradient-to-b',
  'to-bl': 'bg-gradient-to-bl',
  'to-l': 'bg-gradient-to-l',
  'to-tl': 'bg-gradient-to-tl',
};

// Helper function to build gradient classes
export function buildGradientClasses(gradient?: GradientConfig): string {
  if (!gradient?.enabled) return '';
  
  if (gradient.customCss) return gradient.customCss;
  
  const classes: string[] = [];
  
  // Direction
  const direction = gradient.direction || 'to-r';
  classes.push(gradientDirectionMap[direction]);
  
  // Color stops
  if (gradient.from) classes.push(`from-${gradient.from}`);
  if (gradient.via) classes.push(`via-${gradient.via}`);
  if (gradient.to) classes.push(`to-${gradient.to}`);
  
  return classes.join(' ');
}

// Helper to build inline gradient style for custom stops
export function buildGradientStyle(gradient?: GradientConfig): React.CSSProperties | undefined {
  if (!gradient?.enabled || !gradient.stops || gradient.stops.length === 0) return undefined;
  
  const direction = gradient.direction || 'to-r';
  const cssDirection: Record<GradientDirection, string> = {
    'to-t': 'to top',
    'to-tr': 'to top right',
    'to-r': 'to right',
    'to-br': 'to bottom right',
    'to-b': 'to bottom',
    'to-bl': 'to bottom left',
    'to-l': 'to left',
    'to-tl': 'to top left',
  };
  
  const stops = gradient.stops
    .map(s => s.position !== undefined ? `${s.color} ${s.position}%` : s.color)
    .join(', ');
  
  return {
    background: `linear-gradient(${cssDirection[direction]}, ${stops})`,
  };
}

export const fontSizeMap: Record<FontSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

export const fontWeightMap: Record<FontWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const roundedMap: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

export const gridColsMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};

export const gapMap: Record<Gap, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

export const paddingMap: Record<Padding, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
};

export const paddingYMap: Record<Padding, string> = {
  none: 'py-0',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
  xl: 'py-16',
  '2xl': 'py-24',
};

export const paddingXMap: Record<Padding, string> = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
  '2xl': 'px-16',
};

export const textAlignMap: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// ============================================
// BASE COMPONENT PROPS
// ============================================

export interface BaseStyleProps {
  bgColor?: string;
  textColor?: string;
  gradient?: GradientConfig;
  className?: string;
}

export interface SectionProps extends BaseStyleProps {
  paddingY?: Padding;
  paddingX?: Padding;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
}

export interface CardProps extends BaseStyleProps {
  shadow?: ShadowSize;
  rounded?: Rounded;
  padding?: Padding;
  border?: boolean;
  borderColor?: string;
  hoverEffect?: boolean;
}

export interface TypographyProps extends BaseStyleProps {
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export interface ButtonProps extends BaseStyleProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rounded?: Rounded;
  shadow?: ShadowSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export interface GridProps extends BaseStyleProps {
  cols?: GridCols;
  gap?: Gap;
  children?: ReactNode;
}

// ============================================
// MAX WIDTH MAP
// ============================================

export const maxWidthMap: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};
