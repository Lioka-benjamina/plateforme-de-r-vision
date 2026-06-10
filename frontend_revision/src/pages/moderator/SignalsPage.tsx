import { useEffect, useState } from 'react'
import { Eye, Check, X, ArrowUpRight, XIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchSignals, approveSignal, rejectSignal, escalateSignal } from '../../features/signal/signalThunks'
import { selectAllSignals, selectSignalLoading } from '../../features/signal/signalSelectors'
import { useToast } from '../../components/ui/Toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const statusVariants: Record<string, 'warning' | 'success' | 'error'> = {
  pending: 'warning', approved: 'success', rejected: 'error', escalated: 'warning',
}
const statusLabels: Record<string, string> = {
  pending: 'En attente', approved: 'Approuvé', rejected: 'Rejeté', escalated: 'Escaladé',
}

export default function SignalsPage() {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const signals = useAppSelector(selectAllSignals)
  const loading = useAppSelector(selectSignalLoading)
  const [activeTab, setActiveTab] = useState('Tous')
  const [viewSignal, setViewSignal] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchSignals())
  }, [dispatch])

  const tabs = ['Tous', 'En attente', 'Approuvé', 'Rejeté', 'Escaladé']
  const filtered = activeTab === 'Tous'
    ? signals
    : signals.filter((s) => {
        if (activeTab === 'En attente') return s.status === 'pending'
        if (activeTab === 'Approuvé') return s.status === 'approved'
        if (activeTab === 'Rejeté') return s.status === 'rejected'
        if (activeTab === 'Escaladé') return s.status === 'escalated'
        return true
      })

  const handleApprove = (id: number) => {
    dispatch(approveSignal(id)).then((r) => {
      if (approveSignal.fulfilled.match(r)) showToast('Signalement approuvé', 'success')
      else showToast("Erreur lors de l'approbation", 'error')
    })
  }
  const handleReject = (id: number) => {
    dispatch(rejectSignal(id)).then((r) => {
      if (rejectSignal.fulfilled.match(r)) showToast('Signalement rejeté', 'warning')
      else showToast('Erreur lors du rejet', 'error')
    })
  }
  const handleEscalate = (id: number) => {
    dispatch(escalateSignal(id)).then((r) => {
      if (escalateSignal.fulfilled.match(r)) showToast('Signalement escaladé', 'warning')
      else showToast("Erreur lors de l'escalade", 'error')
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Signalements</h1>
        <p className="text-sm text-surface-500 mt-1">{signals.length} signalements au total</p>
      </div>

      <div className="flex gap-1 bg-surface-100 rounded-xl p-1 w-fit flex-wrap">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
              activeTab === tab ? 'bg-primary-50 text-primary-600 shadow-soft' : 'text-surface-500 hover:text-surface-700'
            }`}>{tab}</button>
        ))}
      </div>

      <Card padding={false} className="rounded-2xl shadow-card border border-surface-100/80">
        {loading ? (
          <div className="text-center py-12 text-surface-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Cible</th>
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Signalé par</th>
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Motif</th>
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-surface-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 hover:bg-surface-50/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-surface-900">{s.targetName}</td>
                    <td className="py-3 px-4 text-surface-600">{s.reportedBy}</td>
                    <td className="py-3 px-4 text-surface-600 max-w-[200px] truncate">{s.reason}</td>
                    <td className="py-3 px-4 text-surface-500">{s.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusVariants[s.status] || 'warning'}>{statusLabels[s.status] || s.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {s.status === 'pending' && (
                          <>
                            <button onClick={() => handleApprove(s.id)}
                              className="p-2 rounded-xl text-success-500 hover:bg-success-50 transition-all" title="Approuver">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleReject(s.id)}
                              className="p-2 rounded-xl text-error-500 hover:bg-error-50 transition-all" title="Rejeter">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button onClick={() => setViewSignal(s)}
                          className="p-2 rounded-xl text-primary-500 hover:bg-primary-50 transition-all" title="Examiner">
                          <Eye className="w-4 h-4" />
                        </button>
                        {s.status !== 'escalated' && (
                          <button onClick={() => handleEscalate(s.id)}
                            className="p-2 rounded-xl text-warning-500 hover:bg-warning-50 transition-all" title="Escalader">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-surface-400">Aucun signalement trouvé.</div>
        )}
      </Card>

      {viewSignal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewSignal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight text-surface-900">Détail du signalement</h2>
              <button onClick={() => setViewSignal(null)} className="p-2 hover:bg-surface-100 rounded-xl transition-all">
                <XIcon size={20} className="text-surface-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Cible</p>
                <p className="text-sm font-medium text-surface-900">{viewSignal.targetName}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Type</p>
                <p className="text-sm text-surface-700">{viewSignal.targetType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Signalé par</p>
                <p className="text-sm text-surface-700">{viewSignal.reportedBy}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Motif</p>
                <p className="text-sm text-surface-700 whitespace-pre-wrap">{viewSignal.reason}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Date</p>
                <p className="text-sm text-surface-700">{viewSignal.date}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide font-semibold">Statut</p>
                <Badge variant={statusVariants[viewSignal.status] || 'warning'}>
                  {statusLabels[viewSignal.status] || viewSignal.status}
                </Badge>
              </div>
            </div>

            {viewSignal.status === 'pending' && (
              <div className="flex gap-3 pt-4 mt-4 border-t border-surface-200">
                <button onClick={() => { handleApprove(viewSignal.id); setViewSignal(null) }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-2xl text-sm font-semibold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-soft">
                  <Check size={16} /> Approuver
                </button>
                <button onClick={() => { handleReject(viewSignal.id); setViewSignal(null) }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-2xl text-sm font-semibold hover:bg-red-700 transition-all active:scale-[0.98] shadow-soft">
                  <X size={16} /> Rejeter
                </button>
                <button onClick={() => { handleEscalate(viewSignal.id); setViewSignal(null) }}
                  className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white py-2 px-4 rounded-2xl text-sm font-semibold hover:bg-amber-700 transition-all active:scale-[0.98] shadow-soft">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
