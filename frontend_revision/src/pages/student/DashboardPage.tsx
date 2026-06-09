import { useEffect } from 'react'
import { BookOpen, ClipboardList, Award, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMyEnrollments } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments, selectEnrollmentLoading } from '../../features/enrollment/enrollmentSelectors'
import { fetchResults } from '../../features/quiz/quizThunks'
import { selectResults } from '../../features/quiz/quizSelectors'
import { selectUser } from '../../features/auth/authSelectors'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function StudentDashboardPage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const enrollments = useAppSelector(selectMyEnrollments)
  const enrollLoading = useAppSelector(selectEnrollmentLoading)
  const results = useAppSelector(selectResults)

  useEffect(() => {
    dispatch(fetchMyEnrollments())
    dispatch(fetchResults())
  }, [dispatch])

  const completedCourses = enrollments.filter((e) => e.progress >= 100)
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Tableau de bord Étudiant</h1>
        <p className="text-surface-500 mt-1">Bonjour, {user?.prenom || 'Étudiant'}. Continuez à apprendre !</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen size={22} />} label="Cours suivis" value={enrollments.length} />
        <StatCard icon={<ClipboardList size={22} />} label="Quiz réalisés" value={results.length} />
        <StatCard icon={<Award size={22} />} label="Certificats" value={completedCourses.length} />
        <StatCard icon={<TrendingUp size={22} />} label="Progression" value={`${avgProgress}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Mes cours en cours</h2>
            <Link to="/student/courses" className="text-sm text-primary-500 hover:text-primary-700 flex items-center gap-1">
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>
          {enrollLoading ? (
            <p className="text-surface-400 text-sm">Chargement...</p>
          ) : enrollments.length === 0 ? (
            <p className="text-surface-400 text-sm">Aucun cours pour le moment</p>
          ) : (
            <div className="space-y-4">
              {enrollments.slice(0, 3).map((e) => (
                <div key={e.id} className="p-3 rounded-lg border border-surface-100 hover:border-primary-200 hover:shadow-card-hover transition">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-surface-900">{e.coursTitre}</p>
                      <p className="text-xs text-surface-400">{e.professor} · {e.category || 'N/A'}</p>
                    </div>
                    <Badge variant="info">{e.progress}%</Badge>
                  </div>
                  <div className="w-full bg-surface-100 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${e.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Résultats récents</h2>
            <Link to="/student/results" className="text-sm text-primary-500 hover:text-primary-700 flex items-center gap-1">
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>
          {results.length === 0 ? (
            <p className="text-surface-400 text-sm">Aucun résultat</p>
          ) : (
            <div className="space-y-2">
              {results.slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                  <div>
                    <p className="text-sm text-surface-700 font-medium">{r.quizTitre}</p>
                    <p className="text-xs text-surface-400">{r.date ? new Date(r.date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <span className={`text-sm font-semibold ${r.score >= r.total * 0.6 ? 'text-success-500' : 'text-error-500'}`}>
                    {r.score}/{r.total}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
