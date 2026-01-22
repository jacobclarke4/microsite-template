import clsx from 'clsx';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from './Section';
import { Button, ButtonGroup } from './Button';
import { Heading, Text } from './Typography';
import { Padding, Rounded, roundedMap, GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  bgColor?: string;
  textColor?: string;
  subtitleColor?: string;
  paddingY?: Padding;
  variant?: 'simple' | 'gradient' | 'split' | 'card';
  rounded?: Rounded;
  showIcon?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

export function CTA({
  title = 'Ready to get started?',
  subtitle = 'Join thousands of satisfied customers and take your business to the next level.',
  primaryCta = 'Get Started Free',
  primaryHref = '#',
  secondaryCta = 'Contact Sales',
  secondaryHref = '#',
  bgColor = 'bg-white',
  textColor = 'text-white',
  subtitleColor = 'text-white',
  paddingY = 'xl',
  variant = 'simple',
  rounded = '2xl',
  showIcon = true,
  gradient,
  className,
}: CTAProps) {
  if (variant === 'gradient') {
    return (
      <Section paddingY={paddingY} gradient={gradient} className={className}>
        <div
          className={clsx(
            'relative overflow-hidden py-16 px-8 md:px-16',
            'bg-white',
            'bg-[length:200%_100%] animate-gradient',
            roundedMap[rounded]
          )}
        >
          <div className="relative z-10 text-center">
            {showIcon && (
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className={clsx("w-8 h-8 ", textColor)} />
                </div>
              </div>
            )}
            <Heading
              as="h2"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              textColor={textColor}
              className="mb-4"
            >
              {title}
            </Heading>
            <Text
              fontSize="lg"
              textAlign="center"
              textColor={subtitleColor}
              className="max-w-xl mx-auto mb-8"
            >
              {subtitle}
            </Text>
            <ButtonGroup className="justify-center">
              <Button
                size="lg"
                bgColor="bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                textColor="text-white"
              >
                <a href={primaryHref}>{primaryCta}</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                bgColor="border-[var(--primary)] bg-transparent hover:bg-gray-100"
                textColor="text-[var(--primary)]"
              >
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            </ButtonGroup>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          </div>
        </div>
      </Section>
    );
  }

  if (variant === 'split') {
    return (
      <Section bgColor={bgColor} paddingY={paddingY} gradient={gradient} className={className}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Heading
              as="h2"
              fontSize="3xl"
              fontWeight="bold"
              textColor={textColor}
              className="mb-2"
            >
              {title}
            </Heading>
            <Text textColor={subtitleColor}>{subtitle}</Text>
          </div>
          <ButtonGroup>
            <Button
              size="lg"
              bgColor="bg-white hover:bg-gray-100"
              textColor="text-blue-600"
            >
              <a href={primaryHref}>{primaryCta}</a>
            </Button>
            {secondaryCta && (
              <Button
                variant="ghost"
                size="lg"
                textColor={textColor}
                bgColor="hover:bg-white/10"
              >
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            )}
          </ButtonGroup>
        </div>
      </Section>
    );
  }

  if (variant === 'card') {
    return (
      <Section paddingY={paddingY} gradient={gradient} className={className}>
        <div
          className={clsx(
            'py-16 px-8 md:px-16 text-center border-2 border-gray-200',
            roundedMap[rounded]
          )}
        >
          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="bold"
            textAlign="center"
            className="mb-4"
          >
            {title}
          </Heading>
          <Text
            fontSize="lg"
            textAlign="center"
            textColor="text-gray-600"
            className="max-w-xl mx-auto mb-8"
          >
            {subtitle}
          </Text>
          <ButtonGroup className="justify-center">
            <Button size="lg">
              <a href={primaryHref}>{primaryCta}</a>
            </Button>
            <Button variant="outline" size="lg">
              <a href={secondaryHref}>{secondaryCta}</a>
            </Button>
          </ButtonGroup>
        </div>
      </Section>
    );
  }

  // Simple variant (default)
  return (
    <Section bgColor={bgColor} paddingY={paddingY} gradient={gradient} className={className}>
      <div className="text-center">
        <Heading
          as="h2"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          textColor={textColor}
          className="mb-4"
        >
          {title}
        </Heading>
        <Text
          fontSize="lg"
          textAlign="center"
          textColor={subtitleColor}
          className="max-w-xl mx-auto mb-8"
        >
          {subtitle}
        </Text>
        <ButtonGroup className="justify-center">
          <Button
            size="lg"
            bgColor="bg-white hover:bg-gray-100"
            textColor="text-blue-600"
          >
            <a href={primaryHref}>{primaryCta}</a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            textColor={textColor}
            bgColor="hover:bg-white/10"
          >
            <a href={secondaryHref}>{secondaryCta}</a>
          </Button>
        </ButtonGroup>
      </div>
    </Section>
  );
}

// Newsletter signup CTA
interface NewsletterCTAProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  bgColor?: string;
  className?: string;
}

export function NewsletterCTA({
  title = 'Subscribe to our newsletter',
  subtitle = 'Get the latest updates and news delivered to your inbox.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  bgColor = 'bg-gray-900',
  className,
}: NewsletterCTAProps) {
  return (
    <div className={clsx('py-12 px-8 rounded-2xl text-center', bgColor, className)}>
      <Heading
        as="h3"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        textColor="text-white"
        className="mb-2"
      >
        {title}
      </Heading>
      <Text textAlign="center" textColor="text-gray-400" className="mb-6">
        {subtitle}
      </Text>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <Button bgColor="bg-[var(--primary)] hover:bg-[var(--primary-dark)]" textColor="text-white" size="lg">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
