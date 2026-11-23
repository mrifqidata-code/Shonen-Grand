// src/domain/factions.ts

import type { Faction } from './types'

export interface FactionInfo {
  id: Faction
  name: string
  theme: string
  description: string
  color: string
  strongAgainst: Faction
  weakAgainst: Faction
}

export const FACTIONS: Record<Faction, FactionInfo> = {
  Lightforged: {
    id: 'Lightforged',
    name: 'Lightforged Sanctuary',
    theme: 'Cahaya & Malaikat',
    description: 'Faksi cahaya, balance offense-defense',
    color: '#fbbf24',
    strongAgainst: 'Arcane',
    weakAgainst: 'Demonhunt',
  },
  Arcane: {
    id: 'Arcane',
    name: 'Arcane Web Phantom',
    theme: 'Mistik & Kegelapan',
    description: 'Debuff & damage over time (Infect)',
    color: '#a855f7',
    strongAgainst: 'Kindred',
    weakAgainst: 'Lightforged',
  },
  Kindred: {
    id: 'Kindred',
    name: 'Reclusive Kindred',
    theme: 'Vampir & Monster Malam',
    description: 'Bleed, lifesteal, regen',
    color: '#dc2626',
    strongAgainst: 'Demonhunt',
    weakAgainst: 'Arcane',
  },
  Demonhunt: {
    id: 'Demonhunt',
    name: 'Demonhunt Blade',
    theme: 'Pemburu Iblis',
    description: 'Crit, Sigil stacking, chain CC',
    color: '#10b981',
    strongAgainst: 'Lightforged',
    weakAgainst: 'Kindred',
  },
  Void: {
    id: 'Void',
    name: 'Otherworld Void',
    theme: 'Cosmic & Void',
    description: 'Faksi tersembunyi, stat OP',
    color: '#6366f1',
    strongAgainst: 'Lightforged',
    weakAgainst: 'Void',
  },
}

export function getFactionAdvantage(attacker: Faction, defender: Faction): number {
  const info = FACTIONS[attacker]
  if (info.strongAgainst === defender) return 1.3 // +30% damage
  if (info.weakAgainst === defender) return 0.7 // -30% damage
  return 1.0
}

export function getFactionCritBonus(attacker: Faction, defender: Faction): number {
  const info = FACTIONS[attacker]
  if (info.strongAgainst === defender) return 0.1 // +10% crit
  if (info.weakAgainst === defender) return -0.1 // -10% crit
  return 0
}
