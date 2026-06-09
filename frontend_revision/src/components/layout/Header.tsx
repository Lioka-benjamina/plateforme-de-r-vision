import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, LogOut, User, Settings } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import { selectUser } from '../../features/auth/authSelectors'

export default function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-surface-100">
      <div className="flex items-center justify-between h-15 px-4 lg:px-6" style={{ height: '60px' }}>
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2.5 bg-surface-50 border border-surface-200 rounded-lg px-3.5 py-2 w-64 lg:w-80 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 transition-all">
          <Search size={15} className="text-surface-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent border-none outline-none text-sm text-surface-700 placeholder:text-surface-400 w-full"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <button className="relative p-2 text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-xl transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-surface-100 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-surface-900 leading-tight">{user?.prenom} {user?.nom}</p>
                <p className="text-xs text-surface-400 capitalize">{user?.role}</p>
              </div>
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-surface-100 z-20 py-2 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-surface-50 mb-1">
                    <p className="text-xs font-semibold text-surface-900">{user?.prenom} {user?.nom}</p>
                    <p className="text-xs text-surface-400 capitalize">{user?.role}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors" onClick={() => setProfileOpen(false)}>
                    <User size={15} className="text-surface-400" /> Mon profil
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors" onClick={() => setProfileOpen(false)}>
                    <Settings size={15} className="text-surface-400" /> Paramètres
                  </Link>
                  <div className="my-1 border-t border-surface-50" />
                  <button
                    onClick={() => { dispatch(logout()); setProfileOpen(false) }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors w-full"
                  >
                    <LogOut size={15} /> Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 