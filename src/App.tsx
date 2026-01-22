import {
  Navbar,
  Hero,
  LogoCloud,
  Features,
  Stats,
  Timeline,
  Footer,
  Divider,
  Team,
  CTA,
} from './components';
import { Building, CircleDollarSign, Handshake} from 'lucide-react'
import { Contact } from './components/Contact';
import { AnimatedTimeline } from './components/AnimatedTimeline';


function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar
        links={[
          { label: 'Platform', href: '#platform' },
          { label: 'Our Story', href: '#journey' },
          { label: 'Leadership', href: '#team' },
          { label: 'Contact', href: '#contact' },
        ]}
        ctaText="Get Started"
        ctaHref="#contact"
        sticky={true}
      />

      {/* Hero Section */}
      <section>
        <Hero
        />
      </section>

      <Divider spacing="lg" />

      {/* Platform - Three Pillars */}
      <section id="platform">
        <Features
        />
      </section>

      {/* Stats */}
      <Stats
      />

      {/* Timeline */}
      <section id="journey">
        <AnimatedTimeline
          title='Our Journey'
          textColor='text-black'
          items={[
            {
              date: '2019',
              title: 'Foundation',
              description: 'We founded the company.'
            },
            {
              date: '2020',
              title:'First Proof of Concept',
              description: 'We achieved our first major milestone.'},
            {
              date: '2021',
              title: 'Milestone Achieved',
              description: 'Then we did this important thing.'
            },
            {
              date: '2022',
              title: 'Milestone Reached',
              description: 'We reached another significant milestone.'
            },
          ]}
        />
      </section>


      {/* Leadership Team */}
      <section id="team">
        <Team
          title="Leadership Team"
          subtitle="World-class expertise across energy infrastructure, real estate development, and capital markets"
          cols={4}
          variant="cards"
          showSocial={false}
          textColor='text-white'
          cardBgColor='bg-white'
          members={[
            {
              name: 'Bob Williams',
              role: 'Chief Executive Officer',
              social: { linkedin: '#' },
              bio: 'Bob has over 20 years of experience in energy infrastructure and real estate development.'
            },
            {
              name: 'Gary Johnson',
              role: 'Partner & Co-Founder',
              social: { linkedin: '#' },
              bio: 'Gary is an expert in capital markets and has led numerous successful projects.'
            },
            {
              name: 'Jessica Smith',
              role: 'Engineering',
              social: { linkedin: '#' },
              bio: 'Jessica brings a wealth of knowledge in engineering and project management.'
            },
            {
              name: 'Janet Lee',
              role: 'Design',
              social: { linkedin: '#' },
              bio: 'Janet is a seasoned design professional with a focus on sustainable solutions.'
            },
          ]}
        />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact 
        variant='minimal'
        />
      </section>

      {/* Footer */}
      <Footer
        
      />
    </div>
  );
}

export default App;