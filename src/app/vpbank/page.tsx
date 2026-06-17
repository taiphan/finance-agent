import { Navbar } from '@/components/dashboard/Navbar'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { OfficialDataBanner } from '@/components/vpbank/OfficialDataBanner'
import { SoloTable, ConsolidatedTable, SubsidiaryTable, PlanTable } from '@/components/vpbank/OfficialKpiTable'
import { NimTrendChart, SubPbtChart, ScorecardGrid } from '@/components/vpbank/OfficialCharts'
import { Card, CardTitle } from '@/components/ui/card'

const ctckData = [
  { firm: 'VPBankS', date: '17/04/2026', target: '42.800', upside: 56, thesis: '"Tín dụng mạnh thúc đẩy tăng trưởng lợi nhuận"' },
  { firm: 'Vietcap', date: '20/04/2026', target: '38.000', upside: 39, thesis: '"Thu nhập ngoài lãi vững chắc so với cùng kỳ"' },
  { firm: 'HSC',     date: '24/04/2026', target: '37.300', upside: 36, thesis: '"KQKD Q1/2026 đang đi đúng hướng"' },
  { firm: 'Yuanta',  date: '20/04/2026', target: '34.620', upside: 27, thesis: '"Gia tăng vốn - đẩy mạnh tăng trưởng"' },
  { firm: 'UBS',     date: '17/04/2026', target: '32.000', upside: 17, thesis: '"Thu từ nợ đã xử lý duy trì ổn định"' },
]

const newsItems = [
  { icon: '🟢', text: 'ĐHĐCĐ 2026: Tăng vốn điều lệ 79.339 → 106.243 tỷ (+34%) — kế hoạch 2 giai đoạn' },
  { icon: '🟢', text: 'Cổ tức tiền mặt 5% — năm thứ 4 liên tiếp, tổng ~4.000 tỷ' },
  { icon: '🟢', text: 'Brand Finance: Giá trị thương hiệu +41% đạt ~$1B USD, tăng 33 bậc toàn cầu' },
  { icon: '🟢', text: 'Moody\'s: Nâng triển vọng lên "Ổn định" — tín hiệu tích cực' },
  { icon: '🟢', text: 'GPBank lãi >400 tỷ Q1/2026 ≈ cả năm 2025 — tái cơ cấu thành công' },
  { icon: '🟢', text: 'The Asset Award: "Tổ chức phát hành tài chính bền vững tốt nhất VN 2026"' },
  { icon: '🆕', text: 'CAEX — Sàn crypto VN: OKX Ventures + HashKey đầu tư, cần $380M pilot' },
  { icon: '⚠️', text: 'COF tăng 4,4% → 5,2% trong Q1/2026 — áp lực NIM cần theo dõi' },
  { icon: '⚠️', text: 'Provision tăng +57,9% YoY — thận trọng chất lượng tài sản' },
  { icon: '⚠️', text: 'Thâm hụt thương mại VN tháng thứ 4 liên tiếp — áp lực tỷ giá VND' },
]

