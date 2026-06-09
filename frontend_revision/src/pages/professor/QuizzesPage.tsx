import { useEffect } from 'react'
import { Plus, Eye, Edit, Trash2, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchQuizzes, deleteQuiz } from '../../features/quiz/quizThunks'
import { selectAllQuizzes, selectQuizLoading } from '../../features/quiz/quizSelectors'
import Table from '../../components/ui/Table'
import Card from '../../components/ui/Card'
import type { Column } from '../../components/ui/Table'

export default function QuizzesPage() {
  const dispatch = useAppDispatch()
  const quizzes = useAppSelector(selectAllQuizzes)
  const loading = useAppSelector(selectQuizLoading)

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const columns: Column<(typeof quizzes)[0]>[] = [
    {
      key: 'titre',
      header: 'Titre',
      render: (q) => (
        <div>
          <p className="font-medium text-surface-900">{q.titre}</p>
          <p className="text-xs text-surface-400">Cours #{q.coursId}</p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (q) => (
        <div className="flex items-center gap-2">
          <Link to={`/professor/quizzes/${q.id}`} className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50"><Eye size={18} /></Link>
          <Link to={`/professor/quizzes/${q.id}/edit`} className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50"><Edit size={18} /></Link>
          <button onClick={() => { if (confirm('Supprimer ce quiz ?')) dispatch(deleteQuiz(q.id as any)) }} className="p-1.5 text-surface-400 hover:text-error-500 transition rounded-lg hover:bg-error-50"><Trash2 size={18} /></button>
          <Link to={`/professor/quizzes/${q.id}/stats`} className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50"><BarChart3 size={18} /></Link>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900">Mes quiz</h1>
        <Link to="/professor/quizzes/new" className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={18} /> Créer un quiz
        </Link>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={quizzes} keyExtractor={(q) => q.id} emptyMessage="Aucun quiz" />
        )}
      </Card>
    </div>
  )
}
