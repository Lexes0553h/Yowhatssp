import { Destination, Service } from './types';

export const curatedDestinations: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Mystical Jungle Palaces & Sacred Heritage',
    description: 'Inhale the scent of incense and wild jasmine. Nestled in Ubud\'s deep emerald valleys or perched high on the limestone cliffs of Uluwatu, discover a sanctuary where spiritual heritage meets high-design modern luxury.',
    location: 'Indonesia',
    rating: 4.85,
    bgImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80', // Luxury jungle pool
    secondaryImages: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'From $1,450 / night',
    highlights: [
      'Clifftop infinity estates with private temples',
      'VIP access to closed ancient temple ceremonies',
      'Curated helicopter tours over Mount Batur',
      'Heirloom silver jewelry masterclass'
    ],
    activities: [
      'Purification ritual with a high priestess',
      'Private organic cooking masterclass with a Michelin-starred chef',
      'Holistic sound bath in a bamboo dome',
      'Guided rainforest trek to secret waterfalls'
    ]
  },
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'Private Overwater Sanctuaries & Azure Lagoons',
    description: 'Surrender to the ultimate overwater luxury. Wake up to the gentle lap of the Indian Ocean beneath your villa, swim alongside majestic manta rays, and dine under the stars on a private sandbank created solely for you.',
    location: 'Indian Ocean',
    rating: 4.9,
    bgImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=80', // Beautiful turquoise aerial
    secondaryImages: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    ],
    price: 'From $2,800 / night',
    highlights: [
      'Chartered superyacht sunset cruising',
      '24/7 personal butler & dedicated private chef',
      'Undersea wine cellar private degustation',
      'Coral propagation with a marine biologist'
    ],
    activities: [
      'Deep-sea submarine safari',
      'Bespoke sandbank wellness therapy',
      'Night diving with bioluminescent plankton',
      'Traditional Dhoni sailing workshop'
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    tagline: 'Imperial Halong Retreats & Ancient Lantern Rivers',
    description: 'Wander through the historic lantern-lit streets of Hoi An or sail through the dramatic karst labyrinths of Ha Long Bay aboard a custom-designed luxury junk. Experience a rich tapestry of imperial history and gourmet excellence.',
    location: 'Southeast Asia',
    rating: 4.88,
    bgImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80', // Ha Long Bay
    secondaryImages: [
      'https://images.unsplash.com/photo-15559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'From $1,600 / night',
    highlights: [
      'Chartered seaplane flight over Halong Bay',
      'Private imperial dinners in Hue Citadel vaults',
      'VIP French-colonial luxury villas',
      'Artistic heritage custom silk tailoring'
    ],
    activities: [
      'Sunrise kayaking in hidden lagoon caves',
      'Behind-the-scenes street food hunt with a culinary critic',
      'Traditional lacquer art private masterclass',
      'Holistic Vietnamese herbal therapy'
    ]
  }
];

export const luxuryServices: Service[] = [
  {
    id: 'charter',
    title: 'Private Aviation & Yacht Charters',
    description: 'Seamless point-to-point private jet transfers paired with custom superyacht charters, guaranteeing complete discretion, flexible itineraries, and absolute freedom.',
    iconName: 'Plane',
    details: [
      'Customized onboard catering curated by elite chefs',
      'VIP fast-track customs and hangar side access',
      'Superyachts fully staffed with diving and watersports instructors',
      'Helicopter transfers to remote estates'
    ]
  },
  {
    id: 'curator',
    title: 'Bespoke Experience Curators',
    description: 'Our hyper-connected local curators unlock access to ultra-exclusive events, Michelin-starred chefs, private historical landmarks, and world-class artisans.',
    iconName: 'Compass',
    details: [
      '24/7 hyper-personalized concierge service',
      'Exclusive bookings at fully booked dining establishments',
      'VIP backstage access and gallery preview events',
      'Custom travel photography crew companion'
    ]
  },
  {
    id: 'wellness',
    title: 'Immersive Wellness & Retreats',
    description: 'Holistic health and spiritual rejuvenation journeys custom-tailored by leading wellness practitioners, high-priestesses, and master healers.',
    iconName: 'Sparkles',
    details: [
      'Personalized preventative medical spa therapies',
      'Private meditation inside sacred caves and monasteries',
      'Custom organic nutrition planning',
      'Ayurvedic and regional ancestral therapies'
    ]
  },
  {
    id: 'villas',
    title: 'Elite Ultra-Luxury Villas',
    description: 'A curated selection of the world\'s most breathtaking private estates, remote islands, and clifftop sanctuaries, reserved for those who demand the exceptional.',
    iconName: 'Crown',
    details: [
      'Fully vetted properties with absolute architectural prestige',
      'In-house hospitality crews (butlers, private security, spa therapists)',
      'Highly advanced security systems and guaranteed complete privacy',
      'Tailored child-minding and wellness specialists'
    ]
  }
];
