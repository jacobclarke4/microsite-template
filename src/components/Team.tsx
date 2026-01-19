import clsx from 'clsx';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { ReactNode } from 'react';
import { Section } from './Section';
import { Grid } from './Grid';
import { Card } from './Card';
import { Heading, Text } from './Typography';
import { GridCols, Gap, Padding, ShadowSize, Rounded, GradientConfig } from '../types';


interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  social?: SocialLinks;
}

interface TeamProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  cols?: GridCols;
  gap?: Gap;
  bgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  cardShadow?: ShadowSize;
  cardRounded?: Rounded;
  paddingY?: Padding;
  variant?: 'cards' | 'simple' | 'compact';
  showBio?: boolean;
  showSocial?: boolean;
  gradient?: GradientConfig;
  className?: string;
}

const defaultMembers: TeamMember[] = [
  {
    name: 'Jane Smith',
    role: 'CEO & Founder',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'John Doe',
    role: 'CTO',
    bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Design',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Mike Wilson',
    role: 'Lead Engineer',
    bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    social: { twitter: '#', github: '#' },
  },
];

interface AvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function Avatar({ name, image, size = 'lg' }: AvatarProps) {
  const sizes = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
    xl: 'w-32 h-32 text-4xl',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-red-500 to-rose-500',
    'from-indigo-500 to-violet-500',
  ];

  const colorIndex = name.length % colors.length;

  if (image) {
    return (
      <div className='bg-[var(--secondary)] rounded-full'>
        <img
          src={image}
          alt={name}
          className={clsx(
            'rounded-full object-cover',
            sizes[size]
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold',
        sizes[size],
        colors[colorIndex]
      )}
    >
      {initials}
    </div>
  );
}

function SocialIcon({ platform, href }: { platform: string; href: string }) {
  const icons: Record<string, ReactNode> = {
    twitter: <Twitter className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    github: <Github className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
  };

  return (
    <a
      href={href}
      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
    >
      {icons[platform]}
    </a>
  );
}

export function Team({
  title = 'Meet our team',
  subtitle = 'The talented people behind our success.',
  members = defaultMembers,
  cols = 4,
  gap = 'lg',
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  cardBgColor = 'bg-white',
  cardShadow = 'md',
  cardRounded = 'xl',
  paddingY = 'xl',
  variant = 'cards',
  showBio = true,
  showSocial = true,
  gradient,
  className,
}: TeamProps) {
  const renderMember = (member: TeamMember, index: number) => {
    if (variant === 'simple') {
      return (
        <div key={index} className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar name={member.name} image={member.avatar} />
          </div>
          <Heading as="h3" fontSize="xl" fontWeight="semibold" textAlign="center" className="mb-1">
            {member.name}
          </Heading>
          <Text textAlign="center" textColor="text-[var(--secondary)]" fontSize="sm" className="mb-3">
            {member.role}
          </Text>
          {showBio && member.bio && (
            <Text textAlign="center" textColor="text-gray-600" fontSize="sm">
              {member.bio}
            </Text>
          )}
          {showSocial && member.social && (
            <div className="flex justify-center gap-2 mt-4">
              {Object.entries(member.social).map(([platform, href]) => (
                <SocialIcon key={platform} platform={platform} href={href} />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div key={index} className="flex items-center gap-4">
          <Avatar name={member.name} image={member.avatar} size="md" />
          <div>
            <Heading as="h3" fontSize="lg" fontWeight="semibold">
              {member.name}
            </Heading>
            <Text textColor="text-gray-500" fontSize="sm">
              {member.role}
            </Text>
          </div>
        </div>
      );
    }

    // Cards variant (default)
    return (
      <Card
        key={index}
        bgColor={cardBgColor}
        shadow={cardShadow}
        rounded={cardRounded}
        padding="lg"
        hoverEffect
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <Avatar name={member.name} image={member.avatar} />
        </div>
        <Heading as="h3" fontSize="xl" fontWeight="semibold" textAlign="center" className="mb-1 !text-white">
          {member.name}
        </Heading>
        <Text textAlign="center" textColor="text-[var(--secondary)]" fontSize="sm" fontWeight="medium" className="mb-3">
          {member.role}
        </Text>
        {showBio && member.bio && (
          <Text textAlign="center" textColor="text-white" fontSize="sm">
            {member.bio}
          </Text>
        )}
        {showSocial && member.social && (
          <div className="flex justify-center gap-2 mt-4">
            {Object.entries(member.social).map(([platform, href]) => (
              <SocialIcon key={platform} platform={platform} href={href} />
            ))}
          </div>
        )}
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
        {members.map((member, index) => renderMember(member, index))}
      </Grid>
    </Section>
  );
}