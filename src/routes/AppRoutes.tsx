import { Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage'

/**
 * Router boundary: today it is a single page; adding `/journal/:slug`
 * later should only touch this file + new page components.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
