import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'

export default function Header() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    navigate(q.trim() ? `/danh-muc?q=${encodeURIComponent(q.trim())}` : '/danh-muc')
  }
  return (
    <header>
      <div className="wrap">
        <div className="header">
          <div className="logo">
            <Link to="/" aria-label="Rose & Bloom - Trang chủ"><img src="/icons/logo.png" alt="Rose & Bloom" /></Link>
          </div>
          <form className="search" onSubmit={submit}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm kiếm..." />
          </form>
        </div>
      </div>
      <nav className="menu">
        {CATEGORIES.map((c) => (
          <NavLink key={c.slug} to={`/danh-muc/${c.slug}`}>{c.menu}</NavLink>
        ))}
      </nav>
    </header>
  )
}
