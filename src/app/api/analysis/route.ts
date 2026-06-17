// GET /api/analysis?subject=...   → single entry
// GET /api/analysis               → all entries + cron status

import { NextRequest, NextResponse } from 'next/server'
import { getAnalysis, getAllAnalyses, getCronStatus, isStale } from '@/lib/analysis-store'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const subject = req.nextUrl.searchParams.get('subject')

  if (subject) {
    const entry = getAnalysis(subject)
    if (!entry) return NextResponse.json({ error: 'No analysis found' }, { status: 404 })
    return NextResponse.json({ ...entry, stale: isStale(subject) })
  }

  return NextResponse.json({
    cron: getCronStatus(),
    analyses: getAllAnalyses().map(e => ({
      subject: e.subject,
      refreshedAt: e.refreshedAt,
      nextRefreshAt: e.nextRefreshAt,
      stale: isStale(e.subject),
      summaryPreview: e.summary.slice(0, 200),
    })),
  })
}
