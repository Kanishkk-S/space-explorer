// ============================================================
// SPACE EXPLORER — UNIFIED ASTRONOMY & COSMOS REPOSITORY
// Comprehensive scientific catalogue covering the Observable Universe
// ============================================================

import { CelestialObject } from '@/types/cosmos';

// ============================================================
// 1. THE SOLAR SYSTEM: THE SUN & 8 MAJOR PLANETS
// ============================================================
export const PLANETS_DATA: CelestialObject[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Scorched Swift Messenger',
    color: '#B0B0B5',
    overview: 'Mercury is the smallest planet in our solar system and closest to the Sun. Only slightly larger than Earth’s Moon, its metallic core dominates 85% of its volume. Without an atmosphere to regulate heat, temperatures swing between infernal day and cryogenic night.',
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
    structure: 'Giant metallic iron-nickel core occupying ~85% of the planet’s radius (approx 2,000 km across), encased in a 400-km silicate rocky mantle and impact-scarred crust.',
    atmosphere: 'Ultra-tenuous exosphere formed by solar wind sputtering and micrometeorite volatilization, incapable of retaining heat or atmospheric pressure.',
    surfaceFeatures: 'Caloris Basin (1,550 km impact scar), lobate scarps (cliffs indicating the planet contracted as its core cooled), and permanently shadowed polar craters.',
    explorationHistory: [
      'Mariner 10 (1974-1975): First spacecraft flybys photographing 45% of the cratered surface.',
      'MESSENGER (2011-2015): Entered orbit, mapped global geochemical composition, and discovered water ice in polar shadow.',
      'BepiColombo (ESA/JAXA, launched 2018): En route to study gravitational dynamo and exosphere interaction.'
    ],
    interestingFacts: [
      'A year on Mercury lasts only 88 days, but due to 3:2 spin-orbit resonance, a single solar day (sunrise to sunrise) takes 176 Earth days.',
      'Despite proximity to the Sun, water ice remains permanently frozen inside shadowed craters at the north and south poles.',
      'Mercury has a global magnetic field roughly 1% as strong as Earth’s.'
    ],
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'Earth’s Superheated Runaway Greenhouse Twin',
    color: '#E8C382',
    overview: 'Venus is Earth’s fraternal twin in diameter and mass, but enveloped in an opaque shroud of supercritical carbon dioxide and reflective sulfuric acid cloud decks. Its surface is the hottest in the Solar System, hot enough to melt lead.',
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
    structure: 'Solid-to-liquid iron-nickel core (approx 3,200 km radius), rocky silicate mantle, and a basaltic volcanic crust showing widespread lava plains and pancake domes.',
    atmosphere: 'Dense greenhouse atmosphere generating surface pressures 92 times greater than Earth’s sea level—equivalent to being 900 meters below oceanic depths.',
    surfaceFeatures: 'Maxwell Montes (11 km high mountain peak), Aphrodite Terra highland, and thousands of volcanic calderas.',
    explorationHistory: [
      'Venera 7 (USSR, 1970): First spacecraft to successfully land on another world and transmit telemetry from the hostile surface.',
      'Magellan (NASA, 1990-1994): High-resolution synthetic aperture radar mapped 98% of Venusian topography.',
      'Akatsuki (JAXA, 2015-present): Monitoring super-rotating atmospheric jets and lightning activity.'
    ],
    interestingFacts: [
      'Venus rotates clockwise (retrograde); the Sun rises in the west and sets in the east.',
      'One Venusian day (243 Earth days) is longer than its orbital year (225 Earth days).',
      'The upper cloud decks circle the entire globe in just 4 Earth days—a phenomenon known as atmospheric super-rotation.'
    ],
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Blue Marble Oasis of Life',
    color: '#2E86DE',
    overview: 'Our home planet is the only known world harboring active surface liquid oceans, plate tectonics, and a biosphere. Shielded by an active geomagnetic dynamo, Earth is a dynamic crucible of life.',
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
    structure: 'Solid crystalline inner iron-nickel core, liquid outer core generating the geomagnetic field, convective silicate mantle, and continental/oceanic tectonic crust.',
    atmosphere: 'Dynamic atmosphere stratified into Troposphere, Stratosphere (with vital UV-absorbing ozone layer), Mesosphere, Thermosphere, and Exosphere.',
    surfaceFeatures: 'Pacific and Atlantic oceanic basins (71% coverage), Mariana Trench (10,994m depth), Himalayan mountain ranges, and continental ice sheets.',
    explorationHistory: [
      'Sputnik 1 (1957): Dawn of the space age with the first artificial orbital satellite.',
      'Apollo 8 (1968): Humans capture Earthrise, revealing our world as an exquisite, fragile sanctuary.',
      'ISS & Earth Observatories (1998-present): Continuous orbital surveillance tracking climate and biosphere telemetry.'
    ],
    interestingFacts: [
      'Earth is the densest major planet in our solar system at 5.51 g/cm³.',
      'Convective currents in the liquid outer iron core act as a geodynamo, shielding our atmosphere from solar wind stripping.',
      'Earth’s axial tilt of 23.44° produces our annual cycle of seasons.'
    ],
    moons: ['moon']
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Red Planet & Ancient Water World',
    color: '#E05638',
    overview: 'Mars is a cold desert world with half Earth’s diameter, oxidized iron rust dust, and giant volcanic caldera structures. Ancient river valleys, deltas, and clay minerals confirm that liquid water flowed across its surface billions of years ago.',
    scientificData: {
      diameterKm: '6,779 km',
      distanceFromSunAU: '1.52 AU (227.9M km)',
      gravityMps2: '3.72 m/s²',
      avgTempC: '-63°C (-81°F)',
      rotationPeriodHours: '24.62 hours (1 Sol)',
      revolutionPeriodDays: '687 Earth days',
      atmosphereComposition: ['Carbon Dioxide 95.3%', 'Nitrogen 2.6%', 'Argon 1.9%', 'Oxygen 0.16%'],
      knownMoonsCount: 2,
      parentPlanet: 'Sun'
    },
    structure: 'Dense iron-nickel-sulfur core (approx 1,800 km radius), silicate mantle, and a thick single-plate basaltic crust unsegmented by active plate tectonics.',
    atmosphere: 'Thin atmosphere (~0.6% of Earth’s sea level pressure) dominated by carbon dioxide, prone to planet-encircling seasonal dust storms.',
    surfaceFeatures: 'Olympus Mons (tallest planetary shield volcano in the solar system, 21.9 km high) and Valles Marineris canyon system (4,000 km long).',
    explorationHistory: [
      'Mariner 9 (1971): First orbiter around Mars, discovering river networks and giant volcanoes.',
      'Viking 1 & 2 (1976): First successful long-duration surface landers and biological life detection experiments.',
      'Curiosity & Perseverance (2012, 2021-present): Nuclear-powered rover astrobiology exploring Gale and Jezero crater lakebeds.'
    ],
    interestingFacts: [
      'Olympus Mons is nearly 3 times taller than Mount Everest and covers an area roughly the size of the state of Arizona.',
      'Sunsets on Mars appear distinctly blue due to forward scattering of light by fine atmospheric dust particles.',
      'Mars hosts two captured asteroidal moons, Phobos and Deimos; Phobos is spiraling inwards and will break up in ~50 million years.'
    ],
    moons: []
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Giant King of the Heliosphere',
    color: '#D4A373',
    overview: 'Jupiter contains more than twice the mass of all other planets combined. A gas giant composed mostly of hydrogen and helium, its counter-rotating atmospheric jet streams and the ancient Great Red Spot storm create a mesmerizing celestial vortex.',
    scientificData: {
      diameterKm: '139,820 km',
      distanceFromSunAU: '5.20 AU (778.5M km)',
      gravityMps2: '24.79 m/s²',
      avgTempC: '-110°C',
      rotationPeriodHours: '9.93 hours (Fastest planetary spin)',
      revolutionPeriodDays: '4,333 Earth days (11.86 Earth years)',
      atmosphereComposition: ['Hydrogen 89.8%', 'Helium 10.2%', 'Methane 0.3%', 'Ammonia 0.026%'],
      knownMoonsCount: 95,
      parentPlanet: 'Sun'
    },
    structure: 'Enormous central rocky/diffuse heavy-element core surrounded by a deep mantle of liquid metallic hydrogen conducting immense electrical currents, beneath molecular hydrogen gas.',
    atmosphere: 'Dynamic stratosphere and troposphere striped into bright cold ammonia zones and dark warm belts, with wind speeds exceeding 540 km/h.',
    surfaceFeatures: 'No solid surface. Atmospheric pressure transitions smoothly from gaseous atmosphere to liquid sea of metallic hydrogen.',
    explorationHistory: [
      'Pioneer 10 & 11 (1973-1974): First reconnaissance through the lethal Jovian radiation belts.',
      'Voyager 1 & 2 (1979): Discovered active sulfur volcanism on Io and subsurface ocean potential on Europa.',
      'Galileo (1995-2003) & Juno (2016-present): Orbital investigations of deep atmospheric water, magnetic dynamo, and lightning.'
    ],
    interestingFacts: [
      'The Great Red Spot is an anticyclonic storm larger than the entire planet Earth that has raged continuously for at least 350 years.',
      'Jupiter’s magnetic field is 14 times stronger than Earth’s, creating the largest structure in the solar system—a magnetosphere reaching past Saturn.',
      'If Jupiter had formed with 80 times more mass, core hydrogen fusion would have ignited, turning it into a red dwarf star.'
    ],
    moons: ['europa', 'io']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Ringed Jewel of the Cosmos',
    color: '#E0C588',
    overview: 'Saturn is instantly recognizable for its breathtaking, razor-thin system of icy rings stretching 282,000 km across. It is the least dense planet in the solar system—the only world that would float in an ocean of water.',
    scientificData: {
      diameterKm: '116,460 km',
      distanceFromSunAU: '9.58 AU (1.43B km)',
      gravityMps2: '10.44 m/s²',
      avgTempC: '-140°C',
      rotationPeriodHours: '10.7 hours',
      revolutionPeriodDays: '10,759 Earth days (29.45 Earth years)',
      atmosphereComposition: ['Hydrogen 96.3%', 'Helium 3.25%', 'Methane 0.45%', 'Ammonia 0.026%'],
      knownMoonsCount: 146,
      parentPlanet: 'Sun'
    },
    structure: 'Dense iron-rock-silicate core enveloped by liquid metallic hydrogen, followed by liquid molecular hydrogen and a golden ammonia cloud layer.',
    atmosphere: 'Banded atmosphere dominated by east-west jet streams reaching 1,800 km/h. Its north pole features a persistent geometric hexagonal storm 30,000 km wide.',
    surfaceFeatures: 'Spectacular main ring system (A, B, C rings with the Cassini Division), composed of billions of chunks of 99% pure water ice from dust grain to bus size.',
    explorationHistory: [
      'Pioneer 11 & Voyager 1 & 2 (1979-1981): First close-up imaging of intricate ringlet structures and Titan’s dense nitrogen atmosphere.',
      'Cassini-Huygens (2004-2017): Spectacular 13-year mission; landed the Huygens probe on Titan and discovered hydrothermal cryovolcanoes on Enceladus.'
    ],
    interestingFacts: [
      'Saturn’s rings are on average only 10 to 30 meters thick despite spanning nearly 300,000 km across space.',
      'Saturn has the lowest mean density of all planets (0.687 g/cm³)—lighter than liquid water.',
      'The rings are losing mass at a rate of 10,000 kg per second through "ring rain" and will likely disappear within 100 to 300 million years.'
    ],
    moons: ['titan', 'enceladus']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Sideways Ice Giant',
    color: '#7AC5CD',
    overview: 'Uranus is an ice giant with an axial tilt of 97.8°, meaning it rolls along its orbital path on its side. Its cyan atmosphere is enriched with methane ice crystals that absorb red light, giving it an ethereal aquamarine glow.',
    scientificData: {
      diameterKm: '50,724 km',
      distanceFromSunAU: '19.22 AU (2.87B km)',
      gravityMps2: '8.69 m/s²',
      avgTempC: '-195°C (-320°F, coldest planetary atmosphere)',
      rotationPeriodHours: '-17.24 hours (Retrograde)',
      revolutionPeriodDays: '30,687 Earth days (84 Earth years)',
      atmosphereComposition: ['Hydrogen 82.5%', 'Helium 15.2%', 'Methane 2.3%'],
      knownMoonsCount: 28,
      parentPlanet: 'Sun'
    },
    structure: 'Small rocky core surrounded by a vast supercritical mantle of high-pressure water, ammonia, and methane "ice", under molecular hydrogen-helium gas.',
    atmosphere: 'Extremely cold atmosphere with temperatures plunging to 49 Kelvin (-224°C). Subtle banding obscured by high-altitude photochemical haze.',
    surfaceFeatures: 'Faint system of 13 dark narrow rings discovered in 1977, composed of carbon-rich refractory organic boulders.',
    explorationHistory: [
      'William Herschel (1781): First planet discovered using a telescope.',
      'Voyager 2 (1986): Only spacecraft to visit Uranus, discovering 10 new moons, 2 rings, and its tilted magnetic field.'
    ],
    interestingFacts: [
      'Because of its 98° axial tilt, each pole gets 42 years of continuous direct sunlight followed by 42 years of polar darkness.',
      'Its magnetic field is tilted 59° away from its rotational axis and offset from the center of the planet by one-third of its radius.'
    ],
    moons: []
  },
  {
    id: 'neptune',
    name: 'Neptune',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Supersonic Storm World',
    color: '#4973FF',
    overview: 'Neptune is the outermost major planet, an ice giant glowing in deep azure blue. Despite receiving only 0.1% of Earth’s sunlight, it drives the most violent supersonic winds in the solar system, exceeding 2,100 km/h.',
    scientificData: {
      diameterKm: '49,244 km',
      distanceFromSunAU: '30.05 AU (4.50B km)',
      gravityMps2: '11.15 m/s²',
      avgTempC: '-201°C',
      rotationPeriodHours: '16.11 hours',
      revolutionPeriodDays: '60,190 Earth days (164.8 Earth years)',
      atmosphereComposition: ['Hydrogen 80%', 'Helium 19%', 'Methane 1.5%'],
      knownMoonsCount: 16,
      parentPlanet: 'Sun'
    },
    structure: 'Solid silicate/iron core surrounded by a dense fluid mantle of ionic water, ammonia, and methane, under a deep atmospheric envelope.',
    atmosphere: 'Deep blue color caused by an unidentified atmospheric chromophore beyond methane. Hosts transient high-altitude methane cirrus clouds and dark anticyclonic vortices.',
    surfaceFeatures: 'Dark vortex systems (such as the Great Dark Spot discovered by Voyager 2) and 5 faint dusty rings with clumpy orbital arcs.',
    explorationHistory: [
      'Urbain Le Verrier & Johann Galle (1846): First planet discovered purely through mathematical predictions of orbital perturbations in Uranus.',
      'Voyager 2 (1989): Historic flyby providing the only close-up images of Neptune, its ring arcs, and cryogeysers on Triton.'
    ],
    interestingFacts: [
      'Neptune’s supersonic winds reach up to 2,160 km/h (1,340 mph)—faster than the speed of sound in air on Earth.',
      'Since its discovery in 1846, Neptune completed its first single 165-year orbit around the Sun in 2011.'
    ],
    moons: ['triton']
  }
];

