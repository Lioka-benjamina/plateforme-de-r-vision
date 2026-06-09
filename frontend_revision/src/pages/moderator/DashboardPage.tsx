import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, BookOpen, CheckCircle, ArrowUpRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchSignals } from '../../features/signal/signalThunks'
import { selectAllSignals, selectSignalLoading } from '../../features/signal/signalSelectors'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const statusLabels: Record<string, string> = { pending: 'En attente', approved: 'Approuvé', rejected: 'Rejeté' }
const statusVariants: Record<string, 'warning' | 'success' | 'error'> = { pending: 'warning', approved: 'success', rejected: 'error' }

export default function ModeratorDashboardPage() {
  const dispatch = useAppDispatch()
  const signals = useAppSelector(selectAllSignals)
  const signalLoading = useAppSelector(selectSignalLoading)
  const cours = useAppSelector(selectAllCours)

  useEffect(() => {
    dispatch(fetchSignals())
    dispatch(fetchCours())
  }, [dispatch])

  const pendingSignals = signals.filter((s) => s.status === 'pending').length
  const pendingCourses = cours.filter((c) => c.status === 'en_attente').length
  const treatedThisMonth = signals.filter((s) => s.status !== 'pending').length

  const recentSignals = signals.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Tableau de bord Modérateur</h1>
          <p className="text-sm text-surface-500 mt-1">Gérez les signalements et les validations de cours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Signalements en attente" value={pendingSignals} />
        <StatCard icon={<BookOpen className="w-5 h-5" />} label="Cours à valider" value={pendingCourses} />
        <StatCard icon={<CheckCircle className="w-5 h-5" />} label="Traités ce mois" value={treatedThisMonth} />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Signalements récents</h2>
          <Link to="/moderator/signals" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Voir tout <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {signalLoading ? (
          <p className="text-surface-400 text-sm">Chargement...</p>
        ) : recentSignals.length === 0 ? (
          <p className="text-surface-400 text-sm">Aucun signalement</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-3 px-3 font-medium text-surface-500">Cible</th>
                  <th className="text-left py-3 px-3 font-medium text-surface-500">Motif</th>
                  <th className="text-left py-3 px-3 font-medium text-surface-500">Date</th>
                  <th className="text-left py-3 px-3 font-medium text-surface-500">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentSignals.map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 hover:bg-surface-50 transition">
                    <td className="py-3 px-3 text-surface-900">{s.targetName}</td>
                    <td className="py-3 px-3 text-surface-600">{s.reason}</td>
                    <td className="py-3 px-3 text-surface-500">{s.date}</td>
                    <td className="py-3 px-3">
                      <Badge variant={statusVariants[s.status] || 'warning'}>{statusLabels[s.status] || s.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/moderator/signals">
          <Card className="p-5 hover:shadow-card-hover transition flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-warning-50 text-warning-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-surface-900">Voir les signalements</p>
              <p className="text-sm text-surface-500">Gérer les contenus signalés</p>
            </div>
          </Card>
        </Link>
        <Link to="/moderator/review">
          <Card className="p-5 hover:shadow-card-hover transition flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-surface-900">Examens en attente</p>
              <p className="text-sm text-surface-500">Valider les nouveaux cours</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
