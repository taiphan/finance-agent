interface SectionHeaderProps {
  num: number
  title: string
  skill: string
}

export function SectionHeader({ num, title, skill }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-4 pb-3 border-b" style={{ borderColor: '#30363d' }}>
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: '#58a6ff' }}>
        {num}
      </div>
      <h2 className="text-base font-semibold">{title}</h2>
      <span className="ml-auto text-[11px] font-mono px-2.5 py-0.5 rounded" style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e' }}>
        {skill}
      </span>
    </div>
  )
}