// ============================================================
// 2. ROOT SOLAR SYSTEM
// ============================================================
export const ROOT_SOLAR_SYSTEM: CelestialObject = {
  id: 'solar_system',
  name: 'The Solar System',
  category: 'solar_system',
  hierarchyLevel: 'star_system',
  parentObjectId: 'milky_way',
  tagline: 'Our Gravitationally Bound Heliocentric Domain',
  color: '#5B8CFF',
  overview: 'The Solar System consists of our G-type star (the Sun), eight major planets, 5 recognized dwarf planets, hundreds of moons, millions of asteroids in the Main Belt, and billions of icy bodies in the Kuiper Belt and Oort Cloud.',
  scientificData: {
    diameterKm: '100,000 AU across (Outer Oort Cloud)',
    distanceFromEarthLy: '0 light-years (Our home system)',
    distanceFromSunAU: '0 to 100,000 AU',
    constellation: 'Orion Cygnus Arm'
  },
  interestingFacts: [
    'The Sun contains 99.86% of all mass in the entire Solar System.',
    'The boundary of the heliosphere (heliopause) is where the solar wind meets the interstellar medium, crossed by Voyager 1 in 2012.'
  ]
};

// ============================================================
// 3. DWARF PLANETS & ASTEROIDS
// ============================================================
export const DWARF_PLANETS: CelestialObject[] = [
  {
    id: 'pluto',
    name: 'Pluto',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'King of the Kuiper Belt with a Heart of Nitrogen Ice',
    color: '#D2B48C',
    overview: 'Once classified as the ninth planet, Pluto is the largest Kuiper Belt Object. In 2015, NASA’s New Horizons spacecraft revealed a surprisingly young, geologically active world with soaring water-ice mountains and the smooth nitrogen glacier Sputnik Planitia.',
    scientificData: {
      diameterKm: '2,377 km',
      distanceFromSunAU: '39.48 AU (5.91B km)',
      gravityMps2: '0.62 m/s²',
      avgTempC: '-230°C',
      rotationPeriodHours: '-153.3 hours (6.39 days)',
      revolutionPeriodDays: '90,560 Earth days (248 Earth years)',
      atmosphereComposition: ['Nitrogen 99%', 'Methane 0.5%', 'Carbon Monoxide 0.05%'],
      knownMoonsCount: 5,
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Pluto and its largest moon Charon form a binary system; they are mutually tidally locked, facing each other permanently.',
      'Sputnik Planitia is a massive 1,000-km heart-shaped plain of churning nitrogen and carbon monoxide ice.'
    ]
  },
  {
    id: 'ceres',
    name: 'Ceres',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'Queen of the Main Asteroid Belt',
    color: '#A0A0A0',
    overview: 'Ceres is the largest object in the Main Asteroid Belt between Mars and Jupiter. Classified as a dwarf planet in 2006, NASA’s Dawn mission discovered bright sodium carbonate salt deposits in Occator Crater and evidence of a relict subsurface ocean.',
    scientificData: {
      diameterKm: '939 km',
      distanceFromSunAU: '2.77 AU (414M km)',
      gravityMps2: '0.27 m/s²',
      avgTempC: '-106°C',
      rotationPeriodHours: '9.07 hours',
      revolutionPeriodDays: '1,682 Earth days (4.6 Earth years)',
      knownMoonsCount: 0,
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Ceres contains roughly one-third of the total mass of the entire asteroid belt.',
      'Ahuna Mons is a 4-kilometer-tall cryovolcanic dome that erupted salty mud and brine rather than molten rock.'
    ]
  },
  {
    id: 'eris',
    name: 'Eris',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'The Distant World That Redefined the Planets',
    color: '#EFEFEF',
    overview: 'Discovered in 2005 at the far edge of the scattered disc, Eris is 27% more massive than Pluto. Its discovery directly prompted the International Astronomical Union (IAU) to formalize the scientific definition of a planet.',
    scientificData: {
      diameterKm: '2,326 km',
      distanceFromSunAU: '67.8 AU (10.1B km)',
      gravityMps2: '0.82 m/s²',
      avgTempC: '-243°C',
      revolutionPeriodDays: '203,830 Earth days (558 Earth years)',
      knownMoonsCount: 1,
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Eris is one of the most reflective bodies in the solar system (albedo 0.96) because its methane atmosphere freezes onto the surface like fresh snow.'
    ]
  }
];

