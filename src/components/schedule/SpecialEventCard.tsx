import type { FC, ReactNode } from 'react';
import { Calendar, MapPin, Utensils, Compass, ClipboardList, BookOpen, Globe2 } from 'lucide-react';

interface DetailItem {
  icon: 'calendar' | 'mappin' | 'utensils';
  label: string;
  value: string;
  accentColor?: string; // tailwind color keyword, e.g. 'indigo' | 'purple'
}

interface Props {
  id: string;
  badge: string;
  badgeColor: 'indigo' | 'amber' | 'purple';
  title: string;
  description: ReactNode;
  details: DetailItem[];
  mapSrc?: string;
  mapTitle?: string;
  mapMinHeight?: string;
  directionsHref?: string;
  directionsColor?: 'indigo' | 'purple';
  registrationHref?: string;
  menuHref?: string;
  websiteHref?: string;
  customMapSide?: ReactNode;
  className?: string;
}

const BADGE_COLORS: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-800',
  amber:  'bg-amber-100 text-amber-800',
  purple: 'bg-purple-100 text-purple-800',
};

const ICON_COLORS: Record<string, string> = {
  indigo: 'text-indigo-600 dark:text-indigo-400',
  amber:  'text-amber-600 dark:text-amber-400',
  purple: 'text-purple-600 dark:text-purple-400',
};

const BUTTON_COLORS: Record<string, string> = {
  indigo: 'bg-indigo-600 hover:bg-indigo-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
};

const IconComponent: FC<{ icon: DetailItem['icon']; className?: string }> = ({ icon, className = '' }) => {
  if (icon === 'calendar') return <Calendar className={`w-6 h-6 ${className}`} />;
  if (icon === 'mappin')   return <MapPin   className={`w-6 h-6 ${className}`} />;
  return                          <Utensils className={`w-6 h-6 ${className}`} />;
};

const SpecialEventCard: FC<Props> = ({
  id,
  badge,
  badgeColor,
  title,
  description,
  details,
  mapSrc,
  mapTitle,
  mapMinHeight = '400px',
  directionsHref,
  directionsColor = 'indigo',
  registrationHref,
  menuHref,
  websiteHref,
  customMapSide,
  className = '',
}) => {
  const iconColorClass = ICON_COLORS[badgeColor] ?? ICON_COLORS.indigo;
  const btnColorClass  = BUTTON_COLORS[directionsColor] ?? BUTTON_COLORS.indigo;

  return (
    <div
      id={id}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lifted hover:shadow-elevated transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden scroll-mt-32 ${className}`}
    >
      <div className="grid md:grid-cols-2">
        {/* Info side */}
        <div className="p-8 flex flex-col h-full">
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${BADGE_COLORS[badgeColor]}`}>
              {badge}
            </span>
            <h4 className="font-bold text-2xl text-slate-800 dark:text-white mb-2">{title}</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
          </div>

          <div className="space-y-4 mt-auto">
            {details.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <IconComponent icon={icon} className={`mt-1 mr-4 flex-shrink-0 ${iconColorClass}`} />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{label}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{value}</p>
                </div>
              </div>
            ))}

            {registrationHref && (
              <a
                href={registrationHref}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-indigo hover:shadow-glow-indigo hover:-translate-y-0.5 transition-all duration-200"
              >
                <ClipboardList className="w-5 h-5" /> Register Now
              </a>
            )}

            {menuHref && (
              <a
                href={menuHref}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 transition-colors"
              >
                <BookOpen className="w-5 h-5" /> View Menu
              </a>
            )}

            {websiteHref && (
              <a
                href={websiteHref}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 transition-colors"
              >
                <Globe2 className="w-5 h-5" /> Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Map side */}
        <div className="h-full bg-slate-100 dark:bg-slate-700 border-l border-slate-200 dark:border-slate-700 relative" style={{ minHeight: mapMinHeight }}>
          {customMapSide ? (
            customMapSide
          ) : mapSrc ? (
            <iframe
              src={mapSrc}
              width="600"
              height="400"
              style={{ border: 0, width: '100%', height: '100%', minHeight: mapMinHeight }}
              allowFullScreen={undefined}
              loading="lazy"
              title={mapTitle}
              className="absolute inset-0"
            />
          ) : null}

          {directionsHref && (
            <div className="absolute bottom-6 right-6">
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer noopener"
                className={`${btnColorClass} text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-indigo-lg`}
              >
                <Compass className="w-5 h-5 mr-2" /> Get Directions
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialEventCard;
