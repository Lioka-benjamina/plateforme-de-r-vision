import { useEffect, useState } from 'react'
import { Plus, Eye, Edit, Trash2, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours, deleteCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import { selectUser } from '../../features/auth/authSelectors'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import ConfirmModal from '../../components/ui/ConfirmModal'
import type { Column } from '../../components/ui/Table'

const statusVariant: Record<string, 'default' | 'success' | 'warning'> = {
  brouillon: 'default',
  publié: 'success',
  en_attente: 'warning',
}

const statuses = ['tous', 'publié', 'en_attente', 'brouillon']

export default function CoursesPage() {
  const dispatch = useAppDispatch()
  const cours = useAppSelector(selectAllCours)
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectCoursLoading)
  const [activeTab, setActiveTab] = useState('tous')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchCours())
  }, [dispatch])

  const myCourses = cours.filter(
    (c) => c.professorId === user?.id || c.professor === `${user?.prenom} ${user?.nom}`
  )
  const filtered = activeTab === 'tous' ? myCourses : myCourses.filter((c) => c.status === activeTab)

  const columns: Column<(typeof myCourses)[0]>[] = [
    {
      key: 'titre',
      header: 'Titre',
      render: (c) => (
        <div>
          <p className="font-semibold text-surface-900">{c.titre}</p>
          <p className="text-xs text-surface-400">{c.category || 'N/A'}</p>
        </div>
      ),
    },
    {
      key: 'lessonCount',
      header: 'Leçons',
      render: (c) => <span className="text-surface-600">{c.lessonCount || 0}</span>,
    },
    {
      key: 'studentCount',
      header: 'Étudiants',
      render: (c) => <span className="text-surface-600">{c.studentCount || 0}</span>,
    },
    {
      key: 'status',
      header: 'Statut',
      render: (c) => <Badge variant={statusVariant[c.status || 'brouillon']}>{c.status || 'brouillon'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-1">
          <Link to={`/professor/courses/${c.id}`} className="p-2 text-surface-400 hover:text-primary-500 transition rounded-xl hover:bg-primary-50">
            <Eye size={18} />
          </Link>
          <Link to={`/professor/courses/${c.id}/lessons`} className="p-2 text-surface-400 hover:text-amber-600 transition rounded-xl hover:bg-amber-50">
            <BookOpen size={18} />
          </Link>
          <Link to={`/professor/courses/${c.id}/edit`} className="p-2 text-surface-400 hover:text-primary-500 transition rounded-xl hover:bg-primary-50">
            <Edit size={18} />
          </Link>
          <button onClick={() => setDeleteId(c.id)} className="p-2 text-surface-400 hover:text-error-500 transition rounded-xl hover:bg-error-50">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ]

  const deleteTarget = deleteId ? myCourses.find((c) => c.id === deleteId) : null

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Mes cours</h1>
        <Link to="/professor/courses/new"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all active:scale-[0.98] shadow-soft">
          <Plus size={18} /> Créer un cours
        </Link>
      </div>

      <Card>
        <div className="flex gap-1 mb-5">
          {statuses.map((s) => (
            <button key={s} onClick={() => setActiveTab(s)}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                activeTab === s ? 'bg-primary-50 text-primary-600 shadow-soft' : 'text-surface-500 hover:text-surface-700 hover:bg-surface-100'
              }`}>
              {s === 'tous' ? 'Tous' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={filtered} keyExtractor={(c) => c.id} emptyMessage="Aucun cours" />
        )}
      </Card>

      {deleteId && deleteTarget && (
        <ConfirmModal
          type="delete"
          title="Supprimer ce cours ?"
          message={`Êtes-vous sûr de vouloir supprimer « ${deleteTarget.titre} » ? Cette action est irréversible.`}
          onConfirm={() => dispatch(deleteCours(deleteId))}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