export const ASTEROIDS_AND_COMETS: CelestialObject[] = [
  {
    id: 'vesta',
    name: '4 Vesta',
    category: 'asteroid',
    hierarchyLevel: 'asteroid_comet',
    parentObjectId: 'sun',
    tagline: 'The Differentiated Rocky Protoplanet',
    color: '#B5A895',
    overview: 'Vesta is the second most massive asteroid in the main belt, an intact protoplanet from the solar system’s dawn with a metallic core, basaltic crust, and massive south polar impact craters (Rheasilvia).',
    scientificData: {
      diameterKm: '525 km',
      distanceFromSunAU: '2.36 AU',
      gravityMps2: '0.25 m/s²'
    },
    interestingFacts: [
      'Roughly 5% of all meteorites recovered on Earth originate from debris blasted off Vesta during ancient collisions (HED meteorites).'
    ]
  },
  {
    id: 'halley_comet',
    name: "1P/Halley (Halley's Comet)",
    category: 'comet',
    hierarchyLevel: 'asteroid_comet',
    parentObjectId: 'sun',
    tagline: 'The Historic Periodic Cosmic Wanderer',
    color: '#85C1E9',
    overview: 'Halley’s Comet is the most famous periodic comet, returning to the inner solar system every 75 to 76 years. Its nucleus is an icy conglomerate of water, carbon monoxide, methane, and dark organic refractory dust.',
    scientificData: {
      diameterKm: '15 x 8 km (Nucleus)',
      distanceFromSunAU: '0.59 to 35.1 AU',
      revolutionPeriodDays: '75.3 years'
    },
    interestingFacts: [
      'Giotto spacecraft (1986) flew within 596 km of Halley’s nucleus, capturing the first direct images of active comet gas jets.',
      'Debris shed by Halley creates two annual meteor showers on Earth: the Eta Aquariids (May) and Orionids (October).'
    ]
  }
];

