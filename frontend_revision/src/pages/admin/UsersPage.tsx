import { useEffect, useState } from 'react'
import { Search, Eye, Edit2, Trash2, UserCheck, UserX, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchUsers, updateUserStatus, createUser } from '../../features/user/userThunks'
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

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'professor', label: 'Professeur' },
  { value: 'moderator', label: 'Modérateur' },
  { value: 'student', label: 'Étudiant' },
  { value: 'eleve', label: 'Élève' },
  { value: 'parent', label: 'Parent' },
]

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const loading = useAppSelector(selectUserLoading)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('Tous')
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ email: '', mot_de_pass: '', nom: '', prenom: '', role: 'professor' })

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

  const handleCreate = () => {
    if (!form.email || !form.mot_de_pass || !form.nom || !form.prenom) return
    dispatch(createUser(form))
    setForm({ email: '', mot_de_pass: '', nom: '', prenom: '', role: 'professor' })
    setShowCreate(false)
  }

  const columns: Column<(typeof users)[0]>[] = [
    {
      key: 'nom',
      header: 'Nom',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold">
            {u.prenom[0]}{u.nom[0]}
          </div>
          <div>
            <p className="font-semibold text-surface-900">{u.prenom} {u.nom}</p>
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
          <button onClick={() => setSelectedUser(u)} className="p-2 text-surface-400 hover:text-primary-500 transition rounded-xl hover:bg-primary-50" title="Voir">
            <Eye size={16} />
          </button>
          <button className="p-2 text-surface-400 hover:text-primary-500 transition rounded-xl hover:bg-primary-50" title="Modifier">
            <Edit2 size={16} />
          </button>
          <button onClick={() => handleToggleStatus(u)} className="p-2 text-surface-400 hover:text-warning-500 transition rounded-xl hover:bg-warning-50" title="Suspendre/Réactiver">
            {u.status === 'suspended' ? <UserCheck size={16} /> : <UserX size={16} />}
          </button>
          <button className="p-2 text-surface-400 hover:text-error-500 transition rounded-xl hover:bg-error-50" title="Supprimer">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Utilisateurs</h1>
          <p className="text-surface-500 mt-1">{users.length} utilisateurs inscrits</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all active:scale-[0.98] shadow-soft">
          <Plus size={18} /> Créer un utilisateur
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text" placeholder="Rechercher..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-surface-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-surface-200 rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all">
          {['Tous', 'admin', 'moderator', 'professor', 'student'].map((r) => (
            <option key={r} value={r}>{r === 'Tous' ? 'Tous les rôles' : r}</option>
          ))}
        </select>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-12 text-surface-400">Chargement...</div>
        ) : (
          <Table columns={columns} data={filtered} keyExtractor={(u) => u.id} emptyMessage="Aucun utilisateur trouvé" />
        )}
      </Card>

      <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title="Détails de l'utilisateur">
        {selectedUser && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-lg font-bold">
                {selectedUser.prenom[0]}{selectedUser.nom[0]}
              </div>
              <div>
                <p className="font-bold text-surface-900">{selectedUser.prenom} {selectedUser.nom}</p>
                <p className="text-surface-400">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-surface-400 text-xs">Rôle</p><p className="font-medium">{selectedUser.role}</p></div>
              <div><p className="text-surface-400 text-xs">Statut</p><p className="font-medium">{selectedUser.status || 'active'}</p></div>
              <div className="col-span-2"><p className="text-surface-400 text-xs">Inscrit le</p><p className="font-medium">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Créer un utilisateur">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-1.5">Prénom</label>
              <input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full px-4 py-2.5 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-1.5">Nom</label>
              <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full px-4 py-2.5 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Mot de passe</label>
            <input type="password" value={form.mot_de_pass} onChange={(e) => setForm({ ...form, mot_de_pass: e.target.value })}
              className="w-full px-4 py-2.5 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Rôle</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 bg-white transition-all">
              {roles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleCreate} disabled={!form.email || !form.mot_de_pass || !form.nom || !form.prenom}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all active:scale-[0.98] disabled:opacity-60">
              <Plus size={16} /> Créer
            </button>
            <button onClick={() => setShowCreate(false)}
              className="inline-flex items-center gap-2 bg-surface-100 text-surface-700 px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-surface-200 transition-colors">
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
