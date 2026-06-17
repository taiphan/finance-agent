// ─── PIPELINE TYPES ──────────────────────────────────────────────────────────

export type SkillId =
  | 'alphaear-search'
  | 'alphaear-news'
  | 'alphaear-stock'
  | 'alphaear-sentiment'
  | 'alphaear-predictor'
  | 'signal-tracker'
  | 'logic-visualizer'
  | 'financial-analyst'
  | 'investment-advisor'
  | 'alphaear-reporter'

export type SkillStatus = 'idle' | 'running' | 'done' | 'error'

export interface SkillResult {
  skillId: SkillId
  status: SkillStatus
  output: string        // Markdown / text output
  duration?: number     // ms
  updatedAt?: string    // ISO timestamp
}

export interface PipelineRun {
  id: string
  subject: string       // e.g. "FE Credit", "VPBank Ecosystem"
  startedAt: string
  completedAt?: string
  status: 'running' | 'completed' | 'failed'
  skills: SkillResult[]
}

export interface LiveKpi {
  key: string
  value: string
  change: string
  changeType: 'up' | 'down' | 'neutral'
  source: string
  updatedAt: string
}

export interface PipelineState {
  currentRun: PipelineRun | null
  lastRun: PipelineRun | null
  liveKpis: LiveKpi[]
  isRunning: boolean
  lastRefreshed: string | null
}

// Skills ordered as the pipeline runs them
export const SKILL_DEFINITIONS: Array<{
  id: SkillId
  label: string
  icon: string
  description: string
  dependsOn?: SkillId[]
}> = [
  { id: 'alphaear-search',    icon: '🔍', label: 'Search',        description: 'Thu thập dữ liệu từ CafeF, vnexpress, vpbank.com.vn' },
  { id: 'alphaear-news',      icon: '📰', label: 'News',          description: 'Tổng hợp tin tức & sự kiện thị trường', dependsOn: ['alphaear-search'] },
  { id: 'alphaear-stock',     icon: '📊', label: 'Stock Data',    description: 'Lấy dữ liệu giá, dư nợ, tỷ số tài chính', dependsOn: ['alphaear-search'] },
  { id: 'alphaear-sentiment', icon: '🎭', label: 'Sentiment',     description: 'Phân tích cảm xúc thị trường -1.0→+1.0', dependsOn: ['alphaear-news'] },
  { id: 'alphaear-predictor', icon: '📈', label: 'Predictor',     description: 'Dự báo xu hướng (Kronos model)', dependsOn: ['alphaear-stock', 'alphaear-sentiment'] },
  { id: 'signal-tracker',     icon: '📡', label: 'Signals',       description: 'Theo dõi tín hiệu đầu tư (Strengthening/Weakening)', dependsOn: ['alphaear-predictor'] },
  { id: 'logic-visualizer',   icon: '🗺️', label: 'Logic Viz',     description: 'Sơ đồ truyền dẫn tác động', dependsOn: ['alphaear-news'] },
  { id: 'financial-analyst',  icon: '📐', label: 'Financial',     description: 'Tỷ số, DCF, /financial-health scorecard', dependsOn: ['alphaear-stock'] },
  { id: 'investment-advisor', icon: '💼', label: 'Investment',    description: 'Luận điểm đầu tư, IRR, BCG matrix', dependsOn: ['financial-analyst', 'signal-tracker'] },
  { id: 'alphaear-reporter',  icon: '🏆', label: 'Reporter',      description: 'Tổng hợp báo cáo & cập nhật dashboard', dependsOn: ['investment-advisor'] },
]
