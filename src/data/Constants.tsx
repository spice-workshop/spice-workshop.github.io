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
    venue: string;
    location: string;
    email: string;
    cocText: string;
  };
  links: {
    spice1: string;
    discord: string;
    slack: string;
    cloudDrive: string;
    googleCalendar: string;
    sncf: string;
    tcl: string;
    rhonexpress: string;
    velov: string;
    franceVisas: string;
    ees: string;
    etias: string;
    mapEmbed: string;
    mapDirections: string;
    restaurantMap: string;
    restaurantDirections: string;
    crousMap: string;
    crousDirections: string;
    socialEventMap: string;
    socialEventDirections: string;
    socialEventRegistration: string;
    lunchMapList: string;
  };
  assets: {
    heroImage: string;
    heroImages: { src: string; alt: string }[];
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
    venue: "Salle Condorcet, Place de l'Ecole",
    location: "ENS de Lyon Monod Campus — Lyon, France",
    email: "spice2.workshop@gmail.com",
    cocText: "SPiCE 2 is dedicated to providing a harassment-free conference experience for everyone. We do not tolerate harassment of conference participants in any form. Participants violating these rules may be sanctioned or expelled at the discretion of the organizers."
  },
  links: {
    spice1: "https://www.astr.tohoku.ac.jp/~tomida/spice/",
    discord: "mailto:spice2.workshop@gmail.com?subject=Join%20the%20SPiCE%20discord%20server",
    slack: "https://slack.com/example",
    cloudDrive: "#",
    googleCalendar: "/spice2-conference.ics",
    sncf: "https://www.sncf-connect.com/",
    tcl: "https://www.tcl.fr/en",
    rhonexpress: "https://www.rhonexpress.fr",
    velov: "https://velov.grandlyon.com",
    franceVisas: "https://france-visas.gouv.fr/",
    ees: "https://travel-europe.europa.eu/ees_en",
    etias: "https://travel-europe.europa.eu/etias_en",
    // Venue Map: ENS de Lyon Monod
    mapEmbed: "https://maps.google.com/maps?q=1+Pl.+de+l'École,+69007+Lyon,+France&z=17&output=embed",
    // Directions Link
    mapDirections: "https://www.google.com/maps/dir/?api=1&destination=ENS+de+Lyon+Monod+Campus,+Lyon,+France",

    // Restaurant (Dinner): Le Bouchon des Filles – 20 rue Sergent-Blandan, 69001 Lyon
    restaurantMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.308266558406!2d4.827069719719415!3d45.76866319385698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eb01f439fe73%3A0xc28debbb730b4077!2sLe%20Bouchon%20des%20Filles!5e0!3m2!1sen!2sfr!4v1772545481328!5m2!1sen!2sfr",
    restaurantDirections: "https://www.google.com/maps/dir/?api=1&destination=20+Rue+Sergent-Blandan,+69001+Lyon,+France",

    // CROUS Data
    crousMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.805728854067!2d4.832265315566373!3d45.73491497910515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea3b1d7d0d0d%3A0x1a2b3c4d5e6f7g8h!2sENS+de+Lyon!5e0!3m2!1sen!2sfr!4v1620000000000!5m2!1sen!2sfr",
    crousDirections: "https://www.google.com/maps/dir/?api=1&destination=ENS+de+Lyon+Monod+Campus,+Lyon,+France",

    // Social Event: La Commune – 3 Rue Pré-Gaudry, 69007 Lyon
    socialEventMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d693.7037080399427!2d4.833498452602922!3d45.742159379077506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea36fe0aae01%3A0x7ec701be035dddb!2sLa%20Commune!5e0!3m2!1sen!2sfr!4v1772545573411!5m2!1sen!2sfr",
    socialEventDirections: "https://www.google.com/maps/dir/?api=1&destination=3+Rue+Pré-Gaudry,+69007+Lyon,+France",
    socialEventRegistration: "https://forms.gle/ktSeR9Sa85DDnup97",

    // Curated Lunch Places List
    lunchMapList: "https://maps.app.goo.gl/a1aCZfYo9aTHeoCV6"
  },
  assets: {
    heroImage: HeaderImage,
    heroImages: [
      { src: HeaderImage, alt: "Conference header — SPiCE 2 workshop" },
      { src: BD, alt: "Binary disk simulation" },
      { src: diskform, alt: "Protoplanetary disk formation simulation" },
      { src: figCR, alt: "Circumstellar disk structure" },
    ],
    mapENS: mapENS,
  },
  social: {
    ens: "https://www.ens-lyon.fr/en/",
    cnrs: "https://www.cnrs.fr/en",
    cral: "https://cral.univ-lyon1.fr/?lang=en"
  }
};
