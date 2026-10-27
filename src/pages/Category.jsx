import { useMemo, useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, categoryName } from '../data/products.js'

const PAGE_SIZE = 8
const DEFAULT_PRICE_RANGES = [
  { id: 'under500', label: 'Dưới 500.000đ', test: (p) => p < 500000 },
  { id: 'mid', label: '500.000 – 1.000.000đ', test: (p) => p >= 500000 && p <= 1000000 },
  { id: 'over1m', label: 'Trên 1.000.000đ', test: (p) => p > 1000000 },
]
const COMBINED_PRICE_RANGES = [
  { id: 'under50', label: 'Dưới 50.000', test: (p) => p < 50000 },
  { id: '50to100', label: 'Từ 50.000 - 100.000', test: (p) => p >= 50000 && p <= 100000 },
  { id: 'over100', label: 'Trên 100.000', test: (p) => p > 100000 },
]
const PRICE_RANGES_BY_CATEGORY = {
  'tong-hop-25k-150k': COMBINED_PRICE_RANGES,
  'tong-hop-200k-350k': [
    { id: 'under250', label: 'Dưới 250.000', test: (p) => p < 250000 },
    { id: '250to300', label: 'Từ 250.000 - 300.000', test: (p) => p >= 250000 && p <= 300000 },
    { id: 'over300', label: 'Trên 300.000', test: (p) => p > 300000 },
  ],
  'tong-hop-tu-400k': [
    { id: 'under600', label: 'Dưới 600.000', test: (p) => p < 600000 },
    { id: '600to1m', label: 'Từ 600.000 - 1.000.000', test: (p) => p >= 600000 && p <= 1000000 },
    { id: 'over1m', label: 'Trên 1.000.000', test: (p) => p > 1000000 },
  ],
  'lam-theo-yeu-cau': DEFAULT_PRICE_RANGES,
  'qua-sinh-nhat': DEFAULT_PRICE_RANGES,
}

export default function Category() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const priceRanges = PRICE_RANGES_BY_CATEGORY[slug] || DEFAULT_PRICE_RANGES
  const [sort, setSort] = useState('new')
  const [prices, setPrices] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPrices([])
    setPage(1)
  }, [slug])
  useEffect(() => { setPage(1) }, [q, sort, prices])

  const list = useMemo(() => {
    let out = [...PRODUCTS]
    if (slug) {
      const categoryProducts = out.filter((p) => p.category === slug)
      if (categoryProducts.length) out = categoryProducts
      else if (slug === 'lam-theo-yeu-cau') out = out.filter((p) => p.category === 'tong-hop-tu-400k')
      else if (slug === 'qua-sinh-nhat') out = out.filter((p) => p.category === 'tong-hop-200k-350k')
      else out = categoryProducts
    }
    if (q) out = out.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    if (prices.length) {
      out = out.filter((p) => prices.some((id) => priceRanges.find((r) => r.id === id)?.test(p.price)))
    }
    if (sort === 'asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'desc') out.sort((a, b) => b.price - a.price)
    if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    return out
  }, [slug, q, sort, prices, priceRanges])

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const title = q ? `Kết quả cho “${q}”` : categoryName(slug)

  const togglePrice = (id) =>
    setPrices((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <main className="wrap">
      <div className="crumb"><Link to="/">Trang chủ</Link> / {title}</div>
      <div className="cat-title"><h2>{title.toUpperCase()}</h2><span>{list.length} sản phẩm</span></div>
      <div className="toolbar2">
        <p>Hiển thị {shown.length} trên {list.length} sản phẩm</p>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">Sắp xếp: Mới nhất</option>
          <option value="asc">Giá: Thấp đến cao</option>
          <option value="desc">Giá: Cao đến thấp</option>
          <option value="name">Tên: A đến Z</option>
        </select>
      </div>

      <div className="cat-body">
        <aside className="price-sidebar">
          <section className="price-filter" aria-label="Lọc theo mức giá">
            <h4>MỨC GIÁ</h4>
            <div className="price-options">
              {priceRanges.map((r) => (
                <label key={r.id}>
                  <input type="checkbox" checked={prices.includes(r.id)} onChange={() => togglePrice(r.id)} />
                  {r.label}
                </label>
              ))}
            </div>
          </section>
        </aside>
        <div className="cat-grid">
          {shown.map((p) => <ProductCard key={p.id} p={p} />)}
          {shown.length === 0 && <p style={{ color: '#666' }}>Không tìm thấy sản phẩm phù hợp.</p>}
        </div>
      </div>

      {pages > 1 && (
        <div className="pager">
          {Array.from({ length: pages }, (_, i) => (
            <span key={i + 1} className={page === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</span>
          ))}
        </div>
      )}
    </main>
  )
}
