import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import { selectIsAuthenticated, selectUser } from '../features/auth/authSelectors'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logoRevision.png'
import ConfirmModal from './ui/ConfirmModal'

export default function Navbar() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const { pathname } = useLocation()

  const publicLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Catalogue', href: '/catalog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ]

  const roleHome: Record<string, string> = {
    admin: '/admin',
    moderator: '/moderator',
    professor: '/professor',
    prof: '/professor',
    student: '/student',
    eleve: '/student',
    parent: '/student',
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-surface-100/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl text-surface-900 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-soft">
              <img src={logo} alt="Revision" className="w-5 h-5 object-contain brightness-0 invert" />
            </div>
            <span className="tracking-tight">Revision</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {publicLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 ${
                    active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-surface-500 hover:text-surface-900 hover:bg-surface-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={roleHome[user?.role || ''] || '/'}
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 px-4 py-2.5 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-surface-400 px-2">{user?.prenom} {user?.nom}</span>
                <button
                  onClick={() => setShowLogout(true)}
                  className="text-sm font-medium text-surface-500 hover:text-surface-800 px-4 py-2.5 rounded-xl hover:bg-surface-50 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-surface-600 hover:text-surface-900 px-4 py-2.5 rounded-xl hover:bg-surface-50 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all active:scale-[0.98] shadow-soft"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2.5 text-surface-500 hover:bg-surface-100 rounded-2xl transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-surface-100 mt-1 animate-fade-in">
            {publicLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl transition-colors ${
                    active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-primary-600 flex-shrink-0" />}
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-surface-100 mt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { setShowLogout(true); setMenuOpen(false) }}
                  className="block w-full text-left text-sm font-medium text-surface-600 hover:bg-surface-50 px-4 py-3 rounded-xl transition-colors"
                >
                  Déconnexion
                </button>
              ) : (
                <div className="flex gap-3 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center text-sm font-medium text-surface-700 border border-surface-200 px-4 py-3 rounded-xl hover:bg-surface-50 transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center text-sm font-semibold bg-primary-600 text-white px-4 py-3 rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showLogout && (
        <ConfirmModal
          type="logout"
          title="Se déconnecter ?"
          message="Vous serez déconnecté de votre compte."
          onConfirm={() => dispatch(logout())}
          onClose={() => setShowLogout(false)}
        />
      )}
    </nav>
  )
}
