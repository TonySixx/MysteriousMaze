window.scene = undefined;
window.walls = [];
window.highWallAreas = [];
window.torches = [];
window.lightManager = undefined;

window.playerLevel = 1;
window.playerGold = 0;

window.MAX_VISIBLE_LIGHTS = 10; // Default value
window.qualityFactor = 1;

window.renderer = undefined;
window.camera = undefined;
window.maze = undefined;
window.composer = undefined;
window.nebulaMaterial = undefined;
window.nebula = undefined;
window.floatingObjects = [];

window.bestTime = Infinity;

window.magicBalls = [];
window.merchants = [];

window.damageTexts = [];
window.goldTexts = [];
window.expTexts = [];

window.teleportParticles = [];
window.teleportParticleSystems = [];
window.mainBossDragons = [];
window.bossChestAndPortalData = null;
window.chestMixer = null;
window.mainBossEntryData = null;
window.explosions = [];
window.iceExplosions = [];
window.frostAuras = [];
window.chainExplosions = [];
window.chainLightningsVisual = [];
window.fireballExplosions = [];
window.interactiveObjects = [];
window.staffSwing = null;
window.deathParticles = [];
window.playerSpeed = 6.5;

window.activeVines = [];
window.seedBurstParticleSystems = [];
window.obsidianBlastParticleSystems = [];
window.voidRifts = [];
window.entanglementBeams = [];
window.timeDilationEffects = [];
window.poisonClouds = [];
window.acidSprays = [];

window.activeTeleport = null;
window.teleportEffects = [];

window.bossSpawnTimeout = undefined;
window.bossCountdownInterval = undefined;

window.staffModel = undefined;

window.merchantAnimationId = null;
window.armorMerchantAnimationId = null;
window.bossChestAndPortalAnimationId = null;

window.currentBackgroundMusic = null;
window.actualSeedText = null;
window.totalBossesInMaze = 0;
window.goalReached = false;

window.minimapUsed = false;

window.timeWarpEffects = [];
window.temporalEchoes = [];
window.chronoNovaEffects = [];

window.acidExplosions = [];
window.poisonParticles = [];

window.glacialNovaEffects = [];
window.icicleBullets = [];
window.iceTrails = [];
window.frostAuraEffects = [];

window.meteors = [];
window.meteorExplosions = [];
window.infernoWaves = [];
window.phoenixRebirthEffects = [];

window.arcaneProjectiles = []
window.dimensionalRifts = []
window.arcaneShieldEffect = null

window.bloodVortexes = []
window.bloodRitualEffect = null
window.bloodLances = [];

window.lightningStrikes = [];
window.ballLightnings = [];
window.electromagneticPulse = null;

window.darkMistEffect = null;
window.manaDrainEffect = null;

export const playerDefaultSpeed = 6.5;

export const floorMusic = {
  1: "music/msc_lost.mp3",
  2: "music/msc_magic_in_the_air.mp3",
  3: "music/msc_lost.mp3",
  4: "music/msc_magic_in_the_air.mp3",
  5: "music/msc_frozen_heart.mp3",
  6: "music/msc_fire_heart.mp3",
  7: "music/msc_frozen_heart.mp3",
  8: "music/msc_runes.mp3",
  9: "music/msc_magic_in_the_air.mp3",
  10: "music/msc_lost.mp3",
  11: "music/msc_fire_heart.mp3",
  12: "music/msc_frozen_heart.mp3",
  13: "music/msc_lost.mp3",
  999: "music/msc_camp.mp3",
  100: "music/msc_boss_fight.mp3",
  101: "music/msc_boss_fight2.mp3",
  102: "music/msc_devils_party.mp3",
  103: "music/msc_match_from_heaven.mp3",
  104: "music/msc_boss_fight.mp3",
  105: "music/msc_devils_party.mp3",
  106: "music/msc_boss_fight2.mp3",
  107: "music/msc_the_hunt.mp3",
  108: "music/msc_castle_in_the_sky.mp3",
  109: "music/msc_boss_fight2.mp3",
  110: "music/msc_boss_fight.mp3",
  110: "music/msc_devils_party.mp3",

};

