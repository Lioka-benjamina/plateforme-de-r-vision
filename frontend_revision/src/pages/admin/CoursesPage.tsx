import { useEffect, useState } from 'react'
import { Eye, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours, approveCours, rejectCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import { useToast } from '../../components/ui/Toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

const statusVariant: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
  brouillon: 'default',
  en_attente: 'warning',
  publié: 'success',
  rejeté: 'error',
}

export default function CoursesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const cours = useAppSelector(selectAllCours)
  const loading = useAppSelector(selectCoursLoading)
  const [activeTab, setActiveTab] = useState('tous')

  useEffect(() => {
    dispatch(fetchCours())
  }, [dispatch])

  const tabs = ['tous', 'en_attente', 'publié', 'brouillon', 'rejeté']
  const filtered = activeTab === 'tous' ? cours : cours.filter((c) => c.status === activeTab)

  const handleValidate = (id: number) => {
    dispatch(approveCours(id)).then((result) => {
      if (approveCours.fulfilled.match(result)) showToast('Cours approuvé avec succès', 'success')
      else showToast("Erreur lors de l'approbation", 'error')
    })
  }

  const handleReject = (id: number) => {
    dispatch(rejectCours(id)).then((result) => {
      if (rejectCours.fulfilled.match(result)) showToast('Cours rejeté', 'warning')
      else showToast('Erreur lors du rejet', 'error')
    })
  }

  const columns: Column<(typeof cours)[0]>[] = [
    {
      key: 'titre',
      header: 'Titre',
      render: (c) => (
        <div>
          <p className="font-semibold text-surface-900">{c.titre}</p>
          <p className="text-xs text-surface-400">{c.category || c.professor || 'N/A'}</p>
        </div>
      ),
    },
    { key: 'professor', header: 'Professeur', render: (c) => <span className="text-surface-600">{c.professor || 'N/A'}</span> },
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
          <button onClick={() => navigate(`/admin/courses/${c.id}`)} className="p-2 text-surface-400 hover:text-primary-500 transition rounded-xl hover:bg-primary-50" title="Voir">
            <Eye size={16} />
          </button>
          {c.status === 'en_attente' && (
            <>
              <button onClick={() => handleValidate(c.id)} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Valider">
                <Check size={16} />
              </button>
              <button onClick={() => handleReject(c.id)} className="p-2 text-error-500 hover:bg-error-50 transition rounded-xl" title="Rejeter">
                <X size={16} />
              </button>
            </>
          )}
          {c.status === 'rejeté' && (
            <button onClick={() => handleValidate(c.id)} className="p-2 text-success-500 hover:bg-success-50 transition rounded-xl" title="Réapprouver">
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
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Gestion des cours</h1>
        <p className="text-surface-500 mt-1">{cours.length} cours sur la plateforme</p>
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
          <Table columns={columns} data={filtered} keyExtractor={(c) => c.id} emptyMessage="Aucun cours" />
        )}
      </Card>
    </div>
  )
}
