import { ClassItem, Instructor, Membership, ClassPackage, FloorStaffSchedule } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_woman_pose_1791457844143.jpg';
export const STUDIO_INTERIOR_IMAGE = '/src/assets/images/facility_studio_interior_1791457858726.jpg';
export const PILATES_IMAGE = '/src/assets/images/discipline_pilates_reformer_1791457869988.jpg';
export const STRENGTH_IMAGE = '/src/assets/images/discipline_strength_sculpt_1791457881415.jpg';
export const INSTRUCTOR_ELENA_IMAGE = '/src/assets/images/instructor_portrait_elena_1791457892425.jpg';

export const INITIAL_INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Elena Rostova',
    title: 'Head of Somatic Movement & Pilates',
    bio: 'Former principal ballerina trained at the Royal Academy, Elena seamlessly blends classical spinal decompression with progressive reformer resistance. Her method recalibrates posture while unlocking deep kinetic grace.',
    philosophy: 'Movement is not punishment for what you ate; it is reverence for what you are capable of becoming.',
    specialties: ['Pilates', 'Barre', 'Yoga'],
    certifications: ['Comprehensive Classical Pilates (600h)', 'Polestar Rehabilitation', 'Anatomy Trains FRS'],
    photo: INSTRUCTOR_ELENA_IMAGE,
    experienceYears: 12,
    floorDutySchedule: 'Mon, Wed, Fri · 06:30 – 14:00'
  },
  {
    id: 'inst-2',
    name: 'Maya Chen-Vance',
    title: 'Director of Strength & Metabolic Conditioning',
    bio: 'A certified sports scientist and competitive kettlebell lifter, Maya designs strength protocols rooted in female biomechanics. She champions heavy loads, nervous system regulation, and zero-bullshit lifting autonomy.',
    philosophy: 'When a woman discovers her physical power, her hesitation in the rest of life disappears forever.',
    specialties: ['Strength', 'HIIT'],
    certifications: ['CSCS (Strength & Conditioning)', 'Kettlebell Master Level II', 'FRC Mobility Specialist'],
    photo: STRENGTH_IMAGE,
    experienceYears: 9,
    floorDutySchedule: 'Tue, Thu, Sat · 08:00 – 16:30'
  },
  {
    id: 'inst-3',
    name: 'Sariyah Al-Mansoor',
    title: 'Master of Breathwork & Vinyasa Flow',
    bio: 'Having studied directly with Himalayan masters in Rishikesh and Mysore, Sariyah weaves somatic breath holds, dynamic arm balances, and sound wave frequencies into an unforgettable ceremonial flow.',
    philosophy: 'The stillness between your breaths is where your highest intuition whispers.',
    specialties: ['Yoga', 'Barre'],
    certifications: ['E-RYT 500 Yoga Alliance', 'Wim Hof Breathwork Level II', 'Tibetan Sound Resonance'],
    photo: HERO_IMAGE,
    experienceYears: 14,
    floorDutySchedule: 'Mon, Tue, Sun · 10:00 – 18:00'
  },
  {
    id: 'inst-4',
    name: 'Camille Delacroix',
    title: 'Kinetic Rhythm Cycling & Barre Lead',
    bio: 'Pioneering sensory cardiovascular conditioning, Camille choreographs immersive dark-room rides and high-burn isometric barre sets synchronized with bespoke electronic soundscapes.',
    philosophy: 'Rhythm is the universal bridge between exhaustion and euphoria.',
    specialties: ['Cycling', 'Barre', 'HIIT'],
    certifications: ['Schwinn Master Instructor', 'Exhale Core Barre Certified', 'NASM Personal Trainer'],
    photo: PILATES_IMAGE,
    experienceYears: 8,
    floorDutySchedule: 'Wed, Fri, Sat · 12:00 – 20:30'
  }
];

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: 'cls-1',
    title: 'Sculpt & Precision Reformer',
    discipline: 'Pilates',
    intensity: 'Medium',
    description: 'Controlled eccentric loading on custom maple reformers to lengthen, align, and deeply stabilize core stabilizers.',
    requirements: 'Grip socks required (available at apothecary)',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Monday',
    startTime: '07:00',
    endTime: '07:55',
    capacity: 12,
    spotsTaken: 10, // 2 spots left
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-2',
    title: 'Primal Rhythm HIIT',
    discipline: 'HIIT',
    intensity: 'High',
    description: 'High-density anaerobic intervals balanced with breath down-regulation and explosive agility drills.',
    requirements: 'Clean training sneakers',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Monday',
    startTime: '08:30',
    endTime: '09:20',
    capacity: 14,
    spotsTaken: 14, // 0 spots left -> Full!
    room: 'The Kinetic Studio',
    image: STRENGTH_IMAGE
  },
  {
    id: 'cls-3',
    title: 'Architectural Vinyasa',
    discipline: 'Yoga',
    intensity: 'Low',
    description: 'Slow-burning, continuous geometric flow emphasizing scapular stability and restorative pelvic release.',
    requirements: 'Barefoot. Mats and props provided.',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    instructorRole: 'Master of Breathwork',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:15',
    capacity: 16,
    spotsTaken: 11, // 5 spots left
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-4',
    title: 'Female Biomechanics Strength',
    discipline: 'Strength',
    intensity: 'High',
    description: 'Compound barbell and dumbbell sequencing targeted for bone density, posterior chain, and glute power.',
    requirements: 'Flat-soled training shoes',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Monday',
    startTime: '17:30',
    endTime: '18:30',
    capacity: 10,
    spotsTaken: 6, // 4 spots left
    room: 'The Loft Arena',
    image: STRENGTH_IMAGE
  },
  {
    id: 'cls-5',
    title: 'Atmospheric Kinetic Cycling',
    discipline: 'Cycling',
    intensity: 'High',
    description: 'Low-light, music-driven cardiovascular journey with climb intervals and heart-rate zone calibration.',
    requirements: 'Look Delta/SPD cleats provided',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Monday',
    startTime: '18:45',
    endTime: '19:35',
    capacity: 18,
    spotsTaken: 12, // 6 spots left
    room: 'The Sound Amphitheatre',
    image: PILATES_IMAGE
  },

  // Tuesday
  {
    id: 'cls-6',
    title: 'Dawn Reformer Flow',
    discipline: 'Pilates',
    intensity: 'Medium',
    description: 'Awaken the kinetic chain through fluid reformer springs, spinal twists, and diaphragmatic rhythm.',
    requirements: 'Grip socks required',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Tuesday',
    startTime: '06:30',
    endTime: '07:25',
    capacity: 12,
    spotsTaken: 9,
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-7',
    title: 'Barre Sculpt & Lengthen',
    discipline: 'Barre',
    intensity: 'Medium',
    description: 'Isometric micro-burns targeting inner thighs, hamstrings, and deltoids with classical ballet rigor.',
    requirements: 'Grip socks or barefoot',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '09:50',
    capacity: 14,
    spotsTaken: 13, // 1 spot left!
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-8',
    title: 'Heavy Lift & SOMA',
    discipline: 'Strength',
    intensity: 'High',
    description: 'Deadlift mechanics, kettlebell snatches, and rotational core power for resolute female strength.',
    requirements: 'Supportive training sneakers',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Tuesday',
    startTime: '12:00',
    endTime: '12:55',
    capacity: 10,
    spotsTaken: 8,
    room: 'The Loft Arena',
    image: STRENGTH_IMAGE
  },
  {
    id: 'cls-9',
    title: 'Candlelit Yin & Sound Bath',
    discipline: 'Yoga',
    intensity: 'Low',
    description: 'Passive floor postures held for 4-6 minutes to hydrate fascia, concluded with alchemy crystal bowls.',
    requirements: 'Comfortable layers for relaxation',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    instructorRole: 'Master of Breathwork',
    day: 'Tuesday',
    startTime: '19:30',
    endTime: '20:45',
    capacity: 18,
    spotsTaken: 15,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },

  // Wednesday
  {
    id: 'cls-10',
    title: 'Metabolic Surge',
    discipline: 'HIIT',
    intensity: 'High',
    description: 'Heart-rate mapped intervals using ski-ergs, water-rowers, and bodyweight plyometrics.',
    requirements: 'Clean trainers & sweat towel',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Wednesday',
    startTime: '07:15',
    endTime: '08:05',
    capacity: 14,
    spotsTaken: 11,
    room: 'The Kinetic Studio',
    image: STRENGTH_IMAGE
  },
  {
    id: 'cls-11',
    title: 'Advanced Jumpboard Reformer',
    discipline: 'Pilates',
    intensity: 'High',
    description: 'Cardiovascular plyometrics on the horizontal carriage combining low joint impact with high calorie burn.',
    requirements: 'Grip socks required',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '11:55',
    capacity: 12,
    spotsTaken: 12, // Full!
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-12',
    title: 'Sunset Kinetic Cycling',
    discipline: 'Cycling',
    intensity: 'High',
    description: 'Endurance surges, rhythm climbs, and sensory strobe lighting set to an uplifting bespoke playlist.',
    requirements: 'Cleats provided',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Wednesday',
    startTime: '18:15',
    endTime: '19:05',
    capacity: 18,
    spotsTaken: 7,
    room: 'The Sound Amphitheatre',
    image: PILATES_IMAGE
  },

  // Thursday
  {
    id: 'cls-13',
    title: 'Ashtanga Morning Awakening',
    discipline: 'Yoga',
    intensity: 'Medium',
    description: 'Dynamic synchronized breath with sequential postures building heat, internal purity, and mental focus.',
    requirements: 'Barefoot',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    instructorRole: 'Master of Breathwork',
    day: 'Thursday',
    startTime: '07:00',
    endTime: '08:15',
    capacity: 16,
    spotsTaken: 8,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-14',
    title: 'Sculpt Barre & Resistance',
    discipline: 'Barre',
    intensity: 'Medium',
    description: 'Light weights, ankle cuffs, and high repetitions designed to define shoulders, arms, and glutes.',
    requirements: 'Grip socks',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Thursday',
    startTime: '12:15',
    endTime: '13:05',
    capacity: 14,
    spotsTaken: 9,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-15',
    title: 'Hypertrophy for Longevity',
    discipline: 'Strength',
    intensity: 'Medium',
    description: 'Science-backed strength protocols for hormone regulation, metabolic rate, and resilient bone architecture.',
    requirements: 'Training shoes',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Thursday',
    startTime: '17:45',
    endTime: '18:45',
    capacity: 10,
    spotsTaken: 4,
    room: 'The Loft Arena',
    image: STRENGTH_IMAGE
  },

  // Friday
  {
    id: 'cls-16',
    title: 'Pure Core & Spine Reformer',
    discipline: 'Pilates',
    intensity: 'Medium',
    description: 'Deep transverse abdominis focus, thoracic extension, and scapular stabilization on the carriage.',
    requirements: 'Grip socks',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Friday',
    startTime: '08:00',
    endTime: '08:55',
    capacity: 12,
    spotsTaken: 7,
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-17',
    title: 'Friday Glow HIIT & Release',
    discipline: 'HIIT',
    intensity: 'High',
    description: 'Empowering 35-minute burn followed by a 15-minute myofascial rolling and breath relaxation session.',
    requirements: 'Clean trainers',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Friday',
    startTime: '16:30',
    endTime: '17:25',
    capacity: 14,
    spotsTaken: 6,
    room: 'The Kinetic Studio',
    image: STRENGTH_IMAGE
  },
  {
    id: 'cls-18',
    title: 'Acoustic Soul Vinyasa',
    discipline: 'Yoga',
    intensity: 'Low',
    description: 'Intimate evening flow accompanied by live acoustic instrumentation and sandalwood aromatherapy.',
    requirements: 'Barefoot',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    instructorRole: 'Master of Breathwork',
    day: 'Friday',
    startTime: '18:30',
    endTime: '19:45',
    capacity: 16,
    spotsTaken: 14,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },

  // Saturday
  {
    id: 'cls-19',
    title: 'Weekend Masterclass: The Reformer Continuum',
    discipline: 'Pilates',
    intensity: 'High',
    description: '75-minute exhaustive full-body masterclass navigating the classical reformer repertoire from prep to teaser.',
    requirements: 'Grip socks',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Saturday',
    startTime: '09:00',
    endTime: '10:15',
    capacity: 12,
    spotsTaken: 11,
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-20',
    title: 'Saturday Kinetic Century Ride',
    discipline: 'Cycling',
    intensity: 'High',
    description: 'High-energy celebration ride with extended endurance climbs and immersive audiovisual choreography.',
    requirements: 'Cleats provided',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Saturday',
    startTime: '10:30',
    endTime: '11:25',
    capacity: 18,
    spotsTaken: 17, // 1 spot left!
    room: 'The Sound Amphitheatre',
    image: PILATES_IMAGE
  },
  {
    id: 'cls-21',
    title: 'Empowerment Kettlebell & SOMA',
    discipline: 'Strength',
    intensity: 'Medium',
    description: 'Refined technique clinic focusing on Turkish get-ups, clean-and-press, and breath bracing.',
    requirements: 'Flat trainers',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    instructorRole: 'Director of Strength',
    day: 'Saturday',
    startTime: '12:00',
    endTime: '13:00',
    capacity: 10,
    spotsTaken: 5,
    room: 'The Loft Arena',
    image: STRENGTH_IMAGE
  },

  // Sunday
  {
    id: 'cls-22',
    title: 'Sunday Rebirth: Breath, Sound & Restorative',
    discipline: 'Yoga',
    intensity: 'Low',
    description: 'Deep nervous system reboot with supported bolsters, diaphragmatic pranayama, and 432Hz sound baths.',
    requirements: 'Warm cozy layers',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    instructorRole: 'Master of Breathwork',
    day: 'Sunday',
    startTime: '09:30',
    endTime: '11:00',
    capacity: 18,
    spotsTaken: 13,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-23',
    title: 'Sunday Sculpt & Barre Harmony',
    discipline: 'Barre',
    intensity: 'Medium',
    description: 'Graceful alignment, pelvic floor conditioning, and micro-pulse endurance to reset your week.',
    requirements: 'Grip socks',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    instructorRole: 'Kinetic Rhythm Lead',
    day: 'Sunday',
    startTime: '11:30',
    endTime: '12:20',
    capacity: 14,
    spotsTaken: 10,
    room: 'The Sunlit Sanctuary',
    image: HERO_IMAGE
  },
  {
    id: 'cls-24',
    title: 'Restorative Reformer Release',
    discipline: 'Pilates',
    intensity: 'Low',
    description: 'Low-tension spring stretches, hip openers, and spine decompression to ease Sunday tension before the new week.',
    requirements: 'Grip socks',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    instructorRole: 'Head of Somatic Movement',
    day: 'Sunday',
    startTime: '16:00',
    endTime: '16:55',
    capacity: 12,
    spotsTaken: 8,
    room: 'The Reformer Vault',
    image: PILATES_IMAGE
  }
];

