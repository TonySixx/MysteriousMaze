import * as THREE from "three";
import { MultiShotAbility, SpawnDragonsAbility } from "./shadowDemon/shadowDemon";
import { CallOfWildAbility, SeedBurstAbility, VineGrabAbility } from "./jungleGuardian/jungleGuardian";
import { itemDatabase } from "../itemDatabase";
import { ObsidarothBoss, ObsidianBlastAbility, ShadowCloneAbility, VoidRiftAbility } from "./obsidaroth/obsidaroth";
import { EntanglementBeamAbility, QuantumGuardianBoss, QuantumLeapAbility, TimeDilationAbility } from "./quantumGuardian/quantumGuardian";
import { ChronosBoss, TimeWarpAbility, TemporalEchoAbility, ChronoNovaAbility } from "./chronos/chronos";
import { ToxicusBoss, PoisonCloudAbility, AcidSprayAbility } from "./toxicus/toxicus";
import { FrostlordBoss, GlacialNovaAbility, IcicleBarrageAbility, FrostWalkerAbility } from "./frostlord/frostlord";
import { FlamelordBoss, MeteorStrikeAbility, InfernoWaveAbility, PhoenixRebirthAbility } from "./flamelord/flamelord";

export const MAIN_BOSS_TYPES = [
  {
    name: "Stinový démon",
    translationKey: "bossFloor1",
    abilities: [MultiShotAbility, SpawnDragonsAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0x200f38,
      metalness: 0.4,
      roughness: 0.1,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.4,
      roughness: 0.1,
    }),
    attackColor: new THREE.Color(0xff5252),
    attackCooldown: 0.8,
    emissiveIntensity: 3,
    maxHealth: 20000,
    bossHitBoxMarginY: 2.5,
    attackSpeed: 0.5,
    attackSize: 0.5,
    dropItems: [
      { item: itemDatabase.scarletRunecloak, chance: 0.2 },
      { item: itemDatabase.powerLapisia, chance: 0.3 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
    ],
    ambientLightColor: 0xe0b6bf,
    nebulaColors: ["#FF0000", "#FF69B4"],
  },
  {
    name: "Strážce Džungle",
    translationKey: "bossFloor2",
    abilities: [VineGrabAbility, SeedBurstAbility, CallOfWildAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0x75ba1a,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x75ba1a,
      emissiveIntensity: 1,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      metalness: 0.5,
      roughness: 0.1,
    }),
    attackColor: new THREE.Color(0x9fff87),
    attackCooldown: 1,
    emissiveIntensity: 3,
    maxHealth: 35000,
    bossHitBoxMarginY: 2.5,
    attackSpeed: 0.7,
    attackSize: 0.6,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.5 },
      { item: itemDatabase.protectorsLapisia, chance: 0.5 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
      { item: itemDatabase.greaterManaPotion, chance: 1 },
    ],
    ambientLightColor: 0xb6e0bf,
    nebulaColors: ["#4ed145", "#e4fc8d"],
    merlonHeight : 2,
    cornerWallHeight : 1 
  },
  {
    name: "Obsidaroth",
    bossClass: ObsidarothBoss,
    translationKey: "bossFloor3",
    abilities: [ObsidianBlastAbility, ShadowCloneAbility, VoidRiftAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0x6837db,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x9a37db,
      emissiveIntensity: 2,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x8B00FF,
      metalness: 0.7,
      roughness: 0.3,
    }),
    attackColor: new THREE.Color(0x8f52ff),
    attackCooldown: 1.2,
    emissiveIntensity: 3,
    maxHealth: 60000,
    bossHitBoxMarginY: 3,
    bossHitBoxMarginXZ: 2,
    attackSpeed: 0.7,
    attackSize: 0.5,
    specialAttackInterval: 10000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.5 },
      { item: itemDatabase.protectorsLapisia, chance: 0.5 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
      { item: itemDatabase.greaterManaPotion, chance: 1 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.2 },
      { item: itemDatabase.ultimateManaPotion, chance: 0.2 },
    ],
    ambientLightColor: 0x544275,
    nebulaColors: ["#8B00FF", "#4B0082"],
    textureSetIndex: 4,
    torchSetIndex: 4,
    flyDuration: 1,
    size: 1.5,
    merlonHeight : 3,
    cornerWallHeight : 2 
  },
  {
    name: "Quantum Guardian",
    bossClass: QuantumGuardianBoss,
    translationKey: "bossFloor4",
    abilities: [QuantumLeapAbility, TimeDilationAbility, EntanglementBeamAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0xb8f8ff,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xb8f8ff,
      emissiveIntensity: 2,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x401154,
      metalness: 0.7,
      roughness: 0.3,
    }),
    attackColor: new THREE.Color(0xd4f8ff),
    attackCooldown: 1,
    emissiveIntensity: 3,
    maxHealth: 85000,
    bossHitBoxMarginY: 3.5,
    bossHitBoxMarginXZ: 2.4,
    attackSpeed: 0.8,
    attackSize: 0.7,
    specialAttackInterval: 12000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.5 },
      { item: itemDatabase.protectorsLapisia, chance: 0.5 },
      { item: itemDatabase.druidsWhisperwood, chance: 0.1 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.25 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
      { item: itemDatabase.greaterManaPotion, chance: 1 },
    ],
    ambientLightColor: 0x72839e,
    nebulaColors: ["#00ffff", "#4d6791"],
    textureSetIndex: 7,
    torchSetIndex: 7,
    flyDuration: 1,
    size: 1.7,
    attackDamage: 30,
    merlonHeight : 4,
    cornerWallHeight : 3 
  },
  {
    name: "Chronos, Pán času",
    bossClass: ChronosBoss,
    translationKey: "bossFloor5",
    abilities: [TimeWarpAbility, TemporalEchoAbility, ChronoNovaAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0xff9966,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xffff66,
      emissiveIntensity: 2,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x800080,
      metalness: 0.7,
      roughness: 0.3,
    }),
    attackColor: new THREE.Color(0xffff66),
    attackCooldown: 0.9,
    emissiveIntensity: 3,
    maxHealth: 120000,
    bossHitBoxMarginY: 4,
    bossHitBoxMarginXZ: 2.6,
    attackSpeed: 0.9,
    attackSize: 0.8,
    specialAttackInterval: 15000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.5 },
      { item: itemDatabase.protectorsLapisia, chance: 0.5 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.3 },
      { item: itemDatabase.ultimateManaPotion, chance: 0.3 },
      { item: itemDatabase.bloomShadeKimono, chance: 0.2 }, 
    ],
    ambientLightColor: 0x4b0082,
    nebulaColors: ["#00ffff", "#800080"],
    textureSetIndex: 8,
    torchSetIndex: 8,
    flyDuration: 1,
    size: 2,
    attackDamage: 40,
    merlonHeight : 5,
    cornerWallHeight : 4 
  },
  {
    name: "Toxicus, Pán moru",
    bossClass: ToxicusBoss,
    translationKey: "bossFloor6",
    abilities: [PoisonCloudAbility, AcidSprayAbility],
    tribalMainMaterial: new THREE.MeshStandardMaterial({
      color: 0x004d00,
      metalness: 0.5,
      roughness: 0.3,
    }),
    tribalGoldMaterial: new THREE.MeshStandardMaterial({
      color: 0x8fbc8f,
      metalness: 0.5,
      roughness: 0.5,
      emissive: 0x80ff80,
      emissiveIntensity: 2,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.5,
      roughness: 0.5,
    }),
    eyeWhiteMaterial: new THREE.MeshStandardMaterial({
      color: 0x003300,
    }),
    eyeBlackMaterial: new THREE.MeshStandardMaterial({
      color: 0x80ff80,
      emissive: 0x80ff80,
      emissiveIntensity: 3,
    }),
    attackColor: new THREE.Color(0x33cc36),
    attackCooldown: 0.8,
    emissiveIntensity: 3,
    maxHealth: 160000,
    bossHitBoxMarginY: 4,
    bossHitBoxMarginXZ: 2.6,
    attackSpeed: 1.0,
    attackSize: 0.9,
    specialAttackInterval: 12000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.6 },
      { item: itemDatabase.protectorsLapisia, chance: 0.6 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.4 },
      { item: itemDatabase.ultimateManaPotion, chance: 0.4 },
      { item: itemDatabase.venomskullStaff, chance: 0.15 },
      { item: itemDatabase.sunflareRobe, chance: 0.2 },
      { item: itemDatabase.flamewreathedMantle, chance: 0.12 },
      
    ],
    ambientLightColor: 0x6b9494,
    nebulaColors: ["#89d973", "#00662c"],
    textureSetIndex: 10,
    torchSetIndex: 10,
    flyDuration: 1.5,
    size: 2,
    attackDamage: 50,
    hasCustomModel: true,
    merlonHeight : 6,
    cornerWallHeight : 5 
  },
  {
    name: "Frostlord, Vládce ledu",
    bossClass: FrostlordBoss,
    translationKey: "bossFloor7",
    abilities: [GlacialNovaAbility, IcicleBarrageAbility, FrostWalkerAbility],
    tribalMainMaterial: new THREE.MeshStandardMaterial({
      color: 0x006bb3,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x006bb3,
      emissiveIntensity: 0.3,
    }),
    tribalGoldMaterial: new THREE.MeshStandardMaterial({
      color: 0xadd8e6,
      metalness: 0.5,
      roughness: 0.5,
      emissive: 0xadd8e6,
      emissiveIntensity: 2,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x006bb3,
      metalness: 0.5,
      roughness: 0.5,
    }),
    eyeWhiteMaterial: new THREE.MeshStandardMaterial({
      color: 0x000000,
    }),
    eyeBlackMaterial: new THREE.MeshStandardMaterial({
      color: 0xadd8e6,
      emissive: 0xadd8e6,
      emissiveIntensity: 3,
    }),
    attackColor: new THREE.Color(0x87cefa),
    attackCooldown: 1,
    emissiveIntensity: 3,
    maxHealth: 200000,
    bossHitBoxMarginY: 4,
    bossHitBoxMarginXZ: 2.6,
    attackSpeed: 0.8,
    attackSize: 1.0,
    specialAttackInterval: 10000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.65 },
      { item: itemDatabase.protectorsLapisia, chance: 0.65 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.5 },
      { item: itemDatabase.ultimateManaPotion, chance: 0.5 },
      { item: itemDatabase.frostbaneCorruption, chance: 0.13 },
      { item: itemDatabase.starlightSurgeRobe, chance: 0.10 },
    ],
    ambientLightColor: 0xb0e0e6,
    nebulaColors: ["#87cefa", "#e0ffff"],
    textureSetIndex: 12,
    torchSetIndex: 12,
    flyDuration: 1.5,
    size: 2,
    attackDamage: 30,
    hasCustomModel: true,
    merlonHeight : 6,
    cornerWallHeight : 5 
  },
  {
    name: "Flamelord, Vládce ohně",
    bossClass: FlamelordBoss,
    translationKey: "bossFloor8",
    abilities: [MeteorStrikeAbility, InfernoWaveAbility, PhoenixRebirthAbility],
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x8B0000,
      metalness: 0.7,
      roughness: 0.3,
    }),
    tribalMainMaterial: new THREE.MeshStandardMaterial({
      color: 0x4f4f4f,
      metalness: 0.5,
      roughness: 0.1,
    }),
    tribalGoldMaterial: new THREE.MeshStandardMaterial({
      color: 0xff571a,
      metalness: 0.5,
      roughness: 0.5,
      emissive: 0xff571a,
      emissiveIntensity: 3,
    }),
    eyeWhiteMaterial: new THREE.MeshStandardMaterial({
      color: 0xff9933,
      emissive: 0xff9933,
      emissiveIntensity: 2,
    }),
    eyeBlackMaterial: new THREE.MeshStandardMaterial({
      color: 0xff4500,
      emissive: 0xff9933,
      emissiveIntensity: 3,
    }),
    attackColor: new THREE.Color(0xFF4500),
    attackCooldown: 1,
    emissiveIntensity: 3,
    maxHealth: 250000,
    bossHitBoxMarginY: 4,
    bossHitBoxMarginXZ: 2.6,
    attackSpeed: 0.65,
    attackSize: 1.5,
    specialAttackInterval: 12000,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.7 },
      { item: itemDatabase.protectorsLapisia, chance: 0.7 },
      { item: itemDatabase.ultimateHealthPotion, chance: 0.6 },
      { item: itemDatabase.ultimateManaPotion, chance: 0.6 },
      { item: itemDatabase.phoenixFeatherCloak, chance: 0.15 },
      { item: itemDatabase.infernalStaff, chance: 0.1 },
    ],
    ambientLightColor: 0xFF4500,
    nebulaColors: ["#e63900", "#ffbd2e"],
    textureSetIndex: 14,
    torchSetIndex: 14,
    flyDuration: 1.5,
    size: 2,
    attackDamage: 0, //50,
    hasCustomModel: true,
    merlonHeight: 7,
    cornerWallHeight: 6
  },
];