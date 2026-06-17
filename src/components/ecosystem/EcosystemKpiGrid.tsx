'use client'
import { ecosystemKpis } from '@/lib/ecosystem-data'
import { Card } from '@/components/ui/card'

const colorMap = {
  up:      { badge: 'bg-[#3fb95026] text-[#3fb950]', val: 'text-[#3fb950]' },
  down:    { badge: 'bg-[#f8514926] text-[#f85149]', val: 'text-[#f85149]' },
  neutral: { badge: 'bg-[#21262d] text-[#8b949e]',   val: 'text-[#58a6ff]' },
}

export function EcosystemKpiGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {ecosystemKpis.map((kpi) => {
        const c = colorMap[kpi.changeType]
        return (
          <Card key={kpi.label} className="text-center">
            <div className="text-[11px] text-[#8b949e] uppercase tracking-wider mb-2">{kpi.label}</div>
            <div className={`text-xl font-bold leading-tight ${c.val}`}>{kpi.value}</div>
            <div className="text-xs text-[#8b949e] mt-1">{kpi.sub}</div>
            {kpi.change && (
              <div className={`text-xs font-semibold mt-2 inline-block px-2.5 py-0.5 rounded-full ${c.badge}`}>
                {kpi.change}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
