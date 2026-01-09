import {
  Navbar,
  Hero,
  LogoCloud,
  Features,
  Stats,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
  Team,
  Timeline,
  Footer,
  Divider,
} from './components';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar

        sticky={true}
      />

      {/* Hero Section */}
      <Hero
        variant="centered"
      />

      {/* Logo Cloud */}
      <LogoCloud
        title="Trusted by innovative teams"
        variant="simple"
        grayscale={true}
      />

      <Divider spacing="lg" />

      {/* Features - Cards variant */}
      <Features
        cols={3}
        gap="lg"
        variant="cards"
        cardHover={true}
      />

      {/* Stats */}
      <Stats
        title="Lorenmipsum dolor sit amet"
        subtitle="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        variant="simple"
        cols={4}
      />

      {/* Testimonials */}
      <Testimonials
        title="Lorem ipsum dolor sit amet"
        subtitle="Consectetur adipiscing elit"
        cols={3}
        variant="cards"
        showRating={true}
      />

      {/* Timeline */}
      <Timeline
        title="Our Roadmap"
        subtitle="See what we've accomplished and what's coming next."
        variant="vertical"
        bgColor="bg-gray-50"
      />

      {/* Pricing */}
      <Pricing
        title="Simple, transparent pricing"
        subtitle="Choose the plan that works best for you."
        cols={3}
      />

      {/* FAQ */}
      <FAQ
        title="Frequently asked questions"
        subtitle="Find answers to common questions."
        variant="simple"
        iconStyle="chevron"
        bgColor="bg-gray-50"
      />

      {/* Team */}
      <Team
        title="Meet the team"
        subtitle="The people behind this project."
        cols={4}
        variant="cards"
        showSocial={true}
      />

      {/* CTA */}
      <CTA
        title="Ready to get started?"
        subtitle="Create your first microsite in minutes with our component library."
        primaryCta="Start Building"
        secondaryCta="Learn More"
        variant="gradient"
      />
      {/* Contact */}
      <Contact variant='minimal'/>

      {/* Footer */}
      <Footer
        logoText="MicroSite"
        tagline="Build beautiful microsites faster than ever."
        variant="columns"
        showNewsletter={true}
        gradient={{ enabled: true, from: '#6f2937', to: '#000000', direction: 'to-b' }}
      />
    </div>
  );
}

export default App;
