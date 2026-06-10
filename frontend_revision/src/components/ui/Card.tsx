import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

export default function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-card border border-surface-100/80 ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}
