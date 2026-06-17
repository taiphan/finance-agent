import { Card, CardTitle } from '@/components/ui/card'

const rows = [
  { scenario: '🐂 Bull', y24: '+600', y25: '+2.500', y26: '+4.500', color: '#3fb950' },
  { scenario: '📊 Base', y24: '+300', y25: '+1.200', y26: '+2.800', color: '#58a6ff' },
  { scenario: '🐻 Bear', y24: '+100', y25: '+400',   y26: '+1.000', color: '#f85149' },
]

export function ForecastTable() {
  return (
    <Card>
      <CardTitle icon="📋">Bảng Dự Báo Chi Tiết (tỷ VND)</CardTitle>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b" style={{ borderColor: '#30363d' }}>
            {['Kịch bản', '2024E', '2025E', '2026E'].map(h => (
              <th key={h} className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-[#8b949e]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.scenario} className="border-b last:border-0 hover:bg-[#ffffff08]" style={{ borderColor: 'rgba(48,54,61,.4)' }}>
              <td className="py-2.5 px-3">{r.scenario}</td>
              <td className="py-2.5 px-3 font-semibold" style={{ color: r.color }}>{r.y24}</td>
              <td className="py-2.5 px-3 font-semibold" style={{ color: r.color }}>{r.y25}</td>
              <td className="py-2.5 px-3 font-semibold" style={{ color: r.color }}>{r.y26}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: '#58a6ff18', border: '1px solid #58a6ff' }}>
        <span className="font-bold text-[#58a6ff]">Khoảng tin cậy 80% (Base 2025E):</span>
        <span className="text-[#e6edf3] ml-2">600 tỷ → 2.000 tỷ VND</span>
      </div>
      <div className="mt-2 space-y-1 text-xs text-[#8b949e]">
        <div>📌 <span className="text-[#e6edf3]">Sentiment +0.32</span> → điều chỉnh +8% so với base thuần</div>
        <div>📌 <span className="text-[#e6edf3]">Finacle cloud</span> → giảm OPEX dài hạn → +5%</div>
        <div>📌 <span className="text-[#e6edf3]">Credit growth 18–20%</span> toàn ngành → +6%</div>
      </div>
    </Card>
  )
}
