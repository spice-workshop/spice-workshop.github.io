import React from 'react';
import { 
  Calendar, MapPin, Users, MessageCircle, Camera, ArrowRight
} from 'lucide-react';
import { CONSTANTS, SOC_LIST, LOC_LIST, PARTNERS_LIST } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';

const HomeView = () => (
  <>
    {/* Hero */}
    <header className="relative bg-slate-50 dark:bg-slate-900 pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-90 dark:opacity-90">
          <img src={CONSTANTS.assets.heroImage} alt="Background" className="w-full h-full object-cover" />
      </div>
      
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

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* About Section */}
      <div className="mb-24">
          <SectionTitle>About the Workshop</SectionTitle>
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                In April 2024, we organised the workshop <a href={CONSTANTS.links.spice1} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">"Simulating Physics In Celestial Ecosystem (SPiCE): Star, Disk, and Planet Formation"</a> at Tohoku University in Sendai, Japan. The idea of the workshop emerged during the Protostars and Planets VII in 2023, where major progress and insights in the fields of star formation, protoplanetary disks, and planet formation were extensively presented and discussed. However, it has also become evident that connections between these fields are lacking, which preclude the establishment of a coherent scenario from star to planet formation. The follow-up workshop, SPiCE-2, will be held at Ecole Nomale Supérieure de Lyon in France from March 16th to 20th, 2026. The workshop will again focus on computational simulations linking star, disk, and planet formation, with the goal of bridging the gaps between these fields and fostering cross-disciplinary collaborations.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {CONSTANTS.details.description.split('\n').slice(1, 2).join('\n')}
              </p>
              
              <p className="mb-4 font-semibold text-slate-800 dark:text-slate-200">
                The topics we want to cover include but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600 dark:text-slate-300">
                <li>molecular cloud evolution</li>
                <li>protostellar collapse and disk formation</li>
                <li>structures in protoplanetary disks</li>
                <li>evolution of protoplanetary disks</li>
                <li>planet formation in protoplanetary disks</li>
                <li>accretion onto and outflows from protostars</li>
                <li>planet-disk interaction and circumplanetary disks</li>
                <li>non-ideal MHD effects and ionization</li>
                <li>radiation transport and thermodynamics</li>
                <li>dust growth (and destruction) in ISM and disks</li>
                <li>synthetic observations</li>
              </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
              <a href={CONSTANTS.links.discord} target="_blank" rel="noreferrer" className="flex items-center bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4] transition-colors"><MessageCircle className="w-5 h-5 mr-2" /> Join Discord</a>
              <a href={CONSTANTS.links.slack} target="_blank" rel="noreferrer" className="flex items-center bg-[#4A154B] text-white px-4 py-2 rounded-md hover:bg-[#3b113c] transition-colors"><Users className="w-5 h-5 mr-2" /> Join Slack</a>
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
          <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Scientific Organizing Committee (SOC)", color: "bg-indigo-500", list: SOC_LIST },
                { title: "Local Organizing Committee (LOC)", color: "bg-green-500", list: LOC_LIST }
              ].map((comm, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center"><span className={`w-8 h-1 ${comm.color} mr-3 rounded-full`}></span>{comm.title}</h3>
                  <ul className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                      {comm.list.map((member, mIdx) => (
                          <li key={mIdx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                              <div>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{member.name}</span>
                                {member.role && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                                    {member.role}
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

export default HomeView;
