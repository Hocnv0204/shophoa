import { useNavigate } from 'react-router-dom'
import { fmt } from '../data/products.js'

export default function ProductCard({ p }) {
  const navigate = useNavigate()
  const go = () => navigate(`/san-pham/${p.id}`)
  return (
    <article className="card" onClick={go}>
      <div className="img">{(p.image || p.images?.[0]) && <img src={p.image || p.images[0]} alt={p.name} loading="lazy" />}{p.badge && <span className="badge">{p.badge}</span>}</div>
      <div className="name">{p.name}</div>
      <div className="price">{fmt(p.price)}{p.oldPrice && <s>{fmt(p.oldPrice)}</s>}</div>
      <button className="btn" type="button">ĐẶT HÀNG</button>
    </article>
  )
}
