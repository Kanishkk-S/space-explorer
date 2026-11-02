// ============================================================
// SPACE EXPLORER — COSMIC KNOWLEDGE ENCYCLOPEDIA
// ============================================================

import React, { useState } from 'react';
import { Sparkles, Orbit, Atom, Flame } from 'lucide-react';

interface KnowledgeTopic {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: any;
  explanation: string;
  scientificDetails: string[];
  keyTakeaways: string[];
}

const TOPICS: KnowledgeTopic[] = [
  {
    id: 'big_bang',
    title: 'The Big Bang & Origin of Spacetime',
    tagline: 'The rapid expansion that birthed all matter and energy 13.8 billion years ago.',
    category: 'Cosmology',
    icon: Sparkles,
    explanation: 'The Big Bang is the prevailing cosmological model for the observable universe from the earliest known periods through its subsequent large-scale evolution. The universe originated from an extremely hot, dense point of energy and has been expanding and cooling ever since.',
    scientificDetails: [
      'Cosmic Inflation: Within the first fraction of a second (10^-36 seconds), spacetime underwent exponential expansion.',
      'Big Bang Nucleosynthesis: During the first 20 minutes, fundamental protons and neutrons fused to create the primordial abundance of hydrogen (~75%) and helium (~25%).',
      'Recombination & CMB: At 380,000 years after the Big Bang, temperatures dropped to ~3,000 K, allowing neutral atoms to form and photons to travel freely, creating the Cosmic Microwave Background radiation.'
    ],
    keyTakeaways: [
      'The Big Bang was not an explosion in existing space, but an expansion of space itself.',
      'Hubble’s Law (v = H0 * d) proves distant galaxies are moving away from us proportional to distance.'
    ]
  },
  {
    id: 'stellar_lifecycle',
    title: 'Stellar Evolution & Lifecycles',
    tagline: 'From turbulent stellar nurseries to white dwarfs, neutron stars, and supernovae.',
    category: 'Astrophysics',
    icon: Flame,
    explanation: 'Stars are massive cosmic fusion reactors. A star spends the majority of its life on the Main Sequence, converting hydrogen into helium in its core through the proton-proton chain or CNO cycle. Its final destiny is determined solely by its initial mass.',
    scientificDetails: [
      'Low to Medium Mass Stars (< 8 Solar Masses): Swell into red giants, shed their outer layers as colorful planetary nebulae, and leave behind dense carbon-oxygen White Dwarfs.',
      'Massive Stars (> 8 Solar Masses): Fuse progressively heavier elements up to iron (Fe-56). Once iron forms in the core, fusion ceases to release energy, triggering catastrophic core-collapse within milliseconds.',
      'Supernova Remnants: The core rebounds to form either a Neutron Star (if core mass < ~2.2 solar masses, Tolman-Oppenheimer-Volkoff limit) or collapses into a Black Hole.'
    ],
    keyTakeaways: [
      'Every heavy element in your body (carbon, oxygen, iron, calcium) was forged inside stars and dispersed via supernovae.',
      'Our Sun is currently a middle-aged G-type main sequence star with ~5 billion years of hydrogen fuel remaining.'
    ]
  },
  {
    id: 'gravity_spacetime',
    title: 'Gravity & Curvature of Spacetime',
    tagline: 'Einstein’s General Relativity: Mass tells space how to curve, space tells mass how to move.',
    category: 'Physics',
    icon: Orbit,
    explanation: 'In 1915, Albert Einstein published the General Theory of Relativity, fundamentally replacing Newton\'s view of gravity as an invisible attractive force. Instead, massive objects physically warp the fabric of 4-dimensional spacetime.',
    scientificDetails: [
      'Geodesics: Planets and light beams follow straight lines in curved spacetime.',
      'Gravitational Lensing: Extreme mass concentrations bend passing light rays, acting like a cosmic magnifying glass.',
      'Gravitational Waves: Cataclysmic mergers of black holes and neutron stars ripple through spacetime at the speed of light, first detected by LIGO in 2015.'
    ],
    keyTakeaways: [
      'Time ticks demonstrably slower in stronger gravitational fields (gravitational time dilation).',
      'GPS satellites must adjust their atomic clocks daily for both special and general relativistic time dilation.'
    ]
  },
  {
    id: 'dark_matter_energy',
    title: 'Dark Matter & Dark Energy',
    tagline: 'The 95% invisible cosmos holding galaxies together and accelerating universal expansion.',
    category: 'Cosmology',
    icon: Atom,
    explanation: 'Ordinary baryonic matter (atoms, stars, planets, and humans) comprises merely 5% of the total energy density of the universe. The remaining 95% consists of two enigmatic cosmic components: Dark Matter and Dark Energy.',
    scientificDetails: [
      'Dark Matter (~27%): Non-luminous matter that does not interact with electromagnetic radiation. Discovered via galaxy rotation curves (Vera Rubin) and gravitational lensing.',
      'Dark Energy (~68%): A mysterious negative-pressure energy permeating all space, driving the accelerating expansion of the universe (discovered in 1998 via Type Ia supernovae).',
      'Cosmic Web: Dark matter filaments form the gravitational scaffolding along which galaxies and clusters congregate.'
    ],
    keyTakeaways: [
      'Without the extra gravitational glue of dark matter, spiral galaxies would tear themselves apart as they spin.',
      'Dark energy becomes more dominant as the universe expands, pointing toward an ultimate "Big Freeze" scenario.'
    ]
  }
];

