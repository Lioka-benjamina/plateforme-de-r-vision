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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
