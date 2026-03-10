import { useState, useEffect, useCallback, useRef } from 'react';
import type { FC } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONSTANTS } from '../../data/Constants';

const HeroCarousel: FC = () => {
  const images = CONSTANTS.assets.heroImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
  }, [images.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const next = () => { setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1)); resetTimer(); };
  const prev = () => { setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1)); resetTimer(); };

  return (
    <header className="relative bg-slate-50 dark:bg-slate-900 pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden min-h-[70vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 opacity-90 dark:opacity-90">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full gradient-mask-b transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              width="1920"
              height="1080"
              className="w-full h-full object-contain"
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding={index === 0 ? "sync" : "async"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all hover:scale-110" aria-label="Previous image">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all hover:scale-110" aria-label="Next image">
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
            <div className="flex items-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-lifted">
              <Calendar className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">{CONSTANTS.details.date}</span>
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-lifted">
              <MapPin className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">{CONSTANTS.details.location}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroCarousel;
