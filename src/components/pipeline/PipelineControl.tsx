'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { SKILL_DEFINITIONS } from '@/lib/pipeline-types'
import type { SkillResult, PipelineState, LiveKpi } from '@/lib/pipeline-types'
import type { AIProvider, SkillResultWithProvider } from '@/lib/pipeline-executor'
import ReactMarkdown from 'react-markdown'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const PROVIDERS: Array<{ id: AIProvider; label: string; icon: string; model: string; note: string; needsKey: boolean }> = [
  { id: 'anthropic', icon: '🧠', label: 'Claude',       model: 'claude-3-5-haiku',        note: 'Fast & smart',   needsKey: true  },
  { id: 'google',    icon: '✨', label: 'Gemini Flash',  model: 'gemini-1.5-flash',         note: 'Free tier',      needsKey: true  },
  { id: 'groq',      icon: '⚡', label: 'Groq / Llama',  model: 'llama-3.3-70b-versatile',  note: 'Free & fast',    needsKey: true  },
  { id: 'openai',    icon: '🤖', label: 'GPT-4o mini',   model: 'gpt-4o-mini',              note: 'OpenAI',         needsKey: true  },
  { id: 'ollama',    icon: '🦙', label: 'Ollama (local)', model: 'llama3.2',                note: 'Zero cost',      needsKey: false },
]

const SUBJECTS = [
  'VPBank Ecosystem — toàn bộ hệ sinh thái',
  'FE Credit — phân tích phục hồi',
  'VPBankS — sau IPO $483M',
  'OPES Insurance — embedded insurance',
  'CAKE Digital Bank — AI bank VN',
  'GPBank — tái cơ cấu sau tiếp nhận',
]

const STATUS_COLOR: Record<string, string> = {
  idle: '#30363d', running: '#d29922', done: '#3fb950', error: '#f85149',
}
const STATUS_BG: Record<string, string> = {
  idle: '#21262d', running: '#d2992220', done: '#3fb95020', error: '#f8514920',
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function usePipelineStatus(enabled: boolean) {
  const [state, setState] = useState<PipelineState | null>(null)

  useEffect(() => {
    if (!enabled) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/pipeline/status')
        if (res.ok) setState(await res.json())
      } catch { /* ignore */ }
    }, 1500)
    return () => clearInterval(interval)
  }, [enabled])

  return state
}

// ─── SUBCOMPONENTS ───────────────────────────────────────────────────────────

