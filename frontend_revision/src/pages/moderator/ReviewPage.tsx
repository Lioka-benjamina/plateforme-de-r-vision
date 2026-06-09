import { useEffect } from 'react'
import { Check, X, Eye } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours, updateCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

export default function ReviewPage() {
  const dispatch = useAppDispatch()
  const cours = useAppSelector(selectAllCours)
  const loading = useAppSelector(selectCoursLoading)

  useEffect(() => {
    dispatch(fetchCours())
  }, [dispatch])

  const pending = cours.filter((c) => c.status === 'en_attente')

  const handleApprove = (id: number) => dispatch(updateCours({ id, status: 'publié' }))
  const handleReject = (id: number) => dispatch(updateCours({ id, status: 'rejeté' }))

  const columns: Column<(typeof pending)[0]>[] = [
    {
      key: 'titre',
      header: 'Titre',
      render: (c) => (
        <div>
          <p className="font-medium text-surface-900">{c.titre}</p>
          <p className="text-xs text-surface-400">{c.category || 'N/A'}</p>
        </div>
      ),
    },
    { key: 'professor', header: 'Professeur', render: (c) => <span className="text-surface-600">{c.professor || 'N/A'}</span> },
    {
      key: 'status',
      header: 'Statut',
      render: () => <Badge variant="warning">En attente</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50" title="Voir"><Eye size={16} /></button>
          <button onClick={() => handleApprove(c.id)} className="p-1.5 text-success-500 hover:bg-success-50 transition rounded-lg" title="Approuver"><Check size={16} /></button>
          <button onClick={() => handleReject(c.id)} className="p-1.5 text-error-500 hover:bg-error-50 transition rounded-lg" title="Rejeter"><X size={16} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Cours à examiner</h1>
        <p className="text-surface-500 mt-1">{pending.length} cours en attente de validation</p>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={pending} keyExtractor={(c) => c.id} emptyMessage="Aucun cours en attente" />
        )}
      </Card>
    </div>
  )
}
