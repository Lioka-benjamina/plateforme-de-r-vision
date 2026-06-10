import { useEffect } from 'react'
import { Users, GraduationCap, BookOpen, ClipboardList, Eye, Edit2, Trash2, AlertTriangle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours } from '../../features/cours/coursThunks'
import { selectAllCours } from '../../features/cours/coursSelectors'
import { fetchUsers } from '../../features/user/userThunks'
import { selectAllUsers } from '../../features/user/userSelectors'
import { selectUser } from '../../features/auth/authSelectors'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'error',
}

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const cours = useAppSelector(selectAllCours)
  const users = useAppSelector(selectAllUsers)

  useEffect(() => {
    dispatch(fetchCours())
    dispatch(fetchUsers())
  }, [dispatch])

  const studentCount = users.filter((u) => u.role === 'student').length || 245
  const professorCount = users.filter((u) => u.role === 'professor').length || 38
  const courseCount = cours.length || 56
  const pendingCoursCount = cours.filter((c) => c.status === 'en_attente').length
  const publishedCoursCount = cours.filter((c) => c.status === 'publié').length
  const quizCount = 124

  const columns: Column<(typeof users)[0]>[] = [
    { key: 'nom', header: 'Nom', render: (u) => `${u.prenom} ${u.nom}` },
    { key: 'role', header: 'Rôle' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Statut',
      render: (u) => <Badge variant={statusVariant[u.status || 'active']}>{u.status || 'active'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="text-primary-500 hover:text-primary-700 transition" title="Voir"><Eye size={16} /></button>
          <button className="text-primary-500 hover:text-primary-700 transition" title="Modifier"><Edit2 size={16} /></button>
          <button className="text-error-500 hover:text-error-700 transition" title="Supprimer"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Tableau de bord</h1>
        <p className="text-surface-500 mt-1">Vue d'ensemble de la plateforme</p>
      </div>

      {user && (
        <p className="text-surface-600 text-sm">
          Connecté en tant que <span className="font-semibold text-primary-600">{user.prenom} {user.nom}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<Users size={22} />} label="Étudiants" value={studentCount} />
        <StatCard icon={<GraduationCap size={22} />} label="Professeurs" value={professorCount} />
        <StatCard icon={<BookOpen size={22} />} label="Cours" value={courseCount} />
        <StatCard icon={<ClipboardList size={22} />} label="Quiz" value={quizCount} />
      </div>

      {pendingCoursCount > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {pendingCoursCount} cours en attente d'approbation
              </p>
              <p className="text-xs text-amber-600">
                <a href="/admin/courses" className="underline hover:no-underline">Gérer les cours</a> — {publishedCoursCount} cours publiés
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          <h3 className="text-sm font-semibold text-surface-700 mb-3">Progression des élèves</h3>
          <div className="h-40 rounded-lg bg-surface-50 flex items-end p-3">
            <div className="flex items-end gap-2 w-full h-full">
              {[75, 50, 100, 66, 83, 33, 80].map((h, i) => (
                <div key={i} className="bg-primary-500 rounded-t w-8" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-2">Évolution sur les 7 derniers jours</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-surface-700 mb-3">Activité des cours</h3>
          <div className="h-40 rounded-lg bg-surface-50 flex items-end p-3">
            <div className="flex items-end gap-2 w-full h-full">
              {[40, 80, 60, 100, 50].map((h, i) => (
                <div key={i} className="bg-success-500 rounded-t w-8" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-2">Créations par mois</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-surface-700 mb-3">Répartition utilisateurs</h3>
          <div className="h-40 rounded-lg bg-surface-50 flex items-center justify-center p-3">
            <div className="flex items-center justify-center gap-1">
              <div className="w-16 h-16 rounded-full bg-primary-400 border-4 border-white -mr-3" />
              <div className="w-16 h-16 rounded-full bg-success-400 border-4 border-white -mr-3" />
              <div className="w-16 h-16 rounded-full bg-warning-400 border-4 border-white" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary-400" /> Étudiants</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-success-400" /> Profs</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning-400" /> Admins</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-surface-700">Utilisateurs récents</h3>
          <span className="text-xs text-surface-400">{users.length} inscrits</span>
        </div>
        <Table columns={columns} data={users.slice(0, 5)} keyExtractor={(u) => u.id} emptyMessage="Aucun utilisateur" />
      </Card>
    </div>
  )
}
