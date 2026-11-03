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
      'BepiColombo (ESA/JAXA, launched 2018): En route to study gravitational dynamo and exosphere interaction in 2026.'
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
      'Earth’s axial tilt of 23.4° produces our annual cycle of seasons.'
    ],
    moons: ['moon']
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Red Planet of Ancient Cataclysms',
    color: '#E05638',
    overview: 'Mars is a cold desert world tinted red by iron oxide dust. While freeze-dried today, geologic records prove ancient Mars harbored warm freshwater lakes, rushing river deltas, and potentially a northern ocean.',
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
    structure: 'Metallic core of iron, nickel, and sulfur (approx 1,800 km radius), silicate mantle, and thick volcanic basaltic crust enriched in iron minerals.',
    atmosphere: 'Tenuous CO2 atmosphere (~0.6% Earth sea-level pressure) capable of hosting global dust storms that engulf the entire globe.',
    surfaceFeatures: 'Olympus Mons (the solar system’s tallest volcano at 22 km height), Valles Marineris canyon (4,000 km length), and polar dry-ice caps.',
    explorationHistory: [
      'Viking 1 & 2 (1976): First successful long-duration Mars landers.',
      'Curiosity (2012-present): Discovered ancient organic molecules and evidence of habitable fluvio-lacustrine environments in Gale Crater.',
      'Perseverance & Ingenuity (2021-present): First powered atmospheric flight on another world; caching core samples in Jezero Crater.'
    ],
    interestingFacts: [
      'Sunsets on Mars glow with an ethereal blue tint due to fine dust scattering long-wavelength red light.',
      'Olympus Mons is so vast that its base would cover the entire state of Arizona.',
      'Mars possesses two small captured asteroid moons: Phobos and Deimos.'
    ],
    moons: ['phobos', 'deimos']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Majestic Monarch of the Planets',
    color: '#D4A373',
    overview: 'Jupiter contains more than twice the mass of all other Solar System planets combined. A churning gas giant of hydrogen and helium, its atmospheric belts and centuries-old storm, the Great Red Spot, dominate planetary astronomy.',
    scientificData: {
      diameterKm: '139,820 km',
      distanceFromSunAU: '5.20 AU (778.5M km)',
      gravityMps2: '24.79 m/s²',
      avgTempC: '-110°C (cloud deck)',
      rotationPeriodHours: '9.93 hours (Fastest planetary spin)',
      revolutionPeriodDays: '4,333 Earth days (11.86 Earth years)',
      atmosphereComposition: ['Hydrogen 89.8%', 'Helium 10.2%', 'Methane 0.3%', 'Ammonia 0.026%'],
      knownMoonsCount: 95,
      parentPlanet: 'Sun'
    },
    structure: 'Outer gaseous envelope transitioning under immense pressure into an ocean of liquid metallic hydrogen, surrounding a dense heavy-element core.',
    atmosphere: 'Alternating eastward and westward jet streams producing vibrant light zones and dark belts with turbulent ammonia and water vapor vortexes.',
    surfaceFeatures: 'The Great Red Spot (an anticyclonic storm larger than Earth raging for over 350 years), polar geometric cyclones, and faint dust rings.',
    explorationHistory: [
      'Voyager 1 & 2 (1979): Discovered Jupiter’s rings and active sulfur volcanism on Io.',
      'Galileo (1995-2003): Released atmospheric probe into the clouds and discovered evidence of Europa’s subsurface ocean.',
      'Juno (2016-present): Investigating core mass distribution, intense polar auroras, and deep water abundance.'
    ],
    interestingFacts: [
      'Jupiter’s magnetic field is the largest structure in the Solar System; if visible from Earth, it would appear larger than the full Moon.',
      'Its rapid 9.9-hour rotation causes significant oblateness—its equatorial diameter is 9,275 km wider than its polar diameter.',
      'It acts as a gravitational shield, deflecting or capturing comets like Shoemaker-Levy 9 that could otherwise threaten inner planets.'
    ],
    moons: ['io', 'europa', 'ganymede', 'callisto']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Ringed Jewel of the Solar System',
    color: '#E0C588',
    overview: 'Saturn is encircled by an awe-inspiring ring system spanning 282,000 kilometers yet measuring as thin as 10 to 30 meters. Composed of 99% pure water ice particles, it is the only planet with a density lower than liquid water.',
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
    structure: 'Liquid hydrogen/helium mantle over liquid metallic hydrogen layer surrounding a rocky/icy core with a mass 9 to 22 times Earth.',
    atmosphere: 'Muted pale yellow bands with equatorial jet streams reaching 1,800 km/h; features a permanent geometric hexagonal jet stream at its north pole.',
    surfaceFeatures: 'The Ring System (Main Rings A, B, C and Cassini Division), North Polar Hexagon (30,000 km wide wave pattern).',
    explorationHistory: [
      'Pioneer 11 & Voyagers (1979-1981): Discovered thousands of intricate ringlets and shepherd moons Prometheus and Pandora.',
      'Cassini-Huygens (2004-2017): Landed the Huygens probe on Titan; discovered hydrothermal geysers erupting from Enceladus.',
      'Cassini Grand Finale (2017): Dove 22 times between the rings and clouds before intentionally vaporizing in the atmosphere.'
    ],
    interestingFacts: [
      'With an average density of 0.687 g/cm³, Saturn would float if placed in an unimaginably vast ocean of water.',
      'The North Polar Hexagon is a persistent atmospheric Rossby wave pattern rotating at the same speed as Saturn’s radio emissions.',
      'Saturn possesses 146 confirmed moons, the most of any planet in the Solar System.'
    ],
    moons: ['titan', 'enceladus', 'mimas']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Tilted Cyan Ice Realm',
    color: '#7AC5CD',
    overview: 'Uranus is an ice giant with a dramatic 98-degree axial tilt, causing it to orbit the Sun spinning virtually on its side. Its pale cyan-blue tint arises from atmospheric methane absorbing red photons.',
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
    structure: 'Dense slushy mantle of water, ammonia, and methane ices under extreme thermodynamic conditions, surrounding a small silicate-iron core.',
    atmosphere: 'The coldest planetary atmosphere in the Solar System with diamond-ice precipitation models and faint dark ringlets.',
    surfaceFeatures: 'Thirteen faint planetary rings and a severely lopsided magnetic field tilted 59 degrees from its rotational axis.',
    explorationHistory: [
      'William Herschel (1781): First planet discovered in recorded history using a telescope.',
      'Voyager 2 (1986): Only spacecraft to conduct a close flyby, discovering 10 new moons and 2 new rings.'
    ],
    interestingFacts: [
      'Because of its 98° tilt, each pole experiences 42 years of continuous direct sunlight followed by 42 years of dark winter.',
      'Unlike other giant planets, Uranus radiates virtually no internal heat into space beyond what it absorbs from the distant Sun.',
      'Its magnetic field is displaced from the planet’s physical center by a third of the planetary radius.'
    ],
    moons: ['miranda', 'titania', 'oberon']
  },
  {
    id: 'neptune',
    name: 'Neptune',
    category: 'planet',
    hierarchyLevel: 'planet',
    parentObjectId: 'sun',
    tagline: 'The Supersonic Azure Ice Giant',
    color: '#4973FF',
    overview: 'Neptune is the most distant major planet in the Solar System. An ice giant of intense lapis lazuli blue, it endures supersonic storms where winds whip faster than the speed of sound.',
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
    structure: 'Hot supercritical fluid mantle of water, methane, and ammonia ices enveloped over a rocky terrestrial-mass core.',
    atmosphere: 'Dynamic atmosphere with bright white cirrus clouds of methane ice crystals and supersonic storms exceeding 2,100 km/h (Mach 1.7).',
    surfaceFeatures: 'The Great Dark Spot (an Earth-sized anti-cyclonic storm system), five faint rings, and active ring arcs.',
    explorationHistory: [
      'Le Verrier & Galle (1846): Located purely by mathematical prediction of orbital perturbations in Uranus’ trajectory.',
      'Voyager 2 (1989): Historic flyby capturing cloud dynamics, ring arcs, and active nitrogen geysers on moon Triton.'
    ],
    interestingFacts: [
      'Neptune has completed only one full orbit since its mathematical discovery in 1846 (achieved in 2011).',
      'Its largest moon, Triton, orbits backward (retrograde) and is a captured Kuiper Belt dwarf planet.',
      'Neptune generates 2.6 times more internal heat than it receives from solar radiation.'
    ],
    moons: ['triton']
  }
];

