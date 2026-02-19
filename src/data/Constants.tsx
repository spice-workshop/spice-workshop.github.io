import React from 'react';
import mapENS from '../assets/Fig_ENS_de_Lyon_Map.jpg';
import HeaderImage from '../assets/HeaderImage.jpeg';
import figCR from '../assets/Fig_CR.jpeg';
import diskform from '../assets/diskFormation.jpeg';
import BD from '../assets/BD.jpeg';

interface ConstantsType {
  details: {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    description: React.ReactNode;
    cocText: string;
  };
  links: {
    [key: string]: string;
  };
  assets: {
    heroImage: string;
    heroImages: string[];
    mapENS: string;
  };
  social: {
    ens: string;
    cnrs: string;
    cral: string;
  };
}

export const CONSTANTS: ConstantsType = {
  details: {
    title: "SPiCE 2",
    subtitle: "Simulating Physics in Celestial Ecosystems",
    date: "March 16-20, 2026",
    location: "Lyon, France",
    description: (
      <>
        In April 2024, we organised the workshop <a href="https://www.astr.tohoku.ac.jp/~tomida/spice/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">"Simulating Physics In Celestial Ecosystem (SPiCE): Star, Disk, and Planet Formation"</a> at Tohoku University in Sendai, Japan. 
        The idea of the workshop emerged during the Protostars and Planets VII in 2023, where major progress and insights in the fields of star formation, protoplanetary disks, and planet formation were extensively presented and discussed. 
        However, it has also become evident that connections between these fields are lacking, which preclude the establishment of a coherent scenario from star to planet formation. 
        The follow-up workshop, SPiCE-2, will be held at Ecole Nomale Supérieure de Lyon in France from March 16th to 20th, 2026. 
        The workshop will again focus on computational simulations linking star, disk, and planet formation, with the goal of bridging the gaps between these fields and fostering cross-disciplinary collaborations.
        <br /><br />
        <div className="mb-2">The topics we want to cover include but not limited to:</div>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Molecular cloud evolution</li>
          <li>Protostellar collapse and disk formation</li>
          <li>Structures in protoplanetary disks</li>
          <li>Evolution of protoplanetary disks</li>
          <li>Planet formation in protoplanetary disks</li>
          <li>Accretion onto and outflows from protostars</li>
          <li>Planet-disk interaction and circumplanetary disks</li>
          <li>Non-ideal MHD effects and ionization</li>
          <li>Radiation transport and thermodynamics</li>
          <li>Dust growth (and destruction) in ISM and disks</li>
          <li>Synthetic observations</li>
        </ul>
      </>
    ),
    cocText: "SPiCE 2 is dedicated to providing a harassment-free conference experience for everyone. We do not tolerate harassment of conference participants in any form. Participants violating these rules may be sanctioned or expelled at the discretion of the organizers."
  },
  links: {
    spice1: "https://www.astr.tohoku.ac.jp/~tomida/spice/",
    discord: "mailto:spice2.workshop@gmail.com",
    slack: "https://slack.com/example",
    cloudDrive: "#",
    googleCalendar: "https://calendar.google.com/calendar/embed?src=example",
    sncf: "https://www.sncf-connect.com/",
    tcl: "https://www.tcl.fr/en",
    rhonexpress: "https://www.rhonexpress.fr",
    velov: "https://velov.grandlyon.com",
    franceVisas: "https://france-visas.gouv.fr/",
    ees: "https://travel-europe.europa.eu/ees_en",
    etias: "https://travel-europe.europa.eu/etias_en",
    // Venue Map: ENS de Lyon Monod
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.805728854067!2d4.832265315566373!3d45.73491497910515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea3b1d7d0d0d%3A0x1a2b3c4d5e6f7g8h!2sENS+de+Lyon!5e0!3m2!1sen!2sfr!4v1620000000000!5m2!1sen!2sfr",
    // Directions Link
    mapDirections: "https://www.google.com/maps/dir/?api=1&destination=ENS+de+Lyon+Monod+Campus,+Lyon,+France",
    
    // Restaurant Data
    restaurantMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.805728854067!2d4.832265315566373!3d45.73491497910515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea3b1d7d0d0d%3A0x1a2b3c4d5e6f7g8h!2sENS+de+Lyon!5e0!3m2!1sen!2sfr!4v1620000000000!5m2!1sen!2sfr",
    restaurantDirections: "https://www.google.com/maps/dir/?api=1&destination=ENS+de+Lyon+Monod+Campus,+Lyon,+France",
    
    // CROUS Data
    crousMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.805728854067!2d4.832265315566373!3d45.73491497910515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea3b1d7d0d0d%3A0x1a2b3c4d5e6f7g8h!2sENS+de+Lyon!5e0!3m2!1sen!2sfr!4v1620000000000!5m2!1sen!2sfr",
    crousDirections: "https://www.google.com/maps/dir/?api=1&destination=ENS+de+Lyon+Monod+Campus,+Lyon,+France"
  },
  assets: {
    heroImage: HeaderImage,
    heroImages: [HeaderImage, BD, diskform, figCR],
    mapENS: mapENS,
  },
  social: {
    ens: "http://www.ens-lyon.fr/en/",
    cnrs: "https://www.cnrs.fr/en",
    cral: "https://cral.univ-lyon1.fr/?lang=en"
  }
};
