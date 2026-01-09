import { ReactNode } from 'react';
import clsx from 'clsx';
import { 
  Zap, Shield, Globe, Layers, 
  BarChart3, Users, Lock
} from 'lucide-react';
import { Section } from './Section';
import { Grid } from './Grid';
import { Card } from './Card';
import { Heading, Text } from './Typography';
import { GridCols, Gap, ShadowSize, Rounded, Padding, GradientConfig } from '../types';

interface Feature {
  icon?: ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
  cols?: GridCols;
  gap?: Gap;
  bgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  cardPadding?: Padding;
  cardBorder?: boolean;
  cardHover?: boolean;
  iconBgColor?: string;
  iconColor?: string;
  paddingY?: Padding;
  variant?: 'cards' | 'simple' | 'icons';
  gradient?: GradientConfig;
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure by Default',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Scale',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Modular Design',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Advanced Analytics',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Collaboration',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.',
  },
];

export function Features({
  badge,
  title = 'Lorem ipsum dolor',
  subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  features = defaultFeatures,
  cols = 3,
  gap = 'lg',
  bgColor = 'bg-gray-50',
  textColor = 'text-gray-900',
  cardBgColor = 'bg-white',
  cardShadow = 'md',
  cardRounded = 'xl',
  cardPadding = 'lg',
  cardBorder = false,
  cardHover = true,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  paddingY = 'xl',
  variant = 'cards',
  gradient,
  className,
}: FeaturesProps) {
  const renderFeatureCard = (feature: Feature, index: number) => {
    if (variant === 'simple') {
      return (
        <div key={index} className="text-center">
          <div
            className={clsx(
              'w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center',
              iconBgColor,
              iconColor
            )}
          >
            {feature.icon}
          </div>
          <Heading as="h3" fontSize="xl" fontWeight="semibold" textAlign="center" className="mb-2">
            {feature.title}
          </Heading>
          <Text textAlign="center" textColor="text-gray-600">
            {feature.description}
          </Text>
        </div>
      );
    }

    if (variant === 'icons') {
      return (
        <div key={index} className="flex gap-4">
          <div
            className={clsx(
              'w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center',
              iconBgColor,
              iconColor
            )}
          >
            {feature.icon}
          </div>
          <div>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" className="mb-1">
              {feature.title}
            </Heading>
            <Text fontSize="sm" textColor="text-gray-600">
              {feature.description}
            </Text>
          </div>
        </div>
      );
    }

    return (
      <Card
        key={index}
        bgColor={cardBgColor}
        shadow={cardShadow}
        rounded={cardRounded}
        padding={cardPadding}
        border={cardBorder}
        hoverEffect={cardHover}
      >
        <div
          className={clsx(
            'w-12 h-12 mb-4 rounded-xl flex items-center justify-center',
            iconBgColor,
            iconColor
          )}
        >
          {feature.icon}
        </div>
        <Heading as="h3" fontSize="xl" fontWeight="semibold" className="mb-2">
          {feature.title}
        </Heading>
        <Text textColor="text-gray-600">{feature.description}</Text>
      </Card>
    );
  };

  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      <div className="text-center mb-12">
        {badge && (
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {badge}
          </span>
        )}
        <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
          {title}
        </Heading>
        <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
          {subtitle}
        </Text>
      </div>

      <Grid cols={cols} gap={gap}>
        {features.map((feature, index) => renderFeatureCard(feature, index))}
      </Grid>
    </Section>
  );
}

// Alternative compact features list
interface FeatureListProps {
  features?: string[];
  icon?: ReactNode;
  iconColor?: string;
  textColor?: string;
  cols?: 1 | 2;
  className?: string;
}

export function FeatureList({
  features = [
    'Lorem ipsum dolor sit amet',
    'Consectetur adipiscing elit',
    'Sed do eiusmod tempor',
    'Ut labore et dolore magna',
  ],
  icon = <Lock className="w-5 h-5" />,
  iconColor = 'text-green-500',
  textColor = 'text-gray-700',
  cols = 2,
  className,
}: FeatureListProps) {
  return (
    <div
      className={clsx(
        'grid gap-3',
        cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
        className
      )}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className={iconColor}>{icon}</span>
          <span className={clsx('text-sm', textColor)}>{feature}</span>
        </div>
      ))}
    </div>
  );
}
