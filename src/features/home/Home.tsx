// src/features/home/Home.tsx

import { useGameStore } from '../../stores/gameStore'
import { formatIdleTime } from '../../game/idle'

export function Home() {
  const { progress, idleRewards, collectIdleRewards } = useGameStore()

  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h2 className="text-lg font-bold mb-2">Selamat Datang di Shonen Grand!</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-gray-400">Level</div>
            <div className="text-xl font-bold text-indigo-400">{progress.level}</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-gray-400">Gold</div>
            <div className="text-xl font-bold text-amber-400">{progress.gold.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-gray-400">Diamond</div>
            <div className="text-xl font-bold text-cyan-400">{progress.diamonds}</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-gray-400">Ticket</div>
            <div className="text-xl font-bold text-pink-400">{progress.tickets}</div>
          </div>
        </div>
      </div>

      {idleRewards && (
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-4 border border-indigo-700">
          <h3 className="font-bold mb-2">🎁 Idle Rewards Tersedia!</h3>
          <p className="text-sm text-gray-300 mb-3">
            Waktu idle: {formatIdleTime(idleRewards.timeElapsed)}
          </p>
          <div className="flex gap-4 text-sm mb-3">
            <span>💰 {idleRewards.gold.toLocaleString()} Gold</span>
            <span>⭐ {idleRewards.exp.toLocaleString()} EXP</span>
            <span>🎫 {idleRewards.tickets} Ticket</span>
          </div>
          <button
            onClick={collectIdleRewards}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium transition"
          >
            Klaim Rewards
          </button>
        </div>
      )}

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-2">Progress Campaign</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-800 rounded-full h-3">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(100, (progress.currentCampaignStage / 50) * 100)}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">Stage {progress.currentCampaignStage}</span>
        </div>
      </div>

      <div className="bg-surface rounded-lg p-4 border border-gray-800">
        <h3 className="font-bold mb-2">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <a href="/battle" className="bg-gray-800 hover:bg-gray-700 rounded p-3 text-center text-sm transition">
            ⚔️ Battle
          </a>
          <a href="/summon" className="bg-gray-800 hover:bg-gray-700 rounded p-3 text-center text-sm transition">
            ✨ Summon
          </a>
          <a href="/team" className="bg-gray-800 hover:bg-gray-700 rounded p-3 text-center text-sm transition">
            👥 Team
          </a>
        </div>
      </div>
    </div>
  )
}