export const INITIAL_MEMBERSHIPS: Membership[] = [
  {
    id: 'mem-1',
    name: 'The Essential Sanctuary',
    price: 149,
    billingCycle: 'month',
    classesPerMonth: 4,
    sortOrder: 1,
    featured: false,
    badge: 'Curated Rhythm',
    features: [
      '4 boutique classes across all 6 disciplines per billing month',
      'Complimentary organic herbal tea & botanical apothecary bar',
      '7-day advance booking calendar window',
      'Full access to luxury rain showers & Dyson styling suites',
      '1 guest pass per quarter'
    ]
  },
  {
    id: 'mem-2',
    name: 'The Kinetic Collective',
    price: 289,
    billingCycle: 'month',
    classesPerMonth: 12,
    sortOrder: 2,
    featured: true, // "Most Popular"
    badge: 'Most Popular',
    features: [
      '12 boutique classes per month with rollover flexibility',
      'Priority 14-day booking window ahead of public calendar',
      'Unlimited hydrothermal suite & eucalyptus steam access',
      'Complimentary custom grip socks & laundry locker bag',
      '2 monthly complimentary guest passes',
      '10% sanctuary boutique & apothecary discount'
    ]
  },
  {
    id: 'mem-3',
    name: 'MWS Enterprise',
    price: 420,
    billingCycle: 'month',
    classesPerMonth: 'Unlimited',
    sortOrder: 3,
    featured: false,
    badge: 'Private Patron',
    features: [
      'Unlimited classes across Yoga, HIIT, Pilates, Strength, Barre & Cycling',
      'Dedicated permanent cedar locker with complimentary wash service',
      'Instant guaranteed waitlist leapfrogging & VIP conciergerie',
      'Unlimited guest passes (1 friend per session, space permitting)',
      'Monthly private 1-on-1 kinetic assessment & postural scan',
      'Invitation to seasonal closed-door wellness retreats'
    ]
  }
];

