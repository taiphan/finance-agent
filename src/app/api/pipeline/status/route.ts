// GET /api/pipeline/status
// Returns current pipeline state — polled every 2s by the UI

import { NextResponse } from 'next/server'
import { getState } from '@/lib/pipeline-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const state = getState()
  return NextResponse.json(state)
}
