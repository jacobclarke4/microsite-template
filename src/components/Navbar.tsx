import { useState } from 'react';
import clsx from 'clsx';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ShadowSize, shadowMap, GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  bgColor?: string;
  textColor?: string;
  shadow?: ShadowSize;
  sticky?: boolean;
  transparent?: boolean;
  gradient?: GradientConfig;
  className?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
}

const defaultLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({
  logo,
  logoText = 'BrandName',
  links = defaultLinks,
  ctaText = 'Get Started',
  ctaHref = '#',
  bgColor = 'bg-white',
  textColor = 'text-black',
  shadow = 'sm',
  sticky = true,
  transparent = false,
  gradient,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const gradientClasses = buildGradientClasses(gradient);
  const gradientStyle = buildGradientStyle(gradient);

  return (
    <>
      <nav
        className={clsx(
          'w-full z-50',
          sticky && 'sticky top-0',
          !transparent && !gradient?.enabled && bgColor,
          !transparent && gradient?.enabled && gradientClasses,
          !transparent && shadowMap[shadow],
          transparent && 'bg-transparent',
          className
        )}
        style={gradient?.enabled ? gradientStyle : undefined}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className={clsx('flex items-center gap-2', textColor)}>
                {logo || (
                  <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{logoText.charAt(0).toLocaleUpperCase()}</span>
                  </div>
                )}
                <span className={clsx("font-semibold text-xl", textColor)}>{logoText}</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className={clsx(
                      'flex items-center gap-1 text-sm font-medium transition-colors',
                      textColor,
                      'hover:text-[var(--primary)]'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-4 h-4" />}
                  </a>
                  {link.children && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={gradient?.enabled ? gradientStyle : undefined}>
                      <div className="py-2">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href={ctaHref}
                className={clsx(
                  "inline-flex items-center justify-center px-4 py-2 text-medium font-medium rounded-lg transition-colors text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)]",
                  "hover:opacity-90",
                )}
                onClick={() => setIsOpen(false)}
              >
                {ctaText}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={clsx('md:hidden p-2 rounded-lg z-50 relative', textColor)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-medium text-black hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="mt-4 inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[var(--primary)] rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </>
  );
}