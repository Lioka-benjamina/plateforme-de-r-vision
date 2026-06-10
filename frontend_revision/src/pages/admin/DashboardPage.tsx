import { useEffect } from 'react'
import { Users, GraduationCap, BookOpen, ClipboardList, AlertTriangle } from 'lucide-react'
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
    { key: 'nom', header: 'Nom', render: (u) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold">
          {u.prenom[0]}{u.nom[0]}
        </div>
        <div>
          <p className="font-medium text-surface-900">{u.prenom} {u.nom}</p>
          <p className="text-xs text-surface-400">{u.email}</p>
        </div>
      </div>
    )},
    { key: 'role', header: 'Rôle', render: (u) => <Badge variant={statusVariant[u.status || 'active']}>{u.role}</Badge> },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Statut',
      render: (u) => <Badge variant={statusVariant[u.status || 'active']}>{u.status || 'active'}</Badge>,
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Tableau de bord</h1>
        <p className="text-surface-500 mt-1">Vue d'ensemble de la plateforme</p>
      </div>

      {user && (
        <Card className="border-primary-100 bg-gradient-to-r from-primary-50 to-white">
          <p className="text-surface-600 text-sm">
            Bonjour <span className="font-bold text-primary-700">{user.prenom} {user.nom}</span> — bienvenue sur votre tableau de bord.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<Users size={22} />} label="Étudiants" value={studentCount} />
        <StatCard icon={<GraduationCap size={22} />} label="Professeurs" value={professorCount} />
        <StatCard icon={<BookOpen size={22} />} label="Cours" value={courseCount} />
        <StatCard icon={<ClipboardList size={22} />} label="Quiz" value={quizCount} />
      </div>

      {pendingCoursCount > 0 && (
        <Card className="border-warning-200 bg-warning-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warning-100 text-warning-600 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-warning-800">
                {pendingCoursCount} cours en attente d'approbation
              </p>
              <p className="text-xs text-warning-600 mt-0.5">
                <a href="/admin/courses" className="underline hover:no-underline font-medium">Gérer les cours</a> — {publishedCoursCount} cours publiés
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-bold text-surface-700 mb-4">Progression des élèves</h3>
          <div className="h-40 rounded-2xl bg-surface-50 flex items-end p-4">
            <div className="flex items-end gap-2 w-full h-full">
              {[75, 50, 100, 66, 83, 33, 80].map((h, i) => (
                <div key={i} className="bg-primary-500 rounded-t-lg w-full flex-1 transition-all duration-500 hover:bg-primary-600" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-3">Évolution sur les 7 derniers jours</p>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-surface-700 mb-4">Activité des cours</h3>
          <div className="h-40 rounded-2xl bg-surface-50 flex items-end p-4">
            <div className="flex items-end gap-2 w-full h-full">
              {[40, 80, 60, 100, 50].map((h, i) => (
                <div key={i} className="bg-success-500 rounded-t-lg w-full flex-1 transition-all duration-500 hover:bg-success-700" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-3">Créations par mois</p>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-surface-700 mb-4">Répartition utilisateurs</h3>
          <div className="h-40 rounded-2xl bg-surface-50 flex items-center justify-center p-4">
            <div className="flex items-center justify-center gap-1">
              <div className="w-16 h-16 rounded-full bg-primary-400 border-4 border-white -mr-3" />
              <div className="w-16 h-16 rounded-full bg-success-400 border-4 border-white -mr-3" />
              <div className="w-16 h-16 rounded-full bg-warning-400 border-4 border-white" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-surface-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-400" /> Étudiants</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success-400" /> Profs</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-warning-400" /> Admins</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-surface-700">Utilisateurs récents</h3>
          <span className="text-xs text-surface-400">{users.length} inscrits</span>
        </div>
        <Table columns={columns} data={users.slice(0, 5)} keyExtractor={(u) => u.id} emptyMessage="Aucun utilisateur" />
      </Card>
    </div>
  )
}
