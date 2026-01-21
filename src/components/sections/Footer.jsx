import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { CONSTANTS } from '../../data/Constants';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
            <span className="font-bold text-white text-lg">SPiCE 2</span>
            <p className="text-sm mt-1">Simulating Physics in Celestial Ecosystems</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
            <a href={CONSTANTS.links.spice1} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center text-sm"><ExternalLink className="w-4 h-4 mr-2" /> SPiCE 1 Website</a>
            <a href="mailto:spice2.workshop@gmail.com" className="hover:text-white transition-colors flex items-center text-sm"><Mail className="w-4 h-4 mr-2" /> Contact Us</a>
        </div>
        <div className="text-sm">© 2025 SPiCE Conference.</div>
    </div>
  </footer>
);

export default Footer;
