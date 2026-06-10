import type { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string | number
  trend?: string
  trendUp?: boolean
}

export default function StatCard({ icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-surface-100/80 shadow-card p-6 hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
            trendUp ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-surface-900 tracking-tight">{value}</p>
      <p className="text-sm text-surface-400 mt-1">{label}</p>
    </div>
  )
}
