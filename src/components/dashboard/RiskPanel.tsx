'use client'
import { risks, catalysts } from '@/lib/fecredit-data'
import { Card, CardTitle } from '@/components/ui/card'

const levelStyle = {
  HIGH: { bg: '#f8514926', border: '#f85149', text: '#f85149' },
  MEDIUM: { bg: '#d2992226', border: '#d29922', text: '#d29922' },
  LOW: { bg: '#d2992215', border: '#d29922', text: '#d29922' },
}

export function RiskPanel() {
  return (
    <Card>
      <CardTitle icon="⚠">Ma Trận Rủi Ro</CardTitle>
      <div className="space-y-2">
        {risks.map((r) => {
          const s = levelStyle[r.level]
          return (
            <div key={r.label} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: '#21262d' }}>
              <span className="flex-1 text-sm">{r.label}</span>
              <span className="text-xs text-[#8b949e] w-9 text-center">{r.prob}%</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                {r.level}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-4 space-y-2">
        <CardTitle icon="💥">Stress Test</CardTitle>
        <div className="p-3 rounded-lg text-xs" style={{ background: '#f8514918', border: '1px solid #f85149' }}>
          <strong className="text-[#f85149]">Nếu NPL tăng +5pp:</strong> chi phí dự phòng tăng ~5.000 tỷ → <strong>xóa sạch lợi nhuận 2025E</strong>
        </div>
        <div className="p-3 rounded-lg text-xs" style={{ background: '#d2992218', border: '1px solid #d29922' }}>
          <strong className="text-[#d29922]">Nếu doanh thu giảm 20%:</strong> lợi nhuận mỏng → có thể tái lỗ nếu OPEX chưa giảm đủ
        </div>
      </div>
    </Card>
  )
}

export function CatalystPanel() {
  return (
    <Card>
      <CardTitle icon="🚦">3 Catalysts Cần Theo Dõi</CardTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        {catalysts.map((c) => (
          <div key={c.num} className="p-4 rounded-xl border" style={{ background: c.color + '15', borderColor: c.color }}>
            <div className="text-2xl mb-1">{c.num}</div>
            <div className="font-bold mb-1" style={{ color: c.color }}>{c.title}</div>
            <div className="text-xs text-[#8b949e] mb-2">{c.timeline}</div>
            <div className="text-sm">{c.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
