import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './features/home/Home'
import { Heroes } from './features/heroes/Heroes'
import { Team } from './features/team/Team'
import { Battle } from './features/battle/Battle'
import { Summon } from './features/summon/Summon'
import { Inventory } from './features/inventory/Inventory'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="heroes" element={<Heroes />} />
          <Route path="team" element={<Team />} />
          <Route path="battle" element={<Battle />} />
          <Route path="summon" element={<Summon />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
