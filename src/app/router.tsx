import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PortfolioWorld } from '../features/world'
import { GATES } from '../features/world/data/gates'

/**
 * Path-based routes (not hash):
 * /  /about  /experience  /projects  /skills  /contact
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* One layout route so the 3D world is never remounted when the URL changes */}
        <Route element={<PortfolioWorld />}>
          <Route path="/" element={null} />
          {GATES.map((gate) => (
            <Route key={gate.id} path={gate.path} element={null} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
