'use client'
import {
  BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { Card, CardTitle } from '@/components/ui/card'
import {
  revenueData, loanData, sentimentHistory, forecastData,
  dcfData, peerData, irrData, ratioData, COLORS,
} from '@/lib/fecredit-data'
import { CHART_DEFAULTS } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmt = (fn: (v: number) => string) => (v: any) => v != null ? [fn(v as number)] : ['-']
const TT = { contentStyle: { background: '#161b22', border: '1px solid #30363d', borderRadius: 8, fontSize: 12 }, labelStyle: { color: '#e6edf3' } }

export function RevenueChart() {
  return (
    <Card>
      <CardTitle icon="📊">Doanh Thu Lãi & Lợi Nhuận (tỷ VND)</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="year" tick={CHART_DEFAULTS.tick} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
          <Tooltip {...TT} formatter={fmt(v => `${v.toLocaleString()} tỷ`)} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar dataKey="revenue" name="Doanh thu lãi" radius={[4,4,0,0]}>
            {revenueData.map((_, i) => <Cell key={i} fill={`${COLORS.blue}b3`} />)}
          </Bar>
          <Bar dataKey="profit" name="LNTT" radius={[4,4,0,0]}>
            {revenueData.map((d, i) => <Cell key={i} fill={d.profit < 0 ? `${COLORS.red}cc` : `${COLORS.green}cc`} />)}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function LoanChart() {
  return (
    <Card>
      <CardTitle icon="💳">Tổng Dư Nợ & Thị Phần</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={loanData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="year" tick={CHART_DEFAULTS.tick} />
          <YAxis yAxisId="left" tick={CHART_DEFAULTS.tick} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
          <YAxis yAxisId="right" orientation="right" tick={CHART_DEFAULTS.tick} tickFormatter={v => `${v}%`} domain={[30, 70]} />
          <Tooltip {...TT} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar yAxisId="left" dataKey="loan" name="Dư nợ (tỷ)" fill={`${COLORS.orange}b3`} radius={[4,4,0,0]} />
          <Line yAxisId="right" type="monotone" dataKey="share" name="Thị phần (%)" stroke={COLORS.purple} strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function SentimentChart() {
  return (
    <Card>
      <CardTitle icon="📈">Diễn Biến Sentiment</CardTitle>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={sentimentHistory} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="q" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={CHART_DEFAULTS.tick} domain={[-0.7, 0.6]} />
          <Tooltip {...TT} />
          <Line type="monotone" dataKey="score" stroke={COLORS.orange} strokeWidth={2} dot={{ r: 3, fill: COLORS.orange }} name="Sentiment" />
          <Line type="monotone" dataKey={() => 0} stroke={CHART_DEFAULTS.stroke} strokeDasharray="5 5" dot={false} name="Zero line" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ForecastChart() {
  return (
    <Card>
      <CardTitle icon="🔮">Dự Báo LNTT 2024E–2026E (tỷ VND)</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={forecastData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="year" tick={CHART_DEFAULTS.tick} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => v.toLocaleString()} />
          <Tooltip {...TT} formatter={fmt(v => `${v.toLocaleString()} tỷ`)} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar dataKey="bull" name="🐂 Bull" fill={`${COLORS.green}cc`} radius={[4,4,0,0]} />
          <Bar dataKey="base" name="📊 Base" fill={`${COLORS.blue}cc`} radius={[4,4,0,0]} />
          <Bar dataKey="bear" name="🐻 Bear" fill={`${COLORS.red}cc`} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function RadarRatioChart() {
  return (
    <Card>
      <CardTitle icon="📐">Tỷ Số Tài Chính vs Benchmark</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={ratioData} margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
          <PolarGrid stroke={CHART_DEFAULTS.stroke} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: '#8b949e', fontSize: 10 }} />
          <PolarRadiusAxis tick={false} domain={[0, 100]} />
          <Radar name="FE Credit" dataKey="fec" stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.2} />
          <Radar name="Benchmark" dataKey="benchmark" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.1} strokeDasharray="5 5" />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Tooltip {...TT} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function DCFChart() {
  return (
    <Card>
      <CardTitle icon="🏗️">DCF Valuation Breakdown (tỷ VND)</CardTitle>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dcfData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} horizontal={false} />
          <XAxis type="number" tick={CHART_DEFAULTS.tick} tickFormatter={v => v.toLocaleString()} />
          <YAxis type="category" dataKey="name" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} width={110} />
          <Tooltip {...TT} formatter={fmt(v => `${v.toLocaleString()} tỷ`)} />
          <Bar dataKey="value" radius={[0,4,4,0]}>
            {dcfData.map((_, i) => (
              <Cell key={i} fill={[COLORS.blue, COLORS.green, COLORS.purple][i] + 'cc'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 p-3 rounded-lg text-xs" style={{ background: '#3fb95020', border: `1px solid ${COLORS.green}` }}>
        <span className="font-bold" style={{ color: COLORS.green }}>EV: ~19.500 tỷ VND (~$770M)</span>
        <span className="text-[#8b949e] ml-2">| Discount 72% vs đỉnh $2,8B (2021) | WACC: 14%</span>
      </div>
    </Card>
  )
}

export function ValuationChart() {
  return (
    <Card>
      <CardTitle icon="🏆">Định Giá ($B USD)</CardTitle>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={[
          { label: '2021 Peak', value: 2.8 },
          { label: '2023 Trough', value: 0.5 },
          { label: '2025E', value: 1.0 },
          { label: '2028E Bull', value: 2.0 },
        ]} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="label" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => `$${v}B`} />
          <Tooltip {...TT} formatter={fmt(v => `$${v}B USD`)} />
          <Bar dataKey="value" radius={[4,4,0,0]}>
            {[COLORS.green, COLORS.red, COLORS.yellow, COLORS.blue].map((c, i) => (
              <Cell key={i} fill={c + 'cc'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function PeerChart() {
  return (
    <Card>
      <CardTitle icon="🏆">Peer Comparison — Thị Phần (%)</CardTitle>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={peerData} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="name" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis tick={CHART_DEFAULTS.tick} tickFormatter={v => `${v}%`} />
          <Tooltip {...TT} formatter={fmt(v => `${v}%`)} />
          <Bar dataKey="share" name="Thị phần" radius={[4,4,0,0]}>
            {peerData.map((_, i) => (
              <Cell key={i} fill={[COLORS.orange, COLORS.blue, COLORS.green, COLORS.yellow, COLORS.purple][i] + 'cc'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function IRRChart() {
  return (
    <Card>
      <CardTitle icon="💹">ROI / IRR Scenarios</CardTitle>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={irrData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.stroke} />
          <XAxis dataKey="scenario" tick={{ ...CHART_DEFAULTS.tick, fontSize: 10 }} />
          <YAxis yAxisId="left" tick={CHART_DEFAULTS.tick} tickFormatter={v => `${v}x`} />
          <YAxis yAxisId="right" orientation="right" tick={CHART_DEFAULTS.tick} tickFormatter={v => `${v}%`} />
          <Tooltip {...TT} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8b949e' }} />
          <Bar yAxisId="left" dataKey="moic" name="MOIC (x)" radius={[4,4,0,0]}>
            {irrData.map((d, i) => <Cell key={i} fill={d.color + 'b3'} />)}
          </Bar>
          <Line yAxisId="right" type="monotone" dataKey="irr" name="IRR (%)" stroke={COLORS.yellow} strokeWidth={2} dot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
