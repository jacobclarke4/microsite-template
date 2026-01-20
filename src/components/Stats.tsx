import clsx from 'clsx';
import { Section } from './Section';
import { Grid } from './Grid';
import { Heading, Text } from './Typography';
import { GridCols, Gap, Padding, ShadowSize, shadowMap, Rounded, roundedMap, GradientConfig } from '../types';

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  cols?: GridCols;
  gap?: Gap;
  bgColor?: string;
  textColor?: string;
  valueColor?: string;
  labelColor?: string;
  paddingY?: Padding;
  variant?: 'simple' | 'cards' | 'bordered';
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  showDividers?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

const defaultStats: Stat[] = [
  { value: '10K+', label: 'Active Users', description: 'Growing every day' },
  { value: '99.9%', label: 'Uptime SLA', description: 'Guaranteed reliability' },
  { value: '24/7', label: 'Support', description: 'Always available' },
  { value: '150+', label: 'Countries', description: 'Global coverage' },
];

export function Stats({
  title,
  subtitle,
  stats = defaultStats,
  cols = 4,
  gap = 'lg',
  bgColor = 'bg-[var(--primary)]',
  textColor = 'text-white',
  valueColor = 'text-white',
  labelColor = 'text-white/90',
  paddingY = 'xl',
  variant = 'simple',
  cardBgColor = 'bg-gray-50',
  cardShadow = 'none',
  cardRounded = 'xl',
  showDividers = false,
  gradient,
  className,
}: StatsProps) {
  const renderStat = (stat: Stat, index: number) => {
    const content = (
      <>
        <div className={clsx('text-4xl md:text-5xl font-bold mb-2', valueColor)}>
          {stat.value}
        </div>
        <div className={clsx('text-lg font-medium', textColor)}>{stat.label}</div>
        {stat.description && (
          <div className={clsx('text-sm mt-1', labelColor)}>{stat.description}</div>
        )}
      </>
    );

    if (variant === 'cards') {
      return (
        <div
          key={index}
          className={clsx(
            'text-center p-6',
            cardBgColor,
            shadowMap[cardShadow],
            roundedMap[cardRounded]
          )}
        >
          {content}
        </div>
      );
    }

    if (variant === 'bordered') {
      return (
        <div
          key={index}
          className={clsx(
            'text-center p-6 border-2 border-gray-200',
            roundedMap[cardRounded]
          )}
        >
          {content}
        </div>
      );
    }

    return (
      <div
        key={index}
        className={clsx(
          'text-center',
          showDividers && index !== stats.length - 1 && 'border-r border-gray-200'
        )}
      >
        {content}
      </div>
    );
  };

  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
              {subtitle}
            </Text>
          )}
        </div>
      )}

      <Grid cols={cols} gap={gap}>
        {stats.map((stat, index) => renderStat(stat, index))}
      </Grid>
    </Section>
  );
}

// Compact inline stats
interface InlineStatsProps {
  stats?: { value: string; label: string }[];
  bgColor?: string;
  textColor?: string;
  valueColor?: string;
  className?: string;
}

export function InlineStats({
  stats = [
    { value: '500+', label: 'Projects' },
    { value: '50+', label: 'Team' },
    { value: '10+', label: 'Years' },
  ],
  bgColor = 'bg-blue-600',
  textColor = 'text-blue-100',
  valueColor = 'text-white',
  className,
}: InlineStatsProps) {
  return (
    <div className={clsx('py-6 px-8 rounded-2xl', bgColor, className)}>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={clsx('text-3xl font-bold', valueColor)}>{stat.value}</div>
            <div className={clsx('text-sm', textColor)}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
