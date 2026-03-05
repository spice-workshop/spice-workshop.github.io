import type { FC } from 'react';
import { CONSTANTS } from '../../data/Constants';

const DescriptionContent: FC = () => (
  <>
    In April 2024, we organised the workshop{' '}
    <a
      href={CONSTANTS.links.spice1}
      target="_blank"
      rel="noreferrer noopener"
      className="text-indigo-600 dark:text-indigo-400 hover:underline"
    >
      &ldquo;Simulating Physics In Celestial Ecosystem (SPiCE): Star, Disk, and Planet Formation&rdquo;
    </a>{' '}
    at Tohoku University in Sendai, Japan. The idea of the workshop emerged during the Protostars and
    Planets VII in 2023, where major progress and insights in the fields of star formation,
    protoplanetary disks, and planet formation were extensively presented and discussed. However, it
    has also become evident that connections between these fields are lacking, which preclude the
    establishment of a coherent scenario from star to planet formation. The follow-up workshop,
    SPiCE-2, will be held at École Normale Supérieure de Lyon in France from March 16th to 20th,
    2026. The workshop will again focus on computational simulations linking star, disk, and planet
    formation, with the goal of bridging the gaps between these fields and fostering cross-disciplinary
    collaborations.
    <br />
    <br />
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
);

export default DescriptionContent;
