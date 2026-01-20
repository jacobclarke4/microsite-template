import clsx from 'clsx';
import { Check, Circle } from 'lucide-react';
import { ReactNode } from 'react';
import { Section } from './Section';
import { Heading, Text } from './Typography';
import { Padding, GradientConfig } from '../types';

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  icon?: ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  title?: string;
  subtitle?: string;
  items?: TimelineItem[];
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  lineColor?: string;
  paddingY?: Padding;
  variant?: 'vertical' | 'horizontal' | 'alternating';
  showDates?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

const defaultItems: TimelineItem[] = [
  {
    title: 'Project Kickoff',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
    date: 'Jan 2024',
    status: 'completed',
  },
  {
    title: 'Design Phase',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    date: 'Feb 2024',
    status: 'completed',
  },
  {
    title: 'Development',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    date: 'Mar 2024',
    status: 'current',
  },
  {
    title: 'Testing & QA',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    date: 'Apr 2024',
    status: 'upcoming',
  },
  {
    title: 'Launch',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    date: 'May 2024',
    status: 'upcoming',
  },
];

export function Timeline({
  title = 'Our Journey',
  subtitle = 'Key milestones and achievements along the way.',
  items = defaultItems,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  accentColor = 'bg-blue-600',
  lineColor = 'bg-gray-200',
  paddingY = 'xl',
  variant = 'vertical',
  showDates = true,
  gradient,
  className,
}: TimelineProps) {
  const getStatusIcon = (status?: string) => {
    if (status === 'completed') {
      return (
        <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center', accentColor)}>
          <Check className="w-4 h-4 text-white" />
        </div>
      );
    }
    if (status === 'current') {
      return (
        <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center border-4 border-blue-600 bg-white')}>
          <div className="w-3 h-3 rounded-full bg-blue-600" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 border-2 border-gray-300">
        <Circle className="w-3 h-3 text-gray-400" />
      </div>
    );
  };

  if (variant === 'horizontal') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        {title && (
          <div className="text-center mb-12">
            <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className="relative">
          {/* Horizontal line */}
          <div className={clsx('absolute top-4 left-0 right-0 h-0.5', lineColor)} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 bg-white p-1">
                  {getStatusIcon(item.status)}
                </div>
                {showDates && item.date && (
                  <Text fontSize="sm" textColor="text-[var(--secondary)]" fontWeight="medium" className="mt-2">
                    {item.date}
                  </Text>
                )}
                <Heading as="h3" fontSize="lg" fontWeight="semibold" textAlign="center" className="mt-2">
                  {item.title}
                </Heading>
                <Text fontSize="sm" textAlign="center" textColor="text-gray-600" className="mt-1">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (variant === 'alternating') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        {title && (
          <div className="text-center mb-12">
            <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className={clsx('absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2', lineColor)} />

          {items.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'relative flex items-start gap-8 mb-12',
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              )}
            >
              <div className={clsx('flex-1', index % 2 === 0 ? 'text-right' : 'text-left')}>
                {showDates && item.date && (
                  <Text fontSize="sm" textColor="text-blue-600" fontWeight="medium" className="mb-1">
                    {item.date}
                  </Text>
                )}
                <Heading as="h3" fontSize="xl" fontWeight="semibold" className="mb-2">
                  {item.title}
                </Heading>
                <Text textColor="text-gray-600">{item.description}</Text>
              </div>

              <div className="relative z-10 flex-shrink-0">
                {getStatusIcon(item.status)}
              </div>

              <div className="flex-1" />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  // Vertical variant (default)
  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      {title && (
        <div className="text-center mb-12">
          <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
              {subtitle}
            </Text>
          )}
        </div>
      )}

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className={clsx('absolute left-4 top-0 bottom-0 w-0.5', lineColor)} />

        {items.map((item, index) => (
          <div key={index} className="relative flex gap-6 mb-8 last:mb-0">
            <div className="relative z-10 flex-shrink-0">
              {getStatusIcon(item.status)}
            </div>
            <div className="flex-1 pt-1">
              {showDates && item.date && (
                <Text fontSize="sm" textColor="text-blue-600" fontWeight="medium" className="mb-1">
                  {item.date}
                </Text>
              )}
              <Heading as="h3" fontSize="xl" fontWeight="semibold" className="mb-2">
                {item.title}
              </Heading>
              <Text textColor="text-gray-600">{item.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