// ============================================================
// 2. DWARF PLANETS & ASTEROIDS
// ============================================================
export const DWARF_PLANETS: CelestialObject[] = [
  {
    id: 'pluto',
    name: 'Pluto (134340 Pluto)',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'The Heart of the Kuiper Belt',
    color: '#D2B48C',
    overview: 'Pluto is the king of the Kuiper Belt. Far from a dead frozen rock, New Horizons revealed a world of nitrogen glaciers, towering water-ice mountain ranges, and active cryo-geology.',
    scientificData: {
      diameterKm: '2,376 km',
      distanceFromSunAU: '39.48 AU (5.9B km)',
      gravityMps2: '0.62 m/s²',
      avgTempC: '-230°C',
      revolutionPeriodDays: '90,560 Earth days (248 years)',
      atmosphereComposition: ['Nitrogen 99%', 'Methane 0.5%', 'Carbon Monoxide 0.05%'],
      knownMoonsCount: 5,
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Sputnik Planitia is an enormous 1,000-km glacier of convective nitrogen ice shaped like a glowing heart.',
      'Pluto and its largest moon Charon are tidally locked mutually; they orbit a common barycenter situated above Pluto’s surface.',
      'Towering mountains of pure water ice rise 3.5 kilometers high into its tenuous blue-tinted atmosphere.'
    ]
  },
  {
    id: 'ceres',
    name: 'Ceres (1 Ceres)',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'The Queen of the Asteroid Belt',
    color: '#8C8C8C',
    overview: 'Ceres is the largest object in the Main Asteroid Belt between Mars and Jupiter, comprising a third of the belt’s total mass. NASA Dawn confirmed it is a relic ocean world rich in water ice and sodium carbonate salts.',
    scientificData: {
      diameterKm: '939 km',
      distanceFromSunAU: '2.77 AU (414M km)',
      gravityMps2: '0.27 m/s²',
      avgTempC: '-105°C',
      revolutionPeriodDays: '1,682 Earth days (4.6 years)',
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Occator Crater contains brilliant reflective salt domes (Cerealia Facula) left behind by subterranean brine eruptions.',
      'Ceres contains more water ice by volume than all the freshwater on Earth combined.',
      'It is the only dwarf planet located inside the inner Solar System.'
    ]
  },
  {
    id: 'eris',
    name: 'Eris (136199 Eris)',
    category: 'dwarf_planet',
    hierarchyLevel: 'dwarf_planet',
    parentObjectId: 'sun',
    tagline: 'The Trans-Neptunian Titan',
    color: '#E0E0E0',
    overview: 'Eris is one of the most massive dwarf planets in the scattered disc. Its discovery in 2005 prompted the International Astronomical Union (IAU) to officially define the term "planet".',
    scientificData: {
      diameterKm: '2,326 km',
      distanceFromSunAU: '67.7 AU (10.1B km)',
      avgTempC: '-243°C',
      revolutionPeriodDays: '203,830 Earth days (558 years)',
      parentPlanet: 'Sun'
    },
    interestingFacts: [
      'Eris is 27% more massive than Pluto, despite being slightly smaller in diameter.',
      'Its surface has an albedo of 0.96, reflecting nearly all sunlight due to a pristine coat of frozen methane glaze.'
    ]
  }
];

