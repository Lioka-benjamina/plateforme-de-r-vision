import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

const variants = {
  default: 'bg-surface-100 text-surface-600 ring-1 ring-surface-200',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  error: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  info: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200',
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}