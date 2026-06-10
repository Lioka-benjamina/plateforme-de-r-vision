import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, LogOut, User, Settings } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import { selectUser } from '../../features/auth/authSelectors'
import ConfirmModal from '../ui/ConfirmModal'

export default function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-surface-100/80">
      <div className="flex items-center justify-between h-[72px] px-4 lg:px-8">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-3 bg-surface-50 border border-surface-200/80 rounded-2xl px-4 py-2.5 w-64 lg:w-80 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 transition-all duration-200">
          <Search size={16} className="text-surface-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent border-none outline-none text-sm text-surface-700 placeholder:text-surface-400 w-full"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <button className="relative p-2.5 text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-2xl transition-colors duration-200">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-1">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 px-2.5 py-2 rounded-2xl hover:bg-surface-50 transition-colors duration-200"
            >
              <div className="w-9 h-9 bg-primary-600 text-white rounded-xl flex items-center justify-center text-xs font-bold shadow-soft">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-surface-900 leading-tight">{user?.prenom} {user?.nom}</p>
                <p className="text-[11px] text-surface-400 capitalize">{user?.role}</p>
              </div>
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-surface-100 z-20 py-2 overflow-hidden animate-scale-in">
                  <div className="px-5 py-3 border-b border-surface-100 mb-1">
                    <p className="text-sm font-bold text-surface-900">{user?.prenom} {user?.nom}</p>
                    <p className="text-[11px] text-surface-400 capitalize">{user?.role}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors" onClick={() => setProfileOpen(false)}>
                    <User size={15} className="text-surface-400" /> Mon profil
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-5 py-2.5 text-sm text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors" onClick={() => setProfileOpen(false)}>
                    <Settings size={15} className="text-surface-400" /> Paramètres
                  </Link>
                  <div className="my-1 border-t border-surface-100" />
                  <button
                    onClick={() => { setShowLogout(true); setProfileOpen(false) }}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm text-error-500 hover:bg-error-50 transition-colors w-full"
                  >
                    <LogOut size={15} /> Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
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
    </header>
  )
}
