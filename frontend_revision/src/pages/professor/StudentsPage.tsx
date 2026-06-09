import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchUsers } from '../../features/user/userThunks'
import { selectAllUsers, selectUserLoading } from '../../features/user/userSelectors'
import { Mail, User } from 'lucide-react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

export default function StudentsPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const loading = useAppSelector(selectUserLoading)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const students = users.filter((u) => u.role === 'student')

  const columns: Column<(typeof students)[0]>[] = [
    {
      key: 'nom',
      header: 'Étudiant',
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold">
            {s.prenom[0]}{s.nom[0]}
          </div>
          <div>
            <p className="font-medium text-surface-900">{s.prenom} {s.nom}</p>
            <p className="text-xs text-surface-400">{s.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (s) => (
        <span className="flex items-center gap-1 text-surface-500">
          <Mail size={14} /> {s.email}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Statut',
      render: (s) => <span className="text-surface-600">{s.status || 'actif'}</span>,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          <User size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Mes étudiants</h1>
          <p className="text-surface-500 text-sm">{students.length} étudiants inscrits</p>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={students} keyExtractor={(s) => s.id} emptyMessage="Aucun étudiant" />
        )}
      </Card>
    </div>
  )
}
