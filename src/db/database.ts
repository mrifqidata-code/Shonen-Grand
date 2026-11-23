// src/db/database.ts

import Dexie, { type Table } from 'dexie'
import type { Hero, Team, PlayerProgress } from '../domain/types'

export interface DBHero extends Hero {
  dbId?: number
}

export interface DBTeam extends Team {
  dbId?: number
}

export class ShonenDB extends Dexie {
  heroes!: Table<DBHero, number>
  teams!: Table<DBTeam, number>
  progress!: Table<PlayerProgress, number>

  constructor() {
    super('ShonenGrandDB')
    this.version(1).stores({
      heroes: '++dbId, id, name, faction, class, rarity',
      teams: '++dbId, id, name',
      progress: '++dbId',
    })
  }
}

export const db = new ShonenDB()
