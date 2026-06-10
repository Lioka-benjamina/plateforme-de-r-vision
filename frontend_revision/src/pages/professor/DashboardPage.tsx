import { useEffect } from 'react'
import { BookOpen, Users, ClipboardList, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import { selectUser } from '../../features/auth/authSelectors'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function ProfessorDashboardPage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const cours = useAppSelector(selectAllCours)
  const loading = useAppSelector(selectCoursLoading)

  useEffect(() => {
    dispatch(fetchCours())
  }, [dispatch])

  const myCourses = cours.filter((c) => c.professorId === user?.id || c.professor === `${user?.prenom} ${user?.nom}`)
  const totalStudents = myCourses.reduce((sum, c) => sum + (c.studentCount || 0), 0)
  const publishedCount = myCourses.filter((c) => c.status === 'publié').length

  const recentActivity = [
    { action: 'Cours mis à jour', target: 'Mathématiques avancées', time: 'Il y a 2h' },
    { action: 'Nouvelle leçon ajoutée', target: 'Physique quantique', time: 'Il y a 1j' },
    { action: 'Quiz créé', target: 'Quiz Algèbre linéaire', time: 'Il y a 3j' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Tableau de bord Professeur</h1>
        <p className="text-surface-500 mt-1">Bonjour, {user?.prenom || 'Professeur'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<BookOpen size={22} />} label="Mes cours" value={myCourses.length} />
        <StatCard icon={<Users size={22} />} label="Étudiants" value={totalStudents} />
        <StatCard icon={<ClipboardList size={22} />} label="Publiés" value={publishedCount} />
        <StatCard icon={<TrendingUp size={22} />} label="Taux de complétion" value="73%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-surface-900">Mes cours</h2>
            <Link to="/professor/courses" className="text-sm text-primary-500 hover:text-primary-700 flex items-center gap-1 font-medium">
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <p className="text-surface-400 text-sm">Chargement...</p>
          ) : myCourses.length === 0 ? (
            <p className="text-surface-400 text-sm">Aucun cours pour le moment</p>
          ) : (
            <div className="space-y-2">
              {myCourses.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-surface-50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{c.titre}</p>
                    <p className="text-xs text-surface-400">{c.lessonCount || 0} leçons · {c.studentCount || 0} étudiants</p>
                  </div>
                  <Badge variant={c.status === 'publié' ? 'success' : c.status === 'en_attente' ? 'warning' : 'default'}>
                    {c.status || 'brouillon'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-surface-900 mb-5">Activité récente</h2>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-surface-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-surface-700">{a.action} : <span className="font-semibold">{a.target}</span></p>
                  <p className="text-xs text-surface-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
