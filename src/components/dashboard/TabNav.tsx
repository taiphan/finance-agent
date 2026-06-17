'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/',          label: '🏦 VPBank Ecosystem' },
  { href: '/vpbank',   label: '📄 BCTC Chính Thức' },
  { href: '/fecredit', label: '🏍️ FE Credit' },
  { href: '/pipeline', label: '⚡ Live Pipeline' },
]

export function TabNav() {
  const path = usePathname()
  return (
    <div className="flex gap-1 border-b" style={{ borderColor: '#30363d' }}>
      {tabs.map((t) => {
        const active = path === t.href
        return (
          <Link
            key={t.href}
            href={t.href}
            className="px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              color: active ? '#e6edf3' : '#8b949e',
              borderBottom: active ? '2px solid #58a6ff' : '2px solid transparent',
              background: active ? '#ffffff08' : 'transparent',
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}
