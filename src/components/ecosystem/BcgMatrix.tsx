'use client'
import { bcgItems } from '@/lib/ecosystem-data'
import { Card, CardTitle } from '@/components/ui/card'

export function BcgMatrix() {
  return (
    <Card>
      <CardTitle icon="📊">BCG Matrix — Phân Loại Chiến Lược</CardTitle>
      <div className="relative w-full" style={{ paddingTop: '70%', background: '#21262d', borderRadius: 10, overflow: 'hidden', marginTop: 8 }}>

        {/* axis lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: 'rgba(48,54,61,.8)' }} />
          <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: 'rgba(48,54,61,.8)' }} />
        </div>

        {/* quadrant labels */}
        <div className="absolute top-2 left-3 text-[10px] text-[#8b949e] opacity-60">⭐ STARS</div>
        <div className="absolute top-2 right-3 text-[10px] text-[#8b949e] opacity-60 text-right">❓ QUESTION MARKS</div>
        <div className="absolute bottom-2 left-3 text-[10px] text-[#8b949e] opacity-60">🐄 CASH COWS</div>
        <div className="absolute bottom-2 right-3 text-[10px] text-[#8b949e] opacity-60 text-right">🐶 DOGS</div>

        {/* items */}
        {bcgItems.map((item) => (
          <div
            key={item.id}
            className="absolute text-center"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%,-50%)' }}
          >
            <div
              className="rounded-full flex items-center justify-center mx-auto text-white font-bold"
              style={{
                width: item.size, height: item.size,
                background: item.color + 'cc',
                fontSize: item.size > 48 ? 18 : 14,
              }}
            >
              {item.icon}
            </div>
            <div className="mt-1 text-[9px] font-semibold whitespace-nowrap" style={{ color: item.color }}>
              {item.label} {item.score}
            </div>
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#8b949e]">
        <span>← High market share</span>
        <span className="ml-auto">↑ High growth →</span>
      </div>
    </Card>
  )
}
