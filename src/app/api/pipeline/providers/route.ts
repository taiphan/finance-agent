// GET /api/pipeline/providers
// Returns which providers are configured (key present in env) — never exposes the key values

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    google:    !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    groq:      !!process.env.GROQ_API_KEY,
    openai:    !!process.env.OPENAI_API_KEY,
    ollama:    true, // always listed — will fail at call time if not running
  })
}