// ============================================================
// 3. SCIENTIFICALLY CRITICAL MOONS
// ============================================================
export const MOONS_DATA: CelestialObject[] = [
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'earth',
    tagline: 'Earth’s Ancient Celestial Anchor',
    color: '#C4C4C4',
    overview: 'Earth’s only natural satellite was forged 4.5 billion years ago in the Giant Impact Hypothesis (Theia collision). It stabilizes Earth’s orbital precession, produces ocean tides, and preserves craters from the Late Heavy Bombardment.',
    scientificData: {
      diameterKm: '3,474 km',
      distanceFromEarthLy: '384,400 km',
      gravityMps2: '1.62 m/s²',
      avgTempC: '-130°C to 120°C',
      parentPlanet: 'Earth'
    },
    interestingFacts: [
      'The Moon is in synchronous rotation: the same lunar face permanently points toward Earth.',
      'Apollo astronauts left laser retroreflector arrays on the surface that still measure lunar recession (~3.8 cm per year) to millimeter precision.',
      'Permanently shadowed craters at the lunar South Pole contain gigatons of primordial water ice.'
    ]
  },
  {
    id: 'europa',
    name: 'Europa',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'jupiter',
    tagline: 'The Subsurface Saltwater Ocean World',
    color: '#EADBC8',
    overview: 'Europa is one of Jupiter’s Galilean moons. Beneath an outer crust of fractured water ice lies a global liquid ocean containing more than double the volume of all Earth’s oceans combined, kept warm by tidal dissipation.',
    scientificData: {
      diameterKm: '3,121 km',
      gravityMps2: '1.315 m/s²',
      avgTempC: '-160°C',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'Hydrothermal vents on Europa’s ocean floor could provide chemical energy to sustain extraterrestrial microbial life.',
      'Its icy surface is one of the smoothest in the solar system, crisscrossed by dark reddish fractures called lineae.',
      'NASA Europa Clipper (launched 2024) is flying toward Jupiter to perform 49 low-altitude habitability flybys.'
    ]
  },
  {
    id: 'titan',
    name: 'Titan',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'saturn',
    tagline: 'The Prebiotic Moon of Methane Seas',
    color: '#D29C44',
    overview: 'Titan is Saturn’s largest moon and the only moon in the Solar System with a dense, nitrogen-rich atmosphere. It features a complete meteorological cycle with methane clouds, methane rainfall, and lakes of liquid ethane and methane.',
    scientificData: {
      diameterKm: '5,150 km',
      gravityMps2: '1.352 m/s²',
      avgTempC: '-179°C',
      atmosphereComposition: ['Nitrogen 95%', 'Methane 5%'],
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'Kraken Mare is a liquid hydrocarbon sea larger than the Caspian Sea on Earth.',
      'Its dense atmosphere and low gravity mean a human strapped with artificial wings could take flight by flapping their arms.',
      'NASA Dragonfly mission will deploy an octocopter to fly across Titan’s dunes in the 2030s.'
    ]
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'saturn',
    tagline: 'The Cryovolcanic Geyser Moon',
    color: '#FFFFFF',
    overview: 'Enceladus is a brilliant white moon that sprays ocean water into space. Cassini discovered active cryovolcanic plumes erupting from south-polar "tiger stripe" fractures, carrying salts, silica, and complex organic macromolecules.',
    scientificData: {
      diameterKm: '504 km',
      gravityMps2: '0.113 m/s²',
      avgTempC: '-198°C',
      parentPlanet: 'Saturn'
    },
    interestingFacts: [
      'It reflects nearly 99% of sunlight, making it the most reflective celestial body in the Solar System.',
      'Cassini detected molecular hydrogen (H2) in its plumes, a signature of active hydrothermal serpentinization.',
      'Plumes of water vapor and ice crystals from Enceladus continuously replenish Saturn’s vast E-ring.'
    ]
  },
  {
    id: 'io',
    name: 'Io',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'jupiter',
    tagline: 'The Volcanic Cauldron of Jupiter',
    color: '#F4D03F',
    overview: 'Io is the most geologically violent world known, caught in a gravitational tug-of-war between Jupiter, Europa, and Ganymede that generates ferocious tidal friction and hundreds of active volcanoes.',
    scientificData: {
      diameterKm: '3,643 km',
      gravityMps2: '1.796 m/s²',
      avgTempC: '-130°C to 1,200°C (lava lakes)',
      parentPlanet: 'Jupiter'
    },
    interestingFacts: [
      'Volcanic plumes on Io can shoot up to 500 kilometers above the surface into the vacuum of space.',
      'Loki Patera is an active volcanic lake over 200 kilometers across, periodically covered in sinking crust slabs.'
    ]
  },
  {
    id: 'triton',
    name: 'Triton',
    category: 'moon',
    hierarchyLevel: 'moon',
    parentObjectId: 'neptune',
    tagline: 'The Captured Cryogenic Geyser World',
    color: '#A0D2EB',
    overview: 'Triton is Neptune’s largest moon. It orbits in the opposite direction of Neptune’s rotation, proving it was a dwarf planet captured from the Kuiper Belt by Neptune’s gravity.',
    scientificData: {
      diameterKm: '2,706 km',
      gravityMps2: '0.779 m/s²',
      avgTempC: '-235°C',
      parentPlanet: 'Neptune'
    },
    interestingFacts: [
      'Voyager 2 photographed geysers erupting liquid nitrogen and black soot 8 kilometers into its tenuous sky.',
      'Triton’s surface resembles the rind of a cantaloupe, caused by diapiric overturn of dirty water ice.'
    ]
  }
];

