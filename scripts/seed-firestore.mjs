import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const required = ['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing Firebase env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
});
const db = getFirestore(app);

const image = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1400&q=82`;

const projects = [
  {
    slug: 'arithmetic-destination',
    title: 'Arithmetic Destination',
    logline: 'Educational puzzle game where number mastery opens new routes through a stylized learning world.',
    description: 'Educational puzzle game designed to turn arithmetic practice into progression, discovery, and skill confidence.',
    status: 'prototype',
    genre: 'Educational Puzzle',
    platform: ['PC', 'Mobile'],
    progress: 46,
    coverImage: image('photo-1515879218367-8466d910aaa4'),
    trailerUrl: '',
    screenshots: [image('photo-1516321318423-f06f85e504b3')],
    story: 'Arithmetic Destination frames learning as a journey through challenges, gates, and discoveries where every solved problem moves the player forward.',
    features: ['Progressive arithmetic challenge paths', 'Puzzle-first learning loops', 'Friendly mastery feedback', 'Expandable lesson worlds'],
    roadmap: [{ phase: 'Prototype', detail: 'Core puzzle loop and learning progression.', status: 'active' }],
    gallery: [image('photo-1550751827-4bd374c3f58b')],
    featured: true,
    worldType: 'Learning World'
  },
  {
    slug: 'king-summon',
    title: 'King Summon',
    logline: 'Multiplayer strategy game built around summoning, territory pressure, and kingdom-scale decision making.',
    description: 'Multiplayer strategy experience focused on summons, faction control, and readable competitive depth.',
    status: 'concept',
    genre: 'Multiplayer Strategy',
    platform: ['PC'],
    progress: 34,
    coverImage: image('photo-1605810230434-7631ac76ec81'),
    trailerUrl: '',
    screenshots: [image('photo-1542751371-adc38448a05e')],
    story: 'King Summon centers on kingdoms that rise through summoned champions, strategic timing, and contested maps built for competitive sessions.',
    features: ['Summon-based tactical economy', 'Faction map pressure', 'Multiplayer match structure', 'Expandable champion roster'],
    roadmap: [{ phase: 'Systems Design', detail: 'Match rules, summon economy, and faction identity.', status: 'active' }],
    gallery: [image('photo-1511512578047-dfb367046420')],
    featured: true,
    worldType: 'Strategy Arena'
  },
  {
    slug: 'on-earth',
    title: 'On Earth',
    logline: 'Open world survival concept about presence, scarcity, and discovery across a grounded living environment.',
    description: 'Open world survival concept exploring exploration, resource pressure, environmental storytelling, and player-made routes.',
    status: 'concept',
    genre: 'Open World Survival',
    platform: ['PC', 'Console'],
    progress: 28,
    coverImage: image('photo-1500530855697-b586d89ba3ee'),
    trailerUrl: '',
    screenshots: [image('photo-1500534314209-a25ddb2bd429')],
    story: 'On Earth imagines survival as a quiet confrontation with landscape, weather, shelter, and the mystery of what remains in the world.',
    features: ['Environmental survival systems', 'Exploration-led world structure', 'Crafting and shelter concepts', 'Grounded cinematic tone'],
    roadmap: [{ phase: 'World Concept', detail: 'Biome language, survival pillars, and exploration rules.', status: 'planned' }],
    gallery: [image('photo-1441974231531-c6227db76b6e')],
    featured: true,
    worldType: 'Survival World'
  },
  {
    slug: 'vastness',
    title: 'Vastness',
    logline: 'Fantasy survival universe built for scale, myth, creatures, and dangerous long-distance journeys.',
    description: 'Fantasy survival universe that combines mythic exploration, hostile landscapes, and future transmedia potential.',
    status: 'concept',
    genre: 'Fantasy Survival',
    platform: ['PC', 'Console'],
    progress: 31,
    coverImage: image('photo-1518709268805-4e9042af2176'),
    trailerUrl: '',
    screenshots: [image('photo-1519681393784-d120267933ba')],
    story: 'Vastness follows travelers moving through mythic distance, ancient forces, and survival systems that make scale feel emotional and dangerous.',
    features: ['Large-scale fantasy world pillars', 'Creature and myth systems', 'Survival journey mechanics', 'Animation-ready lore moments'],
    roadmap: [{ phase: 'Universe Bible', detail: 'Mythology, regions, survival rules, and character archetypes.', status: 'active' }],
    gallery: [image('photo-1506744038136-46273834b3fb')],
    featured: true,
    worldType: 'Fantasy Universe'
  }
];

const roadmap = [
  { year: '2022', title: 'Foundation', body: 'NNGTW begins with founder-led creative exploration across 3D design, animation, and game development.' },
  { year: '2024', title: 'Production Experience', body: 'Production workflows mature through prototype building, visual development, and interactive systems practice.' },
  { year: '2026', title: 'NNGTW Launch', body: 'Public studio identity, web platform, Firestore-backed content system, and project slate presentation launch.' },
  { year: '2027', title: 'First Commercial Release', body: 'Target the first commercial release from the NNGTW slate with market validation and publishing readiness.' },
  { year: '2030', title: 'Independent Studio Growth', body: 'Scale toward an independent studio with original IP, animation capacity, and repeatable production systems.' }
];

await setDoc(doc(db, 'settings', 'studio'), {
  studioName: 'NNGTW Studio',
  tagline: 'Imagine • Explore • Evolve',
  email: 'hello@nngtw.studio',
  linkedIn: 'https://www.linkedin.com/company/nngtw-studio',
  discord: 'https://discord.gg/nngtw',
  heroStatement: 'Building original worlds, games, animation, characters, and interactive experiences.',
  investorStatement: 'NNGTW Studio is building toward a scalable creative studio model where original game worlds, animation, and interactive systems become owned entertainment IP.'
});
await setDoc(doc(db, 'settings', 'roadmap'), { milestones: roadmap });
for (const project of projects) await setDoc(doc(db, 'projects', project.slug), { ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
await setDoc(doc(db, 'news', 'studio-platform-launch'), {
  title: 'NNGTW Studio platform launch',
  slug: 'studio-platform-launch',
  excerpt: 'NNGTW Studio introduces a Firestore-powered platform for projects, media, and studio updates.',
  publishedAt: new Date().toISOString(),
  status: 'published'
});
await setDoc(doc(db, 'users', 'founder-reagan-sagolsem'), {
  email: 'hello@nngtw.studio',
  role: 'owner',
  displayName: 'Reagan Sagolsem'
});
console.log('Seeded NNGTW Firestore content.');
