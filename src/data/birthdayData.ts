import { SystemStat, MemoryItem, AchievementItem } from '../types.ts';

// Verified assets
export const ASSETS = {
  CYBER_SETUP: '/pic1.jpeg',
  SIBLING_HACKATHON: '/pic2.jpeg',
  ARCADE_NOSTALGIA: '/pic3.jpeg',
  DANIEL_AVATAR: '/pic4.jpeg',
};

export const SIBLING_LETTER_DEFAULT = `TO: AGENT DANIEL (CODE: LEVEL_17)
FROM: YOUR PROUD OLDER SIBLING
SUBJECT: CLASSIFIED OPERATIONAL ASSESSMENT // 17 YEARS OF EXCELLENCE

Daniel,

It feels like yesterday you were taking apart TV remotes, spamming keys on old family computers, and asking how video games actually worked under the hood. Today, watching you spin up Linux VMs, automate scripts, analyze protocols, and dive deep into cybersecurity with genuine relentless passion blows my mind.

17 is a huge milestone. You have this rare blend of sharp technical intellect, unstoppable curiosity, and that signature brand of chaotic humor that makes everyone around you smile (even when you're roasting me or unplugging the Wi-Fi to test latency).

The world of technology and ethical security needs people who are brave enough to test limits, curious enough to understand how systems tick, and empathetic enough to protect others. You embody all of that.

Keep tearing code down, keep building wild projects, keep breaking things ethically, and never lose that fire. No matter how complicated life or code gets, remember I've always got your back as your player two.

Level 17 is going to be your strongest run yet. Let's conquer it.

Happy 17th Birthday!`;

export const SYSTEM_STATS: SystemStat[] = [
  {
    id: 'coding',
    name: 'Coding',
    value: 99,
    category: 'core',
    description: 'Algorithmic speed, architecture cleanliness & debugging in the dark',
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    value: 100,
    category: 'intelligence',
    description: 'Unquenchable desire to take systems apart and know how they tick',
  },
  {
    id: 'hacking',
    name: 'Hacking Skills',
    value: 87,
    category: 'cyber',
    description: 'White-hat pentesting, CTF puzzle solving & network intuition',
  },
  {
    id: 'chaos',
    name: 'Chaos',
    value: 94,
    category: 'chaos',
    description: 'Unpredictable energy, spicy memes & unconventional solutions',
  },
  {
    id: 'sibling_annoyance',
    name: 'Annoying Older Sibling',
    value: 100,
    category: 'chaos',
    description: 'Maxed-out trolling efficiency, borrowing tech without asking',
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    value: 98,
    category: 'intelligence',
    description: 'High processing speed, analytical reasoning & pattern recognition',
  },
  {
    id: 'birthday_level',
    name: 'Birthday Level',
    value: 17,
    category: 'core',
    description: 'Current global clearance tier — Level 17 unlocked today',
  },
];

