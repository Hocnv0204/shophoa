export default function FloatingButtons({ onContact }) {
  return (
    <div className="float-btns">
      <img src="/icons/zalo.png" alt="Zalo" title="Chat Zalo"
        onClick={() => onContact('Demo: nút này sẽ mở Zalo OA của shop khi gắn link thật.')} />
      <img src="/icons/messenger.png" alt="Messenger" title="Chat Messenger"
        onClick={() => onContact('Demo: nút này sẽ mở Messenger của shop khi gắn link thật.')} />
      <img src="/icons/hotline.png" alt="Gọi ngay" title="Gọi ngay"
        onClick={() => onContact('Demo: nút này sẽ gọi hotline 1900 xxx xxx khi gắn số thật.')} />
    </div>
  )
}
