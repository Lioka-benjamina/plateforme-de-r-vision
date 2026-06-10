import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, BookOpen, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import { fetchMatieres } from '../../features/matiere/matiereThunks'
import { selectAllMatieres } from '../../features/matiere/matiereSelectors'

const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé']

export default function CatalogPage() {
  const dispatch = useAppDispatch()
  const cours = useAppSelector(selectAllCours)
  const matieres = useAppSelector(selectAllMatieres)
  const loading = useAppSelector(selectCoursLoading)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Toutes')
  const [level, setLevel] = useState('Tous')

  useEffect(() => {
    dispatch(fetchCours('publié'))
    dispatch(fetchMatieres())
  }, [dispatch])

  const categories = ['Toutes', ...matieres.map((m) => m.nom)]

  const filtered = cours.filter((c) => {
    if (c.status && c.status !== 'publié') return false
    if (search && !c.titre.toLowerCase().includes(search.toLowerCase())) return false
    if (category !== 'Toutes' && c.category !== category) return false
    if (level !== 'Tous' && c.niveau !== level) return false
    return true
  })

  const hasActiveFilters = category !== 'Toutes' || level !== 'Tous' || search !== ''
  const clearFilters = () => { setCategory('Toutes'); setLevel('Tous'); setSearch('') }

  const pill = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border cursor-pointer whitespace-nowrap ${
      active
        ? 'bg-primary-600 text-white border-primary-600'
        : 'bg-white text-surface-500 border-surface-200 hover:border-primary-300 hover:text-primary-600'
    }`

  return (
    <div className="space-y-0 animate-fade-in">
      {/* ── Hero ── */}
      <section className=" bg-primary-600 px-10 py-14 md:px-16 md:py-20 mb-8 rounded-3xl">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold text-primary-200 uppercase tracking-widest mb-3">Bibliothèque de cours</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Trouvez le cours<br />qui vous correspond
          </h1>
          <p className="text-primary-200 mt-3 text-sm leading-relaxed">
            Explorez notre catalogue de formations et démarrez votre apprentissage à votre rythme.
          </p>
        </div>
      </section>

      {/* ── Search + Filter bar ── */}
      <div className="bg-white rounded-2xl border border-surface-100/80 shadow-card p-4 px-5 mb-6 mx-5">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-surface-50 rounded-2xl border border-surface-200 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter rows */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-surface-400 uppercase tracking-wide w-16 flex-shrink-0">Matière</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={pill(category === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-surface-400 uppercase tracking-wide w-16 flex-shrink-0">Niveau</span>
            <div className="flex flex-wrap gap-1.5">
              {levels.map((lvl) => (
                <button key={lvl} onClick={() => setLevel(lvl)} className={pill(level === lvl)}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results header ── */}
      <div className="flex items-center justify-between mb-4 px-10">
        <p className="text-sm text-surface-500">
          {loading ? 'Chargement...' : (
            <><span className="font-semibold text-surface-900">{filtered.length}</span> cours trouvé{filtered.length !== 1 ? 's' : ''}</>
          )}
        </p>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors">
            <X className="w-3.5 h-3.5" /> Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-surface-100/80 shadow-card overflow-hidden animate-pulse">
              <div className="h-36 bg-surface-100" />
              <div className="p-5 space-y-2.5">
                <div className="h-4 bg-surface-100 rounded-full w-3/4" />
                <div className="h-3 bg-surface-100 rounded-full w-1/3" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-5 w-16 bg-surface-100 rounded-full" />
                  <div className="h-5 w-16 bg-surface-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-surface-400">
          <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-surface-300" />
          </div>
          <p className="text-sm font-medium text-surface-600 mb-1">Aucun cours trouvé</p>
          <p className="text-xs text-surface-400">Essayez de modifier vos filtres</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-15">
  {filtered.map((course) => (
    <Link key={course.id} to={`/cours/${course.id}`} className="group">
      <div className="bg-white rounded-3xl overflow-hidden border border-surface-100/80 shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">

        {/* Cover */}
        <div className={`relative h-40 ${!course.imageUrl ? (course.color || 'bg-primary-600') : ''} flex items-end p-4`}>
          {course.imageUrl ? (
            <img src={`http://localhost:3000${course.imageUrl}`} alt={course.titre}
              className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="absolute top-2 right-3 text-[80px] font-black text-white/10 leading-none select-none pointer-events-none">
              {course.titre[0]}
            </span>
          )}
          {/* category badge on image */}
          {course.category && (
            <span className="relative z-10 text-[11px] font-semibold bg-black/20 text-white backdrop-blur-sm px-2.5 py-1 rounded-full">
              {course.category}
            </span>
          )}
          {/* free badge */}
          {(course.prix === null || course.prix === undefined) && (
            <span className="absolute top-3 right-3 text-[11px] font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-sm">
              Gratuit
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-surface-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
            {course.titre}
          </h3>
          <p className="text-xs text-surface-400 mb-4">{course.professor || 'Professeur'}</p>

          {/* footer */}
          <div className="flex items-center justify-between mt-auto">
            <span className="flex items-center gap-1.5 text-surface-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{course.duree || 'N/A'}</span>
            </span>
            {course.niveau && (
              <span className="text-[11px] font-semibold text-surface-500 bg-surface-50 border border-surface-100 px-2.5 py-1 rounded-full">
                {course.niveau}
              </span>
            )}
            {course.prix !== null && course.prix !== undefined && (
              <span className="text-sm font-bold text-primary-600">
                {course.prix.toLocaleString()} Ar
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  ))}
</div>
      )}
    </div>
  )
}
