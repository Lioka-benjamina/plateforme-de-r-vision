import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Users } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser } from '../../features/auth/authThunks'
import { selectAuthLoading, selectAuthError } from '../../features/auth/authSelectors'
import { clearError } from '../../features/auth/authSlice'
import logo from '../../assets/logoRevision.png'

type Role = 'professeur' | 'etudiant' | 'parent'

const roles: { key: Role; label: string; icon: React.ReactNode }[] = [
  { key: 'professeur', label: 'Professeur', icon: <GraduationCap className="w-5 h-5" /> },
  { key: 'etudiant', label: 'Étudiant', icon: <BookOpen className="w-5 h-5" /> },
  { key: 'parent', label: 'Parent', icon: <Users className="w-5 h-5" /> },
]

const roleRoute: Record<string, string> = {
  admin: '/admin',
  moderator: '/moderator',
  professor: '/professor',
  prof: '/professor',
  student: '/student',
  eleve: '/student',
  parent: '/student',
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)

  const [role, setRole] = useState<Role>('etudiant')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password, role }))
    if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.user.role
      navigate(roleRoute[userRole] || '/')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-8">
          <div className="text-center mb-8">
            <img src={logo} alt="Revision" className="w-12 h-12 object-contain mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-surface-900">Connexion</h1>
            {/* <p className="text-sm text-surface-400 mt-1">Choisissez votre rôle pour continuer</p> */}
          </div>

          {/* <div className="flex gap-2 mb-8">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border text-sm font-medium transition ${
                  role === r.key
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-surface-200 text-surface-400 hover:border-surface-300 hover:text-surface-600'
                }`}
              >
                <span className="text-primary-600">{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div> */}

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => dispatch(clearError())} className="font-bold ml-2">&times;</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                className="w-full border border-surface-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 placeholder:text-surface-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-surface-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 placeholder:text-surface-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 text-sm"
            >
              {loading ? 'Connexion...' : `Se connecter`}
            </button>
          </form>

          <p className="text-center text-sm text-surface-400 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary-600 hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
