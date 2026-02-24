import logoENS from '../assets/Logo_ENS_de_Lyon.svg';
import logoCNRS from '../assets/Logo_CNRS.png';
import logoCRAL from '../assets/Logo_CRAL.png';

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export const PARTNERS_LIST: Partner[] = [
    { name: "ENS de Lyon", logo: logoENS, url: "https://www.ens-lyon.fr/en/" },
    { name: "CNRS", logo: logoCNRS, url: "https://www.cnrs.fr/en" },
    { name: "CRAL", logo: logoCRAL, url: "https://cral.univ-lyon1.fr/?lang=en" },
];