export const CLASS_PACKAGES: ClassPackage[] = [
  {
    id: 'pkg-1',
    name: 'Single Drop-In',
    sessions: 1,
    price: 38,
    perSessionPrice: 38,
    validityMonths: 1
  },
  {
    id: 'pkg-2',
    name: '5-Session Ritual',
    sessions: 5,
    price: 175,
    perSessionPrice: 35,
    validityMonths: 3,
    popular: true
  },
  {
    id: 'pkg-3',
    name: '10-Session Immersion',
    sessions: 10,
    price: 320,
    perSessionPrice: 32,
    validityMonths: 6
  },
  {
    id: 'pkg-4',
    name: '20-Session Transformation',
    sessions: 20,
    price: 580,
    perSessionPrice: 29,
    validityMonths: 12
  }
];

export const FLOOR_STAFF_SCHEDULE: FloorStaffSchedule[] = [
  {
    id: 'flr-1',
    instructorId: 'inst-1',
    instructorName: 'Elena Rostova',
    day: 'Monday',
    shiftHours: '06:30 – 14:00',
    floorZone: 'The Reformer Vault & Somatic Suite',
    onDutyNow: true
  },
  {
    id: 'flr-2',
    instructorId: 'inst-2',
    instructorName: 'Maya Chen-Vance',
    day: 'Monday',
    shiftHours: '14:00 – 21:00',
    floorZone: 'The Loft Arena & Kinetic Studio',
    onDutyNow: false
  },
  {
    id: 'flr-3',
    instructorId: 'inst-3',
    instructorName: 'Sariyah Al-Mansoor',
    day: 'Tuesday',
    shiftHours: '09:00 – 17:00',
    floorZone: 'The Sunlit Sanctuary & Sound Atrium',
    onDutyNow: false
  },
  {
    id: 'flr-4',
    instructorId: 'inst-4',
    instructorName: 'Camille Delacroix',
    day: 'Wednesday',
    shiftHours: '12:00 – 20:30',
    floorZone: 'The Sound Amphitheatre & Barre Loft',
    onDutyNow: false
  }
];

