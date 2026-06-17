'use client'
import { kpis } from '@/lib/fecredit-data'
import { Card } from '@/components/ui/card'

const colorMap = {
  up: 'bg-[#3fb95026] text-[#3fb950]',
  down: 'bg-[#f8514926] text-[#f85149]',
  neutral: 'bg-[#21262d] text-[#8b949e]',
}

const valColorMap = {
  up: 'text-[#3fb950]',
  down: 'text-[#f85149]',
  neutral: 'text-[#58a6ff]',
}

export function KpiGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="text-center">
          <div className="text-[11px] text-[#8b949e] uppercase tracking-wider mb-2">{kpi.label}</div>
          <div className={`text-2xl font-bold leading-tight ${valColorMap[kpi.changeType]}`}>{kpi.value}</div>
          <div className="text-xs text-[#8b949e] mt-1">{kpi.sub}</div>
          {kpi.change && (
            <div className={`text-xs font-semibold mt-2 inline-block px-2.5 py-0.5 rounded-full ${colorMap[kpi.changeType]}`}>
              {kpi.change}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
