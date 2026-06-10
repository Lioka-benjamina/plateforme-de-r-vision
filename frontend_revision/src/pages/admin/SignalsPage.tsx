import { useEffect, useState } from 'react'
import { Eye, Check, X, ArrowUpRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchSignals, approveSignal, rejectSignal, escalateSignal } from '../../features/signal/signalThunks'
import { selectAllSignals, selectSignalLoading } from '../../features/signal/signalSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const statusVariants: Record<string, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
  escalated: 'Escaladé',
}

export default function SignalsPage() {
  const dispatch = useAppDispatch()
  const signals = useAppSelector(selectAllSignals)
  const loading = useAppSelector(selectSignalLoading)
  const [activeTab, setActiveTab] = useState('Tous')

  useEffect(() => {
    dispatch(fetchSignals())
  }, [dispatch])

  const tabs = ['Tous', 'En attente', 'Approuvé', 'Rejeté']
  const filtered = activeTab === 'Tous'
    ? signals
    : signals.filter((s) => {
        if (activeTab === 'En attente') return s.status === 'pending'
        if (activeTab === 'Approuvé') return s.status === 'approved'
        if (activeTab === 'Rejeté') return s.status === 'rejected'
        return true
      })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Signalements</h1>
        <p className="text-sm text-surface-500 mt-1">{signals.length} signalements</p>
      </div>

      <div className="flex gap-1 border-b border-surface-200">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-surface-500 hover:text-surface-700'
            }`}>{tab}</button>
        ))}
      </div>

      <Card padding={false}>
        {loading ? (
          <div className="text-center py-16 text-surface-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-4 px-5 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Cible</th>
                  <th className="text-left py-4 px-5 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Motif</th>
                  <th className="text-left py-4 px-5 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-5 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Statut</th>
                  <th className="text-left py-4 px-5 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 hover:bg-surface-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-semibold text-surface-900">{s.targetName}</p>
                      <p className="text-xs text-surface-400">{s.reportedBy}</p>
                    </td>
                    <td className="py-4 px-5 text-surface-600">{s.reason}</td>
                    <td className="py-4 px-5 text-surface-500">{s.date}</td>
                    <td className="py-4 px-5">
                      <Badge variant={statusVariants[s.status] || 'warning'}>{statusLabels[s.status] || s.status}</Badge>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1">
                        {s.status === 'pending' && (
                          <>
                            <button onClick={() => dispatch(approveSignal(s.id))}
                              className="p-2 rounded-xl text-success-500 hover:bg-success-50 transition" title="Approuver">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => dispatch(rejectSignal(s.id))}
                              className="p-2 rounded-xl text-error-500 hover:bg-error-50 transition" title="Rejeter">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 rounded-xl text-primary-500 hover:bg-primary-50 transition" title="Examiner">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => dispatch(escalateSignal(s.id))}
                          className="p-2 rounded-xl text-warning-500 hover:bg-warning-50 transition" title="Escalader">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-surface-400">Aucun signalement trouvé.</div>
        )}
      </Card>
    </div>
  )
}
