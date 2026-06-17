// ─── PIPELINE EXECUTOR ───────────────────────────────────────────────────────
// Supports: Anthropic Claude · Google Gemini · Ollama (local)

import { generateText, type LanguageModelV1 } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'   // Ollama is OpenAI-compatible
import { nanoid } from 'nanoid'
import type { SkillId, PipelineRun, SkillResult } from './pipeline-types'
import { SKILL_DEFINITIONS } from './pipeline-types'
import { setCurrentRun, setLastRun, updateSkillResult } from './pipeline-store'

export type AIProvider = 'anthropic' | 'google' | 'ollama' | 'openai' | 'groq'

// ─── FALLBACK CHAIN ──────────────────────────────────────────────────────────
// Priority order when auto-fallback is used.
// A provider is "available" only if it has a key in env (or is Ollama).

const FALLBACK_ORDER: AIProvider[] = ['google', 'openai', 'groq', 'anthropic', 'ollama']

function isAvailable(provider: AIProvider, overrideKey?: string): boolean {
  if (overrideKey) return true
  switch (provider) {
    case 'anthropic': return !!process.env.ANTHROPIC_API_KEY
    case 'google':    return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    case 'groq':      return !!process.env.GROQ_API_KEY
    case 'openai':    return !!process.env.OPENAI_API_KEY
    // Ollama: only include if OLLAMA_ENABLED=true or OLLAMA_BASE_URL is explicitly set
    // This prevents it from being in the fallback chain when not intentionally configured
    case 'ollama':    return process.env.OLLAMA_ENABLED === 'true' || !!process.env.OLLAMA_BASE_URL
    default:          return false
  }
}

function getAvailableProviders(preferredProvider: AIProvider, overrideKey?: string): AIProvider[] {
  // Always start with the user's preferred provider, then fall through the rest
  const ordered = [
    preferredProvider,
    ...FALLBACK_ORDER.filter(p => p !== preferredProvider),
  ]
  return ordered.filter(p => isAvailable(p, overrideKey))
}

function buildModel(provider: AIProvider, apiKey: string) {
  switch (provider) {
    case 'google': {
      const key = apiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
      const google = createGoogleGenerativeAI({ apiKey: key })
      return google('gemini-1.5-flash')
    }
    case 'openai': {
      const key = apiKey || process.env.OPENAI_API_KEY || ''
      const openai = createOpenAI({ apiKey: key })
      return openai('gpt-4o-mini')
    }
    case 'groq': {
      const key = apiKey || process.env.GROQ_API_KEY || ''
      const groq = createOpenAI({ baseURL: 'https://api.groq.com/openai/v1', apiKey: key })
      return groq('llama-3.3-70b-versatile')
    }
    case 'ollama': {
      const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
      const model   = process.env.OLLAMA_MODEL   || 'llama3.2'
      const ollama  = createOpenAI({ baseURL: `${baseURL}/v1`, apiKey: 'ollama' })
      return ollama(model)
    }
    case 'anthropic':
    default: {
      const key = apiKey || process.env.ANTHROPIC_API_KEY || ''
      const anthropic = createAnthropic({ apiKey: key })
      return anthropic('claude-3-5-haiku-20241022')
    }
  }
}

// ─── GENERATE WITH FALLBACK ──────────────────────────────────────────────────
// Tries each provider in order. Emits which provider it used or failed.

async function generateWithFallback(
  prompt: string,
  providers: AIProvider[],
  apiKey: string,
  onFallback?: (from: AIProvider, to: AIProvider, reason: string) => void
): Promise<{ text: string; usedProvider: AIProvider }> {
  let lastError: Error | null = null

  for (const provider of providers) {
    try {
      const model = buildModel(provider, apiKey) as LanguageModelV1
      const { text } = await generateText({ model, prompt, maxTokens: 600, temperature: 0.3 })
      return { text, usedProvider: provider }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      const nextProvider = providers[providers.indexOf(provider) + 1]
      if (nextProvider) {
        onFallback?.(provider, nextProvider, lastError.message.slice(0, 80))
      }
    }
  }

  throw lastError ?? new Error('All providers failed')
}

// ─── SKILL PROMPTS ───────────────────────────────────────────────────────────

