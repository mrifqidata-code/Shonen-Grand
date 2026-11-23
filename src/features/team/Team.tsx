// src/features/team/Team.tsx

import { useGameStore } from '../../stores/gameStore'
import { FACTIONS } from '../../domain/factions'

export function Team() {
  const { teams, heroes, addToTeam, removeFromTeam } = useGameStore()
  const team = teams[0]

  if (!team) return <div>No team available</div>

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Team Builder</h2>

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-3">{team.name}</h3>
        <div className="grid grid-cols-3 gap-3">
          {team.slots.map((slot) => {
            const hero = slot.heroId ? heroes.find((h) => h.id === slot.heroId) : null
            return (
              <div
                key={slot.position}
                className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 min-h-[100px]"
              >
                <div className="text-xs text-gray-500 mb-1">Slot {slot.position}</div>
                {hero ? (
                  <div>
                    <div className="font-bold text-sm">{hero.name}</div>
                    <div className="text-xs text-gray-400">
                      {hero.class} • {FACTIONS[hero.faction].name}
                    </div>
                    <div className="text-xs text-gray-500">Lv.{hero.level} ⭐{hero.starLevel}</div>
                    <button
                      onClick={() => removeFromTeam(team.id, slot.position)}
                      className="mt-2 text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 italic">Empty</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-3">Available Heroes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {heroes.map((hero) => {
            const inTeam = team.slots.some((s) => s.heroId === hero.id)
            return (
              <div
                key={hero.id}
                className={`rounded p-2 text-xs border ${
                  inTeam ? 'border-green-600 bg-green-900/20' : 'border-gray-700 bg-gray-900/30'
                }`}
              >
                <div className="font-bold">{hero.name}</div>
                <div className="text-gray-400">{hero.class}</div>
                {!inTeam && (
                  <select
                    className="mt-1 w-full bg-gray-800 text-xs rounded px-1 py-0.5"
                    onChange={(e) => {
                      const pos = Number(e.target.value)
                      if (pos) addToTeam(team.id, hero.id, pos)
                    }}
                    value=""
                  >
                    <option value="">Add to slot...</option>
                    {team.slots
                      .filter((s) => !s.heroId)
                      .map((s) => (
                        <option key={s.position} value={s.position}>
                          Slot {s.position}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
