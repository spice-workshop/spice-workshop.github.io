import logoENS from '../assets/Logo_ENS_de_Lyon.svg';
import logoCNRS from '../assets/Logo_CNRS.png';
import logoCRAL from '../assets/Logo_CRAL.png';
import heroBgWide from '../assets/hero_background_wide.png';

export const CONSTANTS = {
  details: {
    title: "SPiCE 2",
    subtitle: "Simulating Physics in Celestial Ecosystems",
    date: "March 16-20, 2026",
    location: "Lyon, France",
    description: `In April 2024, we organised the workshop "Simulating Physics In Celestial Ecosystem (SPiCE): Star, Disk, and Planet Formation" at Tohoku University in Sendai, Japan. The idea of the workshop emerged during the Protostars and Planets VII in 2023, where major progress and insights in the fields of star formation, protoplanetary disks, and planet formation were extensively presented and discussed. However, it has also become evident that connections between these fields are lacking, which preclude the establishment of a coherent scenario from star to planet formation. The follow-up workshop, SPiCE-2, will be held at Ecole Nomale Supérieure de Lyon in France from March 16th to 20th, 2026. The workshop will again focus on computational simulations linking star, disk, and planet formation, with the goal of bridging the gaps between these fields and fostering cross-disciplinary collaborations.
    
    The topics we want to cover include but not limited to:
    - molecular cloud evolution
    - protostellar collapse and disk formation
    - structures in protoplanetary disks
    - evolution of protoplanetary disks
    - planet formation in protoplanetary disks
    - accretion onto and outflows from protostars
    - planet-disk interaction and circumplanetary disks
    - non-ideal MHD effects and ionization
    - radiation transport and thermodynamics
    - dust growth (and destruction) in ISM and disks
    - synthetic observations`,
    cocText: "SPiCE 2 is dedicated to providing a harassment-free conference experience for everyone. We do not tolerate harassment of conference participants in any form. Participants violating these rules may be sanctioned or expelled at the discretion of the organizers."
  },
  links: {
    registration: "#register",
    spice1: "https://www.astr.tohoku.ac.jp/~tomida/spice/",
    discord: "https://discord.gg/example",
    slack: "https://slack.com/example",
    cloudDrive: "#",
    googleCalendar: "https://calendar.google.com/calendar/embed?src=example",
    sncf: "https://www.sncf-connect.com/",
    tcl: "https://www.tcl.fr/en",
    rhonexpress: "https://www.rhonexpress.fr",
    velov: "https://velov.grandlyon.com",
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
    heroImage: heroBgWide,
  },
  social: {
    ens: "http://www.ens-lyon.fr/en/",
    cnrs: "https://www.cnrs.fr/en",
    cral: "https://cral.univ-lyon1.fr/?lang=en"
  }
};

export const SOC_LIST = [
  { name: "Kengo Tomida", affiliation: "", role: "Co-Chair" },
  { name: "Benoit Commercon", affiliation: "", role: "Co-Chair" },
  { name: "Pablo Benítez Llambay", affiliation: "", role: "Member" },
  { name: "Joanna Drazkowska", affiliation: "", role: "Member" },
  { name: "Mario Flock", affiliation: "", role: "Member" },
  { name: "Kaitlin Kratter", affiliation: "", role: "Member" },
  { name: "Ugo Lebreuilly", affiliation: "", role: "Member" },
  { name: "Yueh-Ning Lee", affiliation: "", role: "Member" },
];

export const LOC_LIST = [
  { name: "Benoit Commerçon", affiliation: "", role: "Member" },
  { name: "Nai-Chieh Daniel Lin", affiliation: "", role: "Member" },
  { name: "Adnan Ali-Ahmad", affiliation: "", role: "Member" },
  { name: "Antonin Borderies", affiliation: "", role: "Member" },
];

export const PARTNERS_LIST = [
    { name: "ENS de Lyon", logo: logoENS, url: "http://www.ens-lyon.fr/en/" },
    { name: "CNRS", logo: logoCNRS, url: "https://www.cnrs.fr/en" },
    { name: "CRAL", logo: logoCRAL, url: "https://cral.univ-lyon1.fr/?lang=en" },
];
