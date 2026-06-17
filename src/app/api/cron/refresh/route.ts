// POST /api/cron/refresh
// Triggered by:
//   • Vercel Cron (vercel.json)
//   • GitHub Actions (daily workflow)
//   • Manual via pipeline UI "Auto-refresh" button
//
// Runs the AI pipeline for each DEFAULT_SUBJECT sequentially,
// saves results to analysis-store, returns a summary.

import { NextRequest, NextResponse } from 'next/server'
import { runPipeline } from '@/lib/pipeline-executor'
import { saveAnalysis, DEFAULT_SUBJECTS, isStale } from '@/lib/analysis-store'
import { getState } from '@/lib/pipeline-store'

export const maxDuration = 60  // Vercel Hobby max; Pro supports 300

// Protect with a secret so random callers can't spam AI calls
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true  // dev mode: no secret required
  const authHeader = req.headers.get('authorization')
  const querySecret = req.nextUrl.searchParams.get('secret')
  return authHeader === `Bearer ${secret}` || querySecret === secret
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const forceAll = body.force === true          // ignore stale check
  const subjects: string[] = body.subjects ?? DEFAULT_SUBJECTS

  const pipelineState = getState()
  if (pipelineState.isRunning) {
    return NextResponse.json({ error: 'Pipeline already running' }, { status: 409 })
  }

  const results: Array<{ subject: string; status: 'refreshed' | 'skipped' | 'error'; refreshedAt?: string; error?: string }> = []

  for (const subject of subjects) {
    // Skip if fresh (within 23h) unless forced
    if (!forceAll && !isStale(subject)) {
      results.push({ subject, status: 'skipped' })
      continue
    }

    try {
      console.log(`[cron] Starting pipeline: ${subject}`)
      const run = await runPipeline(subject, '')   // keys from env
      saveAnalysis(subject, run)
      results.push({ subject, status: 'refreshed', refreshedAt: new Date().toISOString() })
      console.log(`[cron] Done: ${subject}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`[cron] Error for "${subject}":`, msg)
      results.push({ subject, status: 'error', error: msg })
    }
  }

  return NextResponse.json({
    completedAt: new Date().toISOString(),
    results,
    refreshed: results.filter(r => r.status === 'refreshed').length,
    skipped:   results.filter(r => r.status === 'skipped').length,
    errors:    results.filter(r => r.status === 'error').length,
  })
}

// Allow Vercel Cron (GET) as well
export async function GET(req: NextRequest) {
  return POST(req)
}
