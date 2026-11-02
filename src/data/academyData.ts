// ============================================================
// SPACE EXPLORER — SPACE ACADEMY CURRICULUM & QUIZZES
// ============================================================

import { SpaceAcademyLesson } from '@/types/cosmos';

export const ACADEMY_LESSONS: SpaceAcademyLesson[] = [
  {
    id: 'solar_system_overview',
    title: 'Architecture of the Solar System',
    category: 'Solar System',
    difficulty: 'Beginner',
    durationMinutes: 12,
    objectives: [
      'Understand how the Solar System formed from the solar nebula 4.6 billion years ago.',
      'Distinguish terrestrial rocky planets from gas and ice giants.',
      'Identify key boundary zones: the Main Asteroid Belt, Kuiper Belt, and Oort Cloud.'
    ],
    content: [
      'Our solar system consists of our star, the Sun, and everything bound to it by gravity: the planets Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune; dwarf planets such as Pluto; dozens of moons; and millions of asteroids, comets, and meteoroids.',
      'The four inner terrestrial planets (Mercury, Venus, Earth, and Mars) are dense, rocky spheres with solid surfaces and few or no moons. Beyond Mars lies the Asteroid Belt, populated by rocky leftovers from planetary formation.',
      'The outer solar system is dominated by the gas giants (Jupiter and Saturn) composed primarily of hydrogen and helium, and the ice giants (Uranus and Neptune) rich in water, ammonia, and methane ices. Beyond Neptune lies the Kuiper Belt and the distant spherical shell known as the Oort Cloud.'
    ],
    keyTakeaways: [
      'The Sun contains 99.86% of the total mass of the entire Solar System.',
      'Planets orbit in nearly the same ecliptic plane in the same counter-clockwise direction (prograde).',
      'The Kuiper Belt extends from Neptune\'s orbit (30 AU) out to approximately 50 AU.'
    ],
    quiz: {
      id: 'quiz_solar_system',
      lessonId: 'solar_system_overview',
      title: 'Solar System Fundamentals Quiz',
      questions: [
        {
          id: 'q1',
          question: 'Approximately what percentage of the Solar System\'s total mass is contained within the Sun?',
          options: [
            { id: 'a', text: '75.2%' },
            { id: 'b', text: '88.5%' },
            { id: 'c', text: '99.86%' },
            { id: 'd', text: '50.0%' }
          ],
          correctOptionId: 'c',
          explanation: 'The Sun holds approximately 99.86% of all mass in the Solar System, with Jupiter holding most of the remaining fraction.'
        },
        {
          id: 'q2',
          question: 'Which planet possesses the shortest orbital revolution period (year) in our Solar System?',
          options: [
            { id: 'a', text: 'Mercury (88 Earth days)' },
            { id: 'b', text: 'Venus (225 Earth days)' },
            { id: 'c', text: 'Mars (687 Earth days)' },
            { id: 'd', text: 'Earth (365 Earth days)' }
          ],
          correctOptionId: 'a',
          explanation: 'By Kepler’s third law, orbital period scales with semi-major axis; Mercury, being closest to the Sun, orbits in just 88 Earth days.'
        },
        {
          id: 'q3',
          question: 'Why are Uranus and Neptune classified as "Ice Giants" rather than "Gas Giants"?',
          options: [
            { id: 'a', text: 'They are made entirely of pure solid surface water ice.' },
            { id: 'b', text: 'Their mantles are composed predominantly of heavier volatiles like water, ammonia, and methane ices.' },
            { id: 'c', text: 'They orbit beyond the Milky Way.' },
            { id: 'd', text: 'They have frozen nitrogen rings.' }
          ],
          correctOptionId: 'b',
          explanation: 'While Jupiter and Saturn are mostly hydrogen and helium gas, Uranus and Neptune consist primarily of elements heavier than hydrogen and helium, historically referred to by astronomers as ices (water, ammonia, methane).'
        },
        {
          id: 'q4',
          question: 'What region lies between the orbits of Mars and Jupiter?',
          options: [
            { id: 'a', text: 'The Kuiper Belt' },
            { id: 'b', text: 'The Main Asteroid Belt' },
            { id: 'c', text: 'The Oort Cloud' },
            { id: 'd', text: 'The Van Allen Radiation Belt' }
          ],
          correctOptionId: 'b',
          explanation: 'The Main Asteroid Belt is situated between the orbits of Mars and Jupiter, prevented from coalescing into a planet by Jupiter’s disruptive gravitational tides.'
        }
      ]
    }
  },
  {
    id: 'black_holes_gravity',
    title: 'Black Holes, General Relativity & Spacetime',
    category: 'Black Holes',
    difficulty: 'Advanced',
    durationMinutes: 18,
    objectives: [
      'Grasp Einstein\'s concept of gravity as the curvature of four-dimensional spacetime.',
      'Define the event horizon, Schwarzschild radius, and gravitational singularity.',
      'Explore how supermassive black holes govern galactic evolution.'
    ],
    content: [
      'Albert Einstein revolutionized physics in 1915 with his General Theory of Relativity: mass and energy warp spacetime, and what we perceive as the force of gravity is objects traveling along the shortest paths (geodesics) in curved spacetime.',
      'When a sufficiently massive star exhausts its nuclear fuel, inward gravitational collapse overwhelms electron and neutron degeneracy pressures. The star collapses infinitely to a point of zero volume and infinite density known as a gravitational singularity.',
      'Surrounding every black hole is an intangible boundary called the Event Horizon. Inside this boundary, the escape velocity exceeds the speed of light (300,000 km/s). Anything crossing the event horizon can never return to the observable universe.'
    ],
    keyTakeaways: [
      'The Schwarzschild radius formula R_s = 2GM / c² defines the boundary where escape velocity equals light speed.',
      'Time dilates exponentially near the event horizon relative to a distant observer.',
      'Sagittarius A* at the center of the Milky Way has a mass equal to ~4.3 million Suns.'
    ],
    quiz: {
      id: 'quiz_black_holes',
      lessonId: 'black_holes_gravity',
      title: 'Spacetime & Black Holes Mastery Quiz',
      questions: [
        {
          id: 'q1',
          question: 'What is the physical significance of a black hole\'s "Event Horizon"?',
          options: [
            { id: 'a', text: 'The physical solid surface of the crushed star.' },
            { id: 'b', text: 'The point where temperature drops to absolute zero.' },
            { id: 'c', text: 'The boundary where escape velocity equals the speed of light in vacuum.' },
            { id: 'd', text: 'The outer edge of the accretion disc where X-rays stop.' }
          ],
          correctOptionId: 'c',
          explanation: 'The event horizon is the mathematical boundary beyond which escape velocity exceeds the speed of light (c); not even photons can escape.'
        },
        {
          id: 'q2',
          question: 'What famous formula computes the Schwarzschild radius (event horizon size) of a non-rotating black hole?',
          options: [
            { id: 'a', text: 'R_s = 2GM / c²' },
            { id: 'b', text: 'E = mc²' },
            { id: 'c', text: 'F = G(m1 * m2) / r²' },
            { id: 'd', text: 'v = H_0 * d' }
          ],
          correctOptionId: 'a',
          explanation: 'The Schwarzschild radius is calculated directly as R_s = (2 * G * M) / c², where G is the gravitational constant, M is mass, and c is the speed of light.'
        },
        {
          id: 'q3',
          question: 'What extreme tidal stretching effect happens to an object falling into a stellar-mass black hole?',
          options: [
            { id: 'a', text: 'Supercooling' },
            { id: 'b', text: 'Spaghettification (vertical stretching and horizontal compression)' },
            { id: 'c', text: 'Nuclear fusion' },
            { id: 'd', text: 'Instantaneous evaporation' }
          ],
          correctOptionId: 'b',
          explanation: 'Spaghettification occurs because the gravitational gradient across the length of the falling object is so immense that the feet experience drastically stronger gravity than the head.'
        },
        {
          id: 'q4',
          question: 'Which instrument or collaboration captured the historic first direct radio shadow of the Sagittarius A* supermassive black hole?',
          options: [
            { id: 'a', text: 'James Webb Space Telescope (JWST)' },
            { id: 'b', text: 'Hubble Space Telescope' },
            { id: 'c', text: 'Event Horizon Telescope (EHT)' },
            { id: 'd', text: 'Kepler Space Observatory' }
          ],
          correctOptionId: 'c',
          explanation: 'The Event Horizon Telescope (EHT)—a planet-spanning array of synchronized millimeter-wave radio observatories—produced the landmark 2022 image of Sagittarius A*.'
        }
      ]
    }
  },
  {
    id: 'planetary_atmospheres',
    title: 'Extreme Atmospheres of the Cosmos',
    category: 'Planetary Science',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    objectives: [
      'Compare runway greenhouse atmospheres (Venus) to thin exospheres (Mercury).',
      'Understand atmospheric pressure and gas retention based on escape velocity.',
      'Analyze the methane cycle on Saturn\'s giant moon Titan.'
    ],
    content: [
      'A planet’s atmosphere is shaped by its surface gravity, distance from its parent star, volcanic outgassing, and magnetic field protection from solar wind sputtering.',
      'Venus suffered a runaway greenhouse effect where evaporating oceans allowed carbon dioxide to build to crushing levels, creating a 92-bar atmosphere hot enough to melt lead.',
      'On Saturn’s moon Titan, temperatures (-179°C) sit right near the triple point of methane, creating liquid hydrocarbon precipitation, river channels, and vast lakes.'
    ],
    keyTakeaways: [
      'Earth’s magnetic field shields our atmospheric volatile reservoir from solar wind stripping.',
      'Mars lost the majority of its ancient atmosphere after its core dynamo solidified and its magnetic field died ~4 billion years ago.',
      'Titan is the only moon in the Solar System possessing a substantial atmosphere with clouds and rain.'
    ],
    quiz: {
      id: 'quiz_atmospheres',
      lessonId: 'planetary_atmospheres',
      title: 'Planetary Atmospheres Quiz',
      questions: [
        {
          id: 'q1',
          question: 'Why is Venus significantly hotter than Mercury, even though Mercury is closer to the Sun?',
          options: [
            { id: 'a', text: 'Venus has an internal nuclear furnace.' },
            { id: 'b', text: 'A runaway greenhouse effect driven by a 96.5% carbon dioxide atmosphere traps solar infrared radiation.' },
            { id: 'c', text: 'Venus orbits closer during summer.' },
            { id: 'd', text: 'Mercury reflects all solar energy.' }
          ],
          correctOptionId: 'b',
          explanation: 'The ultra-dense CO2 blanket on Venus absorbs and reradiates thermal infrared energy, driving global temperatures up to 465°C.'
        },
        {
          id: 'q2',
          question: 'What is the primary atmospheric constituent of Saturn’s moon Titan?',
          options: [
            { id: 'a', text: 'Oxygen (85%)' },
            { id: 'b', text: 'Carbon Dioxide (95%)' },
            { id: 'c', text: 'Nitrogen (~95%)' },
            { id: 'd', text: 'Hydrogen (90%)' }
          ],
          correctOptionId: 'c',
          explanation: 'Like Earth, Titan’s atmosphere is overwhelmingly composed of nitrogen (~95%), with the remainder being primarily methane and trace hydrocarbons.'
        },
        {
          id: 'q3',
          question: 'What primary factor led to Mars losing its dense ancient atmosphere and surface oceans?',
          options: [
            { id: 'a', text: 'The loss of its global magnetic dynamo, allowing solar wind to sputter its atmosphere away over billions of years.' },
            { id: 'b', text: 'An asteroid impact completely blew the atmosphere into Jupiter.' },
            { id: 'c', text: 'The atmosphere froze permanently into pure solid carbon dioxide.' },
            { id: 'd', text: 'Solar radiation increased tenfold.' }
          ],
          correctOptionId: 'a',
          explanation: 'As Mars’ smaller core cooled and solidified, its planetary magnetic dynamo shut down, leaving its atmosphere unprotected against solar wind erosion.'
        },
        {
          id: 'q4',
          question: 'Which planet boasts the fastest recorded winds in the Solar System, exceeding 2,000 km/h?',
          options: [
            { id: 'a', text: 'Neptune' },
            { id: 'b', text: 'Earth' },
            { id: 'c', text: 'Jupiter' },
            { id: 'd', text: 'Mars' }
          ],
          correctOptionId: 'a',
          explanation: 'Neptune experiences supersonic winds whipping through its upper atmosphere at speeds exceeding 2,100 km/h (1,300 mph).'
        }
      ]
    }
  }
];
