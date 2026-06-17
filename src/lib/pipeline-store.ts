// ─── IN-MEMORY STORE (server-side singleton) ─────────────────────────────────
// In production, swap for Redis/KV. For local dev this persists across requests.

import type { PipelineRun, LiveKpi, SkillResult } from './pipeline-types'

interface Store {
  currentRun: PipelineRun | null
  lastRun: PipelineRun | null
  liveKpis: LiveKpi[]
  lastRefreshed: string | null
}

// Module-level singleton — survives Next.js hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var __pipelineStore: Store | undefined
}

function getStore(): Store {
  if (!global.__pipelineStore) {
    global.__pipelineStore = {
      currentRun: null,
      lastRun: null,
      liveKpis: getDefaultKpis(),
      lastRefreshed: null,
    }
  }
  return global.__pipelineStore
}

function getDefaultKpis(): LiveKpi[] {
  return [
    { key: 'vpbank_pbt_q1', value: '7.921 tỷ', change: '+58% YoY', changeType: 'up', source: 'VPBank PDF', updatedAt: new Date().toISOString() },
    { key: 'vpbank_credit',  value: '1.060.000 tỷ', change: '+10,2% YTD', changeType: 'up', source: 'VPBank PDF', updatedAt: new Date().toISOString() },
    { key: 'vpbank_car',     value: '14,35%', change: 'Nhóm dẫn đầu', changeType: 'up', source: 'CAR PDF', updatedAt: new Date().toISOString() },
    { key: 'vpbank_roe',     value: '17,1%', change: '+3,9pp YoY', changeType: 'up', source: 'KQHD PDF', updatedAt: new Date().toISOString() },
    { key: 'fec_pbt_2025',   value: '611 tỷ', change: 'KH 2026: 1.179 tỷ', changeType: 'up', source: 'VPBank PDF', updatedAt: new Date().toISOString() },
    { key: 'opes_pbt_q1',    value: '261 tỷ', change: '×3 YoY', changeType: 'up', source: 'IR #26', updatedAt: new Date().toISOString() },
    { key: 'vpbanks_pbt_q1', value: '~515 tỷ', change: '+196% vs Q1/24', changeType: 'up', source: 'KQHD PDF', updatedAt: new Date().toISOString() },
    { key: 'nim_cof',        value: 'COF: 5,2%', change: '↑+0.8pp — áp lực', changeType: 'down', source: 'KQHD PDF', updatedAt: new Date().toISOString() },
  ]
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

export function getState() {
  const s = getStore()
  // Auto-clear stale runs (stuck for >10 min means all providers failed mid-run)
  if (s.currentRun) {
    const age = Date.now() - new Date(s.currentRun.startedAt).getTime()
    if (age > 10 * 60 * 1000) {
      console.warn('[pipeline-store] Auto-clearing stale run:', s.currentRun.id)
      s.currentRun = null
    }
  }
  return {
    currentRun: s.currentRun,
    lastRun: s.lastRun,
    liveKpis: s.liveKpis,
    isRunning: s.currentRun !== null,
    lastRefreshed: s.lastRefreshed,
  }
}

export function setCurrentRun(run: PipelineRun | null) {
  getStore().currentRun = run
}

export function setLastRun(run: PipelineRun) {
  const s = getStore()
  s.lastRun = run
  s.currentRun = null
  s.lastRefreshed = new Date().toISOString()
}

export function updateSkillResult(runId: string, result: SkillResult) {
  const s = getStore()
  if (s.currentRun?.id === runId) {
    const idx = s.currentRun.skills.findIndex(r => r.skillId === result.skillId)
    if (idx >= 0) {
      s.currentRun.skills[idx] = result
    } else {
      s.currentRun.skills.push(result)
    }
  }
}

export function updateLiveKpis(kpis: LiveKpi[]) {
  const s = getStore()
  kpis.forEach(kpi => {
    const idx = s.liveKpis.findIndex(k => k.key === kpi.key)
    if (idx >= 0) s.liveKpis[idx] = kpi
    else s.liveKpis.push(kpi)
  })
}
