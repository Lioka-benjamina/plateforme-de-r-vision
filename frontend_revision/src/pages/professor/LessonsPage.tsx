import { useEffect, useState } from 'react'
import {
  FileText, Video, Plus, Edit, Trash2, GripVertical,
  X, Upload, FileUp,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchLessons, deleteLesson, createLesson, uploadFile } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ConfirmModal from '../../components/ui/ConfirmModal'

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: FileText, text: FileText, exercice: FileText }
const typeLabels: Record<string, string> = { video: 'Vidéo', pdf: 'PDF', text: 'Texte', exercice: 'Exercice' }

export default function LessonsPage() {
  const { id: courseId } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const lessons = useAppSelector(selectAllLessons)
  const loading = useAppSelector(selectLessonLoading)
  const cours = useAppSelector(selectAllCours)
  const courseName = cours.find((c) => String(c.id) === courseId)?.titre || 'Cours'

  const [showModal, setShowModal] = useState(false)
  const [titre, setTitre] = useState('')
  const [type, setType] = useState('text')
  const [duree, setDuree] = useState('')
  const [contenu, setContenu] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const detectVideoDuration = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        const total = video.duration
        const min = Math.floor(total / 60)
        const sec = Math.floor(total % 60)
        resolve(`${min} min ${sec} s`)
      }
      video.onerror = () => resolve('')
      video.src = url
    })
  }

  useEffect(() => {
    if (courseId) dispatch(fetchLessons({ coursId: courseId }))
    dispatch(fetchCours())
  }, [dispatch, courseId])

  const resetForm = () => {
    setTitre(''); setType('text'); setDuree(''); setContenu(''); setFile(null); setShowModal(false)
  }

  const handleSubmit = async () => {
    if (!titre || !courseId) return
    let fileUrl = contenu
    let videoDuree = type === 'video' ? duree : undefined

    if (file) {
      setUploading(true)
      const result = await dispatch(uploadFile(file))
      if (uploadFile.fulfilled.match(result)) {
        fileUrl = result.payload.url
      }
      if (type === 'video') {
        videoDuree = await detectVideoDuration(file)
      }
      setUploading(false)
    }

    await dispatch(createLesson({
      titre,
      type,
      contenu: fileUrl,
      duree: videoDuree,
      coursId: courseId,
    }))
    resetForm()
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

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
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={18} /> Ajouter une leçon
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12 text-surface-400">Aucune leçon. Cliquez sur "Ajouter une leçon" pour commencer.</div>
        ) : (
          <div className="divide-y divide-surface-100">
            {lessons.map((lesson) => {
              const Icon = typeIcons[lesson.type] || FileText
              return (
                <div key={lesson.id} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-50/50 transition">
                  <GripVertical size={16} className="text-surface-300 shrink-0" />
                  <span className="w-6 text-xs text-surface-400 font-medium text-center">{lesson.ordre}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 truncate">{lesson.titre}</p>
                  </div>
                  <Badge variant={lesson.status === 'publié' ? 'success' : lesson.status === 'rejeté' ? 'error' : 'warning'}>
                    {lesson.status || 'en_attente'}
                  </Badge>
                  <Badge variant="default">
                    <span className="flex items-center gap-1"><Icon size={14} /> {typeLabels[lesson.type] || lesson.type}</span>
                  </Badge>
                  <span className="text-xs text-surface-400 w-16 text-right">{lesson.duree || '-'}</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(lesson.id)}
                      className="p-1.5 text-surface-400 hover:text-error-500 transition rounded-lg hover:bg-error-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => resetForm()}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">Nouvelle leçon</h2>
              <button onClick={() => resetForm()} className="p-1 hover:bg-surface-100 rounded-lg transition">
                <X size={20} className="text-surface-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Titre</label>
                <input value={titre} onChange={(e) => setTitre(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
              </div>

              <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 bg-white">
                    <option value="text">Texte</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Vidéo</option>
                    <option value="exercice">Exercice</option>
                  </select>
                </div>

              {(type === 'pdf' || type === 'video') ? (
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Fichier</label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-surface-300 rounded-lg p-6 cursor-pointer hover:border-primary-400 transition">
                    <Upload size={24} className="text-surface-400 mb-2" />
                    <p className="text-sm text-surface-500">{file ? file.name : 'Cliquez pour uploader un fichier'}</p>
                    <p className="text-xs text-surface-400 mt-1">
                      {type === 'video' ? 'MP4, WebM' : 'PDF'} — max 100 Mo
                    </p>
                    <input type="file"
                      accept={type === 'video' ? 'video/mp4,video/webm' : 'application/pdf'}
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden" />
                  </label>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Contenu</label>
                  <textarea value={contenu} onChange={(e) => setContenu(e.target.value)} rows={5}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 resize-vertical" />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={handleSubmit} disabled={!titre || uploading}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition disabled:opacity-60">
                  {uploading ? 'Upload...' : <FileUp size={16} />}
                  {uploading ? 'En cours...' : 'Ajouter'}
                </button>
                <button onClick={() => resetForm()}
                  className="inline-flex items-center gap-2 bg-surface-100 text-surface-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-200 transition">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          type="delete"
          title="Supprimer cette leçon ?"
          message="Êtes-vous sûr de vouloir supprimer cette leçon ? Cette action est irréversible."
          onConfirm={() => dispatch(deleteLesson(deleteId))}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
