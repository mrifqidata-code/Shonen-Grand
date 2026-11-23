import { Outlet, NavLink } from 'react-router-dom'

export function Layout() {
  const navItems = [
    { to: '/home', label: '🏠 Home' },
    { to: '/heroes', label: '⚔️ Heroes' },
    { to: '/team', label: '👥 Team' },
    { to: '/battle', label: '⚔️ Battle' },
    { to: '/summon', label: '✨ Summon' },
    { to: '/inventory', label: '🎒 Inventory' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
          Shonen Grand
        </h1>
        <span className="text-xs text-gray-400">Anime Idle RPG</span>
      </header>
      <nav className="bg-surface/80 border-b border-gray-800 px-2 py-2 flex gap-1 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded text-sm whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