// ============================================================
// 4. EXOPLANETS & ALIEN WORLDS
// ============================================================
export const EXOPLANETS_DATA: CelestialObject[] = [
  {
    id: 'proxima_b',
    name: 'Proxima Centauri b',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    parentObjectId: 'proxima_centauri',
    tagline: 'Our Closest Potentially Habitable Neighbor',
    color: '#D47E60',
    overview: 'Proxima b is an Earth-mass exoplanet orbiting within the habitable zone of Proxima Centauri, the closest star to our Solar System at 4.24 light-years.',
    scientificData: {
      diameterKm: '~13,700 km (1.08 Earths)',
      distanceFromEarthLy: '4.244 light-years',
      revolutionPeriodDays: '11.2 Earth days',
      hostStar: 'Proxima Centauri (Red Dwarf)',
      discoveryYear: 2016,
      discoveryMethod: 'Radial Velocity (HARPS)'
    },
    isConfirmed: true,
    interestingFacts: [
      'It orbits only 7.5 million kilometers from its host star—closer than Mercury is to our Sun—yet receives similar radiant flux because its star is a cool red dwarf.',
      'Proxima Centauri emits violent superflares, subjecting Proxima b to extreme stellar wind and coronal mass ejections.'
    ]
  },
  {
    id: 'trappist_1e',
    name: 'TRAPPIST-1e',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    parentObjectId: 'trappist_1',
    tagline: 'The Seven-Sister Oceanic Candidate',
    color: '#4B88A2',
    overview: 'TRAPPIST-1e is an Earth-sized rocky exoplanet orbiting within the habitable zone of ultra-cool dwarf star TRAPPIST-1, located 39.5 light-years away in Aquarius.',
    scientificData: {
      diameterKm: '11,700 km (0.92 Earths)',
      distanceFromEarthLy: '39.46 light-years',
      revolutionPeriodDays: '6.1 Earth days',
      hostStar: 'TRAPPIST-1',
      discoveryYear: 2017,
      discoveryMethod: 'Transit (Spitzer Space Telescope)'
    },
    isConfirmed: true,
    interestingFacts: [
      'TRAPPIST-1 contains 7 terrestrial Earth-sized planets packed so tightly that standing on TRAPPIST-1e, neighboring planets would appear larger in the sky than the full Moon.',
      'Atmospheric transmission spectra are actively being observed by the James Webb Space Telescope (JWST).'
    ]
  },
  {
    id: 'kepler_186f',
    name: 'Kepler-186f',
    category: 'exoplanet',
    hierarchyLevel: 'exoplanet',
    parentObjectId: 'kepler_186',
    tagline: 'The First Validated Earth-Size Habitable World',
    color: '#88D49E',
    overview: 'Kepler-186f was the first confirmed Earth-size planet discovered in the habitable zone of another star, located roughly 582 light-years away in Cygnus.',
    scientificData: {
      diameterKm: '14,900 km (1.17 Earths)',
      distanceFromEarthLy: '582 light-years',
      revolutionPeriodDays: '129.9 Earth days',
      hostStar: 'Kepler-186 (M1 Dwarf)',
      discoveryYear: 2014,
      discoveryMethod: 'Transit (Kepler Mission)'
    },
    isConfirmed: true,
    interestingFacts: [
      'Its host star is an M-dwarf, meaning its midday brightness on the surface is equivalent to Earth an hour before sunset.',
      'Photosynthesis, if present on Kepler-186f, would likely absorb infrared photons, resulting in reddish or black vegetation.'
    ]
  }
];

