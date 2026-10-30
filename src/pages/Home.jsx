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

const reviews = [
  ['Ngọc Lan', 'Hoa lụa nhìn giống thật tới 90%, màu lên đúng như hình. Cắm phòng khách cả tháng vẫn đẹp, mình sẽ ủng hộ dài dài.'],
  ['Quang Huy', 'Đặt hoa len tặng bạn gái dịp kỷ niệm, shop làm rất tỉ mỉ. Giao đúng hẹn, bạn mình rất thích vì giữ được lâu.'],
  ['Thanh Thảo', 'Bó hoa sáp thơm nhẹ, đóng gói chắc chắn, không móp méo. Thiệp viết tay xinh, tặng cô giáo 20/11 rất hợp.'],
  ['Đức Minh', 'Giá rõ ràng, không phát sinh phí. Lẵng hoa lụa khai trương to đẹp, nhìn sang hơn cả ảnh mẫu trên web.'],
  ['Phương Linh', 'Mình nhờ shop tư vấn hoa khô trang trí quán cà phê, phối màu chuẩn gu luôn. Khách vào quán ai cũng khen.'],
  ['Hoàng Yến', 'Đặt lúc 8h sáng, 10h đã giao tới công ty. Hoa giấy nhún nhiều màu pastel, đồng nghiệp nhận quà rất vui.'],
  ['Bảo Ngọc', 'Bó hoa kẹo độc đáo, cả lớp mình ai cũng khen. Shop gói cẩn thận, giao nhanh đúng giờ.'],
  ['Văn Toàn', 'Lần đầu mua hoa len nên hơi lo, nhận hàng thấy đẹp hơn hình. Nhân viên nhiệt tình, trả lời tin nhắn rất nhanh.'],
  ['Thu Trang', 'Hoa không bao giờ héo nên tặng sếp rất hợp, nhìn lịch sự và sang trọng. Giá hợp lý so với chất lượng.'],
  ['Anh Tuấn', 'Nhiều mẫu hoa sáp để chọn, mình chọn được bó tặng mẹ nhân ngày 20/10. Mẹ mình thích lắm, để trên bàn thờ nhìn rất trang nhã.'],
  ['Khánh Vy', 'Hoa lụa cưới cầm tay chụp ảnh lên hình rất đẹp, đúng tông màu mình muốn. Shop hỗ trợ chỉnh sửa theo yêu cầu.'],
  ['Minh Châu', 'Giao hàng đúng giờ hẹn, hoa giống hình mẫu tới 95%. Đóng gói kỹ nên không bị hư hỏng gì cả.'],
  ['Gia Hân', 'Đặt hoa khô tặng tân gia, màu nâu cam rất ấm áp. Chủ nhà khen nhiều, mình sẽ đặt lại dịp sau.'],
  ['Hải Đăng', 'Shop làm hoa len theo yêu cầu, thêm cả tên người nhận lên thiệp. Chi tiết nhỏ nhưng làm người nhận rất xúc động.'],
  ['Mai Phương', 'Giá niêm yết minh bạch, tư vấn không ép mua. Hoa sáp đẹp hơn mong đợi, đáng tiền.'],
]
const reviewGroups = Array.from({ length: Math.ceil(reviews.length / 3) }, (_, index) => reviews.slice(index * 3, index * 3 + 3))

export default function Home() {
  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    if (a.price == null) return b.price == null ? 0 : 1
    if (b.price == null) return -1
    return a.price - b.price
  })
  const [bannerIndex, setBannerIndex] = useState(0)
  const [previousBannerIndex, setPreviousBannerIndex] = useState(null)
  const [reviewGroupIndex, setReviewGroupIndex] = useState(0)
  const [reviewTransition, setReviewTransition] = useState(true)

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

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return
    const timer = window.setInterval(() => {
      setReviewGroupIndex((index) => index + 1)
    }, 3800)
    return () => window.clearInterval(timer)
  }, [])

  const handleReviewTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || reviewGroupIndex !== reviewGroups.length) return
    setReviewTransition(false)
    setReviewGroupIndex(0)
    window.requestAnimationFrame(() => setReviewTransition(true))
  }

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
          <h3>Đánh giá khách hàng</h3><div className="rule"></div>
          <div className="review-carousel" aria-label="Đánh giá khách hàng">
            <div className="review-track" onTransitionEnd={handleReviewTransitionEnd} style={{ transform: `translateX(-${reviewGroupIndex * 100}%)`, transition: reviewTransition ? undefined : 'none' }}>
              {reviewGroups.map((group, groupIndex) => (
                <div className="review-group" key={groupIndex} aria-hidden={reviewGroupIndex !== groupIndex}>
                  {group.map(([name, quote]) => (
                    <article className="review-card" key={name}>
                      <p>“{quote}”</p>
                      <strong>{name}</strong>
                      <span>Khách hàng tại Hà Nội</span>
                    </article>
                  ))}
                </div>
              ))}
              <div className="review-group" key="review-clone" aria-hidden="true">
                {reviewGroups[0].map(([name, quote]) => (
                  <article className="review-card" key={name}>
                    <p>“{quote}”</p>
                    <strong>{name}</strong>
                    <span>Khách hàng tại Hà Nội</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