const SKILL_PROMPTS: Record<SkillId, (subject: string, prev: string) => string> = {
  'alphaear-search': (subject) => `
Bạn là alphaear-search skill. Thu thập và tổng hợp thông tin mới nhất về: ${subject}
Liệt kê 5-8 nguồn dữ liệu quan trọng nhất cần phân tích (CafeF, VPBank IR, VnExpress, Reuters, etc.)
và tóm tắt thông tin key facts đã biết. Ngắn gọn, bullet points.`,

  'alphaear-news': (subject, prev) => `
Bạn là alphaear-news skill. Dựa trên data từ search skill:
${prev}

Tổng hợp TIN TỨC & SỰ KIỆN về ${subject}:
- 3-5 tin tức tích cực (🟢)
- 2-3 tin tức tiêu cực/rủi ro (🔴)  
- 1-2 tin trung lập cần theo dõi (⚪)
Kèm nhận định nhanh về tác động thị trường.`,

  'alphaear-stock': (subject, prev) => `
Bạn là alphaear-stock skill. Cung cấp DỮ LIỆU TÀI CHÍNH về ${subject}:
Context từ news: ${prev.slice(0, 300)}

Cung cấp:
- Các chỉ số tài chính quan trọng nhất (doanh thu, lợi nhuận, ROE, ROA, NIM, NPL...)
- So sánh YoY và với benchmark ngành
- Dữ liệu từ báo cáo chính thức gần nhất nếu có
Format: bảng markdown ngắn gọn.`,

  'alphaear-sentiment': (subject, prev) => `
Bạn là alphaear-sentiment skill. PHÂN TÍCH CẢM XÚC thị trường về ${subject}.
Dựa trên news: ${prev.slice(0, 300)}

Cho điểm sentiment -1.0 đến +1.0 theo từng nguồn:
- Báo chí tài chính VN: X.XX
- Nhà đầu tư/Analyst: X.XX  
- Mạng xã hội: X.XX
- Regulatory: X.XX
- Điểm tổng hợp: X.XX

Kèm nhận xét về momentum (đang tăng/giảm/ổn định) và tín hiệu contrarian nếu có.`,

  'alphaear-predictor': (subject, prev) => `
Bạn là alphaear-predictor skill. DỰ BÁO xu hướng cho ${subject}.
Context: ${prev.slice(0, 300)}

Đưa ra dự báo 3 kịch bản (bull/base/bear) cho 6-12 tháng tới:
- Bull case: giả định & mức dự báo
- Base case: giả định & mức dự báo  
- Bear case: giả định & mức dự báo
Khoảng tin cậy 80% và các yếu tố điều chỉnh chính.`,

  'signal-tracker': (subject, prev) => `
Bạn là signal-tracker skill. THEO DÕI TÍN HIỆU ĐẦU TƯ cho ${subject}.
Context: ${prev.slice(0, 300)}

Đánh giá 3-4 investment thesis:
- Thesis name: [Mô tả]
- Status: Strengthening / Weakening / Invalidated / Watch
- Score: X/10
- Evidence: ✅/❌ bullets
- Invalidation conditions
`,

  'logic-visualizer': (subject, prev) => `
Bạn là logic-visualizer skill. VẼ SƠ ĐỒ truyền dẫn tác động cho ${subject}.
Context: ${prev.slice(0, 200)}

Mô tả chuỗi nhân quả chính (ASCII diagram hoặc text) — ví dụ:
[Sự kiện] → [Tác động 1] → [Hệ quả]
                          → [Hệ quả 2]
Tập trung vào 1-2 chuỗi quan trọng nhất, dùng icon và màu ký hiệu.`,

  'financial-analyst': (subject, prev) => `
Bạn là financial-analyst skill. PHÂN TÍCH TÀI CHÍNH chuyên sâu ${subject}.
Data: ${prev.slice(0, 400)}

Thực hiện:
1. Phân tích tỷ số (ROE, ROA, NIM, NPL, CIR, CAR...) — bảng so sánh với benchmark
2. /financial-health scorecard (điểm từng hạng mục /10 và tổng thể)
3. Nhận xét về điểm mạnh/yếu chính
`,

  'investment-advisor': (subject, prev) => `
Bạn là investment-advisor skill. LUẬN ĐIỂM ĐẦU TƯ cho ${subject}.
Analysis: ${prev.slice(0, 400)}

Đưa ra:
1. Investment thesis tóm tắt + Rating (BUY/HOLD/SELL/WATCH)
2. IRR scenarios: Bull / Base / Bear (MOIC, IRR %/năm, giả định chính)
3. Phân bổ vốn gợi ý (nếu là VPBank/subsidiary)
4. Top 3 rủi ro chính + xác suất + tác động
`,

  'alphaear-reporter': (subject, prev) => `
Bạn là alphaear-reporter skill. TẠO BÁO CÁO TỔNG HỢP về ${subject}.
Pipeline output: ${prev.slice(0, 500)}

Viết Executive Summary (≤150 từ) bao gồm:
- Kết luận chính
- Rating tổng thể (/10) với lý do
- 3 hành động/catalyst cần theo dõi tiếp theo
- Disclaimer ngắn

Sau đó bảng tổng hợp 10 skills đã chạy với kết quả và signal.
`,
}

