import clsx from 'clsx';
import { Star, Quote } from 'lucide-react';
import { Section } from './Section';
import { Grid } from './Grid';
import { Card } from './Card';
import { Heading, Text } from './Typography';
import { GridCols, Gap, Padding, ShadowSize, Rounded, GradientConfig } from '../types';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  cols?: GridCols;
  gap?: Gap;
  bgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  paddingY?: Padding;
  showRating?: boolean;
  showQuoteIcon?: boolean;
  variant?: 'cards' | 'simple' | 'featured';
  gradient?: GradientConfig;
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Jane Smith',
    role: 'CEO',
    company: 'TechCorp Inc.',
    rating: 5,
  },
  {
    quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'John Doe',
    role: 'CTO',
    company: 'StartupXYZ',
    rating: 5,
  },
  {
    quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Sarah Johnson',
    role: 'Product Lead',
    company: 'DesignStudio',
    rating: 5,
  },
];

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={clsx(
        'rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-medium',
        sizes[size]
      )}
    >
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={clsx(
            'w-4 h-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials({
  title = 'What our customers say',
  subtitle = 'Hear from the people who use our product every day.',
  testimonials = defaultTestimonials,
  cols = 3,
  gap = 'lg',
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  cardBgColor = 'bg-gray-50',
  cardShadow = 'md',
  cardRounded = 'xl',
  paddingY = 'xl',
  showRating = true,
  showQuoteIcon = true,
  variant = 'cards',
  gradient,
  className,
}: TestimonialsProps) {
  const renderTestimonial = (testimonial: Testimonial, index: number) => {
    if (variant === 'simple') {
      return (
        <div key={index} className="text-center">
          {showQuoteIcon && (
            <Quote className="w-8 h-8 mx-auto mb-4 text-blue-500 opacity-50" />
          )}
          <Text fontSize="lg" textAlign="center" className="mb-6 italic">
            "{testimonial.quote}"
          </Text>
          <Avatar name={testimonial.author} />
          <div className="mt-4">
            <div className="font-semibold">{testimonial.author}</div>
            <div className="text-sm text-gray-500">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'featured') {
      return (
        <Card
          key={index}
          bgColor={cardBgColor}
          shadow={cardShadow}
          rounded={cardRounded}
          padding="xl"
          className="relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 opacity-10">
            <Quote className="w-24 h-24 text-blue-600" />
          </div>
          {showRating && testimonial.rating && (
            <div className="mb-4">
              <StarRating rating={testimonial.rating} />
            </div>
          )}
          <Text fontSize="lg" className="mb-6 relative z-10">
            "{testimonial.quote}"
          </Text>
          <div className="flex items-center gap-4">
            <Avatar name={testimonial.author} size="lg" />
            <div>
              <div className="font-semibold text-lg">{testimonial.author}</div>
              <div className="text-sm text-gray-500">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        key={index}
        bgColor={cardBgColor}
        shadow={cardShadow}
        rounded={cardRounded}
        padding="lg"
      >
        {showRating && testimonial.rating && (
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>
        )}
        <Text className="mb-6">"{testimonial.quote}"</Text>
        <div className="flex items-center gap-3">
          <Avatar name={testimonial.author} />
          <div>
            <div className="font-semibold">{testimonial.author}</div>
            <div className="text-sm text-gray-500">
              {testimonial.role}, {testimonial.company}
            </div>
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

      <Grid cols={cols} gap={gap}>
        {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </Grid>
    </Section>
  );
}

// Single featured testimonial
interface FeaturedTestimonialProps {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  bgColor?: string;
  className?: string;
}

export function FeaturedTestimonial({
  quote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  author = 'Jane Smith',
  role = 'CEO',
  company = 'TechCorp',
  bgColor = 'bg-[var(--primary)]',
  className,
}: FeaturedTestimonialProps) {
  return (
    <div className={clsx('py-16 px-8 rounded-3xl text-white text-center', bgColor, className)}>
      <Quote className="w-12 h-12 mx-auto mb-6 opacity-50" />
      <blockquote className="text-2xl md:text-3xl font-medium mb-8 max-w-3xl mx-auto">
        "{quote}"
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        <Avatar name={author} size="lg" />
        <div className="text-left">
          <div className="font-semibold text-lg">{author}</div>
          <div className="text-blue-200">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
}
