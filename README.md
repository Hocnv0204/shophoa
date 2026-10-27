# Shop Hoa Tươi — Landing Page Demo

Demo landing page shop hoa tươi bằng **React + Vite + React Router + CSS thuần**
(không framework CSS, để build chắc chắn và nhẹ).

## Các trang

| Đường dẫn | Trang |
|---|---|
| `/` | Trang chủ: hero, hoa đặt nhiều nhất, why-us, hoa sinh nhật, đánh giá |
| `/danh-muc` | Tất cả sản phẩm, có sắp xếp, lọc theo mức giá, phân trang |
| `/danh-muc/:slug` | Trang danh mục theo loại hoa (sinh nhật, khai trương, lan hồ điệp, tang lễ, tốt nghiệp, giảm giá) |
| `/san-pham/:id` | Chi tiết sản phẩm: chọn kích cỡ, số lượng, sản phẩm liên quan |

Bấm vào sản phẩm để sang trang chi tiết, bấm mục ở menu để sang trang danh mục,
gõ từ khóa ở ô tìm kiếm để lọc sản phẩm. Nút Zalo / Messenger / Gọi ngay góc phải
hiện là nút demo — gắn link Zalo OA, Messenger và số hotline thật khi đưa vào sử dụng.

## Chạy local

```bash
npm install
npm run dev
```

## Deploy lên Vercel

### Cách 1: qua GitHub (khuyên dùng)

1. Đẩy code lên GitHub (repo public hoặc private đều được).
2. Vào [vercel.com/new](https://vercel.com/new) → **Import** repo.
3. Vercel tự nhận Framework Preset **Vite**, Build Command `npm run build`,
   Output Directory `dist` → bấm **Deploy**.

### Cách 2: qua Vercel CLI

```bash
npm install -g vercel
vercel
```

Lần đầu CLI sẽ hỏi link project, các lần sau chỉ cần `vercel --prod` để deploy bản production.

### Gắn custom domain

1. Vercel Dashboard → Project → **Settings → Domains** → **Add** domain của bạn.
2. Trỏ DNS ở nhà cung cấp domain theo đúng bản ghi Vercel hiển thị:
   - Domain gốc (apex, vd `shophoatuoi.vn`): bản ghi **A** → `76.76.21.21`.
   - Subdomain (vd `www.shophoatuoi.vn`): bản ghi **CNAME** → `cname.vercel-dns.com`.
3. Đợi DNS lan truyền (thường vài phút đến vài giờ). Vercel tự cấp SSL miễn phí,
   không cần cấu hình thêm.

File `vercel.json` trong project đã có rewrite để load lại trang (refresh) ở các
đường dẫn con như `/san-pham/1` vẫn mở đúng trang thay vì lỗi 404.

## Thay nội dung thật

- Sản phẩm, giá, danh mục: sửa `src/data/products.js`.
- Ảnh sản phẩm: hiện là ô placeholder màu hồng. Thay bằng ảnh thật bằng cách
  thêm file ảnh vào `public/` và sửa component `ProductCard` / trang chi tiết
  để dùng ảnh thay cho ô màu.
- Icon Zalo / Messenger / hotline góc phải: `public/icons/` (đã dùng đúng 3 icon thật).
- Hotline, email, địa chỉ: sửa `src/components/Header.jsx` và `src/components/Footer.jsx`.
- Màu chủ đạo: sửa các mã màu trong `src/index.css` (`#E91E63` hồng chính,
  `#E53935` đỏ, `#FCE4EC` hồng nhạt).
