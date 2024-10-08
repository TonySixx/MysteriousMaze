import { MultiShotAbility, SpawnDragonsAbility } from "./shadowDemon/shadowDemon";
import { VineGrabAbility, SeedBurstAbility, CallOfWildAbility } from "./jungleGuardian/jungleGuardian";
import { ObsidianBlastAbility, ShadowCloneAbility, VoidRiftAbility } from "./obsidaroth/obsidaroth";
import { QuantumLeapAbility, TimeDilationAbility, EntanglementBeamAbility } from "./quantumGuardian/quantumGuardian";
import { TimeWarpAbility, TemporalEchoAbility, ChronoNovaAbility } from "./chronos/chronos";
import { PoisonCloudAbility, AcidSprayAbility } from "./toxicus/toxicus";
import { GlacialNovaAbility, IcicleBarrageAbility, FrostWalkerAbility } from "./frostlord/frostlord";
import { MeteorStrikeAbility, InfernoWaveAbility, PhoenixRebirthAbility } from "./flamelord/flamelord";
import { ArcaneBarrageAbility, DimensionalRiftAbility, ArcaneShieldAbility } from "./arcaneLord/arcaneLord";
import { BloodVortexAbility, BloodRitualAbility, BloodLanceAbility } from "./bloodMage/bloodMage";
import { LightningStrikeAbility, BallLightningAbility, ElectromagneticPulseAbility } from "./thunderlord/thunderlord";

export const MAIN_BOSS_TYPES_DESCRIPTIONS = [
  {
    name: "bossFloor1",
    abilities: [
      { spellClass: MultiShotAbility, name: "multiShotAbilityName", description: "multiShotAbilityDescription" },
      { spellClass: SpawnDragonsAbility, name: "spawnDragonsAbilityName", description: "spawnDragonsAbilityDescription" }
    ],
  },
  {
    name: "bossFloor2",
    abilities: [
      { spellClass: VineGrabAbility, name: "vineGrabAbilityName", description: "vineGrabAbilityDescription" },
      { spellClass: SeedBurstAbility, name: "seedBurstAbilityName", description: "seedBurstAbilityDescription" },
      { spellClass: CallOfWildAbility, name: "callOfWildAbilityName", description: "callOfWildAbilityDescription" }
    ],
  },
  {
    name: "bossFloor3",
    abilities: [
      { spellClass: ObsidianBlastAbility, name: "obsidianBlastAbilityName", description: "obsidianBlastAbilityDescription" },
      { spellClass: ShadowCloneAbility, name: "shadowCloneAbilityName", description: "shadowCloneAbilityDescription" },
      { spellClass: VoidRiftAbility, name: "voidRiftAbilityName", description: "voidRiftAbilityDescription" }
    ],
  },
  {
    name: "bossFloor4",
    abilities: [
      { spellClass: QuantumLeapAbility, name: "quantumLeapAbilityName", description: "quantumLeapAbilityDescription" },
      { spellClass: TimeDilationAbility, name: "timeDilationAbilityName", description: "timeDilationAbilityDescription" },
      { spellClass: EntanglementBeamAbility, name: "entanglementBeamAbilityName", description: "entanglementBeamAbilityDescription" }
    ],
  },
  {
    name: "bossFloor5",
    abilities: [
      { spellClass: TimeWarpAbility, name: "timeWarpAbilityName", description: "timeWarpAbilityDescription" },
      { spellClass: TemporalEchoAbility, name: "temporalEchoAbilityName", description: "temporalEchoAbilityDescription" },
      { spellClass: ChronoNovaAbility, name: "chronoNovaAbilityName", description: "chronoNovaAbilityDescription" }
    ],
  },
  {
    name: "bossFloor6",
    abilities: [
      { spellClass: PoisonCloudAbility, name: "poisonCloudAbilityName", description: "poisonCloudAbilityDescription" },
      { spellClass: AcidSprayAbility, name: "acidSprayAbilityName", description: "acidSprayAbilityDescription" }
    ],
  },
  {
    name: "bossFloor7",
    abilities: [
      { spellClass: GlacialNovaAbility, name: "glacialNovaAbilityName", description: "glacialNovaAbilityDescription" },
      { spellClass: IcicleBarrageAbility, name: "icicleBarrageAbilityName", description: "icicleBarrageAbilityDescription" },
      { spellClass: FrostWalkerAbility, name: "frostWalkerAbilityName", description: "frostWalkerAbilityDescription" }
    ],
  },
  {
    name: "bossFloor8",
    abilities: [
      { spellClass: MeteorStrikeAbility, name: "meteorStrikeAbilityName", description: "meteorStrikeAbilityDescription" },
      { spellClass: InfernoWaveAbility, name: "infernoWaveAbilityName", description: "infernoWaveAbilityDescription" },
      { spellClass: PhoenixRebirthAbility, name: "phoenixRebirthAbilityName", description: "phoenixRebirthAbilityDescription" }
    ],
  },
  {
    name: "bossFloor9",
    abilities: [
      { spellClass: ArcaneBarrageAbility, name: "arcaneBarrageAbilityName", description: "arcaneBarrageAbilityDescription" },
      { spellClass: DimensionalRiftAbility, name: "dimensionalRiftAbilityName", description: "dimensionalRiftAbilityDescription" },
      { spellClass: ArcaneShieldAbility, name: "arcaneShieldAbilityName", description: "arcaneShieldAbilityDescription" }
    ],
  },
  {
    name: "bossFloor10",
    abilities: [
      { spellClass: BloodVortexAbility, name: "bloodVortexAbilityName", description: "bloodVortexAbilityDescription" },
      { spellClass: BloodRitualAbility, name: "bloodRitualAbilityName", description: "bloodRitualAbilityDescription" },
      { spellClass: BloodLanceAbility, name: "bloodLanceAbilityName", description: "bloodLanceAbilityDescription" }
    ],
  },
  {
    name: "bossFloor11",
    abilities: [
      { spellClass: LightningStrikeAbility, name: "lightningStrikeAbilityName", description: "lightningStrikeAbilityDescription" },
      { spellClass: BallLightningAbility, name: "ballLightningAbilityName", description: "ballLightningAbilityDescription" },
      { spellClass: ElectromagneticPulseAbility, name: "electromagneticPulseAbilityName", description: "electromagneticPulseAbilityDescription" }
    ],
  },
];