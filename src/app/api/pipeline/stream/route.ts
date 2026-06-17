// GET /api/pipeline/stream?subject=...&apiKey=...
// Server-Sent Events stream — real-time per-skill progress

import { NextRequest } from 'next/server'
import { getState, setCurrentRun } from '@/lib/pipeline-store'
import { runPipeline, type AIProvider } from '@/lib/pipeline-executor'
import type { SkillResult } from '@/lib/pipeline-types'
import { SKILL_DEFINITIONS } from '@/lib/pipeline-types'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const subject = searchParams.get('subject') || 'VPBank Ecosystem'
  const apiKey = searchParams.get('apiKey') || process.env.ANTHROPIC_API_KEY || ''
  const provider = (searchParams.get('provider') || 'anthropic') as AIProvider

  if (!apiKey && provider !== 'ollama') {
    return new Response('No API key', { status: 400 })
  }

  const state = getState()
  if (state.isRunning) {
    return new Response('Already running', { status: 409 })
  }

  // Set up the run immediately so status endpoint sees it
  const runId = nanoid(8)
  setCurrentRun({
    id: runId,
    subject,
    startedAt: new Date().toISOString(),
    status: 'running',
    skills: SKILL_DEFINITIONS.map(s => ({ skillId: s.id, status: 'idle', output: '' })),
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: unknown) {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        )
      }

      send('start', { runId, subject, startedAt: new Date().toISOString() })

      try {
        await runPipeline(subject, apiKey, (result: SkillResult) => {
          send('skill', result)
        }, provider)

        send('complete', { runId, completedAt: new Date().toISOString() })
      } catch (err) {
        send('error', { message: err instanceof Error ? err.message : 'Unknown error' })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