export default function VPBankPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      <Navbar
        title="📄 VPBank BCTC Chính Thức"
        subtitle="Dữ liệu trực tiếp từ vpbank.com.vn/quan-he-nha-dau-tu"
        badge="8.2/10 — Tăng trưởng mạnh"
        badgeColor="#3fb950"
      />

      <main className="max-w-7xl mx-auto px-5 pb-16">
        <div className="mt-6">
          <OfficialDataBanner />
        </div>

        {/* Section 1: Scorecard + NIM */}
        <SectionHeader num={1} title="🏥 Scorecard Q1/2026 & NIM Trend" skill="financial-analyst · BCTC PDF" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ScorecardGrid />
          <NimTrendChart />
        </div>

        {/* Section 2: Official tables */}
        <SectionHeader num={2} title="📊 Kết Quả Kinh Doanh Q1/2026" skill="BCTC HN · KQHD Q1/2026 PDF" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SoloTable />
          <ConsolidatedTable />
        </div>

        {/* Section 3: Subsidiaries */}
        <SectionHeader num={3} title="🏢 Công Ty Con & Kế Hoạch 2026" skill="KQHD PDF · ĐHĐCĐ 2026" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SubsidiaryTable />
          <PlanTable />
        </div>
        <div className="mt-5">
          <SubPbtChart />
        </div>

        {/* Section 4: News + CTCK */}
        <SectionHeader num={4} title="📰 Điểm Sáng & Rủi Ro · Báo Cáo CTCK" skill="IR Newsletter #26 · 04/2026" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardTitle icon="📰">Hoạt Động Nổi Bật (IR #26 · 05/2026)</CardTitle>
            <div className="space-y-2 mt-1">
              {newsItems.map((n, i) => (
                <div key={i} className="flex gap-2 text-sm text-[#8b949e]">
                  <span className="shrink-0">{n.icon}</span>
                  <span>{n.text}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardTitle icon="🔬">Báo Cáo Phân Tích CTCK (tháng 4/2026)</CardTitle>
            <div className="text-[10px] text-[#8b949e] mb-3">*Upside vs thị giá ngày 15/04/2026</div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: '#30363d' }}>
                  {['CTCK', 'Ngày', 'Giá MT (VND)', 'Upside*', 'Luận điểm'].map(h => (
                    <th key={h} className="text-left py-2 px-2 text-[10px] uppercase tracking-wider text-[#8b949e]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ctckData.map((r) => (
                  <tr key={r.firm} className="border-b last:border-0 hover:bg-[#ffffff06]" style={{ borderColor: 'rgba(48,54,61,.3)' }}>
                    <td className="py-2 px-2 font-semibold text-[#e6edf3]">{r.firm}</td>
                    <td className="py-2 px-2 text-[#8b949e]">{r.date}</td>
                    <td className="py-2 px-2 font-semibold text-[#58a6ff]">{r.target}</td>
                    <td className="py-2 px-2 font-bold text-[#3fb950]">+{r.upside}%</td>
                    <td className="py-2 px-2 text-[#8b949e]">{r.thesis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: '#3fb95015', border: '1px solid #3fb950' }}>
              <span className="font-bold text-[#3fb950]">Consensus: BUY</span>
              <span className="text-[#8b949e] ml-2">· Target range: 32.000–42.800 VND · Avg upside: +35%</span>
            </div>
          </Card>
        </div>

        {/* Section 5: CAR */}
        <SectionHeader num={5} title="🛡️ An Toàn Vốn Q1/2026" skill="CAR PDF · 24/04/2026" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'CAR Hợp Nhất', value: '14,35%', sub: 'vs 12,45% riêng lẻ', color: '#3fb950' },
            { label: 'Vốn Cấp 1 HN', value: '13,14%', sub: 'Tier 1 Capital Ratio', color: '#3fb950' },
            { label: 'LDR', value: '82,7%', sub: 'vs max 85% NHNN', color: '#58a6ff' },
            { label: 'Vốn NH cho vay TDH', value: '28,3%', sub: 'vs max 30% NHNN', color: '#58a6ff' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-4 text-center border" style={{ background: item.color + '15', borderColor: item.color + '40' }}>
              <div className="text-[11px] text-[#8b949e] mb-2">{item.label}</div>
              <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
              <div className="text-[10px] text-[#8b949e] mt-1">{item.sub}</div>
            </div>
          ))}
        </div>

        <footer className="mt-12 pt-5 border-t text-center text-xs text-[#8b949e]" style={{ borderColor: '#30363d' }}>
          ✅ Dữ liệu từ vpbank.com.vn/quan-he-nha-dau-tu · 4 PDF tải 16/06/2026 ·
          <strong className="text-[#e6edf3]"> Chưa kiểm toán tại 31/03/2026</strong> · Không phải tư vấn đầu tư
        </footer>
      </main>
    </div>
  )
}
