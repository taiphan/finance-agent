'use client'
import { sentimentSources } from '@/lib/fecredit-data'
import { Card, CardTitle } from '@/components/ui/card'

export function SentimentPanel() {
  return (
    <Card>
      <CardTitle icon="📡">Điểm Sentiment Theo Nguồn</CardTitle>
      <div className="space-y-3 mt-1">
        {sentimentSources.map((s) => {
          const isNeg = s.score < 0
          const pct = Math.abs(s.score) / 0.5 * 100
          return (
            <div key={s.source} className="flex items-center gap-2">
              <span className="w-44 shrink-0 text-xs text-[#8b949e]">{s.source}</span>
              <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: '#21262d' }}>
                <div
                  className="h-full flex items-center justify-end pr-2 text-white text-[11px] font-bold rounded-md"
                  style={{ width: `${Math.max(pct, 18)}%`, background: s.color }}
                >
                  {s.score > 0 ? '+' : ''}{s.score}
                </div>
              </div>
              <span className="w-12 text-right text-sm font-bold" style={{ color: s.color }}>
                {s.score > 0 ? '+' : ''}{s.score}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-3 p-3 rounded-lg text-xs text-[#8b949e]" style={{ background: '#21262d' }}>
        💡 <strong className="text-[#e6edf3]">Tín hiệu contrarian:</strong> Brand sentiment người vay âm trong khi tổng thể dương → thương hiệu phục hồi chậm hơn kết quả tài chính.
      </div>
    </Card>
  )
}
