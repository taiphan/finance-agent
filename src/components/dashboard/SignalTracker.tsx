'use client'
import { signals } from '@/lib/fecredit-data'
import { Card, CardTitle } from '@/components/ui/card'
import { COLORS } from '@/lib/fecredit-data'

const statusStyles = {
  green: { bg: '#3fb95018', border: COLORS.green, badge: '#3fb95033', text: COLORS.green },
  yellow: { bg: '#d2992218', border: COLORS.yellow, badge: '#d2992233', text: COLORS.yellow },
}

export function SignalTracker() {
  return (
    <Card>
      <CardTitle icon="📡">Investment Signal Tracker</CardTitle>
      <div className="space-y-3">
        {signals.map((s) => {
          const style = statusStyles[s.color]
          return (
            <div key={s.id} className="rounded-lg p-3.5" style={{ background: style.bg, border: `1px solid ${style.border}` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold">{s.title}</span>
                <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: style.badge, color: style.text }}>
                  {s.score}/10 — {s.status}
                </span>
              </div>
              <div className="space-y-1">
                {s.pros.map((p, i) => (
                  <div key={i} className="flex gap-1.5 text-xs text-[#8b949e]">
                    <span className="text-[#3fb950]">✅</span><span>{p}</span>
                  </div>
                ))}
                {s.cons.map((c, i) => (
                  <div key={i} className="flex gap-1.5 text-xs text-[#8b949e]">
                    <span className="text-[#f85149]">❌</span><span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
