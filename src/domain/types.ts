// src/domain/types.ts

export type ClassType = 'Guard' | 'Assault' | 'Assassin' | 'Control' | 'Support'

export type Faction =
  | 'Lightforged'
  | 'Arcane'
  | 'Kindred'
  | 'Demonhunt'
  | 'Void'

export type Rarity = 'SSR' | 'SSR+' | 'UR' | 'UR+' | 'EX'

export type StatusEffect =
  | 'HolySeal'
  | 'MoonlightMark'
  | 'Infect'
  | 'Bleed'
  | 'Sigil'
  | 'Bind'
  | 'Seal'
  | 'Taunt'
  | 'Mercy'
  | 'Momentum'

export interface HeroStats {
  hp: number
  atk: number
  def: number
  spd: number
  critRate: number
  critDmg: number
}

export interface Skill {
  id: string
  name: string
  type: 'basic' | 'active' | 'ultimate' | 'passive' | 'awaken'
  description: string
  cooldown?: number
  damageMultiplier?: number
  effect?: StatusEffect
  effectStacks?: number
}

export interface Hero {
  id: string
  name: string
  class: ClassType
  faction: Faction
  rarity: Rarity
  animeOrigin: string // "Naruto", "One Piece", "Bleach", "OPM", "JJK"
  baseStats: HeroStats
  skills: Skill[]
  bonds: string[] // hero ids that form fateful bonds
  starLevel: number // 1-5
  level: number
  limitBreak: number // 0-5
  awakened: boolean
  copies: number
}

export interface TeamSlot {
  position: number // 1-6
  heroId: string | null
}

export interface Team {
  id: string
  name: string
  slots: TeamSlot[]
}

export interface BattleResult {
  winner: 'player' | 'enemy'
  rounds: number
  damageDealt: number
  damageTaken: number
  rewards: { gold: number; exp: number; items: string[] }
}

export interface PlayerProgress {
  level: number
  exp: number
  gold: number
  diamonds: number
  tickets: number
  idleAccumulatedAt: number // timestamp
  heroes: Record<string, Hero>
  teams: Team[]
  currentCampaignStage: number
  towerFloor: number
  lastLogin: number
}