export const FACILITY_GALLERY = [
  {
    id: 'fac-1',
    title: 'The Reformer Vault',
    subtitle: 'Custom Canadian maple reformers beneath natural skylights',
    description: 'Designed specifically for low-stimulus focus, with custom acoustic dampening and gentle indirect lighting.',
    image: PILATES_IMAGE,
    tag: 'Movement'
  },
  {
    id: 'fac-2',
    title: 'The Sunlit Sanctuary',
    subtitle: 'Limestone floors, arched mirrors, and 4-meter linen drapes',
    description: 'Our primary ceremonial hall where morning solar angles illuminate breathwork and architectural vinyasa.',
    image: STUDIO_INTERIOR_IMAGE,
    tag: 'Architecture'
  },
  {
    id: 'fac-3',
    title: 'The Sculpt & Strength Loft',
    subtitle: 'Custom brass & matte steel equipment in an open gallery',
    description: 'An empowering strength space stripped of garish branding and gym machismo, engineered for focused female lifting.',
    image: STRENGTH_IMAGE,
    tag: 'Strength'
  },
  {
    id: 'fac-4',
    title: 'The Breath & Sound Atrium',
    subtitle: 'Acoustic geometry engineered for 432Hz crystal alchemy',
    description: 'Curved Venetian plaster walls naturally reflect frequencies, enveloping practitioners in pure somatic stillness.',
    image: HERO_IMAGE,
    tag: 'Restoration'
  },
  {
    id: 'fac-5',
    title: 'The Hydrothermal Plunge Suite',
    subtitle: 'Contrasting 10°C cedar immersion tubs and eucalyptus steam',
    description: 'Accelerate mitochondrial turnover and lymphatic flushing between training rituals in private marble stalls.',
    image: STUDIO_INTERIOR_IMAGE,
    tag: 'Recovery'
  },
  {
    id: 'fac-6',
    title: 'The Botanical Apothecary',
    subtitle: 'Small-batch adaptogens, raw matcha, and cold-pressed botanical infusions',
    description: 'Curated herbal tinctures formulated by clinical herbalists to replenish adrenal reserves post-session.',
    image: PILATES_IMAGE,
    tag: 'Nourishment'
  },
  {
    id: 'fac-7',
    title: 'Private Linen Dressing Suites',
    subtitle: 'Dyson Supersonic stations, Le Labo amenities, and private lockers',
    description: 'Step seamlessly from your sweat session back into your day without ever compromising on luxury or composure.',
    image: STUDIO_INTERIOR_IMAGE,
    tag: 'Sanctuary'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Makua Web Solutions delivered our business website on schedule with exceptional attention to detail. Our online inquiries increased significantly within the first month.',
    author: 'Clara Van Der Bilt',
    role: 'Managing Director',
    discipline: 'Pilates & Strength',
    memberSince: 'Member since 2024'
  },
  {
    quote: 'The caliber of instruction here ruined every other studio for me. The coaches understand the female nervous system at an elite cellular level.',
    author: 'Dr. Vivienne St. Claire',
    role: 'Neuroscientist & Author',
    discipline: 'Vinyasa & Kinetic HIIT',
    memberSince: 'Member since 2023'
  },
  {
    quote: 'The space itself smells of wild sandalwood and cedar. Walking into that sunlit room instantly drops my cortisol before the first song even plays.',
    author: 'Genevieve Moreau',
    role: 'Creative Executive',
    discipline: 'Barre & Cycling',
    memberSince: 'Member since 2024'
  }
];