// ============================================================
// 5. NOTABLE STARS & STELLAR GIANTS
// ============================================================
export const STARS_DATA: CelestialObject[] = [
  {
    id: 'sun',
    name: 'The Sun (Sol)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Stellar Hearth of our Solar System',
    color: '#FFB300',
    overview: 'The Sun is a G-type main-sequence star (G2V) containing 99.86% of the mass of the Solar System. Thermonuclear proton-proton fusion in its core fuses 600 million tons of hydrogen into helium every second.',
    scientificData: {
      diameterKm: '1,392,700 km (109 Earths)',
      distanceFromEarthLy: '8.3 light-minutes (1 AU)',
      avgTempC: '5,500°C (Surface) / 15,000,000°C (Core)',
      spectralType: 'G2V Main Sequence Yellow Dwarf',
      constellation: 'Center of Solar System'
    },
    interestingFacts: [
      'Approximately 1.3 million Earths could fit inside the Sun.',
      'Photons created by nuclear fusion take over 100,000 years to diffuse outward through the dense radiative zone to reach space.'
    ]
  },
  {
    id: 'sirius',
    name: 'Sirius (Alpha Canis Majoris)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Blazing Dog Star',
    color: '#E0F7FA',
    overview: 'Sirius is the brightest star in the night sky with an apparent visual magnitude of -1.46. It is a binary system consisting of a luminous A-type main-sequence star and a faint white dwarf companion, Sirius B.',
    scientificData: {
      diameterKm: '2,380,000 km (1.71 Solar radii)',
      distanceFromEarthLy: '8.60 light-years',
      avgTempC: '9,940 K',
      spectralType: 'A1V + DA2',
      constellation: 'Canis Major'
    },
    interestingFacts: [
      'Sirius B was the first white dwarf star discovered; its mass equals the Sun packed into a sphere no larger than Earth.',
      'Sirius is gradually approaching the Solar System and will continue brightening over the next 60,000 years.'
    ]
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse (Alpha Orionis)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Pulsating Red Supergiant on the Brink',
    color: '#FF7675',
    overview: 'Betelgeuse is a red supergiant in Orion. If positioned at the center of our solar system, its pulsating photosphere would engulf Mercury, Venus, Earth, Mars, and the orbit of Jupiter.',
    scientificData: {
      diameterKm: '1.2 billion km (887 Solar radii)',
      distanceFromEarthLy: '642.5 light-years',
      avgTempC: '3,500 K',
      spectralType: 'M1-M2 Ia-ab Red Supergiant',
      constellation: 'Orion'
    },
    interestingFacts: [
      'It is nearing the end of its life and is destined to explode as a Type II core-collapse supernova within the next 100,000 years.',
      'When Betelgeuse explodes, it will shine as bright as the half-Moon and remain visible in broad daylight for months.'
    ]
  },
  {
    id: 'polaris',
    name: 'Polaris (Alpha Ursae Minoris)',
    category: 'star',
    hierarchyLevel: 'star',
    parentObjectId: 'milky_way',
    tagline: 'The Northern Navigational Anchor',
    color: '#FFF9C4',
    overview: 'Polaris is the North Star, currently positioned less than 1 degree from the northern celestial pole. It is a multiple star system dominated by a yellow supergiant classical Cepheid variable.',
    scientificData: {
      diameterKm: '52 million km (37.5 Solar radii)',
      distanceFromEarthLy: '433 light-years',
      avgTempC: '6,015 K',
      spectralType: 'F7Ib Supergiant',
      constellation: 'Ursa Minor'
    },
    interestingFacts: [
      'Due to Earth’s axial precession (a 26,000-year cycle), Vega and Thuban will take turns becoming the North Star in future epochs.',
      'Polaris is 2,500 times more luminous than our Sun.'
    ]
  }
];

