import { useEffect, useState } from 'react'
import { Search, Eye, Edit2, Trash2, UserCheck, UserX } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchUsers, updateUserStatus } from '../../features/user/userThunks'
import { selectAllUsers, selectUserLoading } from '../../features/user/userSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'

const roleColors: Record<string, string> = {
  admin: 'error',
  moderator: 'warning',
  professor: 'info',
  student: 'default',
} as const

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const loading = useAppSelector(selectUserLoading)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('Tous')
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    const nameMatch = u.nom.toLowerCase().includes(q) || u.prenom.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const roleMatch = roleFilter === 'Tous' || u.role === roleFilter
    return nameMatch && roleMatch
  })

  const handleToggleStatus = (user: (typeof users)[0]) => {
    const newStatus = user.status === 'suspended' ? 'active' : 'suspended'
    dispatch(updateUserStatus({ id: user.id, status: newStatus }))
  }

  const columns: Column<(typeof users)[0]>[] = [
    {
      key: 'nom',
      header: 'Nom',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold">
            {u.prenom[0]}{u.nom[0]}
          </div>
          <div>
            <p className="font-medium text-surface-900">{u.prenom} {u.nom}</p>
            <p className="text-xs text-surface-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Rôle',
      render: (u) => <Badge variant={(roleColors[u.role] || 'default') as 'default' | 'success' | 'warning' | 'error' | 'info'}>{u.role}</Badge>,
    },
    {
      key: 'status',
      header: 'Statut',
      render: (u) => (
        <Badge variant={u.status === 'active' ? 'success' : u.status === 'suspended' ? 'error' : 'warning'}>
          {u.status || 'active'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Inscrit le',
      render: (u) => <span className="text-surface-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setSelectedUser(u)} className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50" title="Voir">
            <Eye size={16} />
          </button>
          <button className="p-1.5 text-surface-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50" title="Modifier">
            <Edit2 size={16} />
          </button>
          <button onClick={() => handleToggleStatus(u)} className="p-1.5 text-surface-400 hover:text-warning-500 transition rounded-lg hover:bg-warning-50" title="Suspendre/Réactiver">
            {u.status === 'suspended' ? <UserCheck size={16} /> : <UserX size={16} />}
          </button>
          <button className="p-1.5 text-surface-400 hover:text-error-500 transition rounded-lg hover:bg-error-50" title="Supprimer">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Utilisateurs</h1>
        <p className="text-surface-500 mt-1">{users.length} utilisateurs inscrits</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text" placeholder="Rechercher..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
          />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-surface-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400">
          {['Tous', 'admin', 'moderator', 'professor', 'student'].map((r) => (
            <option key={r} value={r}>{r === 'Tous' ? 'Tous les rôles' : r}</option>
          ))}
        </select>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={filtered} keyExtractor={(u) => u.id} emptyMessage="Aucun utilisateur trouvé" />
        )}
      </Card>

      <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title="Détails de l'utilisateur">
        {selectedUser && (
          <div className="space-y-3 text-sm">
            <p><strong>Nom :</strong> {selectedUser.prenom} {selectedUser.nom}</p>
            <p><strong>Email :</strong> {selectedUser.email}</p>
            <p><strong>Rôle :</strong> {selectedUser.role}</p>
            <p><strong>Statut :</strong> {selectedUser.status || 'active'}</p>
            <p><strong>Inscrit le :</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
