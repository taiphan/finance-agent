'use client'
import { entities } from '@/lib/ecosystem-data'
import { Card } from '@/components/ui/card'

const bcgColors: Record<string, { bg: string; text: string; label: string }> = {
  Star:          { bg: '#f0883e20', text: '#f0883e', label: '⭐ Star' },
  'Cash Cow':    { bg: '#3fb95020', text: '#3fb950', label: '🐄 Cash Cow' },
  Recovery:      { bg: '#d2992220', text: '#d29922', label: '🔄 Recovery' },
  'Question Mark': { bg: '#58a6ff20', text: '#58a6ff', label: '❓ Question Mark' },
  Pivot:         { bg: '#bc8cff20', text: '#bc8cff', label: '🐶 Pivot' },
  Core:          { bg: '#39d0d820', text: '#39d0d8', label: '🐄 Core Engine' },
}

const ratingColors: Record<string, string> = {
  'STRONG BUY': '#f0883e',
  'BUY':        '#3fb950',
  'SPEC BUY':   '#d29922',
  'WATCH':      '#58a6ff',
  'HOLD':       '#bc8cff',
}

export function EntityGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      {entities.map((e) => {
        const bcg = bcgColors[e.bcg] ?? bcgColors['Core']
        const ratingColor = ratingColors[e.rating] ?? '#8b949e'
        return (
          <div
            key={e.id}
            className="rounded-xl p-4 border"
            style={{ background: e.colorDim, borderColor: e.color }}
          >
            {/* header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl leading-none">{e.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{e.name}</div>
                <div className="text-xs text-[#8b949e] truncate">{e.type}</div>
              </div>
              <div className="text-xl font-extrabold leading-none shrink-0" style={{ color: e.color }}>
                {e.score}
              </div>
            </div>

            {/* badges */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: bcg.bg, color: bcg.text, border: `1px solid ${bcg.text}` }}>
                {bcg.label}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto" style={{ background: ratingColor + '20', color: ratingColor, border: `1px solid ${ratingColor}` }}>
                {e.rating}
              </span>
            </div>

            {/* kv */}
            <div className="space-y-1.5">
              {e.kv.map((item) => (
                <div key={item.k} className="flex justify-between items-center text-xs" style={{ borderBottom: '1px solid rgba(48,54,61,.3)', paddingBottom: '4px' }}>
                  <span className="text-[#8b949e]">{item.k}</span>
                  <span className={`font-semibold ${item.hl ? '' : ''}`} style={item.hl ? { color: e.color } : {}}>
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