// ============================================================
// 6. NEBULAE & STELLAR NURSERIES
// ============================================================
export const NEBULAE_DATA: CelestialObject[] = [
  {
    id: 'orion_nebula',
    name: 'Orion Nebula (M42)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Great Stellar Cradle',
    color: '#E056FD',
    overview: 'The Orion Nebula is a vibrant emission nebula visible to the naked eye below Orion’s Belt. Within its glowing ionized hydrogen clouds, thousands of young stars and protoplanetary discs (proplyds) are actively condensing.',
    scientificData: {
      diameterKm: '24 light-years across',
      distanceFromEarthLy: '1,344 light-years',
      constellation: 'Orion'
    },
    interestingFacts: [
      'The central Trapezium Cluster contains massive O-type stars whose intense ultraviolet radiation ionizes the surrounding hydrogen, making it glow in vivid pink and turquoise.',
      'JWST has discovered rogue Jupiter-mass binary objects (JuMBOs) drifting through the nebula unbound to any star.'
    ]
  },
  {
    id: 'eagle_nebula',
    name: 'Eagle Nebula & Pillars of Creation (M16)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Monumental Cathedrals of Starbirth',
    color: '#00CEC9',
    overview: 'Located in Serpens, the Eagle Nebula contains the iconic "Pillars of Creation"—towering columns of cold interstellar hydrogen gas and dust being sculpted by the ultraviolet radiation of newborn massive stars.',
    scientificData: {
      diameterKm: '70 x 55 light-years',
      distanceFromEarthLy: '5,700 light-years',
      constellation: 'Serpens'
    },
    interestingFacts: [
      'The tallest pillar is approximately 4 light-years high from base to tip—roughly the distance from our Sun to Proxima Centauri.',
      'Dense evaporative gaseous globules (EGGs) at the tips of the pillars shield infant protostars as they coalesce.'
    ]
  },
  {
    id: 'carina_nebula',
    name: 'Carina Nebula (NGC 3372)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Titan of the Southern Skies',
    color: '#FF7675',
    overview: 'The Carina Nebula is one of the largest and most luminous diffuse nebulae in our galaxy, spanning 460 light-years. It shelters Eta Carinae, a hypergiant star nearing its final hypernova eruption.',
    scientificData: {
      diameterKm: '460 light-years across',
      distanceFromEarthLy: '8,500 light-years',
      constellation: 'Carina'
    },
    interestingFacts: [
      'It is four times larger and far more luminous than the Orion Nebula, but only visible from the Southern Hemisphere.',
      'The "Cosmic Cliffs" imaged by JWST reveal previously invisible young protostellar jets punching through thick dust.'
    ]
  },
  {
    id: 'crab_nebula',
    name: 'Crab Nebula (M1)',
    category: 'nebula',
    hierarchyLevel: 'nebula',
    parentObjectId: 'milky_way',
    tagline: 'The Expanding Supernova Remnant of 1054 AD',
    color: '#6C5CE7',
    overview: 'The Crab Nebula is the debris cloud from a core-collapse supernova observed and recorded by Chinese, Japanese, and Arab astronomers in 1054 AD. At its core spins the Crab Pulsar at 30 rotations per second.',
    scientificData: {
      diameterKm: '11 light-years across',
      distanceFromEarthLy: '6,500 light-years',
      constellation: 'Taurus'
    },
    interestingFacts: [
      'The Crab Pulsar emits synchronized pulses across all electromagnetic wavelengths from radio to energetic gamma rays.',
      'The supernova was so bright in 1054 that it was visible in daylight for 23 days.'
    ]
  }
];

