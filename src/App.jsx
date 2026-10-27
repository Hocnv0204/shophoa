import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [toast, setToast] = useState('')
  const showToast = useCallback((msg) => setToast(msg), [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/danh-muc" element={<Category />} />
        <Route path="/danh-muc/:slug" element={<Category />} />
        <Route path="/san-pham/:id" element={<ProductDetail onContact={showToast} />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <FloatingButtons onContact={showToast} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