export const textureSets = [
  {
    wallTexture: "textures/wall.jpg",
    ceilingTexture: "textures/wall.jpg",
    floorTexture: "textures/floor.jpg",
    specialTextures: [
      "textures/wall.jpg",
      "textures/wall.jpg",
      "textures/wall.jpg",
    ],
    torchColor: { light: 0x00bfff, particles: 0x1e90ff }, // Magical blue
  },
  {
    wallTexture: "textures/wall-egypt.jpg",
    ceilingTexture: "textures/wall-egypt.jpg",
    floorTexture: "textures/floor-egypt.jpg",
    specialTextures: [
      "textures/wall-egypt-sign-1.jpg",
      "textures/wall-egypt-sign-2.jpg",
      "textures/wall-egypt-sign-3.jpg",
    ],
    torchColor: { light: 0xffa500, particles: 0xff4500 }, // Original orange color
  },
  {
    wallTexture: "textures/wall-jungle.jpg",
    ceilingTexture: "textures/wall-jungle.jpg",
    floorTexture: "textures/floor-jungle.jpg",
    specialTextures: [
      "textures/wall-jungle-sign-1.jpg",
      "textures/wall-jungle-sign-2.jpg",
      "textures/wall-jungle-sign-3.jpg",
    ],
    torchColor: { light: 0x00ff7f, particles: 0x2ecc71 }, // Emerald green
  },
  {
    wallTexture: "textures/wall-mythical.jpg",
    ceilingTexture: "textures/wall-mythical.jpg",
    floorTexture: "textures/floor.jpg",
    specialTextures: [
      "textures/wall-mythical-sign-1.jpg",
      "textures/wall-mythical-sign-2.jpg",
      "textures/wall-mythical-sign-3.jpg",
    ],
    torchColor: { light: 0xa35ee8, particles: 0xa35ee8 }, // Amethyst purple
  },
  {
    wallTexture: "textures/wall-obsidian.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-obsidian.jpg",
    specialTextures: [
      "textures/wall-obsidian-sign-1.jpg",
      "textures/wall-obsidian-sign-2.jpg",
      "textures/wall-obsidian-sign-3.jpg",
    ],
    torchColor: { light: 0x9896ff, particles: 0x9896ff },
  },
  {
    wallTexture: "textures/wall-obsidian.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-obsidian.jpg",
    specialTextures: [
      "textures/wall-obsidian-sign-1.jpg",
      "textures/wall-obsidian-sign-2.jpg",
      "textures/wall-obsidian-sign-3.jpg",
    ],
    torchColor: { light: 0xfdff6b, particles: 0xfdff6b },
  },
  {
    wallTexture: "textures/wall-abyss.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-abyss.jpg",
    specialTextures: [
      "textures/wall-abyss.jpg",
      "textures/wall-abyss.jpg",
      "textures/wall-abyss.jpg",
    ],
    torchColor: { light: 0x69ffb9, particles: 0x69ffb9 },
  },
  {
    wallTexture: "textures/wall-abyss.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-abyss.jpg",
    specialTextures: [
      "textures/wall-abyss.jpg",
      "textures/wall-abyss.jpg",
      "textures/wall-abyss.jpg",
    ],
    torchColor: { light: 0xd6fffc, particles: 0xd6fffc },
  },
  {
    wallTexture: "textures/wall-light.jpg",
    floorTexture: "textures/floor-egypt.jpg",
    ceilingTexture: "textures/wall-light.jpg",
    specialTextures: [
      "textures/wall-light.jpg",
      "textures/wall-light.jpg",
      "textures/wall-light.jpg",
    ],
    torchColor: { light: 0xffa500, particles: 0xff4500 }, // Original orange color
  },
  {
    wallTexture: "textures/wall-light.jpg",
    floorTexture: "textures/floor-egypt.jpg",
    ceilingTexture: "textures/wall-light.jpg",
    specialTextures: [
      "textures/wall-light.jpg",
      "textures/wall-light.jpg",
      "textures/wall-light.jpg",
    ],
    torchColor: { light: 0xc5ff7a, particles: 0xc5ff7a },
  },
  {
    wallTexture: "textures/wall-undead.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-undead.jpg",
    specialTextures: [
      "textures/wall-undead.jpg",
      "textures/wall-undead.jpg",
      "textures/wall-undead.jpg",
    ],
    torchColor: { light: 0x45ff93, particles: 0x45ff93 },
  },
  {
    wallTexture: "textures/wall-undead.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-undead.jpg",
    specialTextures: [
      "textures/wall-undead.jpg",
      "textures/wall-undead.jpg",
      "textures/wall-undead.jpg",
    ],
    torchColor: { light: 0x57fa6b, particles: 0x57fa6b },
  },
  {
    wallTexture: "textures/wall-ice.jpg",
    floorTexture: "textures/floor-blue.jpg",
    ceilingTexture: "textures/wall-ice.jpg",
    specialTextures: [
      "textures/wall-ice.jpg",
      "textures/wall-ice.jpg",
      "textures/wall-ice.jpg",
    ],
    torchColor: { light: 0x94e4ff, particles: 0x94e4ff },
  },
  {
    wallTexture: "textures/wall-ice.jpg",
    floorTexture: "textures/floor-blue.jpg",
    ceilingTexture: "textures/wall-ice.jpg",
    specialTextures: [
      "textures/wall-ice.jpg",
      "textures/wall-ice.jpg",
      "textures/wall-ice.jpg",
    ],
    torchColor: { light: 0xe3ebff, particles: 0xe3ebff },
  },
  {
    wallTexture: "textures/wall-hell.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-hell.jpg",
    specialTextures: [
      "textures/wall-hell.jpg",
      "textures/wall-hell.jpg",
      "textures/wall-hell.jpg",
    ],
    torchColor: { light: 0xff9e9e, particles: 0xff9e9e },
  },
  {
    wallTexture: "textures/wall-hell.jpg",
    floorTexture: "textures/floor.jpg",
    ceilingTexture: "textures/wall-hell.jpg",
    specialTextures: [
      "textures/wall-hell.jpg",
      "textures/wall-hell.jpg",
      "textures/wall-hell.jpg",
    ],
    torchColor: { light: 0xffab87, particles: 0xffab87 },
  },
  {
    wallTexture: "textures/wall-purple-stone.jpg",
    floorTexture: "textures/floor-purple.jpg",
    ceilingTexture: "textures/wall-purple-stone.jpg",
    specialTextures: [
      "textures/wall-purple-stone.jpg",
      "textures/wall-purple-stone.jpg",
      "textures/wall-purple-stone.jpg",
    ],
    torchColor: { light: 0xce8fff, particles: 0xce8fff },
  },
  {
    wallTexture: "textures/wall-red.jpg",
    floorTexture: "textures/floor-dark.jpg",
    ceilingTexture: "textures/wall-red.jpg",
    specialTextures: [
      "textures/wall-red.jpg",
      "textures/wall-red.jpg",
      "textures/wall-red.jpg",
    ],
    torchColor: { light: 0xff3d3d, particles: 0xff3d3d },
  },
  {
    wallTexture: "textures/wall-triangle.jpg",
    floorTexture: "textures/floor-diamond.jpg",
    ceilingTexture: "textures/wall-triangle.jpg",
    specialTextures: [
      "textures/wall-triangle.jpg",
      "textures/wall-triangle.jpg",
      "textures/wall-triangle.jpg",
    ],
    torchColor: { light: 0x708aff, particles: 0x708aff },
  },
  {
    wallTexture: "textures/wall-dark.jpg",
    floorTexture: "textures/floor-dark.jpg",
    ceilingTexture: "textures/wall-dark.jpg",
    specialTextures: [
      "textures/wall-dark.jpg",
      "textures/wall-dark.jpg",
      "textures/wall-dark.jpg",
    ],
    torchColor: { light: 0xa496ff, particles: 0xa496ff },
  },
  {
    wallTexture: "textures/wall-tur2.jpg",
    floorTexture: "textures/floor-gray.jpg",
    ceilingTexture: "textures/wall-tur2.jpg",
    specialTextures: [
      "textures/wall-tur2.jpg",
      "textures/wall-tur2.jpg",
      "textures/wall-tur2.jpg",
    ],
    torchColor: { light: 0x9cfff3, particles: 0x9cfff3 },
  },
];

