// src/features/battle/Battle.tsx

import { useState } from 'react'
import { useGameStore } from '../../stores/gameStore'
import { generateEnemyTeam } from '../../game/battle'

export function Battle() {
  const { teams, heroes, startBattle, currentBattle, claimBattleRewards, progress } = useGameStore()
  const [stage, setStage] = useState(progress.currentCampaignStage)

  const team = teams[0]
  const playerHeroes = team?.slots
    .map((s) => (s.heroId ? heroes.find((h) => h.id === s.heroId) : null))
    .filter((h): h is NonNullable<typeof h> => h !== null) ?? []

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Battle</h2>

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm text-gray-400">Stage:</label>
          <input
            type="number"
            min={1}
            max={999}
            value={stage}
            onChange={(e) => setStage(Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1 w-20 text-sm"
          />
          <button
            onClick={() => startBattle(stage)}
            disabled={playerHeroes.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-1.5 rounded text-sm font-medium transition"
          >
            ⚔️ Start Battle
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Timmu: {playerHeroes.length} hero • Stage saat ini: {progress.currentCampaignStage}
        </p>
      </div>

      {currentBattle && (
        <div className="bg-surface rounded-lg p-4 border border-gray-800 space-y-3">
          <h3 className="font-bold">Hasil Pertempuran</h3>
          <div
            className={`text-2xl font-bold ${
              currentBattle.result?.winner === 'player' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {currentBattle.result?.winner === 'player' ? '🏆 VICTORY!' : '💀 DEFEAT'}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>Rounds: {currentBattle.result?.rounds}</div>
            <div>Damage Dealt: {currentBattle.result?.damageDealt.toLocaleString()}</div>
            <div>Damage Taken: {currentBattle.result?.damageTaken.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3 text-sm">
            <div className="font-bold mb-1">Rewards:</div>
            <div>💰 {currentBattle.result?.rewards.gold} Gold</div>
            <div>⭐ {currentBattle.result?.rewards.exp} EXP</div>
            {currentBattle.result?.rewards.items.map((item, i) => (
              <div key={i}>📦 {item}</div>
            ))}
          </div>
          <button
            onClick={claimBattleRewards}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition"
          >
            OK
          </button>
        </div>
      )}

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-2">Preview Enemy (Stage {stage})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {generateEnemyTeam(stage).map((e) => (
            <div key={e.id} className="bg-gray-900/30 rounded p-2">
              <div className="font-bold">{e.name}</div>
              <div className="text-gray-400">{e.class} • HP {e.baseStats.hp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
