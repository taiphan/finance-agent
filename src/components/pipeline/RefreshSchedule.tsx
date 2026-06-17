'use client'

import { useState, useEffect } from 'react'
import { Card, CardTitle } from '@/components/ui/card'

interface AnalysisMeta {
  subject: string
  refreshedAt: string
  nextRefreshAt: string
  stale: boolean
  summaryPreview: string
}

interface CronStatus {
  enabled: boolean
  lastCronAt: string | null
  nextCronAt: string | null
  subjectCount: number
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  const hrs  = Math.floor(mins / 60)
  const days = Math.floor(hrs / 24)
  if (days > 0) return `${days} ngày trước`
  if (hrs > 0)  return `${hrs} giờ trước`
  return `${mins} phút trước`
}

function timeUntil(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 'Sẵn sàng'
  const hrs  = Math.floor(diff / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
}

export function RefreshSchedule() {
  const [analyses, setAnalyses] = useState<AnalysisMeta[]>([])
  const [cron, setCron] = useState<CronStatus | null>(null)
  const [triggering, setTriggering] = useState(false)
  const [triggerMsg, setTriggerMsg] = useState('')

  async function load() {
    try {
      const res = await fetch('/api/analysis')
      if (res.ok) {
        const data = await res.json()
        setAnalyses(data.analyses ?? [])
        setCron(data.cron ?? null)
      }
    } catch { /* ignore */ }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 30_000)
    return () => clearInterval(t)
  }, [])

  async function triggerRefresh(force = false) {
    setTriggering(true)
    setTriggerMsg('')
    try {
      const res = await fetch('/api/cron/refresh?secret=dev-local-secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force }),
      })
      const data = await res.json()
      if (res.ok) {
        setTriggerMsg(`✅ Refreshed: ${data.refreshed} | Skipped: ${data.skipped} | Errors: ${data.errors}`)
        setTimeout(load, 2000)
      } else {
        setTriggerMsg(`❌ ${data.error}`)
      }
    } catch (e) {
      setTriggerMsg(`❌ ${e}`)
    } finally {
      setTriggering(false)
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <CardTitle icon="🔄">Auto-Refresh Schedule</CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => triggerRefresh(false)}
            disabled={triggering}
            className="text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50 transition-opacity"
            style={{ background: '#58a6ff20', border: '1px solid #58a6ff40', color: '#58a6ff' }}
          >
            {triggering ? '⏳ Đang chạy...' : '▶ Refresh Stale'}
          </button>
          <button
            onClick={() => triggerRefresh(true)}
            disabled={triggering}
            className="text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50 transition-opacity"
            style={{ background: '#d2992220', border: '1px solid #d2992240', color: '#d29922' }}
          >
            ⚡ Force All
          </button>
        </div>
      </div>

      {triggerMsg && (
        <div className="mb-3 text-xs px-3 py-2 rounded-lg" style={{
          background: triggerMsg.startsWith('✅') ? '#3fb95015' : '#f8514915',
          color: triggerMsg.startsWith('✅') ? '#3fb950' : '#f85149',
          border: `1px solid ${triggerMsg.startsWith('✅') ? '#3fb95030' : '#f8514930'}`,
        }}>
          {triggerMsg}
        </div>
      )}

      {/* Cron status */}
      {cron && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg p-3 text-center" style={{ background: '#21262d' }}>
            <div className="text-[10px] text-[#8b949e] mb-1">Lần cuối chạy</div>
            <div className="text-xs font-semibold" style={{ color: cron.lastCronAt ? '#3fb950' : '#8b949e' }}>
              {cron.lastCronAt ? timeAgo(cron.lastCronAt) : '—'}
            </div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: '#21262d' }}>
            <div className="text-[10px] text-[#8b949e] mb-1">Lần tiếp theo</div>
            <div className="text-xs font-semibold text-[#58a6ff]">
              {cron.nextCronAt ? timeUntil(cron.nextCronAt) : 'Chưa chạy'}
            </div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: '#21262d' }}>
            <div className="text-[10px] text-[#8b949e] mb-1">Subjects</div>
            <div className="text-xs font-semibold text-[#e6edf3]">{cron.subjectCount}</div>
          </div>
        </div>
      )}

      {/* Per-subject status */}
      {analyses.length === 0 ? (
        <div className="text-xs text-[#8b949e] text-center py-4">
          Chưa có phân tích nào. Chạy pipeline để bắt đầu.
        </div>
      ) : (
        <div className="space-y-2">
          {analyses.map(a => (
            <div key={a.subject} className="rounded-lg p-3 border" style={{
              background: a.stale ? '#d2992210' : '#3fb95010',
              borderColor: a.stale ? '#d2992230' : '#3fb95030',
            }}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#e6edf3] truncate">{a.subject}</div>
                  {a.summaryPreview && (
                    <div className="text-[10px] text-[#8b949e] mt-1 line-clamp-2">{a.summaryPreview}</div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                    background: a.stale ? '#d2992220' : '#3fb95020',
                    color: a.stale ? '#d29922' : '#3fb950',
                  }}>
                    {a.stale ? '⚠ Stale' : '✓ Fresh'}
                  </span>
                  <span className="text-[10px] text-[#8b949e]">{timeAgo(a.refreshedAt)}</span>
                  <span className="text-[10px] text-[#30363d]">next: {timeUntil(a.nextRefreshAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Setup instructions */}
      <div className="mt-4 p-3 rounded-lg text-[10px] text-[#8b949e] space-y-1" style={{ background: '#21262d' }}>
        <div className="font-semibold text-[#e6edf3] mb-1.5">⚙ Cron Setup</div>
        <div>• <strong className="text-[#e6edf3]">Local dev:</strong> Dùng nút "Refresh" ở trên</div>
        <div>• <strong className="text-[#e6edf3]">Vercel:</strong> Thêm <code className="text-[#58a6ff]">vercel.json</code> với cron config (đã có)</div>
        <div>• <strong className="text-[#e6edf3]">GitHub Actions:</strong> Set secret <code className="text-[#58a6ff]">APP_URL</code> + <code className="text-[#58a6ff]">CRON_SECRET</code> → chạy tự động lúc 8am VN</div>
        <div>• <strong className="text-[#e6edf3]">CRON_SECRET:</strong> Set trong <code className="text-[#58a6ff]">.env.local</code> và GitHub Secrets</div>
      </div>
    </Card>
  )
}
