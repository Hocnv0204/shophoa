import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, categoryName, fmt, productById, productPrice } from '../data/products.js'

export default function ProductDetail({ onContact }) {
  const { id } = useParams()
  const p = productById(id)
  const [img, setImg] = useState(0)
  const [qty, setQty] = useState(1)
  const images = p?.images?.length ? p.images : p?.image ? [p.image] : []

  useEffect(() => {
    setImg(0)
    if (images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setImg((current) => (current + 1) % images.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [id, images.length])

  if (!p) {
    return (
      <main className="wrap">
        <p style={{ padding: '60px 0', textAlign: 'center' }}>
          Không tìm thấy sản phẩm. <Link to="/" style={{ color: '#E91E63', fontWeight: 700 }}>Về trang chủ</Link>
        </p>
      </main>
    )
  }

  const activeImage = images[Math.min(img, images.length - 1)]

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const rel = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id && x.best).slice(0, 4)

  return (
    <main className="wrap">
      <div className="crumb">
          <Link to="/">Trang chủ</Link> / <Link to={`/danh-muc/${p.category}`}>{categoryName(p.category)}</Link>
      </div>

      <div className="detail">
        <div className="gallery">
          <div className="big">{activeImage && <img src={activeImage} alt="Bó hoa" />}</div>
          <div className="thumbs">
            {images.map((src, n) => (
              <div key={src} onClick={() => setImg(n)} style={img === n ? { borderColor: '#E91E63', borderWidth: 2 } : {}}>
                <img src={src} alt={`Ảnh bó hoa ${n + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="info">
          {p.badge && <div className="sale">GIẢM {p.badge.replace('-', '')} HÔM NAY</div>}
          <div className="pr">{productPrice(p)}{p.oldPrice && <s>{fmt(p.oldPrice)}</s>}</div>
          <h4>Số lượng:</h4>
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="cta-row">
            <button className="main" onClick={() => onContact(`Demo: đã ghi nhận đơn ${qty} sản phẩm. Shop sẽ liên hệ xác nhận.`)}>
              ĐẶT HOA NGAY
            </button>
            <button className="alt" onClick={() => onContact('Demo: nút này sẽ mở Zalo OA của shop khi gắn link thật.')}>Chat Zalo</button>
            <button className="alt green" onClick={() => onContact('Demo: nút này sẽ gọi hotline 1900 xxx xxx khi gắn số thật.')}>Gọi ngay</button>
          </div>

          <div className="bene">
            <span>✓&nbsp; Giao trong 60 phút</span>
            <span>✓&nbsp; Tặng kèm thiệp</span>
            <span>✓&nbsp; Hoa chọn trong ngày</span>
            <span>✓&nbsp; Đổi trả nếu hoa héo</span>
          </div>
        </div>
      </div>

      <section className="sect">
        <h3>Sản phẩm liên quan</h3><div className="rule"></div>
        <div className="grid g4" style={{ marginTop: 30 }}>
          {rel.map((x) => <ProductCard key={x.id} p={x} />)}
        </div>
      </section>
    </main>
  )
}
