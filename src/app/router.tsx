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
        <Route path="/" element={<PortfolioWorld />} />
        {GATES.map((gate) => (
          <Route key={gate.id} path={gate.path} element={<PortfolioWorld />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