// ============================================================
// 7. GALAXIES & GALAXY CLUSTERS
// ============================================================
export const GALAXIES_DATA: CelestialObject[] = [
  {
    id: 'milky_way',
    name: 'Milky Way Galaxy',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'local_group',
    tagline: 'Our Home Island Universe',
    color: '#5B8CFF',
    overview: 'The Milky Way is a barred spiral galaxy containing 100 to 400 billion stars. Our Solar System is situated in the Orion-Cygnus spur, roughly 26,000 light-years from the central supermassive black hole Sagittarius A*.',
    scientificData: {
      diameterKm: '100,000 light-years',
      distanceFromEarthLy: '0 ly (Our Location)',
      galaxyType: 'Barred Spiral (SBbc)',
      constellation: 'Sagittarius (Core)'
    },
    interestingFacts: [
      'The entire galaxy rotates: our Solar System takes ~230 million years to complete one orbit (a Galactic Year).',
      'In roughly 4.5 billion years, the Milky Way and Andromeda galaxies will merge into a giant elliptical galaxy dubbed "Milkomeda".'
    ]
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy (M31)',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'local_group',
    tagline: 'The Galactic Monarch of the Local Group',
    color: '#8766FF',
    overview: 'Andromeda is the largest galaxy in our Local Group, spanning over 220,000 light-years and containing an estimated 1 trillion stars.',
    scientificData: {
      diameterKm: '220,000 light-years',
      distanceFromEarthLy: '2.537 million light-years',
      galaxyType: 'Spiral Galaxy (SA(s)b)',
      constellation: 'Andromeda'
    },
    interestingFacts: [
      'It is the most distant celestial object visible to the naked human eye under dark night skies.',
      'Andromeda is currently hurtling toward our Milky Way at 110 kilometers per second (400,000 km/h).'
    ]
  },
  {
    id: 'whirlpool_galaxy',
    name: 'Whirlpool Galaxy (M51)',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'local_group',
    tagline: 'The Grand-Design Cosmic Spiral',
    color: '#61E6F2',
    overview: 'M51 is the quintessential grand-design spiral galaxy. Its dramatic spiral arms and dust lanes are sculpted by tidal gravitational interactions with its companion dwarf galaxy NGC 5195.',
    scientificData: {
      diameterKm: '60,000 light-years',
      distanceFromEarthLy: '23 million light-years',
      galaxyType: 'Grand Design Spiral (SA(s)bc pec)',
      constellation: 'Canes Venatici'
    },
    interestingFacts: [
      'First galaxy in history whose spiral structure was recognized, observed by Lord Rosse in 1845 using the Leviathan of Parsonstown.',
      'Gravitational compression from NGC 5195 triggers massive starburst activity along its spiral arms.'
    ]
  },
  {
    id: 'sombrero_galaxy',
    name: 'Sombrero Galaxy (M104)',
    category: 'galaxy',
    hierarchyLevel: 'galaxy',
    parentObjectId: 'virgo_cluster',
    tagline: 'The Majestic Dust-Lined Disc',
    color: '#F5C56A',
    overview: 'The Sombrero Galaxy features an extraordinarily bright white bulbous nucleus framed by an immense, dark absorbing dust lane, giving it the unmistakable shape of a Mexican sombrero hat.',
    scientificData: {
      diameterKm: '50,000 light-years',
      distanceFromEarthLy: '31.1 million light-years',
      galaxyType: 'Spiral / Lenticular (SA(s)a)',
      constellation: 'Virgo'
    },
    interestingFacts: [
      'Houses one of the most massive supermassive black holes in nearby galaxies, estimated at 1 billion solar masses.',
      'It contains an unusually rich system of over 2,000 globular clusters.'
    ]
  },
  {
    id: 'local_group',
    name: 'The Local Group',
    category: 'galaxy_cluster',
    hierarchyLevel: 'galaxy_cluster',
    parentObjectId: 'laniakea_supercluster',
    tagline: 'Our Local Neighborhood of Galaxies',
    color: '#3984FF',
    overview: 'The Local Group is the gravitationally bound cluster of galaxies that includes the Milky Way, Andromeda, Triangulum, and over 80 satellite dwarf galaxies across 10 million light-years.',
    scientificData: {
      diameterKm: '10 million light-years across',
      distanceFromEarthLy: '0 ly (Inside)',
      constellation: 'Local Supercluster'
    },
    interestingFacts: [
      'The barycenter of the Local Group lies somewhere between the Milky Way and Andromeda.',
      'The Large and Small Magellanic Clouds are irregular satellite galaxies orbiting the Milky Way.'
    ]
  }
];

