import { useEffect, useState } from 'react'
import { BookOpen, Play, Search, Sparkles, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMyEnrollments } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments, selectEnrollmentLoading } from '../../features/enrollment/enrollmentSelectors'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import { fetchMatieres } from '../../features/matiere/matiereThunks'
import { selectAllMatieres } from '../../features/matiere/matiereSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function MyCoursesPage() {
  const dispatch = useAppDispatch()
  const enrollments = useAppSelector(selectMyEnrollments)
  const loading = useAppSelector(selectEnrollmentLoading)
  const allCours = useAppSelector(selectAllCours)
  const matieres = useAppSelector(selectAllMatieres)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchMyEnrollments())
    dispatch(fetchCours('publié'))
    dispatch(fetchMatieres())
  }, [dispatch])

  const filtered = enrollments.filter(
    (e) =>
      e.coursTitre.toLowerCase().includes(search.toLowerCase()) ||
      e.professor.toLowerCase().includes(search.toLowerCase())
  )

  const enrolledIds = new Set(enrollments.map((e) => String(e.coursId)))
  const suggestions = allCours
    .filter((c) => !enrolledIds.has(String(c.id)))
    .slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900">Mes cours</h1>
        <div className="relative w-full max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input type="text" placeholder="Rechercher un cours..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-200 rounded-lg bg-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition" />
        </div>
      </div>

      {/* Enrolled courses */}
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

      {/* Suggestions */}
      {!loading && suggestions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-surface-900">Cours suggérés</h2>
            </div>
            <Link to="/catalog" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((c) => (
              <Link key={c.id} to={`/cours/${c.id}`} className="group">
                <div className="bg-white rounded-xl border border-surface-100 overflow-hidden hover:border-surface-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200 h-full flex flex-col">
                  <div className={`relative h-28 ${!c.imageUrl ? 'bg-primary-600' : ''} flex items-end p-3`}>
                    {c.imageUrl ? (
                      <img src={`http://localhost:3000${c.imageUrl}`} alt={c.titre}
                        className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="absolute top-2 right-3 text-[60px] font-black text-white/10 leading-none select-none pointer-events-none">
                        {c.titre[0]}
                      </span>
                    )}
                    {c.category && (
                      <span className="relative z-10 text-[10px] font-semibold bg-black/20 text-white backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {c.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-surface-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
                      {c.titre}
                    </h3>
                    <p className="text-xs text-surface-400 mb-3">{c.professor || 'Professeur'}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-surface-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-[11px]">{c.duree || 'N/A'}</span>
                      </span>
                      {c.niveau && (
                        <span className="text-[10px] font-semibold text-surface-500 bg-surface-50 border border-surface-100 px-2 py-0.5 rounded-full">
                          {c.niveau}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