// ============================================================
// 4. NATURAL SATELLITES & MOONS
// ============================================================
export const MOONS_DATA: CelestialObject[] = [
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'earth',
    tagline: 'Earth’s Faithful Celestial Guardian',
    color: '#E0E0E0',
    overview: 'Earth’s only natural satellite was born 4.5 billion years ago when a Mars-sized protoplanet (Theia) collided with proto-Earth. It stabilizes Earth’s axial tilt, preventing extreme climate swings, and drives oceanic tidal cycles.',
    scientificData: {
      diameterKm: '3,474 km',
      distanceFromSunAU: '1.00 AU',
      distanceFromEarthLy: '384,400 km',
      gravityMps2: '1.62 m/s² (1/6th Earth)',
      avgTempC: '-130°C to 120°C',
      rotationPeriodHours: '655.7 hours (27.3 Earth days, Tidally Locked)',
      revolutionPeriodDays: '27.3 days',
      knownMoonsCount: 0,
      parentPlanet: 'Earth'
    },
    interestingFacts: [
      'The Moon is tidally locked to Earth; we always see the same lunar face from Earth.',
      'Between 1969 and 1972, twelve human astronauts walked on the lunar surface during NASA’s Apollo program.'
    ]
  },
  {
    id: 'europa',
    name: 'Europa',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'jupiter',
    tagline: 'The Ice-Crusted Ocean World of Potential Life',
    color: '#D9C8B4',
    overview: 'One of the four Galilean moons of Jupiter, Europa is encased in a 15-25 km thick water-ice shell fractured by red tectonic lineae. Beneath this frozen crust lies a global liquid saltwater ocean containing more water than all of Earth’s oceans combined.',
    scientificData: {
      diameterKm: '3,121 km',
      distanceFromSunAU: '5.20 AU',
      gravityMps2: '1.315 m/s²',
      avgTempC: '-160°C to -220°C',
      revolutionPeriodDays: '3.55 Earth days',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'Europa’s subsurface ocean is kept warm and liquid by gravitational tidal flexing caused by resonance with Io and Ganymede.',
      'NASA launched the Europa Clipper mission in 2024 to determine if conditions in its ocean could support microbial life.'
    ]
  },
  {
    id: 'titan',
    name: 'Titan',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'saturn',
    tagline: 'The Methane Rain & Liquid Hydrocarbon World',
    color: '#E5A65D',
    overview: 'Titan is Saturn’s largest moon and the only moon in the solar system with a dense atmosphere (1.5 atmospheres of pressure). It hosts a complete hydrological cycle of methane and ethane clouds, rain, rivers, and seas (Kraken Mare).',
    scientificData: {
      diameterKm: '5,150 km (Larger than Mercury)',
      distanceFromSunAU: '9.58 AU',
      gravityMps2: '1.35 m/s²',
      avgTempC: '-179°C (-290°F)',
      revolutionPeriodDays: '15.95 Earth days',
      atmosphereComposition: ['Nitrogen 95%', 'Methane 4.9%', 'Hydrogen 0.1%'],
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'In 2005, ESA’s Huygens probe descended through Titan’s golden orange smog and touched down on pebble-strewn water-ice shores.',
      'NASA’s Dragonfly rotorcraft mission will fly across Titan’s organic sand dunes in the 2030s.'
    ]
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'saturn',
    tagline: 'The Geyser Moon with Hydrothermal Vents',
    color: '#FFFFFF',
    overview: 'Enceladus is a small, brilliant white moon of Saturn with the highest albedo in the solar system. Over 100 cryovolcanic geysers at its south pole blast plumes of water vapor, organic molecules, and silica grains directly into space from a global subsurface ocean.',
    scientificData: {
      diameterKm: '504 km',
      distanceFromSunAU: '9.58 AU',
      gravityMps2: '0.113 m/s²',
      avgTempC: '-198°C',
      revolutionPeriodDays: '1.37 Earth days',
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'Cassini flew directly through Enceladus’ plumes, detecting molecular hydrogen (H2), methane, and complex organics—indicative of alkaline hydrothermal vents like those where life began on Earth.',
      'Plumes from Enceladus constantly replenish Saturn’s diffuse E ring.'
    ]
  },
  {
    id: 'io',
    name: 'Io',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'jupiter',
    tagline: 'The Volcanic Hellscape of Jupiter',
    color: '#F4D03F',
    overview: 'Io is the most volcanically active body in the solar system, boasting over 400 active volcanoes. Continuous tidal heating from Jupiter and neighboring moons generates subterranean tides that flex Io’s rock up and down by 100 meters daily.',
    scientificData: {
      diameterKm: '3,643 km',
      distanceFromSunAU: '5.20 AU',
      gravityMps2: '1.796 m/s²',
      avgTempC: '-130°C (Volcanic hotspots up to 1,300°C)',
      revolutionPeriodDays: '1.77 Earth days',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'Lava fountains on Io shoot sulfur dioxide plumes over 500 kilometers high into space.',
      'Its surface has no impact craters because fresh volcanic basalt and sulfur lava continuously repave the moon.'
    ]
  },
  {
    id: 'triton',
    name: 'Triton',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'neptune',
    tagline: 'The Captured Retrograde Cryogenic Moon',
    color: '#A9DFBF',
    overview: 'Triton is Neptune’s largest moon and the only large moon in the solar system orbiting retrograde (backwards). Likely a captured dwarf planet from the Kuiper Belt, it boasts active nitrogen geysers and a cantaloupe-patterned terrain.',
    scientificData: {
      diameterKm: '2,706 km',
      distanceFromSunAU: '30.05 AU',
      gravityMps2: '0.779 m/s²',
      avgTempC: '-235°C (38 Kelvin)',
      revolutionPeriodDays: '-5.88 Earth days (Retrograde)',
      parentPlanet: 'Neptune'
    },
    interestingFacts: [
      'Triton is slowly spiraling toward Neptune due to tidal friction; in ~3.6 billion years it will cross Neptune’s Roche limit and shatter into a massive ring system.'
    ]
  }
];

