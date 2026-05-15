import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/routes/AppRoutes'

/**
 * Root component stays thin: routing + global wrappers live here,
 * not feature logic (keeps SOLID boundaries obvious for new devs).
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
