'use client'
import { synergyJourney, synergyFlows } from '@/lib/ecosystem-data'
import { Card, CardTitle } from '@/components/ui/card'

export function SynergyJourney() {
  return (
    <Card>
      <CardTitle icon="🗺️">Customer Journey — Synergy Ecosystem</CardTitle>

      {/* Journey flow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-2">
        {synergyJourney.map((node, i) => (
          <div key={node.name} className="flex items-center gap-2 shrink-0">
            <div className="rounded-xl p-3 text-center min-w-[80px] border" style={{ background: node.color + '18', borderColor: node.color }}>
              <div className="text-xl">{node.icon}</div>
              <div className="text-xs font-bold mt-1" style={{ color: node.color }}>{node.name}</div>
              <div className="text-[10px] text-[#8b949e] mt-0.5">{node.sub}</div>
            </div>
            {i < synergyJourney.length - 1 && (
              <span className="text-[#30363d] text-lg shrink-0">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Data flows */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {synergyFlows.map((f) => (
          <div key={f.desc} className="p-2.5 rounded-lg text-xs" style={{ background: f.fromColor + '15', border: `1px solid ${f.fromColor}40` }}>
            <span style={{ color: f.fromColor }}>{f.from}</span>
            <span className="text-[#8b949e] mx-1">→</span>
            <span style={{ color: f.toColor }}>{f.to}</span>
            <div className="text-[#8b949e] mt-0.5">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 rounded-lg text-xs text-[#8b949e]" style={{ background: '#21262d' }}>
        💡 <strong className="text-[#e6edf3]">Ecosystem moat:</strong> Mỗi công ty con share data + cross-sell trong cùng stack công nghệ → tăng LTV theo customer lifecycle.
      </div>
    </Card>
  )
}
