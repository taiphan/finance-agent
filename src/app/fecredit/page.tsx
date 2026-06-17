import { Navbar } from '@/components/dashboard/Navbar'
import { KpiGrid } from '@/components/dashboard/KpiGrid'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import {
  RevenueChart, LoanChart, SentimentChart, ForecastChart,
  RadarRatioChart, DCFChart, ValuationChart, PeerChart, IRRChart,
} from '@/components/dashboard/FinancialCharts'
import { SentimentPanel } from '@/components/dashboard/SentimentPanel'
import { SignalTracker } from '@/components/dashboard/SignalTracker'
import { HealthScorecard } from '@/components/dashboard/HealthScorecard'
import { RiskPanel, CatalystPanel } from '@/components/dashboard/RiskPanel'
import { ForecastTable } from '@/components/dashboard/ForecastTable'
import { PipelineSummary } from '@/components/dashboard/PipelineSummary'

export default function FECreditPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      <Navbar
        title="🏍️ FE Credit"
        subtitle="VPBank SMBC Finance Co. · Consumer Finance"
        badge="⚠ WATCH / SPEC BUY"
        badgeColor="#d29922"
      />

      <main className="max-w-7xl mx-auto px-5 pb-16">

        <div className="mt-6">
          <KpiGrid />
        </div>

        <SectionHeader num={1} title="📊 Dữ Liệu Tài Chính Lịch Sử" skill="alphaear-stock · financial-analyst" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RevenueChart />
          <LoanChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <ValuationChart />
          <DCFChart />
          <RadarRatioChart />
        </div>

        <SectionHeader num={2} title="🎭 Phân Tích Cảm Xúc Thị Trường" skill="alphaear-sentiment" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SentimentPanel />
          <SentimentChart />
        </div>

        <SectionHeader num={3} title="📈 Dự Báo & Tỷ Số Tài Chính" skill="alphaear-predictor · financial-analyst" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ForecastChart />
          <ForecastTable />
        </div>

        <SectionHeader num={4} title="📡 Signal Tracker & Financial Health" skill="signal-tracker · financial-analyst" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SignalTracker />
          <HealthScorecard />
        </div>

        <SectionHeader num={5} title="⚠ Rủi Ro & Catalysts" skill="alphaear-news · investment-advisor" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RiskPanel />
          <CatalystPanel />
        </div>

        <SectionHeader num={6} title="🏆 So Sánh Ngành & Luận Điểm Đầu Tư" skill="investment-advisor · alphaear-reporter" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <PeerChart />
          <IRRChart />
        </div>

        <SectionHeader num={7} title="📋 Dashboard Tổng Hợp 11 Skills" skill="alphaear-reporter" />
        <PipelineSummary />

        <footer className="mt-12 pt-5 border-t text-center text-xs text-[#8b949e]" style={{ borderColor: '#30363d' }}>
          ⚠ Không phải tư vấn đầu tư chuyên nghiệp. Dữ liệu từ nguồn công khai, chưa kiểm toán tại cấp VPB FC.<br />
          Tạo bởi 11 Finance Skills AI Agent Pipeline · 16/06/2026
        </footer>
      </main>
    </div>
  )
}
