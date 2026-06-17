// POST /api/pipeline/run
// Starts a pipeline run for a given subject in the background
// Returns the run ID immediately; client polls /api/pipeline/status

import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import type { PipelineRun } from '@/lib/pipeline-types'
import { SKILL_DEFINITIONS } from '@/lib/pipeline-types'
import { setCurrentRun, getState } from '@/lib/pipeline-store'
import { runPipeline, type AIProvider } from '@/lib/pipeline-executor'

export async function POST(req: NextRequest) {
  const { subject, apiKey, provider = 'anthropic' } = await req.json()

  if (!subject?.trim()) {
    return NextResponse.json({ error: 'subject is required' }, { status: 400 })
  }

  const state = getState()
  if (state.isRunning) {
    return NextResponse.json({ error: 'A pipeline run is already in progress' }, { status: 409 })
  }

  // Use provided API key, or fall back to env
  const key = apiKey || process.env.ANTHROPIC_API_KEY || ''
  if (!key && provider !== 'ollama') {
    return NextResponse.json({ error: 'No API key. Set env or pass apiKey in body.' }, { status: 400 })
  }

  const runId = nanoid(8)
  const run: PipelineRun = {
    id: runId,
    subject: subject.trim(),
    startedAt: new Date().toISOString(),
    status: 'running',
    skills: SKILL_DEFINITIONS.map(s => ({ skillId: s.id, status: 'idle', output: '' })),
  }
  setCurrentRun(run)

  // Run pipeline async — don't await, let the client poll
  runPipeline(subject.trim(), key, undefined, provider).catch(err => {
    console.error('[pipeline] Error:', err)
  })

  return NextResponse.json({ runId, subject: subject.trim(), startedAt: run.startedAt })
}
