// src/game/battle.ts

import type { Hero, BattleResult, StatusEffect } from '../domain/types'
import { getFactionAdvantage, getFactionCritBonus } from '../domain/factions'

interface BattleState {
  playerTeam: Hero[]
  enemyTeam: Hero[]
  playerHp: number[]
  enemyHp: number[]
  playerStatus: Map<number, StatusEffect[]>
  enemyStatus: Map<number, StatusEffect[]>
  round: number
}

export function calculateDamage(
  attacker: Hero,
  defender: Hero,
  skillMultiplier: number = 1,
): { damage: number; isCrit: boolean } {
  const factionAdv = getFactionAdvantage(attacker.faction, defender.faction)
  const factionCrit = getFactionCritBonus(attacker.faction, defender.faction)

  const critRate = Math.min(1, attacker.baseStats.critRate + factionCrit)
  const isCrit = Math.random() < critRate

  let damage = attacker.baseStats.atk * skillMultiplier * factionAdv
  damage = damage * (100 / (100 + defender.baseStats.def))

  if (isCrit) {
    damage *= attacker.baseStats.critDmg
  }

  // Random variance 0.9-1.1
  damage *= 0.9 + Math.random() * 0.2

  return { damage: Math.max(1, Math.floor(damage)), isCrit }
}

export function simulateBattle(playerTeam: Hero[], enemyTeam: Hero[]): BattleResult {
  const state: BattleState = {
    playerTeam,
    enemyTeam,
    playerHp: playerTeam.map((h) => h.baseStats.hp * (1 + h.starLevel * 0.2) * (1 + h.limitBreak * 0.1)),
    enemyHp: enemyTeam.map((h) => h.baseStats.hp * (1 + h.starLevel * 0.2)),
    playerStatus: new Map(),
    enemyStatus: new Map(),
    round: 0,
  }

  let totalDamageDealt = 0
  let totalDamageTaken = 0

  const maxRounds = 30
  while (state.round < maxRounds) {
    state.round++

    // Player attacks
    for (let i = 0; i < state.playerTeam.length; i++) {
      const hero = state.playerTeam[i]
      if (state.playerHp[i] <= 0) continue

      // Find target
      const targetIdx = findTarget(state.enemyHp)
      if (targetIdx === -1) break // all enemies dead

      // Use ultimate if available (every 6 rounds), else active, else basic
      const skillMult = state.round % 6 === 0 ? 4.0 : state.round % 3 === 0 ? 2.5 : 1.0
      const { damage } = calculateDamage(hero, state.enemyTeam[targetIdx], skillMult)
      state.enemyHp[targetIdx] -= damage
      totalDamageDealt += damage
    }

    // Check win
    if (state.enemyHp.every((hp) => hp <= 0)) {
      return {
        winner: 'player',
        rounds: state.round,
        damageDealt: totalDamageDealt,
        damageTaken: totalDamageTaken,
        rewards: calculateRewards(state.round, true),
      }
    }

    // Enemy attacks
    for (let i = 0; i < state.enemyTeam.length; i++) {
      const hero = state.enemyTeam[i]
      if (state.enemyHp[i] <= 0) continue

      const targetIdx = findTarget(state.playerHp)
      if (targetIdx === -1) break

      const skillMult = state.round % 6 === 0 ? 3.5 : state.round % 3 === 0 ? 2.0 : 1.0
      const { damage } = calculateDamage(hero, state.playerTeam[targetIdx], skillMult)
      state.playerHp[targetIdx] -= damage
      totalDamageTaken += damage
    }

    // Check lose
    if (state.playerHp.every((hp) => hp <= 0)) {
      return {
        winner: 'enemy',
        rounds: state.round,
        damageDealt: totalDamageDealt,
        damageTaken: totalDamageTaken,
        rewards: calculateRewards(state.round, false),
      }
    }
  }

  // Timeout = player loses (enemy survives)
  return {
    winner: 'enemy',
    rounds: maxRounds,
    damageDealt: totalDamageDealt,
    damageTaken: totalDamageTaken,
    rewards: calculateRewards(maxRounds, false),
  }
}

function findTarget(hpArray: number[]): number {
  // Target lowest HP first (focus fire)
  let minHp = Infinity
  let idx = -1
  for (let i = 0; i < hpArray.length; i++) {
    if (hpArray[i] > 0 && hpArray[i] < minHp) {
      minHp = hpArray[i]
      idx = i
    }
  }
  return idx
}

function calculateRewards(rounds: number, won: boolean): BattleResult['rewards'] {
  const baseGold = won ? 100 + rounds * 10 : 20 + rounds * 5
  const baseExp = won ? 50 + rounds * 5 : 10 + rounds * 2
  return {
    gold: baseGold,
    exp: baseExp,
    items: won ? ['exp_potion', 'hero_shard'] : [],
  }
}

export function generateEnemyTeam(stage: number): Hero[] {
  // Generate scaled enemy team based on campaign stage
  const templates = [
    { name: 'Shadow Minion', class: 'Assault' as const, faction: 'Void' as const, hp: 800, atk: 200, def: 100, spd: 100, critRate: 0.1, critDmg: 1.4 },
    { name: 'Cultist', class: 'Control' as const, faction: 'Arcane' as const, hp: 700, atk: 220, def: 90, spd: 110, critRate: 0.12, critDmg: 1.5 },
    { name: 'Dark Knight', class: 'Guard' as const, faction: 'Demonhunt' as const, hp: 1500, atk: 180, def: 250, spd: 80, critRate: 0.08, critDmg: 1.3 },
  ]

  const scale = 1 + (stage - 1) * 0.15
  const teamSize = Math.min(6, 2 + Math.floor(stage / 5))

  const team: Hero[] = []
  for (let i = 0; i < teamSize; i++) {
    const t = templates[i % templates.length]
    team.push({
      id: `enemy_${stage}_${i}`,
      name: `${t.name} Lv.${stage}`,
      class: t.class,
      faction: t.faction,
      rarity: 'SSR',
      animeOrigin: 'Enemy',
      baseStats: {
        hp: Math.floor(t.hp * scale),
        atk: Math.floor(t.atk * scale),
        def: Math.floor(t.def * scale),
        spd: t.spd,
        critRate: t.critRate,
        critDmg: t.critDmg,
      },
      skills: [],
      bonds: [],
      starLevel: Math.floor(stage / 10) + 1,
      level: stage,
      limitBreak: 0,
      awakened: false,
      copies: 0,
    })
  }
  return team
}
