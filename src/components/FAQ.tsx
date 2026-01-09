import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { Section } from './Section';
import { Heading, Text } from './Typography';
import { Padding, ShadowSize, shadowMap, Rounded, roundedMap, GradientConfig } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  bgColor?: string;
  textColor?: string;
  paddingY?: Padding;
  variant?: 'simple' | 'cards' | 'bordered';
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  iconStyle?: 'chevron' | 'plus';
  allowMultiple?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'Lorem ipsum dolor sit amet consectetur?',
    answer: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Ut enim ad minim veniam quis nostrud?',
    answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    question: 'Duis aute irure dolor in reprehenderit?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas aliquet ligula vel felis lacinia, vel ullamcorper nulla facilisis. Praesent vel velit vitae massa fermentum tempus.',
  },
  {
    question: 'Excepteur sint occaecat cupidatat non proident?',
    answer: 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    question: 'Nemo enim ipsam voluptatem quia voluptas?',
    answer: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
];

export function FAQ({
  title = 'Frequently asked questions',
  subtitle = 'Find answers to common questions about our product and services.',
  items = defaultFAQs,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  paddingY = 'xl',
  variant = 'simple',
  cardBgColor = 'bg-gray-50',
  cardShadow = 'none',
  cardRounded = 'xl',
  iconStyle = 'chevron',
  allowMultiple = false,
  gradient,
  className,
}: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const renderIcon = (isOpen: boolean) => {
    if (iconStyle === 'plus') {
      return isOpen ? (
        <Minus className="w-5 h-5 text-blue-600" />
      ) : (
        <Plus className="w-5 h-5 text-gray-400" />
      );
    }
    return (
      <ChevronDown
        className={clsx(
          'w-5 h-5 transition-transform duration-200',
          isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'
        )}
      />
    );
  };

  const renderFAQItem = (item: FAQItem, index: number) => {
    const isOpen = openItems.includes(index);

    if (variant === 'cards') {
      return (
        <div
          key={index}
          className={clsx(
            cardBgColor,
            shadowMap[cardShadow],
            roundedMap[cardRounded],
            'overflow-hidden'
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left"
          >
            <span className="font-medium text-gray-900">{item.question}</span>
            {renderIcon(isOpen)}
          </button>
          <div
            className={clsx(
              'px-6 overflow-hidden transition-all duration-200',
              isOpen ? 'pb-4 max-h-96' : 'max-h-0'
            )}
          >
            <Text textColor="text-gray-600">{item.answer}</Text>
          </div>
        </div>
      );
    }

    if (variant === 'bordered') {
      return (
        <div
          key={index}
          className={clsx(
            'border-2 border-gray-200 overflow-hidden',
            roundedMap[cardRounded],
            isOpen && 'border-blue-500'
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left"
          >
            <span className={clsx('font-medium', isOpen ? 'text-blue-600' : 'text-gray-900')}>
              {item.question}
            </span>
            {renderIcon(isOpen)}
          </button>
          <div
            className={clsx(
              'px-6 overflow-hidden transition-all duration-200',
              isOpen ? 'pb-4 max-h-96' : 'max-h-0'
            )}
          >
            <Text textColor="text-gray-600">{item.answer}</Text>
          </div>
        </div>
      );
    }

    // Simple variant (default)
    return (
      <div key={index} className="border-b border-gray-200">
        <button
          onClick={() => toggleItem(index)}
          className="w-full py-5 flex items-center justify-between text-left"
        >
          <span className="font-medium text-gray-900 pr-8">{item.question}</span>
          {renderIcon(isOpen)}
        </button>
        <div
          className={clsx(
            'overflow-hidden transition-all duration-200',
            isOpen ? 'pb-5 max-h-96' : 'max-h-0'
          )}
        >
          <Text textColor="text-gray-600">{item.answer}</Text>
        </div>
      </div>
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

      <div
        className={clsx(
          'max-w-3xl mx-auto',
          variant === 'cards' || variant === 'bordered' ? 'space-y-4' : ''
        )}
      >
        {items.map((item, index) => renderFAQItem(item, index))}
      </div>
    </Section>
  );
}

// Two-column FAQ layout
interface FAQTwoColumnProps {
  title?: string;
  subtitle?: string;
  leftItems?: FAQItem[];
  rightItems?: FAQItem[];
  bgColor?: string;
  paddingY?: Padding;
  className?: string;
}

export function FAQTwoColumn({
  title = 'Frequently asked questions',
  subtitle,
  leftItems = defaultFAQs.slice(0, 3),
  rightItems = defaultFAQs.slice(3),
  bgColor = 'bg-white',
  paddingY = 'xl',
  className,
}: FAQTwoColumnProps) {
  return (
    <Section bgColor={bgColor} paddingY={paddingY} className={className}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {leftItems.map((item, index) => (
            <div key={index}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold" className="mb-2">
                {item.question}
              </Heading>
              <Text textColor="text-gray-600">{item.answer}</Text>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {rightItems.map((item, index) => (
            <div key={index}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold" className="mb-2">
                {item.question}
              </Heading>
              <Text textColor="text-gray-600">{item.answer}</Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