// ============================================================
// 5. EXOPLANETS & ALIEN WORLDS
// ============================================================
export const EXOPLANETS_DATA: CelestialObject[] = [
  {
    id: 'proxima_b',
    name: 'Proxima Centauri b',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    parentObjectId: 'proxima_centauri',
    tagline: 'Our Nearest Earth-Sized Interstellar Neighbor',
    color: '#82CCDD',
    overview: 'Proxima b orbits inside the habitable zone of Proxima Centauri, our closest stellar neighbor just 4.24 light-years away. With a minimum mass of 1.07 Earths, it receives 65% of Earth’s solar flux, but endures intense stellar flares.',
    scientificData: {
      diameterKm: '~13,000 km (estimated)',
      distanceFromEarthLy: '4.244 light-years',
      gravityMps2: '10.5 m/s²',
      revolutionPeriodDays: '11.2 Earth days',
      hostStar: 'Proxima Centauri (M-dwarf)',
      discoveryYear: 2016,
      discoveryMethod: 'Radial Velocity (HARPS spectrometer)'
    },
    interestingFacts: [
      'At current chemical rocket speeds (approx 56,000 km/h), reaching Proxima b would take ~80,000 years.',
      'It is likely tidally locked, having a permanent daylight hemisphere and a perpetual frozen night hemisphere.'
    ]
  },
  {
    id: 'trappist_1e',
    name: 'TRAPPIST-1e',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    parentObjectId: 'trappist_1',
    tagline: 'The Prime Candidate for Extraterrestrial Oceans',
    color: '#48DBFB',
    overview: 'TRAPPIST-1e is one of seven Earth-sized worlds orbiting an ultra-cool red dwarf star 39 light-years away. Among all known rocky exoplanets, it has an Earth Similarity Index of 0.85, consistent with an iron-rich core and liquid water oceans.',
    scientificData: {
      diameterKm: '11,720 km (0.92 Earth radii)',
      distanceFromEarthLy: '39.46 light-years',
      gravityMps2: '9.12 m/s²',
      avgTempC: '-22°C (Equilibrium)',
      revolutionPeriodDays: '6.1 days',
      hostStar: 'TRAPPIST-1',
      discoveryYear: 2017,
      discoveryMethod: 'Transit Photometry (Spitzer / Trappist)'
    },
    interestingFacts: [
      'All seven planets of the TRAPPIST-1 system orbit within a distance smaller than Mercury’s distance from the Sun.',
      'From the surface of TRAPPIST-1e, sister planets appear several times larger in the sky than the Moon appears from Earth.'
    ]
  },
  {
    id: 'kepler_186f',
    name: 'Kepler-186f',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    tagline: 'The First Earth-Size Planet in a Habitable Zone',
    color: '#1DD1A1',
    overview: 'Discovered by NASA’s Kepler Space Telescope in 2014, Kepler-186f was the first validated Earth-sized exoplanet orbiting within the habitable zone of its host star where liquid water could pool.',
    scientificData: {
      diameterKm: '14,900 km (1.17 Earth radii)',
      distanceFromEarthLy: '582 light-years',
      revolutionPeriodDays: '129.9 Earth days',
      hostStar: 'Kepler-186 (M-type dwarf)',
      discoveryYear: 2014
    },
    interestingFacts: [
      'High noon on Kepler-186f appears only as bright as an hour before sunset on Earth because its star emits primarily infrared energy.'
    ]
  }
];

// ============================================================
// 6. STARS, STAR SYSTEMS & CONSTELLATIONS
// ============================================================
export const STARS_DATA: CelestialObject[] = [
  {
    id: 'sun',
    name: 'The Sun (Sol)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Heart of the Solar System',
    color: '#F5A623',
    overview: 'A G-type main-sequence star (Yellow Dwarf) containing 99.86% of all mass in our solar system. In its core, gravity and 15-million-degree temperatures fuse 600 million tons of hydrogen into helium every second via the proton-proton chain.',
    scientificData: {
      diameterKm: '1,392,700 km (109 Earths)',
      distanceFromEarthLy: '8.3 light-minutes (149.6M km)',
      avgTempC: '5,500°C (Surface), 15,000,000°C (Core)',
      rotationPeriodHours: '600 hours (25 days at equator)',
      spectralType: 'G2V Main Sequence'
    },
    interestingFacts: [
      'Energy generated in the core takes between 10,000 and 170,000 years to reach the surface through radiative diffusion.',
      'Every second, the Sun converts 4.26 million tons of matter directly into radiant electromagnetic energy according to E=mc².'
    ]
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse (Alpha Orionis)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Pulsating Red Supergiant on the Brink of Supernova',
    color: '#FF5722',
    overview: 'A colossal red supergiant star marking the right shoulder of the Orion constellation. If placed at the center of our solar system, its pulsating surface would engulf Mercury, Venus, Earth, Mars, and Jupiter.',
    scientificData: {
      diameterKm: '1.2 billion km (~900 Solar Radii)',
      distanceFromEarthLy: '642.5 light-years',
      avgTempC: '3,500 Kelvin',
      spectralType: 'M1-2 Ia-ab Red Supergiant',
      massSolarMasses: '16.5 to 19 M☉',
      constellation: 'Orion'
    },
    interestingFacts: [
      'Betelgeuse has exhausted its core hydrogen and is fusing heavier elements; it will end its life in a Type II core-collapse supernova within 100,000 years.',
      'When it explodes, it will shine as bright as the Full Moon in Earth’s night sky for over three months.'
    ]
  },
  {
    id: 'sirius',
    name: 'Sirius A & B (The Dog Star)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Brightest Star in Earth’s Night Sky',
    color: '#E0F7FA',
    overview: 'Sirius appears twice as bright as any other star in Earth’s sky. It is actually a binary system consisting of Sirius A (a luminous A-type main-sequence star) and Sirius B (a dense, Earth-sized White Dwarf star).',
    scientificData: {
      diameterKm: '2.4 million km (1.71 Solar Radii)',
      distanceFromEarthLy: '8.611 light-years',
      avgTempC: '9,940 Kelvin',
      spectralType: 'A1V (Sirius A) + DA2 (Sirius B)',
      constellation: 'Canis Major'
    },
    interestingFacts: [
      'Sirius B was the first White Dwarf star ever discovered, having packed the entire mass of the Sun into an Earth-sized sphere.',
      'Sirius is gradually moving closer to the Solar System and will continue brightening for the next 60,000 years.'
    ]
  },
  {
    id: 'alpha_centauri_system',
    name: 'Alpha Centauri Triple System',
    category: 'star_system',
    hierarchyLevel: 'star_system',
    parentObjectId: 'milky_way',
    tagline: 'The Closest Stellar System to the Sun',
    color: '#F4D03F',
    overview: 'A gravitationally bound triple star system consisting of Alpha Centauri A (G2V, like our Sun), Alpha Centauri B (K1V, orange dwarf), and Proxima Centauri (M5.5V red dwarf, our nearest neighbor at 4.24 ly).',
    scientificData: {
      distanceFromEarthLy: '4.367 light-years',
      constellation: 'Centaurus'
    },
    interestingFacts: [
      'Alpha Centauri A and B orbit each other with an orbital period of 79.9 years at an average distance comparable to Uranus from the Sun.'
    ]
  },
  {
    id: 'orion_constellation',
    name: 'Orion (The Hunter)',
    category: 'constellation',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Prominent Equatorial Constellation',
    color: '#61E6F2',
    overview: 'Orion is one of the most recognizable constellations in the celestial sphere, located on the celestial equator. It contains two of the ten brightest stars in the sky: Rigel (Beta Orionis) and Betelgeuse (Alpha Orionis).',
    scientificData: {
      constellation: 'Orion'
    },
    interestingFacts: [
      'The Belt of Orion consists of three prominent bright supergiant stars: Alnitak, Alnilam, and Mintaka.'
    ]
  }
];

