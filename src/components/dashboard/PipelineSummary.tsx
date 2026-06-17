import { Card } from '@/components/ui/card'

const rows = [
  { n: 1, skill: 'alphaear-search', result: 'Thu thập 14 nguồn dữ liệu công khai (VPBank BCTC, VnExpress, Finacle, FPT IS...)', signal: '✅ Done', color: '#58a6ff' },
  { n: 2, skill: 'alphaear-news', result: 'VPBank lãi kỷ lục 2025; BNPL bùng nổ; Home Credit đổi chủ; NIM bị nén', signal: '🟢 Tích cực', color: '#3fb950' },
  { n: 3, skill: 'alphaear-stock', result: 'Dư nợ ~66.000 tỷ (2020 peak); Q2/Q3 2024 lãi trở lại; định giá $0.8–1.2B', signal: '🟡 Phục hồi', color: '#d29922' },
  { n: 4, skill: 'alphaear-sentiment', result: '+0.32 (tích cực thận trọng); brand lag vs financials; momentum tăng từ -0.50', signal: '🟡 Thận trọng', color: '#d29922' },
  { n: 5, skill: 'alphaear-predictor', result: 'Base 2025E: +1.200 tỷ | Bull: +2.500 tỷ | Bear: +400 tỷ; CI80%: [600–2.000 tỷ]', signal: '🟢 Tích cực', color: '#3fb950' },
  { n: 6, skill: 'alphaear-signal-tracker', result: 'Recovery 🟢 7/10 Strengthening · Competition 🟡 5/10 Watch · Digital 🟢 6/10', signal: '🟢 Mua', color: '#3fb950' },
  { n: 7, skill: 'alphaear-logic-visualizer', result: 'Sơ đồ: COVID→NPL→Lỗ→Cải tổ→Phục hồi; Hệ sinh thái VPBank-FEC-SMBC', signal: '🟢 Rõ ràng', color: '#3fb950' },
  { n: 8, skill: 'financial-analyst', result: 'NIM tốt 15–18%; Cost of Risk cao 8–10%; DCF EV ~$770M; Health 6/10', signal: '🟡 Thận trọng', color: '#d29922' },
  { n: 9, skill: 'saas-metrics-coach', result: 'N/A — FE Credit không phải mô hình subscription', signal: '⛔ Skip', color: '#8b949e' },
  { n: 10, skill: 'business-investment-advisor', result: 'WATCH/Spec Buy; IRR 26% base; MOIC 2.5x; NPL là key risk; không IPO sớm', signal: '🟡 Thận trọng', color: '#d29922' },
  { n: 11, skill: 'alphaear-reporter', result: 'Báo cáo 448-line MD + HTML dashboard + Next.js app; Rating 6/10; 3 catalysts', signal: '✅ Hoàn tất', color: '#3fb950' },
]

export function PipelineSummary() {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: '#30363d' }}>
              {['#', 'Skill', 'Kết quả chính', 'Signal'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-[#8b949e]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.n} className="border-b last:border-0 hover:bg-[#ffffff06]" style={{ borderColor: 'rgba(48,54,61,.4)' }}>
                <td className="py-2.5 px-3 text-[#8b949e]">{r.n}</td>
                <td className="py-2.5 px-3">
                  <code className="text-xs px-1.5 py-0.5 rounded font-mono text-[#58a6ff]" style={{ background: '#21262d' }}>{r.skill}</code>
                </td>
                <td className="py-2.5 px-3 text-[#8b949e] max-w-md">{r.result}</td>
                <td className="py-2.5 px-3 font-semibold whitespace-nowrap" style={{ color: r.color }}>{r.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
