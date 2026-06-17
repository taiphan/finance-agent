'use client'
import { scorecardData } from '@/lib/fecredit-data'
import { Card, CardTitle } from '@/components/ui/card'

export function HealthScorecard() {
  return (
    <Card>
      <CardTitle icon="🏥">/financial-health Scorecard</CardTitle>
      <div className="space-y-3">
        {scorecardData.map((item) => (
          <div key={item.category} className="flex items-center gap-3">
            <span className="w-40 shrink-0 text-sm">{item.category}</span>
            <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: '#21262d' }}>
              <div
                className="h-full flex items-center pl-2.5 text-white text-xs font-bold rounded-md transition-all duration-700"
                style={{ width: `${item.score * 10}%`, background: item.color }}
              >
                {item.score}/10
              </div>
            </div>
            <span className="w-6 text-right font-bold text-sm" style={{ color: item.color }}>{item.score}</span>
          </div>
        ))}
        <div className="border-t border-[#30363d] pt-3">
          <div className="flex items-center gap-3">
            <span className="w-40 shrink-0 text-sm font-bold">⭐ Tổng thể</span>
            <div className="flex-1 h-7 rounded-md overflow-hidden" style={{ background: '#21262d' }}>
              <div className="h-full flex items-center pl-3 text-white text-sm font-extrabold rounded-md" style={{ width: '60%', background: '#d29922' }}>
                6/10 — Phục hồi thận trọng
              </div>
            </div>
            <span className="w-6 text-right font-bold text-lg text-[#d29922]">6</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
