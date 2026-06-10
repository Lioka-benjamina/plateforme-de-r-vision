import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser } from '../../features/auth/authThunks'
import { selectAuthLoading, selectAuthError } from '../../features/auth/authSelectors'
import { clearError } from '../../features/auth/authSlice'
import logo from '../../assets/logoRevision.png'

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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.user.role
      navigate(roleRoute[userRole] || '/')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-card border border-surface-100/80 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-5 shadow-soft">
              <img src={logo} alt="Revision" className="w-8 h-8 object-contain brightness-0 invert" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900">Connexion</h1>
            <p className="text-sm text-surface-400 mt-1">Accédez à votre espace personnel</p>
          </div>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-2xl mb-6 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => dispatch(clearError())} className="font-bold ml-2">&times;</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 placeholder:text-surface-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 placeholder:text-surface-300 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 text-sm shadow-soft"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-surface-400 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