// ============================================================
// 8. EXTREME COSMIC PHENOMENA: BLACK HOLES, PULSARS & RELATIVITY
// ============================================================
export const EXTREME_PHENOMENA: CelestialObject[] = [
  {
    id: 'sagittarius_a',
    name: 'Sagittarius A* (Sgr A*)',
    category: 'phenomenon',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'milky_way',
    tagline: 'The Gravitational Engine of the Milky Way',
    color: '#FD79A8',
    overview: 'Sagittarius A* is the supermassive black hole anchoring the galactic center of the Milky Way. With a mass 4.3 million times that of our Sun, its immense gravity governs the orbits of nearby S-stars.',
    scientificData: {
      diameterKm: '44 million km (Schwarzschild radius ~12M km)',
      distanceFromEarthLy: '26,673 light-years',
      massSolarMasses: '4.297 million M☉',
      constellation: 'Sagittarius'
    },
    interestingFacts: [
      'In May 2022, the Event Horizon Telescope (EHT) unveiled the historic first radio silhouette of Sagittarius A*’s glowing accretion ring.',
      'Nearby star S2 orbits Sgr A* at 7,700 km/s (nearly 3% of light speed), proving relativistic Schwarzschild precession.'
    ]
  },
  {
    id: 'm87_black_hole',
    name: 'M87* Supermassive Black Hole',
    category: 'phenomenon',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'virgo_cluster',
    tagline: 'The First Imaged Black Hole in Human History',
    color: '#FF6B6B',
    overview: 'Located at the center of the giant elliptical galaxy Messier 87, this monster black hole holds a staggering 6.5 billion times the mass of the Sun. In 2019, it became the first black hole directly imaged by humanity.',
    scientificData: {
      diameterKm: '38 billion km (Event horizon)',
      distanceFromEarthLy: '53.5 million light-years',
      massSolarMasses: '6.5 billion M☉',
      constellation: 'Virgo'
    },
    interestingFacts: [
      'Its event horizon shadow is larger than the entire Solar System out past the orbit of Pluto.',
      'It launches a relativistic jet of plasma extending over 5,000 light-years across space.'
    ]
  },
  {
    id: 'magnetar_sgr1806',
    name: 'Magnetar SGR 1806-20',
    category: 'phenomenon',
    hierarchyLevel: 'extreme_phenomenon',
    parentObjectId: 'milky_way',
    tagline: 'The Most Powerful Magnetic Entity in the Cosmos',
    color: '#61E6F2',
    overview: 'A magnetar is an extreme neutron star with a magnetic field up to 100 billion Tesla—a quadrillion times stronger than Earth’s. A starquake on SGR 1806-20 in 2004 released more energy in a tenth of a second than the Sun emits in 150,000 years.',
    scientificData: {
      diameterKm: '20 km across',
      distanceFromEarthLy: '50,000 light-years',
      constellation: 'Sagittarius'
    },
    interestingFacts: [
      'At a distance of 1,000 kilometers from a magnetar, its magnetic field would dissolve your body’s atomic electron clouds into needle-like cylinders.',
      'The 2004 giant gamma-ray flare physically ionized Earth’s upper atmosphere from 50,000 light-years away.'
    ]
  },
  {
    id: 'cosmic_microwave_background',
    name: 'Cosmic Microwave Background (CMB)',
    category: 'phenomenon',
    hierarchyLevel: 'universe',
    tagline: 'The Echo of the Big Bang (380,000 Years After Creation)',
    color: '#E17055',
    overview: 'The CMB is the cooled relic thermal radiation left over from the Big Bang. When the universe was 380,000 years old, neutral hydrogen atoms formed (Recombination), allowing photons to stream freely across the cosmos for the first time.',
    scientificData: {
      avgTempC: '2.725 Kelvin (-270.425°C)',
      distanceFromEarthLy: '46.5 billion light-years (Observable Horizon)',
      discoveryYear: 1965,
      discoveryMethod: 'Holmdel Horn Antenna (Penzias & Wilson)'
    },
    interestingFacts: [
      'Fluctuations in the CMB (one part in 100,000) mapped by the Planck satellite represent the gravitational seeds that grew into all galaxies and superclusters today.',
      'Roughly 1% of the static "snow" on old analog television antennas is caused by Big Bang photons striking the receiver.'
    ]
  }
];

// Master unified catalogue
export const ALL_CELESTIAL_OBJECTS: CelestialObject[] = [
  ...PLANETS_DATA,
  ...DWARF_PLANETS,
  ...MOONS_DATA,
  ...EXOPLANETS_DATA,
  ...STARS_DATA,
  ...NEBULAE_DATA,
  ...GALAXIES_DATA,
  ...EXTREME_PHENOMENA
];
