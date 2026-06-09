import { useEffect, useState } from 'react'
import { BookOpen, Play, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMyEnrollments } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments, selectEnrollmentLoading } from '../../features/enrollment/enrollmentSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function MyCoursesPage() {
  const dispatch = useAppDispatch()
  const enrollments = useAppSelector(selectMyEnrollments)
  const loading = useAppSelector(selectEnrollmentLoading)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchMyEnrollments())
  }, [dispatch])

  const filtered = enrollments.filter(
    (e) =>
      e.coursTitre.toLowerCase().includes(search.toLowerCase()) ||
      e.professor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900">Mes cours</h1>
        <div className="relative w-full max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input type="text" placeholder="Rechercher un cours..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-200 rounded-lg bg-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-surface-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-surface-400 text-sm">
          {search ? 'Aucun cours trouvé' : 'Vous n\'êtes inscrit à aucun cours'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <Card key={e.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  {e.category && <Badge variant="info">{e.category}</Badge>}
                </div>
                <h3 className="font-semibold text-surface-900 mb-1">{e.coursTitre}</h3>
                <p className="text-xs text-surface-400 mb-3">{e.professor}</p>
                <div className="w-full bg-surface-100 rounded-full h-2 mb-1">
                  <div className={`h-2 rounded-full transition-all ${
                    e.progress >= 80 ? 'bg-success-500' : e.progress >= 40 ? 'bg-primary-500' : 'bg-warning-500'
                  }`} style={{ width: `${e.progress}%` }} />
                </div>
                <p className="text-xs text-surface-400 mb-4">{e.progress}% complété</p>
              </div>
              <Link to={`/student/courses/${e.coursId}`}
                className="inline-flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
                <Play size={16} /> Commencer
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
