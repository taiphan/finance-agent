'use client'
import {
  BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { Card, CardTitle } from '@/components/ui/card'
import { contributionData, valuationPortfolio, ecosystemIRR, entities } from '@/lib/ecosystem-data'
import { CHART_DEFAULTS } from '@/lib/utils'
import { COLORS } from '@/lib/fecredit-data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmt = (fn: (v: number) => string) => (v: any) => v != null ? [fn(v as number)] : ['-']
const TT = { contentStyle: { background: '#161b22', border: '1px solid #30363d', borderRadius: 8, fontSize: 12 }, labelStyle: { color: '#e6edf3' } }

const ENTITY_COLORS: Record<string, string> = {
  'VPBank Core': '#4dabf7',
  'FE Credit':  COLORS.yellow,
  'VPBankS':    COLORS.green,
  'CAKE':       COLORS.orange,
  'OPES+Übank': COLORS.blue,
}

export function ContributionChart() {
  return (
    <Card>
      <CardTitle icon="📈">Đóng Góp LNTT vào VPBank Hợp Nhất (tỷ VND)</CardTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={contributionData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="entity" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} tickFormatter={v => v >= 1000 ? (v / 1000).toFixed(0) + 'K' : String(v)} />
          <Tooltip {...TT} formatter={fmt(v => v.toLocaleString() + ' tỷ')} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar dataKey="e24" name="2024E" fill={`${COLORS.muted}80`} radius={[3,3,0,0]} />
          <Bar dataKey="a25" name="2025A ✅" fill={`${COLORS.blue}80`} radius={[3,3,0,0]} />
          <Bar dataKey="b26" name="2026 KH ✅" fill={`${COLORS.green}80`} radius={[3,3,0,0]} />
          <Bar dataKey="bull26" name="2026 Bull" fill={`${COLORS.orange}60`} radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function UserGrowthChart() {
  const data = [
    { name: 'VPBank (Total)', users: 30, color: '#4dabf7' },
    { name: 'FE Credit',      users: 10, color: COLORS.yellow },
    { name: 'CAKE',           users: 6.2, color: COLORS.orange },
    { name: 'OPES',           users: 6.2, color: COLORS.blue },
    { name: 'NEO New (2024)', users: 1.2, color: '#39d0d8' },
  ]
  return (
    <Card>
      <CardTitle icon="👥">Khách Hàng / Users Các Mảng (triệu)</CardTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="name" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => v + 'M'} />
          <Tooltip {...TT} formatter={fmt(v => v + 'M users')} />
          <Bar dataKey="users" name="Users (M)" radius={[5,5,0,0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color + 'cc'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ScoreRadarChart() {
  const radarData = [
    { metric: 'Tăng trưởng', cake: 9, vpbanks: 8, fec: 5, opes: 6 },
    { metric: 'Sinh lợi',    cake: 6, vpbanks: 7, fec: 5, opes: 5 },
    { metric: 'Chất lượng',  cake: 8, vpbanks: 8, fec: 4, opes: 8 },
    { metric: 'Cạnh tranh',  cake: 8, vpbanks: 6, fec: 7, opes: 6 },
    { metric: 'Công nghệ',   cake: 9, vpbanks: 7, fec: 8, opes: 8 },
    { metric: 'Tiềm năng',   cake: 9, vpbanks: 7, fec: 6, opes: 7 },
  ]
  return (
    <Card>
      <CardTitle icon="📐">Radar — So Sánh Đa Chiều</CardTitle>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke={CHART_DEFAULTS.stroke} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: '#8b949e', fontSize: 10 }} />
          <PolarRadiusAxis tick={false} domain={[0, 10]} />
          <Radar name="CAKE"     dataKey="cake"    stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.2} />
          <Radar name="VPBankS"  dataKey="vpbanks" stroke={COLORS.green}  fill={COLORS.green}  fillOpacity={0.1} strokeDasharray="4 4" />
          <Radar name="FE Credit" dataKey="fec"   stroke={COLORS.yellow} fill={COLORS.yellow} fillOpacity={0.1} strokeDasharray="2 4" />
          <Radar name="OPES"     dataKey="opes"    stroke={COLORS.blue}   fill={COLORS.blue}   fillOpacity={0.05} strokeDasharray="6 2" />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Tooltip {...TT} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ValuationChart() {
  return (
    <Card>
      <CardTitle icon="💰">Portfolio Valuation Các Công Ty Con ($B USD)</CardTitle>
      <div className="mt-2 space-y-3">
        {valuationPortfolio.map((v) => (
          <div key={v.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-[#8b949e]">{v.name}</span>
            <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ background: '#21262d' }}>
              <div className="h-full rounded-md flex items-center px-2.5 text-white text-xs font-semibold"
                style={{ width: `${v.pct}%`, background: v.color + 'cc' }}>
                ${v.low}–{v.high}B
              </div>
            </div>
            <span className="text-[11px] text-[#8b949e] w-28 shrink-0 text-right">{v.note}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: '#3fb95015', border: '1px solid #3fb950' }}>
        <span className="font-bold text-[#3fb950]">Tổng subsidiaries: ~$2.0–4.0B USD</span>
        <span className="text-[#8b949e] ml-2">— chiếm 35–65% VPBank market cap. Hidden value chưa được định giá tách biệt.</span>
      </div>
    </Card>
  )
}

export function SentimentCompareChart() {
  const data = entities.map(e => ({ name: e.name.split(' ')[0], score: e.sentiment, color: e.color }))
  return (
    <Card>
      <CardTitle icon="🎭">Sentiment Score Từng Thực Thể</CardTitle>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="name" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={CHART_DEFAULTS.tick} domain={[0, 1]} tickFormatter={v => '+' + v} />
          <Tooltip {...TT} formatter={fmt(v => '+' + v)} />
          <Bar dataKey="score" name="Sentiment" radius={[5,5,0,0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color + 'cc'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function IRRChart() {
  return (
    <Card>
      <CardTitle icon="💹">IRR Scenarios — Đầu Tư VPB (3 năm)</CardTitle>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={ecosystemIRR} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="scenario" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis yAxisId="left" tick={CHART_DEFAULTS.tick} tickFormatter={v => v + '%'} />
          <YAxis yAxisId="right" orientation="right" tick={CHART_DEFAULTS.tick} tickFormatter={v => v + 'x'} domain={[0, 4]} />
          <Tooltip {...TT} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar yAxisId="left" dataKey="irr" name="IRR (%/năm)" radius={[4,4,0,0]}>
            {ecosystemIRR.map((d, i) => <Cell key={i} fill={d.color + 'b3'} />)}
          </Bar>
          <Line yAxisId="right" type="monotone" dataKey="moic" name="MOIC (x)" stroke={COLORS.yellow} strokeWidth={2} dot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
