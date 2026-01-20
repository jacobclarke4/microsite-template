import clsx from 'clsx';
import { Check, X } from 'lucide-react';
import { Section } from './Section';
import { Grid } from './Grid';
import { Card } from './Card';
import { Button } from './Button';
import { Heading, Text, Badge } from './Typography';
import { GridCols, Gap, Padding, ShadowSize, Rounded, GradientConfig } from '../types';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  ctaText?: string;
  ctaHref?: string;
  popular?: boolean;
  badge?: string;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  cols?: GridCols;
  gap?: Gap;
  bgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  paddingY?: Padding;
  popularBgColor?: string;
  popularBorderColor?: string;
  gradient?: GradientConfig;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small projects.',
    price: '$9',
    period: '/month',
    features: [
      { text: 'Up to 5 projects', included: true },
      { text: '1 team member', included: true },
      { text: '5GB storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Priority support', included: false },
      { text: 'Custom domain', included: false },
    ],
    ctaText: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'Best for growing teams and businesses.',
    price: '$29',
    period: '/month',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Up to 10 team members', included: true },
      { text: '50GB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: false },
    ],
    ctaText: 'Get Started',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs.',
    price: '$99',
    period: '/month',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited team members', included: true },
      { text: '500GB storage', included: true },
      { text: 'Custom analytics', included: true },
      { text: '24/7 support', included: true },
      { text: 'Custom domain', included: true },
    ],
    ctaText: 'Contact Sales',
  },
];

export function Pricing({
  title = 'Simple, transparent pricing',
  subtitle = 'Choose the plan that works best for you. All plans include a 14-day free trial.',
  tiers = defaultTiers,
  cols = 3,
  gap = 'lg',
  bgColor = 'bg-gray-50',
  textColor = 'text-gray-900',
  cardBgColor = 'bg-white',
  cardShadow = 'lg',
  cardRounded = '2xl',
  paddingY = 'xl',
  popularBgColor = 'bg-blue-600',
  popularBorderColor = 'border-blue-600',
  gradient,
  className,
}: PricingProps) {
  const renderTier = (tier: PricingTier, index: number) => {
    const isPopular = tier.popular;

    return (
      <Card
        key={index}
        bgColor={isPopular ? popularBgColor : cardBgColor}
        shadow={cardShadow}
        rounded={cardRounded}
        padding="none"
        border={isPopular}
        borderColor={popularBorderColor}
        className={clsx(
          'relative flex flex-col overflow-hidden',
          isPopular && 'ring-2 ring-blue-600 scale-105'
        )}
      >
        {tier.badge && (
          <div className="absolute top-0 right-0">
            <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
              {tier.badge}
            </div>
          </div>
        )}

        <div className={clsx('p-6 pb-0', isPopular && 'text-white')}>
          <Heading
            as="h3"
            fontSize="xl"
            fontWeight="semibold"
            textColor={isPopular ? 'text-white' : 'text-gray-900'}
          >
            {tier.name}
          </Heading>
          <Text
            fontSize="sm"
            textColor={isPopular ? 'text-blue-100' : 'text-gray-500'}
            className="mt-1"
          >
            {tier.description}
          </Text>

          <div className="mt-6 flex items-baseline gap-1">
            <span
              className={clsx(
                'text-5xl font-bold',
                isPopular ? 'text-white' : 'text-gray-900'
              )}
            >
              {tier.price}
            </span>
            {tier.period && (
              <span className={isPopular ? 'text-blue-100' : 'text-gray-500'}>
                {tier.period}
              </span>
            )}
          </div>
        </div>

        <div className={clsx('p-6 flex-1', isPopular && 'bg-white rounded-t-3xl mt-6')}>
          <ul className="space-y-3">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-3">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
                <span
                  className={clsx(
                    'text-sm',
                    feature.included ? 'text-gray-700' : 'text-gray-400'
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              variant={isPopular ? 'solid' : 'outline'}
              fullWidth
              size="lg"
              bgColor={isPopular ? 'bg-blue-600 hover:bg-blue-700' : undefined}
            >
              {tier.ctaText}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      <div className="text-center mb-12">
        <Heading as="h2" fontSize="4xl" textAlign="center" className="mb-4">
          {title}
        </Heading>
        <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
          {subtitle}
        </Text>
      </div>

      <Grid cols={cols} gap={gap} className="items-start">
        {tiers.map((tier, index) => renderTier(tier, index))}
      </Grid>
    </Section>
  );
}

// Simple comparison table
interface PricingTableProps {
  features?: { name: string; starter: boolean | string; pro: boolean | string; enterprise: boolean | string }[];
  className?: string;
}

export function PricingTable({
  features = [
    { name: 'Projects', starter: '5', pro: '25', enterprise: 'Unlimited' },
    { name: 'Storage', starter: '5GB', pro: '50GB', enterprise: '500GB' },
    { name: 'API Access', starter: false, pro: true, enterprise: true },
    { name: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7' },
  ],
  className,
}: PricingTableProps) {
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-gray-900">{value}</span>;
  };

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Feature</th>
            <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Starter</th>
            <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Pro</th>
            <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-4 px-6 text-sm text-gray-700">{feature.name}</td>
              <td className="py-4 px-6 text-center text-sm">{renderValue(feature.starter)}</td>
              <td className="py-4 px-6 text-center text-sm">{renderValue(feature.pro)}</td>
              <td className="py-4 px-6 text-center text-sm">{renderValue(feature.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
