// ============================================================
// SPACE EXPLORER — SCIENTIFIC CELESTIAL DATA REPOSITORY
// ============================================================

import { CelestialObject } from '@/types/cosmos';

export const PLANETS_DATA: CelestialObject[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    category: 'planet',
    tagline: 'The Scorched Swift Messenger',
    color: '#A8A9AD',
    overview: 'Mercury is the smallest planet in our solar system and closest to the Sun. Only slightly larger than Earth\'s Moon, its surface is heavily cratered and experiences extreme temperature fluctuations.',
    scientificData: {
      diameterKm: '4,879 km',
      distanceFromSunAU: '0.39 AU (57.9M km)',
      gravityMps2: '3.7 m/s²',
      avgTempC: '-180°C to 430°C',
      rotationPeriodHours: '1,407.6 hrs (58.6 Earth days)',
      revolutionPeriodDays: '88 Earth days',
      atmosphereComposition: ['Oxygen 42%', 'Sodium 29%', 'Hydrogen 22%', 'Helium 6%'],
      knownMoonsCount: 0,
      parentPlanet: 'Sun'
    },
    structure: 'A massive metallic iron core occupying approximately 85% of the planet\'s radius, encased by a thin silicate mantle and outer crust.',
    atmosphere: 'An ultra-thin exosphere blasted away and replenished by solar wind and micrometeorite impacts, unable to retain heat.',
    explorationHistory: [
      'Mariner 10 (1974-1975): First spacecraft flybys photographing 45% of the cratered surface.',
      'MESSENGER (2011-2015): Entered orbit, discovered water ice inside permanently shadowed polar craters.',
      'BepiColombo (ESA/JAXA, launched 2018): En route to study internal composition and magnetic field in 2026.'
    ],
    interestingFacts: [
      'A year on Mercury lasts only 88 days, but a single solar day (noon to noon) lasts 176 Earth days.',
      'Despite being closest to the Sun, Venus is hotter due to greenhouse gases.',
      'Permanent water ice survives in deep craters at Mercury\'s poles that never see sunlight.'
    ],
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'planet',
    tagline: 'Earth\'s Toxic Twin Sister',
    color: '#E3BB7B',
    overview: 'Venus is often called Earth’s twin because of similar size and mass, but it is the hottest planet in the Solar System wrapped in a crushing carbon dioxide atmosphere and sulfuric acid clouds.',
    scientificData: {
      diameterKm: '12,104 km',
      distanceFromSunAU: '0.72 AU (108.2M km)',
      gravityMps2: '8.87 m/s²',
      avgTempC: '465°C (870°F)',
      rotationPeriodHours: '-5,832.5 hrs (Retrograde, 243 Earth days)',
      revolutionPeriodDays: '224.7 Earth days',
      atmosphereComposition: ['Carbon Dioxide 96.5%', 'Nitrogen 3.5%', 'Sulfur Dioxide 0.015%'],
      knownMoonsCount: 0,
      parentPlanet: 'Sun'
    },
    structure: 'Central iron core (approx 3,200 km radius), molten silicate mantle, and basaltic rocky crust continuously shaped by volcanism.',
    atmosphere: 'Extremely dense greenhouse atmosphere generating surface pressures 92 times greater than Earth—equivalent to 900 meters underwater.',
    explorationHistory: [
      'Venera 7 (USSR, 1970): First spacecraft to successfully land on another planet and transmit telemetry for 23 minutes.',
      'Magellan (NASA, 1990-1994): Radar mapped 98% of the surface through the impenetrable cloud decks.',
      'Akatsuki (JAXA, 2015-present): Monitoring atmospheric dynamics and lightning phenomena.'
    ],
    interestingFacts: [
      'Venus rotates backwards (clockwise) compared to most planets; the Sun rises in the west and sets in the east.',
      'A day on Venus is longer than its year.',
      'Surface atmospheric pressure is strong enough to crush conventional titanium submarine hulls.'
    ],
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'planet',
    tagline: 'The Blue Marble Oasis of Life',
    color: '#2B82C9',
    overview: 'Our home planet is the only known world harbor to life, liquid oceans covering 71% of the surface, and an active protective magnetosphere shielding it from cosmic radiation.',
    scientificData: {
      diameterKm: '12,742 km',
      distanceFromSunAU: '1.00 AU (149.6M km)',
      gravityMps2: '9.807 m/s²',
      avgTempC: '15°C',
      rotationPeriodHours: '23.93 hours',
      revolutionPeriodDays: '365.25 days',
      atmosphereComposition: ['Nitrogen 78.08%', 'Oxygen 20.95%', 'Argon 0.93%', 'Carbon Dioxide 0.04%'],
      knownMoonsCount: 1,
      parentPlanet: 'Sun'
    },
    structure: 'Solid inner iron-nickel core, liquid outer core generating the geomagnetic dynamo, viscous silicate mantle, and fractured tectonic crust.',
    atmosphere: 'Dynamic atmosphere stratified into Troposphere, Stratosphere (with ozone layer), Mesosphere, Thermosphere, and Exosphere.',
    explorationHistory: [
      'Sputnik 1 (1957): First artificial satellite in orbit.',
      'Apollo 8 (1968): Humanity captures Earthrise, showing Earth as a fragile cosmic sanctuary.',
      'International Space Station (1998-present): Continuous human scientific presence in low Earth orbit.'
    ],
    interestingFacts: [
      'Earth is the densest major planet in our solar system (5.51 g/cm³).',
      'The rotation of the liquid outer core creates our protective magnetic field.',
      'Earth’s plate tectonics act as a global thermostat recycling carbon across geologic epochs.'
    ],
    moons: ['moon']
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'planet',
    tagline: 'The Red Planet of Ancient Rivers',
    color: '#E25B38',
    overview: 'Mars is a cold desert world with iron oxide giving it a characteristic reddish hue. It features the largest volcano in the Solar System (Olympus Mons) and profound canyons carved by ancient floods.',
    scientificData: {
      diameterKm: '6,779 km',
      distanceFromSunAU: '1.52 AU (227.9M km)',
      gravityMps2: '3.721 m/s²',
      avgTempC: '-63°C',
      rotationPeriodHours: '24.62 hours (1 Sol)',
      revolutionPeriodDays: '687 Earth days',
      atmosphereComposition: ['Carbon Dioxide 95.3%', 'Nitrogen 2.6%', 'Argon 1.9%', 'Oxygen 0.16%'],
      knownMoonsCount: 2,
      parentPlanet: 'Sun'
    },
    structure: 'Dense core of iron, nickel, and sulfur (1,800 km radius), silicate mantle, and volcanic basaltic crust rich in iron minerals.',
    atmosphere: 'Thin atmosphere (approx 0.6% of Earth sea level pressure), frequently engulfed in global dust storms lasting weeks.',
    explorationHistory: [
      'Viking 1 & 2 (1976): First successful long-term Mars surface landers.',
      'Curiosity Rover (2012-present): Confirmed ancient Gale Crater contained habitable freshwater lakes.',
      'Perseverance & Ingenuity (2021-present): Caching core samples and achieved the first powered flight on another planet.'
    ],
    interestingFacts: [
      'Olympus Mons stands 22 km high—nearly triple the height of Mount Everest.',
      'Valles Marineris is a canyon system over 4,000 km long and 7 km deep.',
      'Sunsets on Mars appear distinctly blue due to fine dust scattering reddish light.'
    ],
    moons: ['phobos', 'deimos']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'planet',
    tagline: 'The Colossal King of the Planets',
    color: '#D4A373',
    overview: 'Jupiter is more than twice as massive as all other Solar System planets combined. Its swirling bands of clouds and centuries-old storm, the Great Red Spot, dominate planetary astronomy.',
    scientificData: {
      diameterKm: '139,820 km',
      distanceFromSunAU: '5.20 AU (778.5M km)',
      gravityMps2: '24.79 m/s²',
      avgTempC: '-110°C (cloud tops)',
      rotationPeriodHours: '9.93 hours (Fastest in Solar System)',
      revolutionPeriodDays: '4,333 Earth days (11.86 Earth years)',
      atmosphereComposition: ['Hydrogen 89.8%', 'Helium 10.2%', 'Methane 0.3%', 'Ammonia 0.026%'],
      knownMoonsCount: 95,
      parentPlanet: 'Sun'
    },
    structure: 'Dense metallic hydrogen layer under immense pressures, likely surrounding a diffuse rock/ice core with no solid surface.',
    atmosphere: 'Alternating eastward and westward jet streams create dramatic light belts and dark zones, rich in ammonia and water clouds.',
    explorationHistory: [
      'Pioneer 10 & 11 (1973-1974): First spacecraft to cross asteroid belt and photograph Jupiter close-up.',
      'Galileo Orbiter (1995-2003): Released atmospheric entry probe and studied ocean moons Europa and Ganymede.',
      'Juno (2016-present): Investigating deep atmospheric composition, polar cyclones, and magnetic dynamo.'
    ],
    interestingFacts: [
      'The Great Red Spot is a persistent anticyclonic storm larger than the entire diameter of Earth.',
      'Jupiter acts as a gravitational shield, deflecting or capturing comets that could threaten inner planets.',
      'Its immense magnetic field extends millions of kilometers, generating lethal radiation belts.'
    ],
    moons: ['io', 'europa', 'ganymede', 'callisto']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'planet',
    tagline: 'The Jewel of the Solar System',
    color: '#E0C588',
    overview: 'Saturn is adorned with an intricate, dazzling system of rings made of billions of chunks of ice and rock. Like Jupiter, it is a gas giant primarily composed of hydrogen and helium.',
    scientificData: {
      diameterKm: '116,460 km',
      distanceFromSunAU: '9.58 AU (1.43B km)',
      gravityMps2: '10.44 m/s²',
      avgTempC: '-140°C',
      rotationPeriodHours: '10.7 hours',
      revolutionPeriodDays: '10,759 Earth days (29.45 Earth years)',
      atmosphereComposition: ['Hydrogen 96.3%', 'Helium 3.25%', 'Methane 0.45%'],
      knownMoonsCount: 146,
      parentPlanet: 'Sun'
    },
    structure: 'Liquid hydrogen/helium exterior transitioning to liquid metallic hydrogen over an icy/rocky dense core.',
    atmosphere: 'Subtle atmospheric bands with super-fast winds reaching 1,800 km/h; features a permanent geometric hexagonal storm at the north pole.',
    explorationHistory: [
      'Voyager 1 & 2 (1980-1981): Revealed thousands of ringlets and complex shepherd moons.',
      'Cassini-Huygens (2004-2017): 13-year orbital mission; landed Huygens on Titan and discovered ice geysers on Enceladus.',
      'Grand Finale (2017): Cassini dove through the rings 22 times before plunging into Saturn’s clouds.'
    ],
    interestingFacts: [
      'Saturn is the only planet in our solar system with an average density less than water (0.687 g/cm³)—it would float in a giant bathtub.',
      'The rings span up to 282,000 km in width, but are often merely 10 to 30 meters thick.',
      'The northern polar hexagon is an atmospheric jet stream wave pattern 30,000 km across.'
    ],
    moons: ['titan', 'enceladus']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    category: 'planet',
    tagline: 'The Tilted Ice Giant',
    color: '#7AC5CD',
    overview: 'Uranus is an ice giant with an extreme axial tilt of 98 degrees, effectively spinning on its side. Its cyan color is caused by atmospheric methane absorbing red photons.',
    scientificData: {
      diameterKm: '50,724 km',
      distanceFromSunAU: '19.2 AU (2.87B km)',
      gravityMps2: '8.69 m/s²',
      avgTempC: '-195°C (Lowest recorded -224°C)',
      rotationPeriodHours: '-17.24 hours (Retrograde)',
      revolutionPeriodDays: '30,687 Earth days (84 Earth years)',
      atmosphereComposition: ['Hydrogen 83%', 'Helium 15%', 'Methane 2.3%'],
      knownMoonsCount: 28,
      parentPlanet: 'Sun'
    },
    structure: 'Mantle of superheated slushy water, ammonia, and methane ices over a small rocky silicate-iron core.',
    atmosphere: 'Coldest planetary atmosphere in the Solar System, with thin faint rings and a severely tilted off-center magnetic field.',
    explorationHistory: [
      'William Herschel (1781): First planet discovered using an astronomical telescope.',
      'Voyager 2 (1986): Only spacecraft to visit Uranus, discovering 10 new moons and 2 new rings.'
    ],
    interestingFacts: [
      'Due to its 98° tilt, each pole experiences 42 continuous years of sunlight followed by 42 years of darkness.',
      'It radiates virtually no internal heat compared to other giant planets.',
      'The magnetic field is tilted 59 degrees from its rotational axis and displaced from the planet’s center.'
    ],
    moons: []
  },
  {
    id: 'neptune',
    name: 'Neptune',
    category: 'planet',
    tagline: 'The Supersonic Windswept Ice Realm',
    color: '#4973FF',
    overview: 'Neptune is the most distant major planet from the Sun. An ice giant of vibrant azure blue, it endures the most violent supersonic winds recorded anywhere in the Solar System.',
    scientificData: {
      diameterKm: '49,244 km',
      distanceFromSunAU: '30.07 AU (4.50B km)',
      gravityMps2: '11.15 m/s²',
      avgTempC: '-201°C',
      rotationPeriodHours: '16.11 hours',
      revolutionPeriodDays: '60,190 Earth days (164.8 Earth years)',
      atmosphereComposition: ['Hydrogen 80%', 'Helium 19%', 'Methane 1.5%'],
      knownMoonsCount: 16,
      parentPlanet: 'Sun'
    },
    structure: 'Supercritical water-ammonia-methane icy mantle enveloping a rocky core of iron, nickel, and silicates.',
    atmosphere: 'Dynamic atmosphere with white cirrus methane clouds and supersonic storms whipping up to 2,100 km/h (Mach 1.7).',
    explorationHistory: [
      'Urbain Le Verrier & Johann Galle (1846): First planet located via mathematical prediction before visual confirmation.',
      'Voyager 2 (1989): Discovered the Great Dark Spot, captured Triton\'s active nitrogen geysers, and mapped 5 rings.'
    ],
    interestingFacts: [
      'Since its discovery in 1846, Neptune completed its first full orbit around the Sun in 2011.',
      'Its largest moon, Triton, orbits backward (retrograde) and is a captured Kuiper Belt object.',
      'Neptune radiates 2.6 times more internal heat than it receives from the distant Sun.'
    ],
    moons: []
  }
];