function SkillCard({ def, result }: {
  def: typeof SKILL_DEFINITIONS[0]
  result?: SkillResultWithProvider
}) {
  const [expanded, setExpanded] = useState(false)
  const status = result?.status ?? 'idle'
  const providerIcon: Record<string, string> = {
    anthropic: '🧠', google: '✨', groq: '⚡', openai: '🤖', ollama: '🦙'
  }

  return (
    <div
      className="rounded-lg border p-3 cursor-pointer transition-all"
      style={{ background: STATUS_BG[status], borderColor: STATUS_COLOR[status] + '80' }}
      onClick={() => result?.output && setExpanded(e => !e)}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{def.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#e6edf3] truncate">{def.label}</span>
            {result?.usedProvider && status === 'done' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#21262d', color: '#8b949e' }}>
                {providerIcon[result.usedProvider]} {result.usedProvider}
              </span>
            )}
            {result?.duration && (
              <span className="text-[10px] text-[#8b949e]">{(result.duration / 1000).toFixed(1)}s</span>
            )}
          </div>
          <div className="text-[10px] text-[#8b949e] truncate">{def.description}</div>
        </div>
        <StatusDot status={status} />
      </div>

      {/* Fallback warning */}
      {result?.fallbackLog?.length ? (
        <div className="mt-1.5 text-[10px] text-[#d29922]">
          ⚡ Fallback: {result.fallbackLog.join(' · ')}
        </div>
      ) : null}

      {status === 'running' && (
        <div className="mt-2 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="text-[10px] text-[#d29922]">Đang chạy...</span>
        </div>
      )}

      {status === 'done' && result?.output && !expanded && (
        <div className="mt-1.5 text-[10px] text-[#8b949e] line-clamp-2">{result.output.slice(0, 120)}…</div>
      )}

      {expanded && result?.output && (
        <div className="mt-2 pt-2 border-t text-xs text-[#8b949e] max-h-48 overflow-y-auto" style={{ borderColor: '#30363d' }}>
          <ReactMarkdown>{result.output}</ReactMarkdown>
        </div>
      )}

      {status === 'error' && result?.output && (
        <div className="mt-1.5 text-[10px] text-[#f85149]">{result.output}</div>
      )}
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  return (
    <div className="w-2 h-2 rounded-full shrink-0" style={{
      background: STATUS_COLOR[status],
      boxShadow: status === 'running' ? `0 0 6px ${STATUS_COLOR.running}` : undefined,
    }} />
  )
}

function KpiCard({ kpi }: { kpi: LiveKpi }) {
  const color = kpi.changeType === 'up' ? '#3fb950' : kpi.changeType === 'down' ? '#f85149' : '#d29922'
  return (
    <div className="rounded-lg p-3 border" style={{ background: color + '10', borderColor: color + '40' }}>
      <div className="text-[10px] text-[#8b949e] mb-1 truncate">{kpi.key.replace(/_/g, ' ').toUpperCase()}</div>
      <div className="font-bold text-sm" style={{ color }}>{kpi.value}</div>
      <div className="text-[10px] text-[#8b949e] mt-0.5">{kpi.change}</div>
      <div className="text-[9px] text-[#30363d] mt-1">{new Date(kpi.updatedAt).toLocaleTimeString('vi-VN')}</div>
    </div>
  )
}

// ─── ENV STATUS ──────────────────────────────────────────────────────────────

function EnvStatus() {
  const [status, setStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/pipeline/providers')
      .then(r => r.json())
      .then(setStatus)
      .catch(() => {})
  }, [])

  if (!Object.keys(status).length) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {Object.entries(status).map(([id, ok]) => {
        const p = PROVIDERS.find(p => p.id === id)
        if (!p) return null
        return (
          <span key={id} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: ok ? '#3fb95020' : '#21262d', color: ok ? '#3fb950' : '#8b949e', border: `1px solid ${ok ? '#3fb95040' : '#30363d'}` }}>
            {p.icon} {p.label} {ok ? '✓' : '—'}
          </span>
        )
      })}
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function PipelineControl() {
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [provider, setProvider] = useState<AIProvider>('google')
  const [useStream, setUseStream] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [skillResults, setSkillResults] = useState<Record<string, SkillResultWithProvider>>({})
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle')
  const [runLog, setRunLog] = useState<string[]>([])
  const [completedOutput, setCompletedOutput] = useState('')
  const eventSourceRef = useRef<EventSource | null>(null)
  const logRef = useRef<HTMLDivElement>(null)

  // Poll status (for non-streaming mode)
  const pollingState = usePipelineStatus(!useStream && runStatus === 'running')

  // Sync polled state into our local results
  useEffect(() => {
    if (!pollingState) return
    const results: Record<string, SkillResult> = {}
    pollingState.currentRun?.skills.forEach(s => { results[s.skillId] = s })
    pollingState.lastRun?.skills.forEach(s => { if (!results[s.skillId]) results[s.skillId] = s })
    if (Object.keys(results).length) setSkillResults(results)
    if (!pollingState.isRunning && pollingState.lastRun) setRunStatus('completed')
  }, [pollingState])

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [runLog])

  const log = useCallback((msg: string) => {
    setRunLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }, [])

  // ─── STREAM MODE ───────────────────────────────────────────────────────────
  const startStream = useCallback(() => {
    setIsStarting(true)
    setSkillResults({})
    setRunStatus('running')
    setRunLog([])
    setCompletedOutput('')
    log(`🚀 Khởi động pipeline cho: "${subject}"`)

    const params = new URLSearchParams({ subject, provider })
    const es = new EventSource(`/api/pipeline/stream?${params}`)
    eventSourceRef.current = es

    es.addEventListener('start', (e) => {
      const data = JSON.parse(e.data)
      log(`▶ Run ID: ${data.runId}`)
      setIsStarting(false)
    })

    es.addEventListener('skill', (e) => {
      const result: SkillResultWithProvider = JSON.parse(e.data)
      setSkillResults(prev => ({ ...prev, [result.skillId]: result }))
      const def = SKILL_DEFINITIONS.find(d => d.id === result.skillId)
      if (result.status === 'running') log(`⏳ ${def?.icon} ${def?.label} đang chạy...`)
      if (result.status === 'done') {
        const provider = result.usedProvider ? ` [${result.usedProvider}]` : ''
        log(`✅ ${def?.icon} ${def?.label} hoàn thành (${(result.duration!/1000).toFixed(1)}s)${provider}`)
        result.fallbackLog?.forEach(f => log(`  ⚡ Fallback: ${f}`))
      }
      if (result.status === 'error') log(`❌ ${def?.icon} ${def?.label} lỗi: ${result.output}`)
    })

    es.addEventListener('complete', (e) => {
      const data = JSON.parse(e.data)
      log(`🏁 Pipeline hoàn thành! (${data.completedAt})`)
      setRunStatus('completed')
      es.close()
    })

    es.addEventListener('error', () => {
      log('❌ Lỗi kết nối stream')
      setRunStatus('error')
      setIsStarting(false)
      es.close()
    })
  }, [subject, log])

  // ─── POLL MODE ─────────────────────────────────────────────────────────────
  const startPoll = useCallback(async () => {
    setIsStarting(true)
    setSkillResults({})
    setRunStatus('running')
    setRunLog([])
    setCompletedOutput('')
    log(`🚀 Khởi động pipeline (poll mode) cho: "${subject}"`)

    try {
      const res = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, provider }),
      })
      if (!res.ok) {
        const err = await res.json()
        log(`❌ ${err.error}`)
        setRunStatus('error')
      } else {
        const data = await res.json()
        log(`▶ Run ID: ${data.runId} — đang poll...`)
      }
    } catch (err) {
      log(`❌ Lỗi: ${err}`)
      setRunStatus('error')
    } finally {
      setIsStarting(false)
    }
  }, [subject, log])

  const stop = useCallback(() => {
    eventSourceRef.current?.close()
    setRunStatus('idle')
    log('⏹ Đã dừng pipeline')
  }, [log])

  const cancelReset = useCallback(async () => {
    eventSourceRef.current?.close()
    await fetch('/api/pipeline/cancel', { method: 'POST' })
    setRunStatus('idle')
    setSkillResults({})
    log('🔄 Đã reset trạng thái pipeline')
  }, [log])

  const doneCount = Object.values(skillResults).filter(r => r.status === 'done').length
  const runningSkill = SKILL_DEFINITIONS.find(d => skillResults[d.id]?.status === 'running')

  // Build reporter output when done
  useEffect(() => {
    if (runStatus === 'completed' && skillResults['alphaear-reporter']?.output) {
      setCompletedOutput(skillResults['alphaear-reporter'].output)
    }
  }, [runStatus, skillResults])

  return (
    <div className="space-y-5">

      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <div className="rounded-xl p-5 border" style={{ background: '#161b22', borderColor: '#30363d' }}>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="text-2xl">⚡</div>
          <div>
            <div className="font-bold text-lg">Finance Skills Pipeline</div>
            <div className="text-xs text-[#8b949e]">
              10 AI skills · Auto-fallback: {['anthropic','google','groq','openai','ollama'].join(' → ')}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{
              background: runStatus === 'running' ? '#3fb950' : runStatus === 'completed' ? '#58a6ff' : '#30363d',
              boxShadow: runStatus === 'running' ? '0 0 8px #3fb950' : undefined,
            }} />
            <span className="text-xs font-semibold" style={{
              color: runStatus === 'running' ? '#3fb950' : runStatus === 'completed' ? '#58a6ff' : '#8b949e'
            }}>
              {runStatus === 'idle' ? 'Sẵn sàng' : runStatus === 'running' ? 'Đang chạy' : runStatus === 'completed' ? 'Hoàn thành' : 'Lỗi'}
            </span>
          </div>
        </div>

        {/* Subject selector */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#8b949e] block mb-1.5">Chủ đề phân tích</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              disabled={runStatus === 'running'}
              className="w-full rounded-lg px-3 py-2 text-sm text-[#e6edf3] border outline-none"
              style={{ background: '#21262d', borderColor: '#30363d' }}
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              disabled={runStatus === 'running'}
              placeholder="Hoặc nhập chủ đề tùy chỉnh..."
              className="w-full mt-2 rounded-lg px-3 py-2 text-sm text-[#e6edf3] border outline-none placeholder-[#8b949e]"
              style={{ background: '#21262d', borderColor: '#30363d' }}
            />
          </div>

          {/* Provider picker */}
          <div>
            <label className="text-xs text-[#8b949e] block mb-2">AI Provider <span className="text-[#30363d]">— chìa khóa đọc từ .env.local</span></label>
            <EnvStatus />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3">
              {PROVIDERS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  disabled={runStatus === 'running'}
                  className="rounded-lg p-2.5 text-left border transition-all disabled:opacity-50"
                  style={{
                    background: provider === p.id ? '#58a6ff20' : '#21262d',
                    borderColor: provider === p.id ? '#58a6ff' : '#30363d',
                  }}
                >
                  <div className="text-base mb-0.5">{p.icon}</div>
                  <div className="text-xs font-semibold text-[#e6edf3]">{p.label}</div>
                  <div className="text-[10px] text-[#8b949e]">{p.model}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: p.needsKey ? '#d29922' : '#3fb950' }}>
                    {p.note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stream toggle + buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative inline-flex items-center">
                <input type="checkbox" checked={useStream} onChange={e => setUseStream(e.target.checked)} className="sr-only" />
                <div className="w-9 h-5 rounded-full transition-colors" style={{ background: useStream ? '#3fb950' : '#21262d' }}>
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: useStream ? 'translateX(16px)' : 'translateX(0)' }} />
                </div>
              </div>
              <span className="text-xs text-[#8b949e]">SSE Stream</span>
            </label>

            {runStatus !== 'running' ? (
              <>
                <button
                  onClick={useStream ? startStream : startPoll}
                  disabled={isStarting}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50"
                  style={{ background: '#3fb950' }}
                >
                  {isStarting ? '⏳ Khởi động...' : '▶ Chạy Pipeline'}
                </button>
                <button
                  onClick={cancelReset}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e' }}
                  title="Reset nếu pipeline bị stuck"
                >
                  🔄 Reset
                </button>
              </>
            ) : (
              <button
                onClick={stop}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: '#f85149' }}
              >
                ⏹ Dừng
              </button>
            )}

            {runStatus === 'running' && (
              <span className="text-xs text-[#8b949e]">
                {doneCount}/{SKILL_DEFINITIONS.length} skills
                {runningSkill && ` · ${runningSkill.icon} ${runningSkill.label}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ─── PROGRESS BAR ─────────────────────────────────────────── */}
      {(runStatus === 'running' || runStatus === 'completed') && (
        <div className="rounded-lg p-3 border" style={{ background: '#161b22', borderColor: '#30363d' }}>
          <div className="flex justify-between text-xs text-[#8b949e] mb-2">
            <span>Tiến độ</span>
            <span>{doneCount}/{SKILL_DEFINITIONS.length} skills</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#21262d' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(doneCount / SKILL_DEFINITIONS.length) * 100}%`,
                background: runStatus === 'completed' ? '#3fb950' : '#58a6ff',
              }}
            />
          </div>
        </div>
      )}

      {/* ─── SKILL CARDS GRID ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SKILL_DEFINITIONS.map((def, i) => (
          <SkillCard key={def.id} def={def} result={skillResults[def.id]} />
        ))}
      </div>

      {/* ─── RUN LOG ──────────────────────────────────────────────── */}
      {runLog.length > 0 && (
        <Card>
          <CardTitle icon="📋">Run Log</CardTitle>
          <div
            ref={logRef}
            className="text-[11px] font-mono space-y-0.5 max-h-40 overflow-y-auto"
            style={{ color: '#8b949e' }}
          >
            {runLog.map((line, i) => (
              <div key={i} className={
                line.includes('✅') ? 'text-[#3fb950]' :
                line.includes('❌') ? 'text-[#f85149]' :
                line.includes('🚀') || line.includes('🏁') ? 'text-[#58a6ff]' : ''
              }>{line}</div>
            ))}
          </div>
        </Card>
      )}

      {/* ─── REPORTER OUTPUT ──────────────────────────────────────── */}
      {completedOutput && (
        <Card>
          <CardTitle icon="🏆">Báo Cáo Tổng Hợp — alphaear-reporter</CardTitle>
          <div className="prose prose-invert prose-sm max-w-none text-[#8b949e] text-xs leading-relaxed mt-2">
            <ReactMarkdown>{completedOutput}</ReactMarkdown>
          </div>
        </Card>
      )}

      {/* ─── LIVE KPIs ────────────────────────────────────────────── */}
      <LiveKpiPanel />
    </div>
  )
}

// ─── LIVE KPI PANEL ──────────────────────────────────────────────────────────

function LiveKpiPanel() {
  const [kpis, setKpis] = useState<LiveKpi[]>([])
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/pipeline/status')
        if (res.ok) {
          const state: PipelineState = await res.json()
          setKpis(state.liveKpis)
          setLastRefreshed(state.lastRefreshed)
        }
      } catch { /* ignore */ }
    }
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!kpis.length) return null

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <CardTitle icon="📡">Live KPIs</CardTitle>
        {lastRefreshed && (
          <span className="text-[10px] text-[#8b949e]">
            Cập nhật: {new Date(lastRefreshed).toLocaleTimeString('vi-VN')}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {kpis.map(kpi => <KpiCard key={kpi.key} kpi={kpi} />)}
      </div>
    </Card>
  )
}
