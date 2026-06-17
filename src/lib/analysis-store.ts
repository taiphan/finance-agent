// ─── ANALYSIS STORE ──────────────────────────────────────────────────────────
// Persists the latest AI analysis result for each subject.
// In dev: module-level singleton (in-memory).
// In production: swap getStore/setResult to use Redis/Vercel KV.

import type { PipelineRun } from './pipeline-types'

interface AnalysisEntry {
  subject: string
  run: PipelineRun
  summary: string        // output of alphaear-reporter skill
  refreshedAt: string    // ISO timestamp
  nextRefreshAt: string  // ISO timestamp
}

interface AnalysisStore {
  entries: Record<string, AnalysisEntry>  // keyed by subject
  lastCronAt: string | null
  nextCronAt: string | null
  cronEnabled: boolean
}

declare global {
  // eslint-disable-next-line no-var
  var __analysisStore: AnalysisStore | undefined
}

function getStore(): AnalysisStore {
  if (!global.__analysisStore) {
    global.__analysisStore = {
      entries: {},
      lastCronAt: null,
      nextCronAt: null,
      cronEnabled: true,
    }
  }
  return global.__analysisStore
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

export function saveAnalysis(subject: string, run: PipelineRun, intervalHours = 24) {
  const store = getStore()
  const now = new Date()
  const next = new Date(now.getTime() + intervalHours * 60 * 60 * 1000)

  // Extract summary from reporter skill
  const reporterSkill = run.skills.find(s => s.skillId === 'alphaear-reporter')
  const summary = reporterSkill?.status === 'done' ? reporterSkill.output : ''

  store.entries[subject] = {
    subject,
    run,
    summary,
    refreshedAt: now.toISOString(),
    nextRefreshAt: next.toISOString(),
  }
  store.lastCronAt = now.toISOString()
  store.nextCronAt = next.toISOString()
}

export function getAnalysis(subject: string): AnalysisEntry | null {
  return getStore().entries[subject] ?? null
}

export function getAllAnalyses(): AnalysisEntry[] {
  return Object.values(getStore().entries).sort(
    (a, b) => new Date(b.refreshedAt).getTime() - new Date(a.refreshedAt).getTime()
  )
}

export function getCronStatus() {
  const s = getStore()
  return {
    enabled: s.cronEnabled,
    lastCronAt: s.lastCronAt,
    nextCronAt: s.nextCronAt,
    subjectCount: Object.keys(s.entries).length,
  }
}

export function isStale(subject: string, thresholdHours = 23): boolean {
  const entry = getStore().entries[subject]
  if (!entry) return true
  const age = Date.now() - new Date(entry.refreshedAt).getTime()
  return age > thresholdHours * 60 * 60 * 1000
}

// Default subjects the cron refreshes
export const DEFAULT_SUBJECTS = [
  'VPBank Ecosystem — toàn bộ hệ sinh thái',
  'FE Credit — phân tích phục hồi',
  'VPBankS — sau IPO $483M',
]
