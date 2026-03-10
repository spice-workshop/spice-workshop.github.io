import type { FC } from 'react';
import { MessageCircle, Camera } from 'lucide-react';

import { CONSTANTS } from '../data/Constants';
import SectionTitle from '../components/ui/SectionTitle';
import SEO from '../components/layout/SEO';
import HeroCarousel from '../components/home/HeroCarousel';
import CommitteesSection from '../components/home/CommitteesSection';
import PartnersSection from '../components/home/PartnersSection';
import DescriptionContent from '../components/home/DescriptionContent';

const HomeView: FC = () => (
  <>
    <SEO
      title="SPiCE 2 Conference — Lyon, March 2026"
      description="Welcome to the second edition of the SPiCE conference. Join us in Lyon for discussions on star formation, planet formation, and more."
      url="https://spice-workshop.github.io/"
      keywords="SPiCE 2, star formation conference, protoplanetary disks, planet formation workshop, computational astrophysics, Lyon 2026, ENS de Lyon"
    >
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "SPiCE 2 Conference",
            "startDate": "2026-03-16",
            "endDate": "2026-03-20",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "ENS de Lyon (Monod Site)",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1 Place de l'École",
                "addressLocality": "Lyon",
                "postalCode": "69007",
                "addressCountry": "FR"
              }
            },
            "image": [
              "https://spice-workshop.github.io/assets/HeaderImage.jpeg"
            ],
            "description": "Simulating Physics in Celestial Ecosystems II. A workshop focusing on computational simulations linking star, disk, and planet formation.",
            "organizer": {
              "@type": "Organization",
              "name": "CRAL / ENS de Lyon",
              "url": "https://cral.univ-lyon1.fr/?lang=en"
            }
          }
        `}
      </script>
    </SEO>

    <HeroCarousel />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* About Section */}
      <div className="mb-16">
        <SectionTitle>Rationale</SectionTitle>
        <div className="text-justify prose prose-lg text-slate-600 dark:text-slate-300 leading-relaxed md:max-w-7xl whitespace-pre-wrap">
          <DescriptionContent />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={CONSTANTS.links.discord} className="flex items-center bg-[#5865F2] text-white px-4 py-2 rounded-xl hover:bg-[#4752C4] shadow-soft hover:shadow-lifted hover:-translate-y-0.5 transition-all duration-200">
            <MessageCircle className="w-5 h-5 mr-2" /> Join Discord
          </a>
        </div>
      </div>

      {/* Full Width Group Photo */}
      <div className="mb-24">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
          <Camera className="w-6 h-6 mr-3 text-indigo-500" /> Group Photo
        </h3>
        <div className="w-full h-64 md:h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 relative overflow-hidden group">
          <Camera className="w-16 h-16 mb-4 text-slate-400 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium">Official Group Photo (Coming Soon)</p>
        </div>
      </div>

      <CommitteesSection />
    </div>

    <PartnersSection />
  </>
);

export default HomeView;
