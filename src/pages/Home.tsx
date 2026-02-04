import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, MessageCircle, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import { PARTNERS_LIST } from '../data/PartnerData';
import SectionTitle from '../components/ui/SectionTitle';
import { useParticipants } from '../utils/csvLoader';

const HomeView: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = CONSTANTS.assets.heroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const { data: participants, loading: loadingParticipants } = useParticipants();

  const socList = participants.filter(p => p.roles.includes('SOC'));
  const locList = participants.filter(p => p.roles.includes('LOC'));

  return (
    <>
      <Helmet>
        <title>Home | SPiCE 2 Conference</title>
        <meta name="description" content="Welcome to the second edition of the SPiCE conference. Join us in Lyon for discussions on star formation, planet formation, and more." />
        <link rel="canonical" href="https://spice-workshop.github.io/" />
      </Helmet>
      {/* Hero */}
      <header className="relative bg-slate-50 dark:bg-slate-900 pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-90 dark:opacity-90">
            {/* Carousel Images */}
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Background ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`} 
              />
            ))}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-slate-900/40" />
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-8 animate-fade-in-up">
             <span className="px-3 py-1 text-xs font-bold tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Second Edition</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-200 dark:text-white tracking-tight mb-6 animate-fade-in-up delay-100">
            {CONSTANTS.details.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto mb-10 font-light animate-fade-in-up delay-200">
            {CONSTANTS.details.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12 animate-fade-in-up delay-300">
             <div className="flex items-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <Calendar className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">{CONSTANTS.details.date}</span>
             </div>
             <div className="flex items-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <MapPin className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">{CONSTANTS.details.location}</span>
             </div>
          </div>
        </div>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* About Section */}
      <div className="mb-16">
          <SectionTitle>Rationale</SectionTitle>
          <div className="text-justify prose prose-lg text-slate-600 dark:text-slate-300 leading-relaxed md:max-w-7xl whitespace-pre-wrap">
              {CONSTANTS.details.description}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
              <a href={CONSTANTS.links.discord} target="_blank" rel="noreferrer" className="flex items-center bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4] transition-colors"><MessageCircle className="w-5 h-5 mr-2" /> Join Discord</a>
              {/* <a href={CONSTANTS.links.slack} target="_blank" rel="noreferrer" className="flex items-center bg-[#4A154B] text-white px-4 py-2 rounded-md hover:bg-[#3b113c] transition-colors"><users className="w-5 h-5 mr-2" /> Join Slack</a> */}
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

      {/* Committees */}
      <div className="mb-24 border-t border-slate-100 pt-12">
          <SectionTitle>Organizing Committees</SectionTitle>
          {loadingParticipants ? (
             <p className="text-center text-slate-500">Loading committees...</p>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Scientific Organizing Committee (SOC)", color: "bg-indigo-500", list: socList },
                { title: "Local Organizing Committee (LOC)", color: "bg-green-500", list: locList }
              ].map((comm, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center"><span className={`w-8 h-1 ${comm.color} mr-3 rounded-full`}></span>{comm.title}</h3>
                  <ul className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                      {comm.list.map((member, mIdx) => (
                          <li key={mIdx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                              <div>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{member.name}</span>
                                {member.roles.includes('Chair') && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                                    Chair
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-slate-500 dark:text-slate-400">{member.affiliation}</span>
                          </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
          )}
      </div>

      </div>

      {/* Partners Section */}
      <div className="bg-slate-50 dark:bg-slate-900 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">Supported By</h3>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  {PARTNERS_LIST.map((partner, index) => (
                      <a 
                        key={index} 
                        href={partner.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="transition-transform hover:scale-110"
                        title={`Visit ${partner.name}`}
                      >
                        <img src={partner.logo} alt={partner.name} className="h-16 md:h-20 w-auto object-contain" />
                      </a>
                  ))}
              </div>
          </div>
      </div>
  </>
);
};

export default HomeView;
