import { Navbar } from '@/components/dashboard/Navbar'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { EcosystemKpiGrid } from '@/components/ecosystem/EcosystemKpiGrid'
import { EntityGrid } from '@/components/ecosystem/EntityGrid'
import { ContributionChart, UserGrowthChart, ScoreRadarChart, ValuationChart, SentimentCompareChart, IRRChart } from '@/components/ecosystem/EcosystemCharts'
import { EcosystemSignals, EcosystemRisks, EcosystemCatalysts } from '@/components/ecosystem/EcosystemSignals'
import { SynergyJourney } from '@/components/ecosystem/SynergyJourney'
import { BcgMatrix } from '@/components/ecosystem/BcgMatrix'

export default function EcosystemPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      <Navbar
        title="🏦 VPBank Ecosystem"
        subtitle="Vietnam Prosperity JSC Bank · 30M+ Customers"
        badge="BUY ↑ Conviction"
        badgeColor="#3fb950"
      />

      <main className="max-w-7xl mx-auto px-5 pb-16">

        <div className="mt-6">
          <EcosystemKpiGrid />
        </div>

        {/* Section 1: Entity Overview */}
        <SectionHeader num={1} title="🗺️ 7 Công Ty Con — Hệ Sinh Thái" skill="alphaear-stock · financial-analyst" />
        <EntityGrid />

        {/* Section 2: Financial Charts */}
        <SectionHeader num={2} title="📊 Dữ Liệu Tài Chính So Sánh" skill="financial-analyst · alphaear-stock" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ContributionChart />
          <UserGrowthChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <SentimentCompareChart />
          <ScoreRadarChart />
          <ValuationChart />
        </div>

        {/* Section 3: BCG + Synergy */}
        <SectionHeader num={3} title="💼 BCG Matrix & Synergy" skill="investment-advisor · logic-visualizer" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BcgMatrix />
          <SynergyJourney />
        </div>

        {/* Section 4: Signals */}
        <SectionHeader num={4} title="📡 Signal Tracker — Toàn Ecosystem" skill="alphaear-signal-tracker" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EcosystemSignals />
          <EcosystemRisks />
        </div>

        {/* Section 5: Catalysts + IRR */}
        <SectionHeader num={5} title="🚀 Catalysts & Luận Điểm Đầu Tư" skill="investment-advisor · alphaear-predictor" />
        <EcosystemCatalysts />
        <div className="mt-5">
          <IRRChart />
        </div>

        {/* Investment thesis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div className="rounded-xl p-5 border" style={{ background: '#3fb95015', borderColor: '#3fb950' }}>
            <div className="font-bold text-[#3fb950] mb-2">🐂 Bull Case — 2028</div>
            <div className="text-sm text-[#8b949e] leading-relaxed">
              CAKE IPO $2B+ → FE Credit profitable → VPBankS top-3 → P/B re-rates 1x → 2.5x
              <div className="mt-2 font-bold text-[#3fb950]">IRR ~35%/năm · MOIC 2.5x</div>
            </div>
          </div>
          <div className="rounded-xl p-5 border" style={{ background: '#d2992215', borderColor: '#d29922' }}>
            <div className="font-bold text-[#d29922] mb-2">📊 Base Case — 2027</div>
            <div className="text-sm text-[#8b949e] leading-relaxed">
              LNTT hợp nhất 38–42K tỷ · CAKE 10M users · FE Credit +2K tỷ · VPBankS +2.4K tỷ
              <div className="mt-2 font-bold text-[#d29922]">IRR ~20%/năm · MOIC 1.7x</div>
            </div>
          </div>
          <div className="rounded-xl p-5 border" style={{ background: '#f8514915', borderColor: '#f85149' }}>
            <div className="font-bold text-[#f85149] mb-2">🐻 Bear Case — Rủi ro</div>
            <div className="text-sm text-[#8b949e] leading-relaxed">
              FE Credit NPL tái bùng → CK VN điều chỉnh → bancassurance scandal → macro chậm
              <div className="mt-2 font-bold text-[#f85149]">IRR ~2%/năm · MOIC 1.1x</div>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-5 border-t text-center text-xs text-[#8b949e]" style={{ borderColor: '#30363d' }}>
          ⚠ Không phải tư vấn đầu tư chuyên nghiệp. Số liệu công ty con phần lớn là ước tính từ nguồn công khai.<br />
          Tạo bởi 11 Finance Skills AI Agent Pipeline · VPBank Ecosystem · 16/06/2026
        </footer>
      </main>
    </div>
  )
}