// ============================================================
// 7. NEBULAE & STELLAR NURSERIES
// ============================================================
export const NEBULAE_DATA: CelestialObject[] = [
  {
    id: 'orion_nebula',
    name: 'The Great Orion Nebula (M42)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Nearest Massive Stellar Nursery',
    color: '#E056FD',
    overview: 'M42 is a vast diffuse emission and reflection nebula visible to the unaided eye in Orion’s sword. Within its glowing gaseous tendrils, hundreds of young proto-stars and protoplanetary discs are currently condensing from interstellar gas.',
    scientificData: {
      diameterKm: '24 light-years across',
      distanceFromEarthLy: '1,344 light-years',
      constellation: 'Orion'
    },
    interestingFacts: [
      'The Trapezium cluster of massive young O- and B-type stars at its heart produces intense ultraviolet radiation that ionizes the entire nebula.',
      'Hubble Space Telescope discovered over 150 protoplanetary discs (proplyds) inside M42—solar systems in embryonic gestation.'
    ]
  },
  {
    id: 'pillars_of_creation',
    name: 'Pillars of Creation (Eagle Nebula / M16)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'Towers of Cosmic Gas & Starbirth',
    color: '#00CEC9',
    overview: 'Immense elephant trunks of interstellar hydrogen gas and microscopic dust in the Eagle Nebula, photographed in breathtaking detail by Hubble and JWST. The tallest pillar stands approximately 4 to 5 light-years tall.',
    scientificData: {
      diameterKm: '4 to 5 light-years tall',
      distanceFromEarthLy: '6,500 light-years',
      constellation: 'Serpens'
    },
    interestingFacts: [
      'Ultraviolet photoevaporation from nearby hot young stars is gradually carving away the pillars, which will dissipate in ~3 million years.'
    ]
  },
  {
    id: 'carina_nebula',
    name: 'Carina Nebula (NGC 3372)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Titan Stellar Incubator of the South',
    color: '#FF7675',
    overview: 'One of the largest and brightest diffuse nebulae in the night sky, four times larger than Orion. It contains several open star clusters and the hypermassive, unstable binary star Eta Carinae.',
    scientificData: {
      diameterKm: '460 light-years across',
      distanceFromEarthLy: '8,500 light-years',
      constellation: 'Carina'
    },
    interestingFacts: [
      'Eta Carinae is a luminous blue variable star with 100 to 150 solar masses that emitted the Great Eruption in 1843, creating the Homunculus Nebula.'
    ]
  },
  {
    id: 'crab_nebula',
    name: 'Crab Nebula (M1 / NGC 1952)',
    category: 'supernova',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Relic Shrapnel of a Recorded Supernova',
    color: '#FAB1A0',
    overview: 'The expanding supernova remnant and pulsar wind nebula left behind when a massive star exploded in 1054 CE. Chinese, Japanese, and Arab astronomers documented the "guest star," which remained visible in broad daylight for 23 days.',
    scientificData: {
      diameterKm: '11 light-years across',
      distanceFromEarthLy: '6,500 light-years',
      revolutionPeriodDays: 'Spinning at 30.2 times per second (Crab Pulsar)',
      constellation: 'Taurus'
    },
    interestingFacts: [
      'At its center spins the Crab Pulsar (a 28-km neutron star) blasting beams of synchroton radiation and gamma rays across the cosmos.'
    ]
  }
];

