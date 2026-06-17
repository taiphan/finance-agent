// POST /api/pipeline/cancel  — clears a stuck/stale run from the store

import { NextResponse } from 'next/server'
import { setCurrentRun } from '@/lib/pipeline-store'

export async function POST() {
  setCurrentRun(null)
  return NextResponse.json({ ok: true, message: 'Pipeline state cleared' })
}
