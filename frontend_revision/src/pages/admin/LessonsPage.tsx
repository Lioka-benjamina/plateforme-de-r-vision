import { useEffect, useState } from 'react'
import { Check, X, FileText, Video } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchLessons, approveLesson, rejectLesson } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { useToast } from '../../components/ui/Toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

export default function LessonsPage() {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const lessons = useAppSelector(selectAllLessons)
  const loading = useAppSelector(selectLessonLoading)
  const [activeTab, setActiveTab] = useState('tous')

  useEffect(() => {
    dispatch(fetchLessons({}))
  }, [dispatch])

  const tabs = ['tous', 'en_attente', 'publié', 'rejeté']
  const filtered = activeTab === 'tous' ? lessons : lessons.filter((l) => l.status === activeTab)

  const typeIcons: Record<string, typeof FileText> = { video: Video, pdf: FileText, text: FileText, exercice: FileText }
  const typeLabels: Record<string, string> = { video: 'Vidéo', pdf: 'PDF', text: 'Texte', exercice: 'Exercice' }

  const columns: Column<(typeof lessons)[0]>[] = [
    {
      key: 'titre',
      header: 'Titre',
      render: (l) => (
        <div>
          <p className="font-semibold text-surface-900">{l.titre}</p>
          <p className="text-xs text-surface-400">Cours #{l.cours_id?.slice(0, 8)}...</p>
        </div>
      ),
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
      key: 'status',
      header: 'Statut',
      render: (l) => (
        <Badge variant={l.status === 'publié' ? 'success' : l.status === 'rejeté' ? 'error' : 'warning'}>
          {l.status || 'en_attente'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (l) => (
        <div className="flex items-center gap-1">
          {l.status === 'en_attente' && (
            <>
              <button onClick={() => dispatch(approveLesson(l.id)).then((result) => {
                if (approveLesson.fulfilled.match(result)) showToast('Leçon approuvée', 'success')
                else showToast("Erreur d'approbation", 'error')
              })} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Valider">
                <Check size={16} />
              </button>
              <button onClick={() => dispatch(rejectLesson(l.id)).then((result) => {
                if (rejectLesson.fulfilled.match(result)) showToast('Leçon rejetée', 'warning')
                else showToast('Erreur de rejet', 'error')
              })} className="p-2 text-error-500 hover:bg-error-50 transition rounded-xl" title="Rejeter">
                <X size={16} />
              </button>
            </>
          )}
          {l.status === 'rejeté' && (
            <button onClick={() => dispatch(approveLesson(l.id)).then((result) => {
              if (approveLesson.fulfilled.match(result)) showToast('Leçon réapprouvée', 'success')
              else showToast("Erreur d'approbation", 'error')
            })} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Réapprouver">
              <Check size={16} />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Gestion des leçons</h1>
        <p className="text-surface-500 mt-1">{lessons.length} leçons sur la plateforme</p>
      </div>

      <Card>
        <div className="flex gap-1 mb-5 flex-wrap">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                activeTab === t ? 'bg-primary-50 text-primary-600 shadow-soft' : 'text-surface-500 hover:text-surface-700 hover:bg-surface-100'
              }`}>
              {t === 'tous' ? 'Tous' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={filtered} keyExtractor={(l) => l.id} emptyMessage="Aucune leçon" />
        )}
      </Card>
    </div>
  )
}
