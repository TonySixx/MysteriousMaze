import * as THREE from "three";
import { MultiShotAbility, SpawnDragonsAbility } from "./shadowDemon/shadowDemon";
import { CallOfWildAbility, SeedBurstAbility, VineGrabAbility } from "./jungleGuardian/jungleGuardian";
import { itemDatabase } from "../itemDatabase";


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
      nebulaColors: ["#FF0000","#FF69B4"]
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
      maxHealth: 30000,
      bossHitBoxMarginY: 3.0,
      attackSpeed: 0.7,
      attackSize: 0.6,
      dropItems: [
        { item: itemDatabase.powerLapisia, chance: 0.5 },
        { item: itemDatabase.protectorsLapisia, chance: 0.5 },
        { item: itemDatabase.greaterHealthPotion, chance: 1 },
        { item: itemDatabase.greaterManaPotion, chance: 1 },
      ],
      ambientLightColor: 0xb6e0bf,
      nebulaColors: ["#4ed145","#e4fc8d"]
    },
  ];