// ============================================================
// 8. GALAXIES, GROUPS, CLUSTERS & SUPERCLUSTERS
// ============================================================
export const GALAXIES_DATA: CelestialObject[] = [
  {
    id: 'milky_way',
    name: 'The Milky Way Galaxy',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'local_group',
    tagline: 'Our Home Island Universe of 200 Billion Stars',
    color: '#8766FF',
    overview: 'A barred spiral galaxy (SBbc) spanning over 100,000 light-years. Our Solar System resides in the Orion-Cygnus Arm, orbiting the galactic core every 230 million years at 828,000 km/h.',
    scientificData: {
      diameterKm: '100,000 light-years across',
      distanceFromEarthLy: '0 ly (Inside)',
      massSolarMasses: '1.5 trillion M☉ (including dark matter halo)',
      constellation: 'Sagittarius (Galactic Center)'
    },
    interestingFacts: [
      'The Milky Way contains between 100 and 400 billion stars and at least 100 billion planets.',
      'In roughly 4.5 billion years, the Milky Way and Andromeda galaxies will collide and merge into a giant elliptical galaxy (Milkomeda).'
    ]
  },
  {
    id: 'andromeda_galaxy',
    name: 'Andromeda Galaxy (M31)',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'local_group',
    tagline: 'The Great Spiral Sister of the Local Group',
    color: '#61E6F2',
    overview: 'The largest galaxy in our Local Group, spanning 220,000 light-years and containing approximately 1 trillion stars. It is the most distant object visible to the naked human eye under dark skies.',
    scientificData: {
      diameterKm: '220,000 light-years across',
      distanceFromEarthLy: '2.537 million light-years',
      galaxyType: 'Barred Spiral (SA(s)b)',
      constellation: 'Andromeda'
    },
    interestingFacts: [
      'Andromeda is hurtling toward our Milky Way at 110 kilometers per second (400,000 km/h).'
    ]
  },
  {
    id: 'local_group',
    name: 'The Local Group',
    category: 'galaxy_group',
    hierarchyLevel: 'galaxy_group',
    parentObjectId: 'virgo_cluster',
    tagline: 'Our Local Neighborhood of Galaxies',
    color: '#3984FF',
    overview: 'The gravitationally bound cluster of galaxies that includes the Milky Way, Andromeda, Triangulum, and over 80 dwarf galaxies across 10 million light-years.',
    scientificData: {
      diameterKm: '10 million light-years across',
      distanceFromEarthLy: '0 ly (Inside)'
    },
    interestingFacts: [
      'The barycenter of the Local Group lies somewhere between the Milky Way and Andromeda.'
    ]
  },
  {
    id: 'virgo_cluster',
    name: 'Virgo Galaxy Cluster',
    category: 'galaxy_cluster',
    hierarchyLevel: 'galaxy_cluster',
    parentObjectId: 'laniakea_supercluster',
    tagline: 'The Gravitational Anchor of our Galactic Neighborhood',
    color: '#9B59B6',
    overview: 'A massive cluster of approximately 1,500 to 2,000 galaxies centered in the constellation Virgo. It forms the heart of the Virgo Supercluster, gravitationally attracting the Local Group.',
    scientificData: {
      diameterKm: '15 million light-years across',
      distanceFromEarthLy: '53.8 million light-years'
    },
    interestingFacts: [
      'Houses the giant elliptical galaxy M87 at its gravitational core.'
    ]
  },
  {
    id: 'laniakea_supercluster',
    name: 'Laniakea Supercluster',
    category: 'supercluster',
    hierarchyLevel: 'supercluster',
    parentObjectId: 'observable_universe',
    tagline: 'The Immense Heaven of 100,000 Galaxies',
    color: '#8E44AD',
    overview: 'Laniakea (Hawaiian for "immense heaven") is the galaxy supercluster that contains the Milky Way and 100,000 other nearby galaxies, all flowing along gravitational watersheds toward the Great Attractor.',
    scientificData: {
      diameterKm: '520 million light-years across',
      distanceFromEarthLy: '0 ly (Inside)',
      massSolarMasses: '10^17 M☉'
    },
    interestingFacts: [
      'Laniakea was discovered in 2014 by mapping the peculiar radial velocities of thousands of galaxies.'
    ]
  }
];

