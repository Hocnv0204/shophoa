import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS } from '../data/products.js'

const banners = [
  '2aOboR8HZBZon1t2ZJl7PwfGtRLDkmVsfTGv6u48.jpg',
  '2aOboR8HYVeDyXMIfWlvfUTuplOTprXGJ7Z8au7k.jpg',
  '2aOboR8HY4QjygAB7snimkMP5EC2oxtt2utYgZpg.jpg',
  '2aOboR8HXT6hg4aQbL8sjSFsz5XXywUWmZayCG0W.jpg',
  '2aOboR8HbJtu42BDrfe4h9lthWvPRPlPna5Ekb0S.jpg',
  '2aOboR8HVYMlsikxBtqICxTa2gcC4fm1Cc6XLnXM.jpg',
].map((file) => `/assets/banner/${file}`)

export default function Home() {
  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    if (a.price == null) return b.price == null ? 0 : 1
    if (b.price == null) return -1
    return a.price - b.price
  })
  const [bannerIndex, setBannerIndex] = useState(0)
  const [previousBannerIndex, setPreviousBannerIndex] = useState(null)

  const changeBanner = (direction) => {
    setBannerIndex((index) => {
      const nextIndex = (index + direction + banners.length) % banners.length
      setPreviousBannerIndex(index)
      return nextIndex
    })
  }

  useEffect(() => {
    if (previousBannerIndex === null) return
    const timer = window.setTimeout(() => setPreviousBannerIndex(null), 1000)
    return () => window.clearTimeout(timer)
  }, [previousBannerIndex])

  useEffect(() => {
    const timer = window.setInterval(() => {
      changeBanner(1)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main>
      <div className="wrap">
        <section className="hero">
          <div className="txt">
            <div className="eyebrow">BỘ SƯU TẬP MỚI</div>
            <h2>Hoa chúc mừng<br />ngày đặc biệt</h2>
            <Link className="cta" to="/danh-muc/qua-sinh-nhat">ĐẶT HOA NGAY →</Link>
            <div className="sub">Hơn 500 mẫu hoa cho sinh nhật, khai trương, kỷ niệm và ngày lễ.</div>
          </div>
          <div className="banner">
            <img className="banner-current" src={banners[bannerIndex]} alt={`Bó hoa nổi bật ${bannerIndex + 1}`} />
            {previousBannerIndex !== null && <img className="banner-previous" src={banners[previousBannerIndex]} alt="" aria-hidden="true" />}
            <div className="arrows">
              <button type="button" aria-label="Ảnh trước" onClick={() => changeBanner(-1)}>‹</button>
              <button type="button" aria-label="Ảnh tiếp theo" onClick={() => changeBanner(1)}>›</button>
            </div>
          </div>
        </section>

        <section className="sect">
          <h3>Tất cả sản phẩm</h3><div className="rule"></div>
          <div className="grid">{sortedProducts.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </section>

        <section className="why"><div className="wrap"><div className="row">
          <div><div className="circ">60′</div><b>Giao trong 60 phút</b><span>Nội thành Hà Nội</span></div>
          <div><div className="circ">24/7</div><b>Đặt hoa 24/7</b><span>Mọi lúc, mọi nơi</span></div>
          <div><div className="circ">90%</div><b>Giống hình 80–90%</b><span>Hoa thực tế như mẫu</span></div>
          <div><div className="circ">500+</div><b>Hơn 500 mẫu hoa</b><span>Mọi dịp, mọi ngân sách</span></div>
        </div></div></section>

        <section className="sect">
          <h3>Khách hàng nói gì</h3><div className="rule"></div>
          <div className="quotes">
            <div className="quote"><p>“Hoa đẹp, giao đúng giờ hẹn, bó hoa giống hình mẫu tới 90%. Mình sẽ đặt lại dài dài.”</p><b>Thu Hà</b><span>Khách hàng tại Hà Nội</span></div>
            <div className="quote"><p>“Đặt lúc 9h sáng, 10h đã giao tới văn phòng. Thiệp viết tay rất xinh, người nhận rất thích.”</p><b>Minh Anh</b><span>Khách hàng tại Hà Nội</span></div>
            <div className="quote"><p>“Giá rõ ràng, không phát sinh. Lẵng khai trương to đẹp, sang hơn cả hình trên web.”</p><b>Quốc Bảo</b><span>Khách hàng tại TP.HCM</span></div>
          </div>
        </section>
      </div>
    </main>
  )
}
