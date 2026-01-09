/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowRight, Play } from 'lucide-react';
import { Button, ButtonGroup } from './Button';
import { Heading, Text, Badge } from './Typography';
import { TextAlign, Padding, paddingYMap, GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  image?: ReactNode;
  bgColor?: string;
  textColor?: string;
  subtitleColor?: string;
  textAlign?: TextAlign;
  paddingY?: Padding;
  variant?: 'centered' | 'split' | 'splitReverse';
  showPlayButton?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

export function Hero({
  badge = 'Announcing our new feature',
  title = 'Lorem ipsum dolor sit amet consectetur adipiscing',
  subtitle = 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  primaryCta = 'Get Started',
  primaryHref = '#',
  secondaryCta = 'Learn More',
  secondaryHref = '#',
  image,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  subtitleColor = 'text-gray-600',
  textAlign = 'center',
  paddingY = '2xl',
  variant = 'centered',
  showPlayButton = false,
  gradient,
  className,
}: HeroProps) {
  const gradientClasses = buildGradientClasses(gradient);
  const gradientStyle = buildGradientStyle(gradient);
  const bgClasses = gradient?.enabled ? gradientClasses : bgColor;
  const renderContent = () => (
    <div className={clsx(variant === 'centered' && 'max-w-3xl mx-auto')}>
      {badge && (
        <div className={clsx('mb-6', variant === 'centered' && 'flex justify-center')}>
          <Badge>{badge}</Badge>
        </div>
      )}
      
      <Heading
        as="h1"
        fontSize="5xl"
        fontWeight="extrabold"
        textAlign={variant === 'centered' ? 'center' : 'left'}
        textColor={textColor}
        className="mb-6"
      >
        {title}
      </Heading>
      
      <Text
        fontSize="xl"
        textAlign={variant === 'centered' ? 'center' : 'left'}
        textColor={subtitleColor}
        className={clsx('mb-8', variant === 'centered' && 'max-w-2xl mx-auto')}
      >
        {subtitle}
      </Text>
      
      <ButtonGroup className={clsx(variant === 'centered' && 'justify-center')}>
        <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
          <a href={primaryHref}>{primaryCta}</a>
        </Button>
        {showPlayButton ? (
          <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
            <a href={secondaryHref}>Watch Demo</a>
          </Button>
        ) : (
          <Button variant="outline" size="lg">
            <a href={secondaryHref}>{secondaryCta}</a>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );

  const renderImage = () =>
    image || (
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl aspect-video flex items-center justify-center">
        <div className="text-gray-400 text-lg">Image Placeholder</div>
      </div>
    );

  if (variant === 'split' || variant === 'splitReverse') {
    return (
      <section className={clsx(bgClasses, paddingYMap[paddingY], className)} style={gradientStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={clsx(
              'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
              variant === 'splitReverse' && 'lg:flex-row-reverse'
            )}
          >
            <div className={variant === 'splitReverse' ? 'lg:order-2' : ''}>
              {renderContent()}
            </div>
            <div className={variant === 'splitReverse' ? 'lg:order-1' : ''}>
              {renderImage()}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={clsx(bgClasses, paddingYMap[paddingY], className)} style={gradientStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
        {image && <div className="mt-16">{renderImage()}</div>}
      </div>
    </section>
  );
}
