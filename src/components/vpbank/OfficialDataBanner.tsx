'use client'

export function OfficialDataBanner() {
  return (
    <div className="rounded-xl p-4 mb-5 flex items-start gap-3 border" style={{ background: '#58a6ff10', borderColor: '#58a6ff40' }}>
      <span className="text-xl shrink-0">✅</span>
      <div>
        <div className="font-semibold text-sm text-[#58a6ff]">Dữ liệu chính thức từ VPBank (vpbank.com.vn/quan-he-nha-dau-tu)</div>
        <div className="text-xs text-[#8b949e] mt-1">
          4 tài liệu PDF tải trực tiếp · BCTC HN Q1/2026 (91 trang) · KQHD Q1/2026 (31 trang) · IR Newsletter #26 · CAR Q1/2026 (26 trang)
          · <strong className="text-[#e6edf3]">Chưa kiểm toán tại 31/03/2026</strong>
        </div>
      </div>
    </div>
  )
}
