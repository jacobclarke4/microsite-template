// components/AnimatedTimeline.tsx
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { Section } from './Section';
import { Heading, Text } from './Typography';
import { Padding, GradientConfig } from '../types';

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

interface AnimatedTimelineProps {
  title?: string;
  subtitle?: string;
  items: TimelineItem[];
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingY?: Padding;
  gradient?: GradientConfig;
  className?: string;
}

export function AnimatedTimeline({
  title,
  subtitle,
  items,
  bgColor = 'bg-white',
  textColor = 'text-black',
  accentColor = 'var(--secondary)',
  paddingY = 'xl',
  gradient,
  className,
}: AnimatedTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Initialize first item on mount
    useEffect(() => {
    setProgress((1 / items.length) * 100);
    }, [items.length]);

    // Handle scroll-based updates
    useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setActiveIndex(index);
                setProgress(((index + 1) / items.length) * 100);
            }
            });
        },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
        );
        
        observer.observe(ref);
        observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
    }, [items.length]);

  return (
    <Section 
      bgColor={bgColor} 
      textColor={textColor} 
      paddingY={paddingY} 
      gradient={gradient} 
      className={className}
    >
      {title && (
        <div className="text-center mb-12">
          <Heading as="h2" fontSize="4xl" textAlign="center" className={clsx('mb-4', textColor)}>
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize="lg" textAlign="center" textColor={textColor} className="max-w-2xl mx-auto">
              {subtitle}
            </Text>
          )}
        </div>
      )}

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side - Sticky Image */}
          <div className="hidden lg:block">
            <div className="sticky top-32 h-[400px]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'absolute inset-0 transition-all duration-700 ease-out',
                      activeIndex === index 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : index < activeIndex 
                          ? 'opacity-0 scale-95 -translate-y-8'
                          : 'opacity-0 scale-95 translate-y-8'
                    )}
                  >
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-4xl font-bold text-gray-400">{item.date}</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Date overlay */}
                <div className="absolute bottom-4 left-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg">
                  <span className="font-semibold">{items[activeIndex]?.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Timeline Items */}
          <div className="relative">
            {/* Timeline track background */}
            <div className="absolute left-4 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

            
            {/* Animated progress line */}
            <div 
              className="absolute left-4 -translate-x-1/2 top-0 w-0.5 transition-all duration-500 ease-out origin-top"
              style={{ 
                height: `${progress}%`,
                backgroundColor: 'var(--primary)',
              }}
            />

            {/* Timeline items */}
            <div className="space-y-16">
              {items.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={clsx(
                    'relative flex gap-6 transition-all duration-500  min-h-[300px]',
                    activeIndex === index 
                      ? 'opacity-100' 
                      : 'opacity-40'
                  )}
                >
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div 
                      className={clsx(
                        'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                        index <= activeIndex 
                          ? 'scale-100' 
                          : 'scale-75'
                      )}
                      style={{
                        backgroundColor: index <= activeIndex ? 'var(--primary)' : '#e5e7eb',
                      }}
                    >
                      {index < activeIndex ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : index === activeIndex ? (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div 
                    className={clsx(
                      'flex-1 pt-1 transition-all duration-500',
                      activeIndex === index 
                        ? 'translate-x-0' 
                        : 'translate-x-2'
                    )}
                  >
                    <Text 
                      fontSize="base" 
                      fontWeight="semibold" 
                      className="mb-1"
                      textColor="text-[var(--primary)]"
                    >
                      {item.date}
                    </Text>
                    <Heading 
                      as="h3" 
                      fontSize="xl" 
                      fontWeight="semibold" 
                      className={clsx(
                        'mb-2 transition-all duration-300',
                        textColor,
                        activeIndex !== index && 'opacity-50'
                      )}
                    >
                      {item.title}
                    </Heading>
                    <Text 
                      className={clsx(
                        'transition-all duration-300',
                        textColor,
                        activeIndex !== index && 'opacity-50'
                      )}
                    >
                      {item.description}
                    </Text>

                    {/* Mobile image - shows inline */}
                    {item.image && (
                      <div 
                        className={clsx(
                          'lg:hidden mt-4 rounded-xl overflow-hidden transition-all duration-500',
                          activeIndex === index 
                            ? 'opacity-100 max-h-48' 
                            : 'opacity-0 max-h-0'
                        )}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}