import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PackingPage from './pages/PackingPage'
import ProductsPage from './pages/ProductsPage'
import SearchPage from './pages/SearchPage'
import TroubleshootingPage from './pages/TroubleshootingPage'
import UsageGuidePage from './pages/UsageGuidePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="packing" element={<PackingPage />} />
        <Route path="troubleshooting" element={<TroubleshootingPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="usage-guide" element={<UsageGuidePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
