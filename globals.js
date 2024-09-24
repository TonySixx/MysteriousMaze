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

window.bestTime = Infinity;

window.magicBalls = [];

window.bossSpawnTimeout = undefined;
window.bossCountdownInterval = undefined;


window.staffModel = undefined;

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
  ];