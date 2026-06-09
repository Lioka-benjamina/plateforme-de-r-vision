import { useEffect } from 'react'
import { FileText, Video, Image, Plus, Edit, Trash2, GripVertical } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchLessons, deleteLesson } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import type { Column } from '../../components/ui/Table'

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: FileText, image: Image, text: FileText }
const typeLabels: Record<string, string> = { video: 'Vidéo', pdf: 'PDF', image: 'Image', text: 'Texte' }

export default function LessonsPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const dispatch = useAppDispatch()
  const lessons = useAppSelector(selectAllLessons)
  const loading = useAppSelector(selectLessonLoading)
  const cours = useAppSelector(selectAllCours)
  const courseName = cours.find((c) => c.id === Number(courseId))?.titre || 'Cours'

  useEffect(() => {
    if (courseId) dispatch(fetchLessons(Number(courseId)))
    dispatch(fetchCours())
  }, [dispatch, courseId])

  const columns: Column<(typeof lessons)[0]>[] = [
    {
      key: 'ordre',
      header: 'Ordre',
      render: (l) => (
        <div className="flex items-center gap-2">
          <GripVertical size={16} className="text-surface-300" />
          <span className="text-surface-600">{l.ordre}</span>
        </div>
      ),
    },
    {
      key: 'titre',
      header: 'Titre',
      render: (l) => <span className="font-medium text-surface-900">{l.titre}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      render: (l) => {
        const Icon = typeIcons[l.type] || FileText
        return (
          <Badge variant="default">
            <span className="flex items-center gap-1"><Icon size={14} /> {typeLabels[l.type] || l.type}</span>
          </Badge>
        )
      },
    },
    {
      key: 'duree',
      header: 'Durée',
      render: (l) => <span className="text-surface-600">{l.duree || 'N/A'}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (l) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50"><Edit size={18} /></button>
          <button onClick={() => dispatch(deleteLesson(l.id))} className="p-1.5 text-surface-400 hover:text-error-500 transition rounded-lg hover:bg-error-50"><Trash2 size={18} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-surface-400">
        <Link to="/professor/courses" className="hover:text-primary-500 transition">Cours</Link>
        <span>/</span>
        <Link to={`/professor/courses/${courseId}`} className="hover:text-primary-500 transition">{courseName}</Link>
        <span>/</span>
        <span className="text-surface-600 font-medium">Leçons</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900">Gestion des leçons</h1>
        <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={18} /> Ajouter une leçon
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={lessons} keyExtractor={(l) => l.id} emptyMessage="Aucune leçon" />
        )}
      </Card>
    </div>
  )
}
