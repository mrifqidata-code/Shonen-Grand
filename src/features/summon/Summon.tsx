// src/features/summon/Summon.tsx

import { useState } from 'react'
import { useGameStore } from '../../stores/gameStore'
import { HERO_TEMPLATES } from '../../data/heroes'

export function Summon() {
  const { progress, summonHero } = useGameStore()
  const [lastSummoned, setLastSummoned] = useState<ReturnType<typeof summonHero>>(null)
  const [summoning, setSummoning] = useState(false)

  const handleSummon = (count: number) => {
    if (progress.tickets < count) return
    setSummoning(true)
    let last: ReturnType<typeof summonHero> = null
    for (let i = 0; i < count; i++) {
      last = summonHero()
    }
    setLastSummoned(last)
    setSummoning(false)
  }

  const rarityColor: Record<string, string> = {
    SSR: 'text-gray-300',
    'SSR+': 'text-blue-400',
    UR: 'text-purple-400',
    'UR+': 'text-pink-400',
    EX: 'text-amber-400',
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Summon Hero</h2>

      <div className="bg-surface rounded-lg p-4 border border-gray-800 text-center">
        <div className="text-sm text-gray-400 mb-2">Ticket Tersedia</div>
        <div className="text-3xl font-bold text-pink-400 mb-4">{progress.tickets}</div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleSummon(1)}
            disabled={progress.tickets < 1 || summoning}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            Summon x1 (1 🎫)
          </button>
          <button
            onClick={() => handleSummon(10)}
            disabled={progress.tickets < 10 || summoning}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            Summon x10 (10 🎫)
          </button>
        </div>
      </div>

      {lastSummoned && (
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 border border-purple-700 text-center">
          <h3 className="font-bold mb-2">✨ Hasil Summon</h3>
          <div className={`text-2xl font-bold ${rarityColor[lastSummoned.rarity]}`}>
            {lastSummoned.name}
          </div>
          <div className="text-sm text-gray-300">
            {lastSummoned.rarity} • {lastSummoned.class} • {lastSummoned.animeOrigin}
          </div>
        </div>
      )}

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-2">Rate-Up Banner</h3>
        <p className="text-xs text-gray-400 mb-3">
          Featured hero dengan rate boost! Pity system: guaranteed SSR+ dalam 50 pull.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {HERO_TEMPLATES.filter((h) => h.rarity === 'SSR+' || h.rarity === 'UR' || h.rarity === 'EX')
            .slice(0, 6)
            .map((h) => (
              <div key={h.id} className="bg-gray-900/30 rounded p-2 text-center">
                <div className={`font-bold ${rarityColor[h.rarity]}`}>{h.name}</div>
                <div className="text-gray-500">{h.animeOrigin}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
