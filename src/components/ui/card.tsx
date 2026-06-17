import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      'rounded-xl border p-5',
      'bg-[#161b22] border-[#30363d]',
      className
    )}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  icon?: string
  className?: string
}

export function CardTitle({ children, icon, className }: CardTitleProps) {
  return (
    <div className={cn(
      'flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-[#8b949e] mb-3',
      className
    )}>
      {icon && <span>{icon}</span>}
      {children}
    </div>
  )
}
