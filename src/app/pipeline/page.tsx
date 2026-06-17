import { Navbar } from '@/components/dashboard/Navbar'
import { PipelineControl } from '@/components/pipeline/PipelineControl'
import { RefreshSchedule } from '@/components/pipeline/RefreshSchedule'

export default function PipelinePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      <Navbar
        title="⚡ Live Pipeline"
        subtitle="11 Finance Skills — Real-time Execution"
        badge="AI Powered"
        badgeColor="#bc8cff"
      />
      <main className="max-w-5xl mx-auto px-5 pb-16 mt-6 space-y-6">
        <PipelineControl />
        <RefreshSchedule />
      </main>
    </div>
  )
}
