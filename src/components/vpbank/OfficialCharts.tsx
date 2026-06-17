'use client'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'
import { Card, CardTitle } from '@/components/ui/card'
import { nimTrendData, q1Scorecard } from '@/lib/ecosystem-data'
import { CHART_DEFAULTS } from '@/lib/utils'
import { COLORS } from '@/lib/fecredit-data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmt = (fn: (v: number) => string) => (v: any) => v != null ? [fn(v as number)] : ['-']
const TT = { contentStyle: { background: '#161b22', border: '1px solid #30363d', borderRadius: 8, fontSize: 12 }, labelStyle: { color: '#e6edf3' } }

export function NimTrendChart() {
  return (
    <Card>
      <CardTitle icon="📉">NIM vs COF vs Lợi Suất — Riêng Lẻ Q1/25→Q1/26 (%)</CardTitle>
      <div className="text-xs text-[#f85149] mb-2">⚠️ COF tăng lên 5,2% → áp lực NIM cần theo dõi</div>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={nimTrendData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="q" tick={CHART_DEFAULTS.tick} />
          <YAxis tick={CHART_DEFAULTS.tick} domain={[3, 10]} tickFormatter={v => v + '%'} />
          <Tooltip {...TT} formatter={fmt(v => v + '%')} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Line type="monotone" dataKey="yield" name="Lợi suất" stroke={COLORS.blue} strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="nim"   name="NIM" stroke={COLORS.green} strokeWidth={2.5} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="cof"   name="COF" stroke={COLORS.red} strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function SubPbtChart() {
  const data = [
    { entity: 'NH Mẹ', q124: 3812, q125: 4942, q126: 7383, color: '#4dabf7' },
    { entity: 'VPBankS', q124: 182, q125: 351, q126: 515, color: COLORS.green },
    { entity: 'OPES', q124: 30, q125: 87, q126: 261, color: COLORS.blue },
    { entity: 'GPBank', q124: -100, q125: 100, q126: 400, color: '#f778ba' },
  ]
  return (
    <Card>
      <CardTitle icon="📊">PBT Các Mảng Q1/2024→Q1/2025→Q1/2026 (tỷ VND)</CardTitle>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="entity" tick={CHART_DEFAULTS.tick} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => v >= 1000 ? (v/1000).toFixed(1)+'K' : String(v)} />
          <Tooltip {...TT} formatter={fmt(v => v.toLocaleString() + ' tỷ')} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar dataKey="q124" name="Q1/2024" fill={`${COLORS.muted}60`} radius={[3,3,0,0]} />
          <Bar dataKey="q125" name="Q1/2025" fill={`${COLORS.blue}80`} radius={[3,3,0,0]} />
          <Bar dataKey="q126" name="Q1/2026" radius={[3,3,0,0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color + 'cc'} />)}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ScorecardGrid() {
  return (
    <Card>
      <CardTitle icon="🏥">Scorecard Q1/2026 — Từ PDF Chính Thức</CardTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
        {q1Scorecard.map((item) => (
          <div key={item.label} className="rounded-lg p-2.5" style={{
            background: item.good ? '#3fb95010' : '#f8514910',
            border: `1px solid ${item.good ? '#3fb95040' : '#f8514940'}`
          }}>
            <div className="text-[10px] text-[#8b949e] mb-1">{item.label}</div>
            <div className="font-bold text-sm" style={{ color: item.good ? COLORS.green : COLORS.red }}>{item.value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: item.good ? '#3fb95099' : '#f8514999' }}>{item.change}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