export const CosmicKnowledgeView: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<KnowledgeTopic>(TOPICS[0]);

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden">
      <div className="mb-6 shrink-0">
        <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">ASTRONOMICAL FOUNDATIONS</span>
        <h2 className="text-2xl font-black text-white">Cosmic Knowledge Encyclopedia</h2>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Topic Selector Cards */}
        <div className="lg:col-span-4 overflow-y-auto space-y-3 pr-2">
          {TOPICS.map(topic => {
            const Icon = topic.icon;
            const isSelected = activeTopic.id === topic.id;

            return (
              <div
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-cosmos-card border-cosmos-blue shadow-cosmos-glow'
                    : 'bg-cosmos-subdark/70 border-cosmos-border/60 hover:bg-cosmos-card/60'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-cosmos-blue text-white' : 'bg-cosmos-subdark text-cosmos-muted'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cosmos-cyan">
                    {topic.category}
                  </span>
                  <h4 className="font-bold text-white text-sm leading-tight mt-0.5">{topic.title}</h4>
                  <p className="text-xs text-cosmos-muted line-clamp-2 mt-1 leading-normal">{topic.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Topic Presentation */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-cosmos-border p-6 flex flex-col overflow-y-auto shadow-2xl">
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-cosmos-border/50">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cosmos-blue to-cosmos-violet text-white shadow-cosmos-glow">
              {React.createElement(activeTopic.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cosmos-cyan">
                {activeTopic.category} COMPREHENSION
              </span>
              <h3 className="text-2xl font-black text-white">{activeTopic.title}</h3>
              <p className="text-xs text-cosmos-muted">{activeTopic.tagline}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase mb-2">
                OVERVIEW & PHENOMENOLOGY
              </h4>
              <p className="text-sm text-cosmos-text leading-relaxed font-sans bg-cosmos-subdark/50 p-4 rounded-xl border border-cosmos-border/50">
                {activeTopic.explanation}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase mb-3">
                SCIENTIFIC MECHANICS & EVIDENCE
              </h4>
              <div className="space-y-2.5">
                {activeTopic.scientificDetails.map((detail, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-cosmos-subdark/70 border border-cosmos-border/50 text-xs text-cosmos-text flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-lg bg-cosmos-blue/20 text-cosmos-blue font-mono font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KEY SCIENTIFIC TAKEAWAYS</span>
              </h4>
              <div className="space-y-2">
                {activeTopic.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
