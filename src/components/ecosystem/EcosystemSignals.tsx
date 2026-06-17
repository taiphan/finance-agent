'use client'
import { ecosystemSignals, ecosystemRisks, ecosystemCatalysts } from '@/lib/ecosystem-data'
import { Card, CardTitle } from '@/components/ui/card'

const signalStyle = {
  orange: { bg: '#f0883e18', border: '#f0883e', badge: '#f0883e33', text: '#f0883e' },
  green:  { bg: '#3fb95018', border: '#3fb950', badge: '#3fb95033', text: '#3fb950' },
  yellow: { bg: '#d2992218', border: '#d29922', badge: '#d2992233', text: '#d29922' },
  blue:   { bg: '#58a6ff18', border: '#58a6ff', badge: '#58a6ff33', text: '#58a6ff' },
}

const riskLevel = {
  HIGH:   { bg: '#f8514920', border: '#f85149', text: '#f85149' },
  MEDIUM: { bg: '#d2992220', border: '#d29922', text: '#d29922' },
  LOW:    { bg: '#3fb95020', border: '#3fb950', text: '#3fb950' },
}

export function EcosystemSignals() {
  return (
    <Card>
      <CardTitle icon="📡">Investment Signal Tracker</CardTitle>
      <div className="space-y-3">
        {ecosystemSignals.map((s) => {
          const st = signalStyle[s.color]
          return (
            <div key={s.entity} className="rounded-lg p-3" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold">{s.icon} {s.entity} — "{s.thesis}"</span>
                <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: st.badge, color: st.text }}>
                  {s.score}/10 {s.status}
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

export function EcosystemRisks() {
  return (
    <Card>
      <CardTitle icon="⚠">Ma Trận Rủi Ro Ecosystem</CardTitle>
      <div className="space-y-2">
        {ecosystemRisks.map((r) => {
          const s = riskLevel[r.level]
          return (
            <div key={r.label} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: '#21262d' }}>
              <span className="flex-1 text-sm">{r.label}</span>
              <span className="text-xs text-[#8b949e] w-9 text-center">{r.prob}%</span>
              <span className="text-xs text-[#8b949e] w-20 text-right hidden sm:block">{r.affects}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                {r.level}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export function EcosystemCatalysts() {
  return (
    <Card>
      <CardTitle icon="🚀">3 Catalysts Quan Trọng Nhất</CardTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        {ecosystemCatalysts.map((c) => (
          <div key={c.num} className="p-4 rounded-xl border" style={{ background: c.color + '15', borderColor: c.color }}>
            <div className="text-2xl mb-1">{c.num}</div>
            <div className="font-bold mb-1 text-sm" style={{ color: c.color }}>{c.title}</div>
            <div className="text-xs text-[#8b949e] mb-2">{c.timeline}</div>
            <div className="text-sm">{c.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