export const MOONS_DATA: CelestialObject[] = [
  {
    id: 'moon',
    name: "Earth's Moon (Luna)",
    category: 'moon',
    tagline: 'Earth’s Ancient Celestial Partner',
    color: '#C0C0C0',
    overview: 'The Moon is Earth\'s only natural satellite. Formed roughly 4.5 billion years ago in a giant collision, it stabilizes Earth\'s axial wobble and drives ocean tides.',
    scientificData: {
      diameterKm: '3,474 km',
      gravityMps2: '1.62 m/s² (1/6th Earth)',
      avgTempC: '-130°C to 120°C',
      rotationPeriodHours: '27.3 days (Tidally locked)',
      revolutionPeriodDays: '27.3 days',
      parentPlanet: 'Earth'
    },
    interestingFacts: [
      'The Moon is in synchronous rotation, meaning the same face always points toward Earth.',
      'Apollo 11 astronauts left footprints in the lunar regolith that will persist for millions of years.',
      'Water ice exists in permanently shadowed craters at the lunar South Pole.'
    ]
  },
  {
    id: 'europa',
    name: 'Europa',
    category: 'moon',
    tagline: 'The Ocean Moon of Astrobiology',
    color: '#EADBC8',
    overview: 'Europa is one of Jupiter’s Galilean moons. Beneath its fractured crust of water ice lies a global subsurface saltwater ocean with twice the volume of all Earth’s oceans combined.',
    scientificData: {
      diameterKm: '3,121 km',
      gravityMps2: '1.315 m/s²',
      avgTempC: '-160°C',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'The smooth, crisscrossed ice surface has very few craters, indicating constant geologic resurfacing.',
      'Tidal flexing from Jupiter’s immense gravity keeps Europa’s interior ocean warm and liquid.',
      'NASA’s Europa Clipper mission (launched 2024) is currently en route to assess its habitability.'
    ]
  },
  {
    id: 'titan',
    name: 'Titan',
    category: 'moon',
    tagline: 'The Prebiotic World of Liquid Methane',
    color: '#D29C44',
    overview: 'Titan is Saturn’s largest moon and the second largest in the Solar System. It is the only known moon with a dense atmosphere and stable surface lakes of liquid methane and ethane.',
    scientificData: {
      diameterKm: '5,150 km',
      gravityMps2: '1.352 m/s²',
      avgTempC: '-179°C',
      atmosphereComposition: ['Nitrogen 95%', 'Methane 5%'],
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'Titan has a complete hydrological cycle, but with methane clouds, methane rain, and methane rivers.',
      'Atmospheric pressure at the surface is 50% greater than Earth’s.',
      'Water ice on Titan’s surface is frozen so solid that it behaves like bedrock.'
    ]
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'moon',
    tagline: 'The Geyser Ocean of Saturn',
    color: '#FFFFFF',
    overview: 'Enceladus is a small, brilliant white moon of Saturn. Cryovolcanic plumes erupt from "tiger stripe" fractures at its south pole, spraying water vapor, organic molecules, and salts into space.',
    scientificData: {
      diameterKm: '504 km',
      gravityMps2: '0.113 m/s²',
      avgTempC: '-198°C',
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'It has the highest albedo (reflectivity) of any known body in the Solar System, reflecting nearly 99% of sunlight.',
      'Cassini flew directly through its geysers and detected molecular hydrogen, indicative of hydrothermal vents on the ocean floor.',
      'Plumes from Enceladus continuously feed Saturn’s E-ring.'
    ]
  },
  {
    id: 'io',
    name: 'Io',
    category: 'moon',
    tagline: 'The Volcanic Cauldron of Jupiter',
    color: '#F4D03F',
    overview: 'Io is the most volcanically active body in the Solar System, with hundreds of erupting sulfur volcanoes and lava lakes fueled by tidal tugs between Jupiter, Europa, and Ganymede.',
    scientificData: {
      diameterKm: '3,643 km',
      gravityMps2: '1.796 m/s²',
      avgTempC: '-130°C to 1,200°C (lava lakes)',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'Volcanic plumes on Io can shoot up to 500 km above the surface into space.',
      'Its surface is painted in vibrant shades of yellow, red, black, and white from sulfur compounds.',
      'Io generates an electrical current of 3 million amperes as it moves through Jupiter’s magnetic field.'
    ]
  }
];

