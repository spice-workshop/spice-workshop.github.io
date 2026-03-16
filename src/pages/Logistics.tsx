import { useState } from 'react';
import type { FC } from 'react';
import { Plane, Train, Bus, MapPin, Moon, ArrowRight, Compass, Map, Lightbulb, Globe, CreditCard, Zap, Phone, Clock, Shield, Info, Utensils } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import lunchPlaces from '../data/lunchPlaces.json';
import SEO from '../components/layout/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';

const sortedLunchPlaces = [...lunchPlaces].sort((a, b) => b.rating - a.rating);

const LogisticsView: FC = () => {
  const [activeSection, setActiveSection] = useState<'practical' | 'travel' | 'venue' | 'hotel' | 'lunch'>('practical');
  const [activeTravelTab, setActiveTravelTab] = useState<'flight' | 'train' | 'local' | 'car'>('flight');
  const [activeLunchSpot, setActiveLunchSpot] = useState(sortedLunchPlaces[0]);

  const sectionTabs: { key: typeof activeSection; label: string; icon: React.ReactNode }[] = [
    { key: 'practical', label: 'Practical Info',  icon: <Info className="w-4 h-4 mr-2" /> },
    { key: 'travel',    label: 'Getting Here',    icon: <Plane className="w-4 h-4 mr-2" /> },
    { key: 'venue',     label: 'Venue',           icon: <MapPin className="w-4 h-4 mr-2" /> },
    { key: 'hotel',     label: 'Hotel',           icon: <Moon className="w-4 h-4 mr-2" /> },
    { key: 'lunch',     label: 'Lunch',           icon: <Utensils className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <SEO
        title="Logistics & Travel | SPiCE 2 Conference"
        description="Travel information, venue details, and practical tips for attending SPiCE 2 in Lyon, France."
        url="https://spice-workshop.github.io/logistics"
        keywords="Lyon travel, ENS de Lyon venue, conference logistics, visa France, hotel Lyon, TGV Lyon, Rhônexpress"
      />

      {/* Header */}
      <div className="mb-8">
        <SectionTitle>Logistics</SectionTitle>
      </div>

      {/* Travel Advisory Notice */}
      <div className="mb-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
                Travel Advisory Notice (Middle East Situation)
              </h3>
              <div className="text-amber-900/80 dark:text-amber-200/80 space-y-3 text-sm leading-relaxed">
                <p>
                  Due to the ongoing security situation in the Middle East, airlines may adjust schedules, re-route, or cancel flights on short notice. This could affect travel plans for some workshop participants navigating through or from affected regions.
                </p>
                <p>
                  Attendees are strongly advised to monitor updates directly from their airlines and relevant national authorities, and to make travel arrangements with this in mind (e.g., considering flexible booking options).
                </p>
                <p>
                  If you are unable to attend the workshop as a result of flight disruptions or related travel restrictions, please notify the organizing committee as soon as possible at <a href={`mailto:${CONSTANTS.details.email}`} className="font-bold underline hover:text-amber-700 dark:hover:text-amber-100">{CONSTANTS.details.email}</a>. Please include your name and registration details in your email.
                </p>
                <p className="font-medium italic">
                  Thank you for your understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top-level Section Tabs */}
      <div className="flex justify-center mb-10 border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-6 overflow-x-auto">
          {sectionTabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`pb-4 px-1 text-base font-bold border-b-2 transition-colors flex items-center whitespace-nowrap ${
                activeSection === key
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      {/* Practical Info */}
      {activeSection === 'practical' && (
        <div className="animate-fade-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">Visa Requirements</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                France is part of the Schengen Area. Please check if you require a visa to enter France.
              </p>
              <a
                href={CONSTANTS.links.franceVisas}
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline flex items-center"
              >
                Official Visa Website <ArrowRight className="w-3 h-3 ml-1" />
              </a>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">EES & ETIAS</h4>
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                <p>
                  <strong>EES (Entry/Exit System):</strong> Active. Biometric data (photo/fingerprints) will be collected at the border.
                </p>
                <p>
                  <strong>ETIAS:</strong> Not expected to be required until late 2026.
                </p>
              </div>
              <div className="flex gap-4 mt-3">
                <a href={CONSTANTS.links.ees} target="_blank" rel="noreferrer noopener" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline">
                  EES Info
                </a>
                <a href={CONSTANTS.links.etias} target="_blank" rel="noreferrer noopener" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline">
                  ETIAS Info
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">Currency</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                The currency is the <strong>Euro (€)</strong>. Credit cards (Visa, Mastercard) are widely accepted even for small amounts.
              </p>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">Electricity</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Voltage is <strong>230V, 50Hz</strong>. Plugs are <strong>Type E</strong> (compatible with Type C). You may need an adapter.
              </p>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">Emergency</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Dial <strong>112</strong> for all emergencies (police, fire, ambulance). It works from any phone and is free.
              </p>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white">Time Zone</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                France uses <strong>CET (UTC+1)</strong> during winter and CEST (UTC+2) in summer (starts last Sunday of March).
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Getting Here */}
      {activeSection === 'travel' && (
        <div className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-1 overflow-x-auto">
                {(['flight', 'train', 'local', 'car'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTravelTab(tab)}
                    className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors flex items-center capitalize whitespace-nowrap ${
                      activeTravelTab === tab
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab === 'flight' && <Plane className="w-4 h-4 mr-2" />}
                    {tab === 'train'  && <Train className="w-4 h-4 mr-2" />}
                    {tab === 'local'  && <Bus className="w-4 h-4 mr-2" />}
                    {tab === 'car'    && <MapPin className="w-4 h-4 mr-2" />}
                    {tab}
                  </button>
                ))}
              </div>

              <Card className="min-h-[200px] bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                {activeTravelTab === 'flight' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-slate-700 dark:text-slate-300 font-bold">From Lyon Saint-Exupéry International Airport (LYS):</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Take the <strong>Rhônexpress Shuttle</strong> to Part-Dieu station.</li>
                        <li>Connect to <strong>Metro line B</strong> towards Saint-Genis-Laval Hôpital Lyon Sud.</li>
                        <li>Get off at <strong>Debourg</strong>.</li>
                      </ul>
                      <a href={CONSTANTS.links.rhonexpress} target="_blank" rel="noreferrer noopener" className="text-indigo-600 font-bold hover:underline flex items-center mt-2">Book Rhônexpress <ArrowRight className="w-4 h-4 ml-1" /></a>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-slate-700 dark:text-slate-300 font-bold">From Paris Charles de Gaulle Airport (CDG):</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Take the <strong>TGV train</strong> directly from the airport station (Aéroport Charles de Gaulle 2 TGV) to <strong>Lyon Part-Dieu</strong>.</li>
                        <li>Journey time is approximately 2 hours.</li>
                        <li>Then follow instructions from Part-Dieu.</li>
                      </ul>
                      <a href={CONSTANTS.links.sncf} target="_blank" rel="noreferrer noopener" className="text-indigo-600 font-bold hover:underline flex items-center mt-2">Book TGV on SNCF <ArrowRight className="w-4 h-4 ml-1" /></a>
                    </div>
                  </div>
                )}
                {activeTravelTab === 'train' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-bold">From Part-Dieu Station:</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Take <strong>Metro line B</strong> towards Saint-Genis-Laval Hôpital Lyon Sud.</li>
                        <li>Get off at <strong>Debourg</strong>.</li>
                        <li>Walk for 5 minutes to reach the ENS de Lyon Monod site.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-bold">From Perrache Station:</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Take <strong>Tramway T1</strong> towards Debourg.</li>
                        <li>Get off at <strong>ENS Lyon</strong> (for Monod) or <strong>Debourg</strong>.</li>
                        <li>Walk for 5 minutes to reach the ENS de Lyon Monod site.</li>
                      </ul>
                    </div>
                    <a href={CONSTANTS.links.sncf} target="_blank" rel="noreferrer noopener" className="text-indigo-600 font-bold hover:underline flex items-center mt-2">Book on SNCF <ArrowRight className="w-4 h-4 ml-1" /></a>
                  </div>
                )}
                {activeTravelTab === 'local' && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-bold">Tramway:</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Tramway T1:</strong> ENS Lyon Stop (Monod).</li>
                        <li><strong>Tramway T6:</strong> Debourg Stop (Descartes).</li>
                      </ul>
                      <p className="text-slate-700 dark:text-slate-300 font-bold mt-2">Metro:</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Metro Line B:</strong> Debourg Stop.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-bold">Bus & Bike:</p>
                      <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Bus 34, 60, 64:</strong> Debourg Stop.</li>
                        <li><strong>Vélo'v:</strong> Stations at Descartes plaza and Place de l'École.</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-3 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Area Safety</span>
                        Locations along the Metro B and A, Tramway T1 are fine. If possible, avoid Guillotière area, Gerland and Perrache stations.
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <a href={CONSTANTS.links.tcl} target="_blank" rel="noreferrer noopener" className="text-indigo-600 font-bold hover:underline flex items-center">TCL Website <ArrowRight className="w-4 h-4 ml-1" /></a>
                      <a href={CONSTANTS.links.velov} target="_blank" rel="noreferrer noopener" className="text-indigo-600 font-bold hover:underline flex items-center">Vélo'v Website <ArrowRight className="w-4 h-4 ml-1" /></a>
                    </div>
                  </div>
                )}
                {activeTravelTab === 'car' && (
                  <div className="space-y-2">
                    <p className="text-slate-700 dark:text-slate-300 font-bold">Driving Instructions:</p>
                    <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                      <li><strong>From the East</strong> (Grenoble, Geneva, Airport): Take Southern Beltway, exit at <strong>Gerland</strong>.</li>
                      <li><strong>From A6</strong> (North or South): Take the <strong>Pont Pasteur</strong> exit.</li>
                    </ul>
                  </div>
                )}
              </Card>
            </div>

            <div className="h-full min-h-[400px] bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative group">
              <iframe
                src={CONSTANTS.links.mapEmbed}
                width="600"
                height="400"
                style={{ border: 0, width: '100%', height: '100%', minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                title="Conference Location"
              ></iframe>
              <div className="absolute bottom-6 right-6">
                <a
                  href={CONSTANTS.links.mapDirections}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-gradient-indigo text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-indigo-lg"
                >
                  <Compass className="w-5 h-5 mr-2" /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Venue */}
      {activeSection === 'venue' && (
        <div className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">Salle "Place de l'Ecole" Condorcet - ENS de Lyon (Monod Site)</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">1 Pl. de l'École, 69007 Lyon</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">The star icon on the map show the location of the venue. Click the map to zoom in and find the venue.</p>
                <div className="bg-amber-400 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Note for Attendees</span>
                    The ENS de Lyon has two main sites (Monod and Descartes). Please ensure you go to the <strong>Monod site</strong> and not the Descartes site.
                    <br />
                    Look for the entrance at <strong>1 Place de l'École</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[400px] bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative group">
              <a href={CONSTANTS.assets.mapENS} target="_blank" rel="noreferrer noopener" className="block h-full w-full cursor-zoom-in relative">
                <img
                  src={CONSTANTS.assets.mapENS}
                  alt="ENS de Lyon Map"
                  width="800"
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-slate-800 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg flex items-center">
                    <Map className="w-4 h-4 mr-2" /> View Full Map
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hotel */}
      {activeSection === 'hotel' && (
        <div className="animate-fade-in">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Area Safety</span>
              Locations along the Metro B and A, Tramway T1 are fine. If possible, avoid Guillotière area, Gerland and Perrache stations.
            </div>
          </div>
        </div>
      )}

      {/* Lunch */}
      {activeSection === 'lunch' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 dark:text-slate-400 font-medium">18 curated lunch spots near ENS de Lyon</p>
            <a
              href={CONSTANTS.links.lunchMapList}
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-sm flex items-center bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 mr-1.5" /> View all on Map
            </a>
          </div>

          <div className="grid md:grid-cols-[2fr_3fr] gap-6">
            {/* Scrollable list */}
            <div className="overflow-y-auto space-y-3 p-1" style={{ maxHeight: 'calc(100vh - 320px)' }}>
              {sortedLunchPlaces.map(place => (
                <button
                  key={place.id}
                  onClick={() => setActiveLunchSpot(place)}
                  className={`w-full text-left bg-white dark:bg-slate-800 p-4 rounded-xl border transition-all duration-150 shadow-sm ${
                    activeLunchSpot.id === place.id
                      ? 'border-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-700'
                      : 'border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-500 font-bold text-sm">{place.rating} ★</span>
                        <span className="text-[10px] text-slate-400">({place.reviews})</span>
                      </div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug">{place.name}</h5>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 gap-2 flex-wrap">
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{place.type}</span>
                        <span>{place.priceRange}</span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{place.address}</p>
                    </div>
                  </div>
                  {place.directionsUrl && (
                    <a
                      href={place.directionsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={e => e.stopPropagation()}
                      className="mt-2 inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                    >
                      <MapPin className="w-3 h-3 mr-1" /> Directions
                    </a>
                  )}
                </button>
              ))}
            </div>

            {/* Map iframe */}
            <div className="sticky top-24 h-[calc(100vh-320px)] min-h-[400px] bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
              <iframe
                key={activeLunchSpot.id}
                src={activeLunchSpot.mapEmbed}
                width="600"
                height="450"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                title={`Map for ${activeLunchSpot.name}`}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticsView;