export const BENEFITS = [
  {
    num: '01',
    title: 'Female Biomechanical Design',
    desc: 'Every apparatus, movement sequence, and loading angle is specifically optimized for female pelvic alignment, hormone cadence, and bone density.'
  },
  {
    num: '02',
    title: 'Architectural Serenity',
    desc: 'Limestone textures, filtered natural sunlight, and noise-isolated chambers replace fluorescent gym bulbs with an intentional sanctuary.'
  },
  {
    num: '03',
    title: 'Intimate Small-Group Ratios',
    desc: 'Capacities capped strictly at 12–18 women per class ensuring real tactile adjustments, form integrity, and personalized coaching.'
  },
  {
    num: '04',
    title: 'Holistic Recovery Rituals',
    desc: 'Hydrothermal contrast plunges, medical-grade eucalyptus steam, and custom adaptogen elixirs designed to lower systemic inflammation.'
  }
];

export const FINE_PRINT_POLICIES = [
  {
    title: 'Billing & Auto-Renewal',
    content: 'All memberships renew on the same calendar day each month. Invoices and receipts are instantly dispatched via email. Members may upgrade or alter their plan tier at any time with prorated adjustments.'
  },
  {
    title: 'Cancellation & Class Windows',
    content: 'We honor a 12-hour cancellation courtesy for all scheduled classes. Late cancellations or unattended bookings forfeit the class credit to protect small group intimacy and waitlist members.'
  },
  {
    title: 'Complimentary Membership Freeze',
    content: 'Members may freeze their membership for up to 60 consecutive days per calendar year with zero fee for travel, medical reasons, or career demands. Simply notify our concierge 72 hours prior.'
  },
  {
    title: 'Refund Policy & Guarantee',
    content: 'Unused class packs carry a 14-day unconditional refund policy. Monthly membership commitments can be discontinued at the close of any billing cycle with 7 days written notice.'
  }
];
