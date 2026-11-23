// src/stores/gameStore.ts

import { create } from 'zustand'
import type { Hero, Team, PlayerProgress } from '../domain/types'
import { db } from '../db/database'
import { createHeroFromTemplate, HERO_TEMPLATES } from '../data/heroes'
import { calculateIdleRewards } from '../game/idle'
import { generateEnemyTeam, simulateBattle } from '../game/battle'

interface GameState {
  progress: PlayerProgress
  heroes: Hero[]
  teams: Team[]
  currentBattle: { result: ReturnType<typeof simulateBattle> | null; enemyTeam: Hero[] } | null
  idleRewards: ReturnType<typeof calculateIdleRewards> | null

  // Actions
  init: () => Promise<void>
  collectIdleRewards: () => void
  summonHero: () => Hero | null
  addToTeam: (teamId: string, heroId: string, position: number) => void
  removeFromTeam: (teamId: string, position: number) => void
  startBattle: (stage: number) => void
  claimBattleRewards: () => void
  upgradeHero: (heroId: string) => boolean
  starUpHero: (heroId: string) => boolean
}

const defaultProgress: PlayerProgress = {
  level: 1,
  exp: 0,
  gold: 5000,
  diamonds: 100,
  tickets: 30,
  idleAccumulatedAt: Date.now(),
  heroes: {},
  teams: [],
  currentCampaignStage: 1,
  towerFloor: 1,
  lastLogin: Date.now(),
}

export const useGameStore = create<GameState>((set, get) => ({
  progress: defaultProgress,
  heroes: [],
  teams: [],
  currentBattle: null,
  idleRewards: null,

  init: async () => {
    // Load from DB
    const savedProgress = await db.progress.toArray()
    const savedHeroes = await db.heroes.toArray()
    const savedTeams = await db.teams.toArray()

    if (savedProgress.length > 0) {
      set({
        progress: savedProgress[0],
        heroes: savedHeroes,
        teams: savedTeams,
      })
    } else {
      // First time: create default team
      const defaultTeam: Team = {
        id: 'team_1',
        name: 'Main Team',
        slots: Array.from({ length: 6 }, (_, i) => ({ position: i + 1, heroId: null })),
      }
      set({
        progress: defaultProgress,
        heroes: [],
        teams: [defaultTeam],
      })
      await db.teams.add(defaultTeam)
      await db.progress.add(defaultProgress)
    }

    // Calculate idle rewards
    const rewards = calculateIdleRewards(get().progress)
    set({ idleRewards: rewards })
  },

  collectIdleRewards: () => {
    const { progress, idleRewards } = get()
    if (!idleRewards) return

    const newProgress = {
      ...progress,
      gold: progress.gold + idleRewards.gold,
      exp: progress.exp + idleRewards.exp,
      tickets: progress.tickets + idleRewards.tickets,
      idleAccumulatedAt: Date.now(),
      lastLogin: Date.now(),
    }

    // Level up check
    const expNeeded = newProgress.level * 100
    if (newProgress.exp >= expNeeded) {
      newProgress.level += 1
      newProgress.exp -= expNeeded
    }

    set({ progress: newProgress, idleRewards: null })
    db.progress.clear().then(() => db.progress.add(newProgress))
  },

  summonHero: () => {
    const { progress } = get()
    if (progress.tickets < 1) return null

    // Pick random template
    const template = HERO_TEMPLATES[Math.floor(Math.random() * HERO_TEMPLATES.length)]
    const hero = createHeroFromTemplate(template)

    const newProgress = { ...progress, tickets: progress.tickets - 1 }
    const newHeroes = [...get().heroes, hero]

    set({ progress: newProgress, heroes: newHeroes })
    db.heroes.add(hero)
    db.progress.clear().then(() => db.progress.add(newProgress))

    return hero
  },

  addToTeam: (teamId, heroId, position) => {
    const teams = get().teams.map((t) => {
      if (t.id !== teamId) return t
      const slots = t.slots.map((s) =>
        s.position === position ? { ...s, heroId } : s,
      )
      return { ...t, slots }
    })
    set({ teams })
    db.teams.clear().then(() => teams.forEach((t) => db.teams.add(t)))
  },

  removeFromTeam: (teamId, position) => {
    const teams = get().teams.map((t) => {
      if (t.id !== teamId) return t
      const slots = t.slots.map((s) =>
        s.position === position ? { ...s, heroId: null } : s,
      )
      return { ...t, slots }
    })
    set({ teams })
    db.teams.clear().then(() => teams.forEach((t) => db.teams.add(t)))
  },

  startBattle: (stage) => {
    const { teams, heroes } = get()
    const team = teams[0]
    if (!team) return

    const playerHeroes = team.slots
      .map((s) => (s.heroId ? heroes.find((h) => h.id === s.heroId) : null))
      .filter((h): h is Hero => h !== null)

    const enemyTeam = generateEnemyTeam(stage)
    const result = simulateBattle(playerHeroes, enemyTeam)

    set({ currentBattle: { result, enemyTeam } })

    // Apply rewards
    if (result.winner === 'player') {
      const { progress } = get()
      const newProgress = {
        ...progress,
        gold: progress.gold + result.rewards.gold,
        exp: progress.exp + result.rewards.exp,
        currentCampaignStage: Math.max(progress.currentCampaignStage, stage + 1),
      }
      const expNeeded = newProgress.level * 100
      if (newProgress.exp >= expNeeded) {
        newProgress.level += 1
        newProgress.exp -= expNeeded
      }
      set({ progress: newProgress })
      db.progress.clear().then(() => db.progress.add(newProgress))
    }
  },

  claimBattleRewards: () => {
    set({ currentBattle: null })
  },

  upgradeHero: (heroId) => {
    const { heroes, progress } = get()
    const hero = heroes.find((h) => h.id === heroId)
    if (!hero) return false

    const cost = hero.level * 50
    if (progress.gold < cost) return false

    const newHeroes = heroes.map((h) =>
      h.id === heroId ? { ...h, level: h.level + 1 } : h,
    )
    const newProgress = { ...progress, gold: progress.gold - cost }

    set({ heroes: newHeroes, progress: newProgress })
    db.heroes.clear().then(() => newHeroes.forEach((h) => db.heroes.add(h)))
    db.progress.clear().then(() => db.progress.add(newProgress))
    return true
  },

  starUpHero: (heroId) => {
    const { heroes } = get()
    const hero = heroes.find((h) => h.id === heroId)
    if (!hero || hero.copies < 1 || hero.starLevel >= 5) return false

    const newHeroes = heroes.map((h) =>
      h.id === heroId ? { ...h, starLevel: h.starLevel + 1, copies: h.copies - 1 } : h,
    )
    set({ heroes: newHeroes })
    db.heroes.clear().then(() => newHeroes.forEach((h) => db.heroes.add(h)))
    return true
  },
}))