// ============================================================
// 9. EXTREME COSMIC PHENOMENA & COSMOLOGY
// ============================================================
export const EXTREME_PHENOMENA: CelestialObject[] = [
  {
    id: 'sagittarius_a',
    name: 'Sagittarius A* (Sgr A*)',
    category: 'black_hole',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'milky_way',
    tagline: 'The Gravitational Engine of the Milky Way',
    color: '#FD79A8',
    overview: 'Sagittarius A* is the supermassive black hole anchoring the galactic center of the Milky Way. With a mass 4.3 million times that of our Sun, its immense gravity governs the relativistic orbits of nearby S-stars.',
    scientificData: {
      diameterKm: '44 million km (Schwarzschild radius ~12M km)',
      distanceFromEarthLy: '26,673 light-years',
      massSolarMasses: '4.297 million M☉',
      constellation: 'Sagittarius'
    },
    interestingFacts: [
      'In May 2022, the Event Horizon Telescope (EHT) unveiled the historic first radio silhouette of Sagittarius A*’s glowing accretion ring.'
    ]
  },
  {
    id: 'm87_black_hole',
    name: 'M87* Supermassive Black Hole',
    category: 'black_hole',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'virgo_cluster',
    tagline: 'The First Directly Imaged Black Hole in History',
    color: '#FF6B6B',
    overview: 'Located at the center of giant elliptical galaxy Messier 87, this monster black hole holds a staggering 6.5 billion times the mass of the Sun. In 2019, it became the first black hole directly imaged by humanity.',
    scientificData: {
      diameterKm: '38 billion km (Event horizon)',
      distanceFromEarthLy: '53.5 million light-years',
      massSolarMasses: '6.5 billion M☉',
      constellation: 'Virgo'
    },
    interestingFacts: [
      'Its event horizon shadow is larger than the entire Solar System out past the orbit of Pluto.'
    ]
  },
  {
    id: 'magnetar_sgr1806',
    name: 'Magnetar SGR 1806-20',
    category: 'magnetar',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'milky_way',
    tagline: 'The Most Powerful Magnetic Entity in the Cosmos',
    color: '#61E6F2',
    overview: 'A magnetar is an extreme neutron star with a magnetic field up to 100 billion Tesla—a quadrillion times stronger than Earth’s. A starquake on SGR 1806-20 in 2004 released more energy in 0.1s than the Sun emits in 150,000 years.',
    scientificData: {
      diameterKm: '20 km across',
      distanceFromEarthLy: '50,000 light-years',
      constellation: 'Sagittarius'
    },
    interestingFacts: [
      'At 1,000 km from a magnetar, its magnetic field would dissolve your body’s atomic electron clouds into needle-like cylinders.'
    ]
  },
  {
    id: 'vela_pulsar',
    name: 'Vela Pulsar (PSR J0835-4510)',
    category: 'pulsar',
    hierarchyLevel: 'extreme_phenomenon',
    tagline: 'The Ultra-Dense Cosmic Radio Lighthouse',
    color: '#00E676',
    overview: 'A rapidly spinning neutron star formed in a supernova explosion 11,000 years ago. It rotates 11.195 times every second, sweeping focused beams of radio, X-ray, and gamma-ray radiation across Earth like a cosmic lighthouse.',
    scientificData: {
      diameterKm: '20 km across',
      distanceFromEarthLy: '936 light-years',
      constellation: 'Vela'
    },
    interestingFacts: [
      'A single teaspoon of neutron star material would weigh approximately 5 billion metric tons on Earth.'
    ]
  },
  {
    id: 'quasar_3c273',
    name: 'Quasar 3C 273',
    category: 'quasar',
    hierarchyLevel: 'extreme_phenomenon',
    tagline: 'The First Identified Active Galactic Nucleus',
    color: '#FFD700',
    overview: 'The first quasar ever identified (in 1963 by Maarten Schmidt). Powered by a supermassive black hole consuming hundreds of solar masses of gas annually, it shines 4 trillion times brighter than our entire Sun.',
    scientificData: {
      distanceFromEarthLy: '2.44 billion light-years',
      redshiftZ: '0.158',
      constellation: 'Virgo'
    },
    interestingFacts: [
      'If 3C 273 were placed at the distance of Pollux (33 light-years from Earth), it would shine as brightly in the sky as the Sun.'
    ]
  },
  {
    id: 'grb_221009a',
    name: 'GRB 221009A ("The BOAT")',
    category: 'gamma_ray_burst',
    hierarchyLevel: 'extreme_phenomenon',
    tagline: 'The Brightest of All Time Cosmic Detonation',
    color: '#FF1744',
    overview: 'Detected on October 9, 2022, this cataclysmic core-collapse supernova and newborn black hole launched the most energetic gamma-ray burst ever recorded, releasing photons exceeding 18 Tera-electronvolts.',
    scientificData: {
      distanceFromEarthLy: '2.4 billion light-years',
      constellation: 'Sagitta'
    },
    interestingFacts: [
      'Astronomers estimate an explosion of this magnitude occurs in our observable universe only once every 10,000 years.'
    ]
  },
  {
    id: 'gw150914',
    name: 'GW150914 Gravitational Wave Event',
    category: 'gravitational_wave',
    hierarchyLevel: 'extreme_phenomenon',
    tagline: 'The Historic First Detection of Spacetime Ripples',
    color: '#7C4DFF',
    overview: 'On September 14, 2015, the LIGO detectors observed ripples in spacetime caused by the inspiral and merger of two stellar-mass black holes (36 and 29 solar masses) 1.3 billion light-years away.',
    scientificData: {
      distanceFromEarthLy: '1.3 billion light-years',
      discoveryYear: 2015
    },
    interestingFacts: [
      'During the final fraction of a second of the merger, the event radiated more energy as gravitational waves than all the stars in the observable universe combined.'
    ]
  },
  {
    id: 'cosmic_microwave_background',
    name: 'Cosmic Microwave Background (CMB)',
    category: 'cosmic_microwave_background',
    hierarchyLevel: 'universe',
    tagline: 'The Relic Thermal Afterglow of the Big Bang',
    color: '#E17055',
    overview: 'The CMB is the cooled relic thermal radiation left over from the Big Bang. When the universe was 380,000 years old, neutral hydrogen atoms formed, allowing photons to stream freely across the cosmos for the first time.',
    scientificData: {
      avgTempC: '2.725 Kelvin (-270.425°C)',
      distanceFromEarthLy: '46.5 billion light-years (Observable Horizon)',
      discoveryYear: 1965
    },
    interestingFacts: [
      'Fluctuations in the CMB mapped by the Planck satellite represent the primordial quantum fluctuations that seeded all cosmic structure.'
    ]
  },
  {
    id: 'cosmic_web',
    name: 'The Cosmic Web',
    category: 'cosmic_web',
    hierarchyLevel: 'universe',
    tagline: 'The Grand Filamentary Scaffolding of Spacetime',
    color: '#5352ED',
    overview: 'The largest coherent structure in the universe: an interconnected network of dark matter filaments and galaxy superclusters spanning billions of light-years, surrounding immense empty cosmic voids.',
    scientificData: {
      diameterKm: 'Tens of billions of light-years'
    },
    interestingFacts: [
      'The cosmic web looks remarkably similar to neural networks in biological brains, demonstrating mathematical scale invariance in complex networks.'
    ]
  },
  {
    id: 'dark_matter_halo',
    name: 'Dark Matter Halos',
    category: 'dark_matter',
    hierarchyLevel: 'universe',
    tagline: 'The Invisible 27% Gravitational Glue of Galaxies',
    color: '#2F3542',
    overview: 'Non-baryonic, non-luminous matter that does not interact with electromagnetic radiation. Discovered through galaxy rotation curves (Vera Rubin) and gravitational lensing, it provides the gravitational scaffolding that prevents galaxies from flying apart.',
    scientificData: {
      massSolarMasses: '~85% of total cosmic matter'
    },
    interestingFacts: [
      'Without dark matter, the early universe could not have formed stars and galaxies within the 13.8-billion-year cosmic age.'
    ]
  },
  {
    id: 'dark_energy_field',
    name: 'Dark Energy & Cosmological Constant',
    category: 'dark_energy',
    hierarchyLevel: 'universe',
    tagline: 'The Repulsive Pressure Accelerating Universal Expansion',
    color: '#70A1FF',
    overview: 'A mysterious negative-pressure energy permeating all space, comprising 68% of the universe’s total energy density. Discovered in 1998 via Type Ia supernovae, it causes the expansion of spacetime to accelerate continuously.',
    scientificData: {
      massSolarMasses: '68% of total universe energy density'
    },
    interestingFacts: [
      'The 2011 Nobel Prize in Physics was awarded for the discovery that cosmic expansion is accelerating due to Dark Energy.'
    ]
  },
  {
    id: 'observable_universe_horizon',
    name: 'The Observable Universe',
    category: 'observable_universe',
    hierarchyLevel: 'universe',
    tagline: 'The 93-Billion Light-Year Horizon of Human Knowledge',
    color: '#747D8C',
    overview: 'The spherical region of the universe comprising all matter and spacetime that can be observed from Earth at the present time, bounded by the cosmological event horizon 46.5 billion light-years in any direction.',
    scientificData: {
      diameterKm: '93 billion light-years (8.8 x 10^26 meters)',
      discoveryYear: '13.8 billion years old'
    },
    interestingFacts: [
      'Because space itself has been expanding since the Big Bang, objects whose light took 13.8 billion years to reach us are now 46.5 billion light-years away.'
    ]
  },
  {
    id: 'big_bang_singularity',
    name: 'The Big Bang & Cosmic Inflation',
    category: 'big_bang',
    hierarchyLevel: 'universe',
    tagline: 'The Birth of Spacetime and All Matter (13.8 Billion Years Ago)',
    color: '#FF6B81',
    overview: 'The prevailing cosmological model explaining how the universe expanded from an extremely hot, dense singularity 13.787 billion years ago, rapidly inflated, and cooled to forge the fundamental elements of existence.',
    scientificData: {
      discoveryYear: '13.787 ± 0.020 billion years ago'
    },
    interestingFacts: [
      'During Cosmic Inflation (10^-36 to 10^-32 seconds), the universe expanded faster than the speed of light, smoothing out spatial curvature.'
    ]
  }
];

// Master unified catalogue
export const ALL_CELESTIAL_OBJECTS: CelestialObject[] = [
  ROOT_SOLAR_SYSTEM,
  ...PLANETS_DATA,
  ...DWARF_PLANETS,
  ...ASTEROIDS_AND_COMETS,
  ...MOONS_DATA,
  ...EXOPLANETS_DATA,
  ...STARS_DATA,
  ...NEBULAE_DATA,
  ...GALAXIES_DATA,
  ...EXTREME_PHENOMENA
];
