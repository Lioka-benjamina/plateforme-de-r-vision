import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, BookOpen, CheckCircle, ArrowUpRight, FileText, ClipboardList } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchSignals } from '../../features/signal/signalThunks'
import { selectAllSignals, selectSignalLoading } from '../../features/signal/signalSelectors'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import { fetchLessons } from '../../features/lesson/lessonThunks'
import { selectAllLessons } from '../../features/lesson/lessonSelectors'
import { fetchQuizzes } from '../../features/quiz/quizThunks'
import { selectAllQuizzes } from '../../features/quiz/quizSelectors'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const statusLabels: Record<string, string> = { pending: 'En attente', approved: 'Approuvé', rejected: 'Rejeté', escalated: 'Escaladé' }
const statusVariants: Record<string, 'warning' | 'success' | 'error'> = { pending: 'warning', approved: 'success', rejected: 'error', escalated: 'warning' }

export default function ModeratorDashboardPage() {
  const dispatch = useAppDispatch()
  const signals = useAppSelector(selectAllSignals)
  const signalLoading = useAppSelector(selectSignalLoading)
  const cours = useAppSelector(selectAllCours)
  const lessons = useAppSelector(selectAllLessons)
  const quizzes = useAppSelector(selectAllQuizzes)

  useEffect(() => {
    dispatch(fetchSignals())
    dispatch(fetchCours())
    dispatch(fetchLessons({}))
    dispatch(fetchQuizzes())
  }, [dispatch])

  const pendingSignals = signals.filter((s) => s.status === 'pending').length
  const pendingCourses = cours.filter((c) => c.status === 'en_attente').length
  const pendingLessons = lessons.filter((l) => l.status === 'en_attente').length
  const pendingQuizzes = quizzes.filter((q) => q.status === 'en_attente').length
  const totalPending = pendingCourses + pendingLessons + pendingQuizzes
  const treatedThisMonth = signals.filter((s) => s.status !== 'pending').length

  const recentSignals = signals.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Tableau de bord Modérateur</h1>
          <p className="text-sm text-surface-500 mt-1">Gérez les signalements et les validations de contenu.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Signalements en attente" value={pendingSignals} />
        <StatCard icon={<BookOpen className="w-5 h-5" />} label="Cours à valider" value={pendingCourses} />
        <StatCard icon={<FileText className="w-5 h-5" />} label="Leçons à valider" value={pendingLessons} />
        <StatCard icon={<ClipboardList className="w-5 h-5" />} label="Quiz à valider" value={pendingQuizzes} />
      </div>

      {totalPending > 0 && (
        <Card className="border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {totalPending} élément{totalPending > 1 ? 's' : ''} en attente d'approbation
              </p>
              <p className="text-xs text-amber-600">
                {pendingCourses} cours, {pendingLessons} leçons, {pendingQuizzes} quiz
              </p>
            </div>
            <Link to="/moderator/review" className="ml-auto text-sm font-medium text-amber-700 hover:text-amber-800 underline">
              Traiter
            </Link>
          </div>
        </Card>
      )}

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/moderator/signals">
          <Card className="p-5 hover:shadow-card-hover transition flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-warning-50 text-warning-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-surface-900">Signalements</p>
              <p className="text-sm text-surface-500">{pendingSignals} en attente</p>
            </div>
          </Card>
        </Link>
        <Link to="/moderator/review">
          <Card className="p-5 hover:shadow-card-hover transition flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-surface-900">Cours à valider</p>
              <p className="text-sm text-surface-500">{pendingCourses} en attente</p>
            </div>
          </Card>
        </Link>
        <Link to="/moderator/review">
          <Card className="p-5 hover:shadow-card-hover transition flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-surface-900">Leçons & Quiz</p>
              <p className="text-sm text-surface-500">{pendingLessons + pendingQuizzes} en attente</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
