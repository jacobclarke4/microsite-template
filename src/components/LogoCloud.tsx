import clsx from 'clsx';
import { 
  Boxes, Database, Cloud, Server, 
  Code2, Cpu, Globe2, Layers 
} from 'lucide-react';
import { ReactNode } from 'react';
import { Section } from './Section';
import { Heading, Text } from './Typography';
import { Padding, Gap, gapMap, GradientConfig } from '../types';

interface Logo {
  name: string;
  icon?: ReactNode;
  href?: string;
}

interface LogoCloudProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  bgColor?: string;
  textColor?: string;
  logoColor?: string;
  paddingY?: Padding;
  gap?: Gap;
  variant?: 'simple' | 'cards' | 'grid';
  grayscale?: boolean;
  showNames?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

const defaultLogos: Logo[] = [
  { name: 'TechCorp', icon: <Boxes className="w-8 h-8" />, href: '#' },
  { name: 'DataFlow', icon: <Database className="w-8 h-8" />, href: '#' },
  { name: 'CloudNet', icon: <Cloud className="w-8 h-8" />, href: '#' },
  { name: 'ServerPro', icon: <Server className="w-8 h-8" />, href: '#' },
  { name: 'CodeLab', icon: <Code2 className="w-8 h-8" />, href: '#' },
  { name: 'ChipTech', icon: <Cpu className="w-8 h-8" />, href: '#' },
  { name: 'GlobalNet', icon: <Globe2 className="w-8 h-8" />, href: '#' },
  { name: 'LayerStack', icon: <Layers className="w-8 h-8" />, href: '#' },
];

export function LogoCloud({
  title = 'Trusted by leading companies',
  subtitle,
  logos = defaultLogos,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  logoColor = 'text-gray-400',
  paddingY = 'lg',
  gap = 'xl',
  variant = 'simple',
  grayscale = true,
  showNames = false,
  gradient,
  className,
}: LogoCloudProps) {
  const renderLogo = (logo: Logo, index: number) => {
    const content = (
      <div
        className={clsx(
          'flex flex-col items-center justify-center',
          grayscale && 'opacity-60 hover:opacity-100 transition-opacity',
          logoColor
        )}
      >
        {logo.icon}
        {showNames && (
          <span className="mt-2 text-sm font-medium">{logo.name}</span>
        )}
      </div>
    );

    if (logo.href) {
      return (
        <a key={index} href={logo.href} className="flex items-center justify-center">
          {content}
        </a>
      );
    }

    return (
      <div key={index} className="flex items-center justify-center">
        {content}
      </div>
    );
  };

  if (variant === 'cards') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        {title && (
          <div className="text-center mb-8">
            <Heading as="h2" fontSize="2xl" textAlign="center" className="mb-2">
              {title}
            </Heading>
            {subtitle && (
              <Text textAlign="center" textColor="text-gray-600">
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className={clsx('grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8', gapMap[gap])}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              {renderLogo(logo, index)}
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (variant === 'grid') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        {title && (
          <div className="text-center mb-8">
            <Heading as="h2" fontSize="2xl" textAlign="center" className="mb-2">
              {title}
            </Heading>
            {subtitle && (
              <Text textAlign="center" textColor="text-gray-600">
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center py-4">
              {renderLogo(logo, index)}
            </div>
          ))}
        </div>
      </Section>
    );
  }

  // Simple variant (default) - horizontal scroll
  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      {title && (
        <Text
          textAlign="center"
          textColor="text-gray-500"
          fontSize="sm"
          fontWeight="medium"
          className="mb-8 uppercase tracking-wide"
        >
          {title}
        </Text>
      )}

      <div className={clsx('flex flex-wrap items-center justify-center', gapMap[gap])}>
        {logos.map((logo, index) => renderLogo(logo, index))}
      </div>
    </Section>
  );
}

// Scrolling logo banner
interface LogoBannerProps {
  logos?: Logo[];
  bgColor?: string;
  logoColor?: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export function LogoBanner({
  logos = defaultLogos,
  bgColor = 'bg-gray-50',
  logoColor = 'text-gray-400',
  speed = 'normal',
  className,
}: LogoBannerProps) {
  const speedClass = {
    slow: 'animate-[scroll_40s_linear_infinite]',
    normal: 'animate-[scroll_25s_linear_infinite]',
    fast: 'animate-[scroll_15s_linear_infinite]',
  };

  return (
    <div className={clsx('py-8 overflow-hidden', bgColor, className)}>
      <div className={clsx('flex gap-16 whitespace-nowrap', speedClass[speed])}>
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className={clsx('flex items-center gap-2 px-4', logoColor, 'opacity-60')}
          >
            {logo.icon}
            <span className="font-medium">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
