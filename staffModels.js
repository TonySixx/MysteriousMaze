import { FilmPass } from "three/examples/jsm/Addons.js";

//angels-feather-of-grace
export const staffModelsDefinitons = {
  staff: {
    modelPath: "models/staffs/Staff.glb",
    scale1: 0.1,
    scale2: 0.1,
    scale3: 0.1,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: Math.PI / 2,
    rotationZ: 0,
  },
  angelsFeatherOfGrace: {
    name: "angelsFeatherOfGrace",
    modelPath: "models/staffs/angels-feather-of-grace.glb",
    scaleX: 0.8,
    scaleY: 0.8,
    scaleZ: 0.8,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: Math.PI / 2,
    rotationZ: 0,
    castEffectOffsetY: 0.5
  },
  infernalDragonflare: {
    name: "infernalDragonflare",
    modelPath: "models/staffs/infernal-dragonflare.glb",
    scaleX: 0.65,
    scaleY: 0.65,
    scaleZ: 0.65,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: -0.5,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  venomskullStaff: {
    name: "venomskullStaff",
    modelPath: "models/staffs/venomskull-staff.glb",
    scaleX: 0.65,
    scaleY: 0.65,
    scaleZ: 0.65,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0.1,
    rotationY: -0.6,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  darkshadeStaff: {
    name: "darkshadeStaff",
    modelPath: "models/staffs/darkshade-scepter.glb",
    scaleX: 0.62,
    scaleY: 0.62,
    scaleZ: 0.62,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: 1.8,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  emeraldVineStaff: {
    name: "emeraldVineStaff",
    modelPath: "models/staffs/emerald-vine-staff.glb",
    scaleX: 0.62,
    scaleY: 0.62,
    scaleZ: 0.62,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: -0.5,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  celestialLightbringer: {
    name: "celestialLightbringer",
    modelPath: "models/staffs/celestial-lightbringer.glb",
    scaleX: 0.50,
    scaleY: 0.50,
    scaleZ: 0.50,
    positionX: 0.3,
    positionY: -0.04,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: -3.3,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  flamebindersWrath: {
    name: "flamebindersWrath",
    modelPath: "models/staffs/flamebinders-wrath.glb",
    scaleX: 0.50,
    scaleY: 0.50,
    scaleZ: 0.50,
    positionX: 0.3,
    positionY: -0.08,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    castEffectOffsetY: 0.5,
  },
  frostbaneCorruption: {
    name: "frostbaneCorruption",
    modelPath: "models/staffs/frostbane-corruption.glb",
    scaleX: 0.60,
    scaleY: 0.60,
    scaleZ: 0.60,
    positionX: 0.3,
    positionY: -0.12,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    castEffectOffsetY: 0.3,

  },
  druidsWhisperwood: {
    name: "druidsWhisperwood",
    modelPath: "models/staffs/druids-whisperwood.glb",
    scaleX: 0.58,
    scaleY: 0.58,
    scaleZ: 0.58,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: -1.5,
    rotationZ: 0,
    castEffectOffsetY: 0.4,
    
  },
  apprenticeShardStaff: {
    name: "apprenticeShardStaff",
    modelPath: "models/staffs/apprentice-shard-staff.glb",
    scaleX: 0.75,
    scaleY: 0.75,
    scaleZ: 0.75,
    positionX: 0.3,
    positionY: -0.2,
    positionZ: -0.5,
    rotationX: 0,
    rotationY: Math.PI / 2,
    rotationZ: 0,
    emissivePartName:"Piedra_arriba_low_piedra_brilli_brilli_0",
    castEffectOffsetY: 0.5,
  },
};


export const enchantEffectsOpt = {
  angelsFeatherOfGrace: {
    spread: { x: 0.1, y: 0.05, z: 0.08 },
    lifeTimeMin: 1.8,
    lifeTimeMax: 2.4,
    speedMin: 0.04,
    speedMax: 0.09,
    startColor: 0xffffff,
    endColor: 0xfff280,
    opacity: 0.6,
    glowIntensity: 0.7,
    minSize: 1,
    maxSize: 2,
    particleCountPerlevel: 40,
    horizontalDamping: 0.95,
    enchantEffectOffsetY: 0.55
  },
  infernalDragonflare: {
    spread: { x: 0.2, y: 0.25, z: 0.2 },
    lifeTimeMin: 2,
    lifeTimeMax: 2.7,
    speedMin: 0.02,
    speedMax: 0.1,
    startColor: 0xff9447,
    endColor: 0xff6a19,
    opacity: 0.5,
    glowIntensity: 0.1,
    minSize: 4,
    maxSize: 12,
    horizontalDamping: 0.8,
    enchantEffectOffsetY: 0.65
  },
  venomskullStaff: {
    spread: { x: 0.22, y: 0.3, z: 0.4 },
    lifeTimeMin: 1.5,
    lifeTimeMax: 2.4,
    speedMin: 0.08,
    speedMax: 0.1,
    startColor: 0x8bff3d,
    endColor: 0x5b24c9,
    opacity: 0.4,
    glowIntensity: 0.6,
    minSize: 1,
    maxSize: 3,
    horizontalDamping: 0.88,
    enchantEffectOffsetY: 0.75,
    particleCountPerlevel: 30
  },
  darkshadeStaff: {
    spread: { x: 0.2, y: 0.3, z: 0.2 },
    lifeTimeMin: 1.7,
    lifeTimeMax: 2.5,
    speedMin: 0.008,
    speedMax: 0.08,
    startColor: 0x000f82,
    endColor: 0x7a2be2,
    opacity: 0.5,
    glowIntensity: 0.5,
    minSize: 3,
    maxSize: 9,
    horizontalDamping: 0.97,
    enchantEffectOffsetY: 0.65
  },
  emeraldVineStaff: {
    spread: { x: 0.09, y: 0.13, z: 0.09 },
    lifeTimeMin: 1.6,
    lifeTimeMax: 2.4,
    speedMin: 0.012,
    speedMax: 0.032,
    startColor: 0x00ff7f,
    endColor: 0x2e8b57,
    opacity: 0.65,
    glowIntensity: 0.55,
    minSize: 4,
    maxSize: 10,
    horizontalDamping: 0.9,
    enchantEffectOffsetY: 0.5
  },
  celestialLightbringer: {
    spread: { x: 0.45, y: 0.35 , z: 0.5},
    lifeTimeMin: 2.0,
    lifeTimeMax: 4.0,
    speedMin: 0.02,
    speedMax: 0.02,
    startColor: 0xfffacd,
    endColor: 0xffd700,
    opacity: 0.75,
    glowIntensity: 0.8,
    minSize: 0.5,
    maxSize: 2,
    horizontalDamping: 1.45,
    enchantEffectOffsetY: 0.6
  },
  flamebindersWrath: {
    spread: { x: 0.12, y: 0.25, z: 0.12 },
    lifeTimeMin: 1.3,
    lifeTimeMax: 2.1,
    speedMin: 0.022,
    speedMax: 0.12,
    startColor: 0xff0000,
    endColor: 0xff4500,
    opacity: 0.5,
    glowIntensity: 0.4,
    minSize: 6,
    maxSize: 10,
    horizontalDamping: 0.82,
    enchantEffectOffsetY: 0.54
  },
  frostbaneCorruption: {
    spread: { x: 0.13, y: 0.1, z: 0.09 },
    lifeTimeMin: 1.9,
    lifeTimeMax: 2.5,
    speedMin: 0.1,
    speedMax: 0.1,
    startColor: 0x20d5f5,
    endColor: 0x1e90ff,
    opacity: 0.6,
    glowIntensity: 0.65,
    minSize: 3,
    maxSize: 10,
    horizontalDamping: 0.93,
    enchantEffectOffsetY: 0.47
    
  },
  druidsWhisperwood: {
    spread: { x: 0.2, y: 0.2, z: 0.15 },
    lifeTimeMin: 1.7,
    lifeTimeMax: 2.4,
    speedMin: 0.1,
    speedMax: 0.1,
    startColor: 0x20d5f5,
    endColor: 0x1e90ff,
    opacity: 0.12,
    glowIntensity: 1,
    minSize: 4,
    maxSize: 7,
    horizontalDamping: 0.15,
    enchantEffectOffsetY: 0.7
  },
  apprenticeShardStaff: {
    spread: { x: 0.1, y: 0.2, z: 0.1 },
    lifeTimeMin: 1.5,
    lifeTimeMax: 2,
    speedMin: 0.01,
    speedMax: 0.1,
    startColor: 0x80eeff,
    endColor: 0x80eeff,
    opacity: 0.2,
    glowIntensity: 0.2,
    minSize: 1,
    maxSize: 2.2,
    horizontalDamping: 0.9,
    enchantEffectOffsetY: 0.65
  }
};