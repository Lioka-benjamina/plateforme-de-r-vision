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
    <div className="bg-white rounded-xl border border-surface-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-surface-900 tracking-tight">{value}</p>
      <p className="text-sm text-surface-400 mt-0.5">{label}</p>
    </div>
  )
}