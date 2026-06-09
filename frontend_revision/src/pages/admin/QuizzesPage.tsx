import { useEffect, useState } from 'react'
import { ClipboardList, Search, Eye, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchQuizzes, deleteQuiz } from '../../features/quiz/quizThunks'
import { selectAllQuizzes, selectQuizLoading } from '../../features/quiz/quizSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

export default function QuizzesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const quizzes = useAppSelector(selectAllQuizzes)
  const loading = useAppSelector(selectQuizLoading)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const filtered = quizzes.filter((q) =>
    q.titre.toLowerCase().includes(search.toLowerCase())
  )

  const columns: Column<(typeof quizzes)[0]>[] = [
    { key: 'titre', header: 'Titre', render: (q) => <span className="font-medium text-surface-900">{q.titre}</span> },
    {
      key: 'coursId',
      header: 'Questions',
      render: () => <Badge>10</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (q) => (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/professor/quizzes/${q.id}`)} className="text-primary-500 hover:text-primary-700 transition p-1" title="Voir"><Eye size={16} /></button>
          <button onClick={() => { if (confirm('Supprimer ce quiz ?')) dispatch(deleteQuiz(q.id as any)) }} className="text-error-500 hover:text-error-700 transition p-1" title="Supprimer"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Gestion des quiz</h1>
          <p className="text-surface-500 mt-1">{quizzes.length} quiz disponibles</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          <ClipboardList size={22} />
        </div>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input type="text" placeholder="Rechercher un quiz..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={filtered} keyExtractor={(q) => q.id} emptyMessage="Aucun quiz trouvé" />
        )}
      </Card>
    </div>
  )
}
