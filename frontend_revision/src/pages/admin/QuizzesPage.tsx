import { useEffect, useState } from 'react'
import { ClipboardList, Search, Eye, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchQuizzes, approveQuiz, rejectQuiz } from '../../features/quiz/quizThunks'
import { selectAllQuizzes, selectQuizLoading } from '../../features/quiz/quizSelectors'
import { useToast } from '../../components/ui/Toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

export default function QuizzesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const quizzes = useAppSelector(selectAllQuizzes)
  const loading = useAppSelector(selectQuizLoading)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('tous')

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const tabs = ['tous', 'en_attente', 'publié', 'rejeté']
  const filtered = (activeTab === 'tous' ? quizzes : quizzes.filter((q) => q.status === activeTab))
    .filter((q) => q.titre.toLowerCase().includes(search.toLowerCase()))

  const columns: Column<(typeof quizzes)[0]>[] = [
    { key: 'titre', header: 'Titre', render: (q) => <span className="font-semibold text-surface-900">{q.titre}</span> },
    {
      key: 'status',
      header: 'Statut',
      render: (q) => (
        <Badge variant={q.status === 'publié' ? 'success' : q.status === 'rejeté' ? 'error' : 'warning'}>
          {q.status || 'en_attente'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (q) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/professor/quizzes/${q.id}`)} className="p-2 text-primary-500 hover:text-primary-700 transition rounded-xl hover:bg-primary-50" title="Voir"><Eye size={16} /></button>
          {q.status === 'en_attente' && (
            <>
              <button onClick={() => dispatch(approveQuiz(q.id as any)).then((result) => {
                if (approveQuiz.fulfilled.match(result)) showToast('Quiz approuvé', 'success')
                else showToast("Erreur d'approbation", 'error')
              })} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Valider"><Check size={16} /></button>
              <button onClick={() => dispatch(rejectQuiz(q.id as any)).then((result) => {
                if (rejectQuiz.fulfilled.match(result)) showToast('Quiz rejeté', 'warning')
                else showToast('Erreur de rejet', 'error')
              })} className="p-2 text-error-500 hover:bg-error-50 transition rounded-xl" title="Rejeter"><X size={16} /></button>
            </>
          )}
          {q.status === 'rejeté' && (
            <button onClick={() => dispatch(approveQuiz(q.id as any)).then((result) => {
              if (approveQuiz.fulfilled.match(result)) showToast('Quiz réapprouvé', 'success')
              else showToast("Erreur d'approbation", 'error')
            })} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Réapprouver"><Check size={16} /></button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Gestion des quiz</h1>
          <p className="text-surface-500 mt-1">{quizzes.length} quiz disponibles</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
          <ClipboardList size={22} />
        </div>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input type="text" placeholder="Rechercher un quiz..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
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
          <Table columns={columns} data={filtered} keyExtractor={(q) => q.id} emptyMessage="Aucun quiz trouvé" />
        )}
      </Card>
    </div>
  )
}
