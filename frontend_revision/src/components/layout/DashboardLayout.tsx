import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAppSelector } from '../../app/hooks'
import { selectIsAuthenticated, selectUser, selectAuthInitialized } from '../../features/auth/authSelectors'
import type { NavItem } from './Sidebar'

interface DashboardLayoutProps {
  navItems: NavItem[]
  allowedRoles: string[]
}

export default function DashboardLayout({ navItems, allowedRoles }: DashboardLayoutProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const initialized = useAppSelector(selectAuthInitialized)

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-surface-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-sm text-surface-400 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
