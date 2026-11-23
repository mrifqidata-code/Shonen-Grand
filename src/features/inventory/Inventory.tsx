// src/features/inventory/Inventory.tsx

import { useGameStore } from '../../stores/gameStore'

export function Inventory() {
  const { progress } = useGameStore()

  const items = [
    { id: 'exp_potion', name: 'EXP Potion', count: 12, icon: '🧪', desc: 'Level up hero' },
    { id: 'hero_shard', name: 'Hero Shard', count: 5, icon: '💎', desc: 'Summon hero spesifik' },
    { id: 'star_shard', name: 'Star Shard', count: 3, icon: '⭐', desc: 'Star up hero' },
    { id: 'gold', name: 'Gold', count: progress.gold, icon: '💰', desc: 'Currency utama' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Inventory</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-bold text-sm">{item.name}</div>
            <div className="text-xs text-gray-400 mb-1">{item.desc}</div>
            <div className="text-lg font-bold text-amber-400">{item.count.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