export const floorsConfig = {
  1: {
    minSize: 20,
    maxSize: 25,
    textureSets: textureSets.slice(0, 2),
    hallConfig: {
      probability: 0.03,
      minSize: 2,
      maxSize: 3
    },
    bossProbability: 0.99,
    traps: {
      enabled: false,
      probability: 0
    }
  },
  2: {
    minSize: 25,
    maxSize: 35,
    textureSets: textureSets.slice(2, 4),
    hallConfig: {
      probability: 0.02,
      minSize: 2,
      maxSize: 4
    },
    bossProbability: 0.9,
    traps: {
      enabled: false,
    }
  },
  3: {
    minSize: 30,
    maxSize: 40,
    textureSets: textureSets.slice(4, 6),
    hallConfig: {
      probability: 0.04,
      minSize: 2,
      maxSize: 5
    },
    bossProbability: 0.9,
    traps: {
      enabled: true,
      probability: 0.015
    }
  },
  4: {
    minSize: 20,
    maxSize: 30,
    textureSets: textureSets.slice(6, 8),
    hallConfig: {
      probability: 0.051, // 0.017 * 3
      minSize: 2,
      maxSize: 5
    },
    traps: {
      enabled: false,
    },
    bossProbability: 1.0
  },
  5: {
    minSize: 25,
    maxSize: 30,
    textureSets: textureSets.slice(8, 10),
    hallConfig: {
      probability: 0.08,
      minSize: 5,
      maxSize: 5
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.02
    }
  },
  6: {
    minSize: 20,
    maxSize: 40,
    textureSets: textureSets.slice(10, 12),
    hallConfig: {
      probability: 0.1,
      minSize: 1,
      maxSize: 2
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.02
    }
  },
  7: {
    minSize: 20,
    maxSize: 25,
    textureSets: textureSets.slice(12, 14),
    hallConfig: {
      probability: 0.05,
      minSize: 2,
      maxSize: 2
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.02
    }
  },
  8: {
    minSize: 40,
    maxSize: 50,
    textureSets: textureSets.slice(14, 16),
    hallConfig: {
      probability: 0.2,
      minSize: 5,
      maxSize: 5
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.035
    }
  },
  9: {
    minSize: 31,
    maxSize: 41,
    textureSets: textureSets.slice(16, 17),
    hallConfig: {
      probability: 0.1,
      minSize: 2,
      maxSize: 3
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.03
    }
  },
  10: {
    minSize: 21,
    maxSize: 36,
    textureSets: textureSets.slice(17, 18),
    hallConfig: {
      probability: 0.2,
      minSize: 4,
      maxSize: 5
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.02
    }
  },
  11: {
    minSize: 29,
    maxSize: 39,
    textureSets: textureSets.slice(18, 19),
    hallConfig: {
      probability: 0.3,
      minSize: 1,
      maxSize: 2
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.03
    }
  },
  12: {
    minSize: 22,
    maxSize: 32,
    textureSets: textureSets.slice(19, 20),
    hallConfig: {
      probability: 0.2,
      minSize: 2,
      maxSize: 2
    },
    bossProbability: 1,
    traps: {
      enabled: false,
    }
  },
  13: {
    minSize: 38,
    maxSize: 42,
    textureSets: textureSets.slice(20, 21),
    hallConfig: {
      probability: 0.15,
      minSize: 1,
      maxSize: 8
    },
    bossProbability: 1,
    traps: {
      enabled: true,
      probability: 0.01
    }
  },
};

// Přidejte toto na konec souboru
export const SPIKE_TRAP_CYCLE = 4000; // 4 sekundy na celý cyklus
export const SPIKE_TRAP_UP_TIME = 2000; // 2 sekundy nahoře

// Přidáme pole pro sledování objevených buněk
window.discoveredCells = [];

// Přidáme konstanty pro viditelnost
export const FOG_OF_WAR_RADIUS = 5; // Počet buněk viditelných od hráče
export const RAY_COUNT = 360; // Počet paprsků pro ray casting (jeden na každý stupeň)