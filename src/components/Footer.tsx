import clsx from 'clsx';
import { Twitter, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { ReactNode } from 'react';
import { GradientConfig, buildGradientClasses, buildGradientStyle } from '../types';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  logo?: ReactNode;
  logoText?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  bgColor?: string;
  textColor?: string;
  linkColor?: string;
  borderColor?: string;
  showNewsletter?: boolean;
  variant?: 'simple' | 'columns' | 'minimal';
  gradient?: GradientConfig;
  className?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
];

export function Footer({
  logo,
  logoText = 'BrandName',
  tagline = 'Making the world a better place through innovative solutions.',
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} BrandName. All rights reserved.`,
  bgColor = 'bg-gray-900',
  textColor = 'text-gray-300',
  linkColor = 'text-gray-400 hover:text-white',
  borderColor = 'border-gray-800',
  showNewsletter = false,
  variant = 'columns',
  gradient,
  className,
}: FooterProps) {
  const gradientClasses = buildGradientClasses(gradient);
  const gradientStyle = buildGradientStyle(gradient);
  const bgClasses = gradient?.enabled ? gradientClasses : bgColor;

  const renderLogo = () => (
    <div className="flex items-center gap-2">
      {logo || (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
      )}
      <span className="font-semibold text-xl text-white">{logoText}</span>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <footer className={clsx(bgClasses, 'py-8', className)} style={gradientStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {renderLogo()}
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={linkColor}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className={clsx('text-sm', textColor)}>{copyright}</p>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'simple') {
    return (
      <footer className={clsx(bgClasses, 'py-12', className)} style={gradientStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {renderLogo()}
            <p className={clsx('mt-4 max-w-md', textColor)}>{tagline}</p>
            
            <div className="flex items-center gap-6 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={linkColor}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className={clsx('mt-8 pt-8 border-t w-full', borderColor)}>
              <p className={clsx('text-sm', textColor)}>{copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Columns variant (default)
  return (
    <footer className={clsx(bgClasses, 'py-16', className)} style={gradientStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            {renderLogo()}
            <p className={clsx('mt-4 max-w-xs', textColor)}>{tagline}</p>
            
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={clsx('p-2 rounded-lg bg-gray-800 transition-colors', linkColor)}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {showNewsletter && (
              <div className="mt-8">
                <p className="text-sm font-medium text-white mb-3">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className={clsx('text-sm transition-colors', linkColor)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={clsx('mt-12 pt-8 border-t', borderColor)}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={clsx('text-sm', textColor)}>{copyright}</p>
            <div className="flex items-center gap-6">
              <a href="#" className={clsx('text-sm', linkColor)}>Privacy Policy</a>
              <a href="#" className={clsx('text-sm', linkColor)}>Terms of Service</a>
              <a href="#" className={clsx('text-sm', linkColor)}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