// ─── EXECUTOR ────────────────────────────────────────────────────────────────

export interface SkillResultWithProvider extends SkillResult {
  usedProvider?: AIProvider
  fallbackLog?: string[]  // e.g. ['anthropic → google: rate limit']
}

export async function runPipeline(
  subject: string,
  apiKey: string,
  onProgress?: (result: SkillResultWithProvider) => void,
  provider: AIProvider = 'anthropic'
): Promise<PipelineRun> {
  const runId = nanoid(8)
  const run: PipelineRun = {
    id: runId,
    subject,
    startedAt: new Date().toISOString(),
    status: 'running',
    skills: SKILL_DEFINITIONS.map(s => ({ skillId: s.id, status: 'idle', output: '' })),
  }

  setCurrentRun(run)

  // Build the fallback chain based on what's configured in env
  const providerChain = getAvailableProviders(provider, apiKey)
  let cumulativeContext = ''

  for (const skillDef of SKILL_DEFINITIONS) {
    const startTime = Date.now()
    const fallbackLog: string[] = []

    const runningResult: SkillResultWithProvider = {
      skillId: skillDef.id, status: 'running', output: '', updatedAt: new Date().toISOString()
    }
    updateSkillResult(runId, runningResult)
    onProgress?.(runningResult)

    try {
      const prompt = SKILL_PROMPTS[skillDef.id](subject, cumulativeContext)

      const { text, usedProvider } = await generateWithFallback(
        prompt,
        providerChain,
        apiKey,
        (from, to, reason) => {
          const msg = `${from} → ${to}: ${reason}`
          fallbackLog.push(msg)
          console.warn(`[pipeline:${skillDef.id}] Fallback: ${msg}`)
        }
      )

      const doneResult: SkillResultWithProvider = {
        skillId: skillDef.id,
        status: 'done',
        output: text,
        duration: Date.now() - startTime,
        updatedAt: new Date().toISOString(),
        usedProvider,
        fallbackLog: fallbackLog.length ? fallbackLog : undefined,
      }

      updateSkillResult(runId, doneResult)
      onProgress?.(doneResult)

      cumulativeContext += `\n\n[${skillDef.label}]:\n${text.slice(0, 400)}`

    } catch (err) {
      // All providers exhausted for this skill
      const errorResult: SkillResultWithProvider = {
        skillId: skillDef.id,
        status: 'error',
        output: `All providers failed. Last error: ${err instanceof Error ? err.message : err}`,
        duration: Date.now() - startTime,
        updatedAt: new Date().toISOString(),
        fallbackLog,
      }
      updateSkillResult(runId, errorResult)
      onProgress?.(errorResult)
    }
  }

  const completedRun: PipelineRun = {
    ...run,
    completedAt: new Date().toISOString(),
    status: 'completed',
    skills: run.skills,
  }

  setLastRun(completedRun)

  // Auto-save to analysis store so the refresh endpoint can serve it
  try {
    const { saveAnalysis } = await import('./analysis-store')
    const hours = parseInt(process.env.ANALYSIS_REFRESH_HOURS || '24', 10)
    saveAnalysis(subject, completedRun, hours)
  } catch { /* non-fatal */ }

  return completedRun
}
