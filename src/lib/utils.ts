import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CHART_DEFAULTS = {
  stroke: '#30363d',
  tick: { fill: '#8b949e', fontSize: 11 },
  grid: { stroke: 'rgba(48,54,61,0.8)' },
}
