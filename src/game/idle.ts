// src/game/idle.ts

import type { PlayerProgress } from '../domain/types'

export interface IdleReward {
  gold: number
  exp: number
  tickets: number
  timeElapsed: number // seconds
}

const IDLE_RATE = {
  goldPerSecond: 5,
  expPerSecond: 2,
  ticketPerMinute: 0.05,
}

const MAX_IDLE_HOURS = 8 // cap idle rewards at 8 hours

export function calculateIdleRewards(progress: PlayerProgress): IdleReward {
  const now = Date.now()
  const lastCollect = progress.idleAccumulatedAt || progress.lastLogin || now
  const elapsedMs = Math.min(now - lastCollect, MAX_IDLE_HOURS * 3600 * 1000)
  const elapsedSec = Math.floor(elapsedMs / 1000)

  // Scale by player level
  const levelMult = 1 + (progress.level - 1) * 0.1

  return {
    gold: Math.floor(IDLE_RATE.goldPerSecond * elapsedSec * levelMult),
    exp: Math.floor(IDLE_RATE.expPerSecond * elapsedSec * levelMult),
    tickets: Math.floor((elapsedSec / 60) * IDLE_RATE.ticketPerMinute),
    timeElapsed: elapsedSec,
  }
}

export function formatIdleTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}j ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}
