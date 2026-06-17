'use client'
import { PIPELINE_STEPS } from '@/lib/fecredit-data'
import { TabNav } from './TabNav'

interface NavbarProps {
  title?: string
  subtitle?: string
  badge?: string
  badgeColor?: string
}

export function Navbar({
  title = '🏦 VPBank Ecosystem',
  subtitle = 'Vietnam Prosperity JSC Bank · 30M+ Customers',
  badge = 'BUY ↑ Conviction',
  badgeColor = '#3fb950',
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50" style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
      <div className="px-6 py-3 flex flex-wrap items-center gap-3">
        <span className="text-lg font-bold" style={{ color: '#58a6ff' }}>{title}</span>
        <span className="text-xs px-3 py-1 rounded-full text-[#8b949e]" style={{ background: '#21262d', border: '1px solid #30363d' }}>
          {subtitle}
        </span>
        <div className="flex flex-wrap gap-1.5 hidden md:flex">
          {PIPELINE_STEPS.map((step) => (
            <span key={step} className="text-[10px] px-2 py-0.5 rounded font-mono text-[#58a6ff]" style={{ background: '#21262d', border: '1px solid #30363d' }}>
              {step}
            </span>
          ))}
        </div>
        <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: badgeColor + '26', border: `1px solid ${badgeColor}`, color: badgeColor }}>
          {badge}
        </span>
      </div>
      <TabNav />
    </nav>
  )
}