export const MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    codeName: 'MEM_001_MIDNIGHT_BATTATION.DAT',
    title: 'The Legendary Bedroom Tech Lab',
    timestamp: '2026-11-14 // 02:47 AM',
    year: '2026',
    image: ASSETS.CYBER_SETUP,
    summary: 'Dual glowing monitors, terminal windows flashing green, Raspberry Pi boards, and a soldering iron on standby.',
    classifiedNote: 'I walked in at 3 AM to find you neck-deep in a custom script, claiming you "just needed five more minutes to fix this memory leak." Your commitment to building is legendary.',
    tags: ['Tech Lab', 'Late Night Coding', 'Linux'],
    clearanceLevel: 'TOP SECRET // CLASSIFIED',
  },
  {
    id: 'mem-2',
    codeName: 'MEM_002_COOP_HACKATHON.LOG',
    title: 'Sibling Duo Hackathon Sprint',
    timestamp: '2023-08-22 // 19:15 PM',
    year: '2023',
    image: ASSETS.SIBLING_HACKATHON,
    summary: 'Pizza crusts, energy drinks, and two laptops pinned to the same GitHub repo racing against the countdown timer.',
    classifiedNote: 'Remember when our build crashed 15 minutes before demo and you spotted the rogue semicolon that saved the entire project? Best co-op teammate ever.',
    tags: ['Hackathon', 'Sibling Co-op', 'Victory'],
    clearanceLevel: 'CONFIDENTIAL',
  },
  {
    id: 'mem-3',
    codeName: 'MEM_003_RETRO_GENESIS.BIN',
    title: 'Where the Passion Began: Retro Arcades',
    timestamp: '2016-04-12 // 15:30 PM',
    year: '2016',
    image: ASSETS.ARCADE_NOSTALGIA,
    summary: 'Standing on tiptoes in front of arcade cabinets, trying to figure out how joystick inputs translate to on-screen logic.',
    classifiedNote: 'You didn’t just want to play games—you wanted to know how the machines worked inside the wood cabinet. The signs of a hacker were visible from day one.',
    tags: ['Childhood', 'Origins', 'Retro Gaming'],
    clearanceLevel: 'RESTRICTED',
  },
  {
    id: 'mem-4',
    codeName: 'MEM_004_AGENT_PROFILE.SEC',
    title: 'Codename: Nova — Level 17 Dossier',
    timestamp: '2022-10-10 // ACTIVE',
    year: '2022',
    image: ASSETS.DANIEL_AVATAR,
    summary: 'Current biometric credentials confirmed. Security clearance upgraded to Level 17.',
    classifiedNote: 'From curious kid to brilliant 17-year-old ethical hacker. The future of tech is lucky to have your mind on the good guys’ team.',
    tags: ['Agent Dossier', 'Level 17', 'Unstoppable'],
    clearanceLevel: 'LEVEL 17 AUTHORIZED',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    code: 'XP_CYBER_10',
    title: '+10 Cybersecurity XP',
    points: '+10 XP',
    description: 'Mastery of ethical penetration testing, defense strategies & network intuition',
    iconName: 'ShieldAlert',
    unlocked: true,
  },
  {
    id: 'ach-2',
    code: 'XP_CODE_15',
    title: '+15 Coding XP',
    points: '+15 XP',
    description: 'High-throughput code refactoring, zero-bug architecture & terminal speed',
    iconName: 'Code2',
    unlocked: true,
  },
  {
    id: 'ach-3',
    code: 'STAT_INDEP_20',
    title: '+20 Independence',
    points: '+20 STAT',
    description: 'Navigating life at 17, taking big autonomous leaps, and owning your path',
    iconName: 'Compass',
    unlocked: true,
  },
  {
    id: 'ach-4',
    code: 'STAT_CHAOS_50',
    title: '+50 Sibling Chaos',
    points: '+50 CHAOS',
    description: 'Elite-tier banter, stealing phone chargers, and winning every argument',
    iconName: 'Flame',
    unlocked: true,
  },
  {
    id: 'ach-5',
    code: 'LEGEND_17',
    title: '17 YEARS OF LEGEND',
    points: 'TROPHY UNLOCKED',
    description: 'Honoring 17 full revolutions around the sun of being an incredible brother',
    iconName: 'Award',
    unlocked: true,
  },
];

export const SECRET_EASTER_EGG_DATA = {
  validCodes: ['1337', 'daniel17', 'hack_the_planet', 'sudo birthday', 'cake', 'protocol17'],
  title: 'CLASSIFIED VAULT OVERRIDE: ACCESS GRANTED',
  subtitle: 'TOP SECRET SIBLING DIRECTIVE // CLEARANCE OMEGA-17',
  jokes: [
    'Q: Why do programmers wear glasses? A: Because they don\'t C#.',
    'Q: How did Daniel hack his 17th birthday cake? A: He injected a SQL command: DROP TABLE AGE; INSERT INTO AGE (17);',
    'Rule #1 of Sibling CTF: The older sibling is always right. Rule #2: When the older sibling is wrong, see Rule #1.',
  ],
  siblingCoupons: [
    {
      code: 'COUPON_01',
      title: '1x Unlimited Pizza & Boba Sponsor',
      detail: 'Redeemable anytime during our next co-op late-night coding or gaming session. No expiration.',
    },
    {
      code: 'COUPON_02',
      title: '1x Rubber Duck Sibling Duty',
      detail: 'I will sit and listen to you explain any weird compiler bug or network packet anomaly for 60 minutes.',
    },
    {
      code: 'COUPON_03',
      title: '1x Sibling Truce Token',
      detail: 'Instantly win any minor sibling debate of your choosing over the next 365 days.',
    },
  ],
  bonusNote: `You actually checked the terminal and cracked the easter egg! That proves you are truly a hacker at heart, Daniel. Never lose this curiosity. You're going to achieve gigantic things! - Your Sibling ❤️`,
};