export const DEEP_SPACE_OBJECTS: CelestialObject[] = [
  {
    id: 'milky_way',
    name: 'Milky Way Galaxy',
    category: 'galaxy',
    tagline: 'Our Home Galactic Metropolis',
    color: '#6C5CE7',
    overview: 'The Milky Way is a barred spiral galaxy containing an estimated 100 to 400 billion stars, including our Solar System positioned in the Orion Cygnus arm roughly 26,000 light-years from the galactic core.',
    scientificData: {
      diameterKm: '100,000 light-years',
      distanceFromEarthLy: '0 ly (Inside)',
      galaxyType: 'Barred Spiral (SBbc)',
      constellation: 'Sagittarius (Galactic Core)'
    },
    interestingFacts: [
      'At its center lies Sagittarius A*, a supermassive black hole with a mass of 4.3 million Suns.',
      'The entire galaxy is rotating; our solar system takes ~230 million years to complete one galactic year.',
      'In roughly 4.5 billion years, the Milky Way and Andromeda galaxies will merge into a giant elliptical galaxy ("Milkomeda").'
    ]
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy (M31)',
    category: 'galaxy',
    tagline: 'Our Nearest Galactic Giant Neighbor',
    color: '#895DFF',
    overview: 'Andromeda is the largest galaxy in our Local Group, spanning over 220,000 light-years and housing approximately one trillion stars.',
    scientificData: {
      diameterKm: '220,000 light-years',
      distanceFromEarthLy: '2.537 million light-years',
      galaxyType: 'Spiral (SA(s)b)',
      constellation: 'Andromeda'
    },
    interestingFacts: [
      'It is the most distant celestial object visible to the unaided human eye on a clear dark night.',
      'Andromeda is currently hurtling toward our Milky Way at roughly 110 kilometers per second (400,000 km/h).'
    ]
  },
  {
    id: 'orion_nebula',
    name: 'Orion Nebula (M42)',
    category: 'nebula',
    tagline: 'A Stellar Nursery of Newborn Stars',
    color: '#E056FD',
    overview: 'Located just south of Orion’s Belt, the Orion Nebula is a diffuse emission nebula where thousands of hot, young stars are actively condensing out of turbulent clouds of interstellar gas and dust.',
    scientificData: {
      diameterKm: '24 light-years',
      distanceFromEarthLy: '1,344 light-years',
      constellation: 'Orion'
    },
    interestingFacts: [
      'The bright central Trapezium cluster contains 4 massive O and B type stars that ionize the surrounding gas, causing it to glow brightly in pink and turquoise.',
      'Astronomers have detected protoplanetary discs (proplyds)—nascent solar systems—forming inside.'
    ]
  },
  {
    id: 'crab_nebula',
    name: 'Crab Nebula (M1)',
    category: 'nebula',
    tagline: 'The Afterglow of a Supernova Explosion',
    color: '#00CEC9',
    overview: 'The Crab Nebula is a supernova remnant in the constellation Taurus. It marks the debris cloud from a stellar cataclysm witnessed and recorded by Chinese and Arab astronomers in 1054 AD.',
    scientificData: {
      diameterKm: '11 light-years',
      distanceFromEarthLy: '6,500 light-years',
      constellation: 'Taurus'
    },
    interestingFacts: [
      'At its core lies the Crab Pulsar—a rapidly spinning neutron star that rotates 30 times every single second.',
      'It emits pulses of radiation across the electromagnetic spectrum from radio waves to energetic gamma rays.'
    ]
  },
  {
    id: 'sagittarius_a',
    name: 'Sagittarius A* Black Hole',
    category: 'phenomenon',
    tagline: 'The Supermassive Gravitational Anchor',
    color: '#FD79A8',
    overview: 'Sagittarius A* is the supermassive black hole at the astronomical center of the Milky Way. Its gravitational pull anchors the orbits of millions of stars in the galactic nucleus.',
    scientificData: {
      diameterKm: '44 million km (Schwarzschild diameter)',
      distanceFromEarthLy: '26,673 light-years',
      constellation: 'Sagittarius'
    },
    interestingFacts: [
      'In May 2022, the Event Horizon Telescope collaboration unveiled the first direct radio image of the glowing gas ring framing its event horizon.',
      'Its mass is calculated to be 4.297 million times the mass of our Sun contained within a space smaller than Mercury’s orbit.'
    ]
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse (Alpha Orionis)',
    category: 'star',
    tagline: 'The Pulsating Red Supergiant',
    color: '#FF7675',
    overview: 'Betelgeuse is a colossal red supergiant star in the shoulder of Orion. If placed at the center of our solar system, its surface would extend past the orbit of Jupiter.',
    scientificData: {
      diameterKm: '1.2 billion km (887 solar radii)',
      distanceFromEarthLy: '642.5 light-years',
      spectralType: 'M1-M2 Ia-ab',
      constellation: 'Orion'
    },
    interestingFacts: [
      'It is nearing the end of its life and is destined to explode as a dramatic Type II core-collapse supernova within the next 100,000 years.',
      'When it goes supernova, it will shine as bright as the full Moon and be visible in broad daylight for months.'
    ]
  }
];

export const ALL_CELESTIAL_OBJECTS: CelestialObject[] = [
  ...PLANETS_DATA,
  ...MOONS_DATA,
  ...DEEP_SPACE_OBJECTS
];
