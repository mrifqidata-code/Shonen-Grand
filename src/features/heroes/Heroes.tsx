// src/features/heroes/Heroes.tsx

import { useGameStore } from '../../stores/gameStore'
import { FACTIONS } from '../../domain/factions'

export function Heroes() {
  const { heroes, progress, upgradeHero, starUpHero } = useGameStore()

  const rarityColor: Record<string, string> = {
    SSR: 'text-gray-300',
    'SSR+': 'text-blue-400',
    UR: 'text-purple-400',
    'UR+': 'text-pink-400',
    EX: 'text-amber-400',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Hero Koleksi ({heroes.length})</h2>
      </div>

      {heroes.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          Belum ada hero. Summon dulu di menu Summon!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {heroes.map((hero) => {
          const faction = FACTIONS[hero.faction]
          return (
            <div key={hero.id} className="bg-surface rounded-lg p-4 border border-gray-800">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`font-bold ${rarityColor[hero.rarity]}`}>{hero.name}</h3>
                  <p className="text-xs text-gray-400">{hero.animeOrigin} • {hero.class}</p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: faction.color + '33', color: faction.color }}
                >
                  {faction.name}
                </span>
              </div>

              <div className="text-xs text-gray-400 mb-2">
                ⭐ {hero.starLevel} • Lv.{hero.level} • LB {hero.limitBreak}
                {hero.awakened && ' • Awakened'}
              </div>

              <div className="grid grid-cols-3 gap-1 text-xs mb-3">
                <div>HP: {hero.baseStats.hp}</div>
                <div>ATK: {hero.baseStats.atk}</div>
                <div>DEF: {hero.baseStats.def}</div>
                <div>SPD: {hero.baseStats.spd}</div>
                <div>Crit: {(hero.baseStats.critRate * 100).toFixed(0)}%</div>
                <div>CritDmg: {hero.baseStats.critDmg}x</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => upgradeHero(hero.id)}
                  disabled={progress.gold < hero.level * 50}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs px-2 py-1.5 rounded transition"
                >
                  Upgrade ({hero.level * 50}g)
                </button>
                <button
                  onClick={() => starUpHero(hero.id)}
                  disabled={hero.copies < 1 || hero.starLevel >= 5}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs px-2 py-1.5 rounded transition"
                >
                  Star Up
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
