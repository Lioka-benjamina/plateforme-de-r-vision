import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen, AlertTriangle, Settings,
  GraduationCap, FileText, BarChart3, ClipboardList, ChevronLeft, Menu,
  LogOut, type LucideIcon
} from 'lucide-react'
import logo from '../../assets/logoRevision.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/auth/authSelectors'
import { logout } from '../../features/auth/authSlice'
import ConfirmModal from '../ui/ConfirmModal'

export interface NavItem {
  label: string
  icon: LucideIcon
  path: string
}

interface SidebarProps {
  items: NavItem[]
}

export default function Sidebar({ items }: SidebarProps) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showLogout, setShowLogout] = useState(false)
  const location = useLocation()
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const handleMouseEnter = (label: string) => {
    if (!collapsed) return
    clearTimeout(hoverTimeout.current)
    setHoveredItem(label)
  }

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredItem(null), 150)
  }

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current)
  }, [])

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-card border border-surface-200 text-surface-600"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-white border-r border-surface-200
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col
        ${collapsed ? 'w-[68px]' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-surface-200 shrink-0">
          <img src={logo} alt="Revision" className="w-8 h-8 object-contain shrink-0" />
          {!collapsed && <span className="font-bold text-surface-900">Revision</span>}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <div key={item.path} className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden group ${
                    active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                  title={undefined}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary-600" />
                  )}
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
                {collapsed && hoveredItem === item.label && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-1.5 bg-surface-800 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="border-t border-surface-200 p-3 shrink-0">
          {collapsed ? (
            <button onClick={() => setCollapsed(false)}
              className="flex items-center justify-center w-full p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition"
              title="Développer">
              <ChevronLeft size={18} className="rotate-180" />
            </button>
          ) : (
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900 truncate leading-tight">{user?.prenom} {user?.nom}</p>
                <p className="text-xs text-surface-400 capitalize truncate">{user?.role}</p>
              </div>
              <button onClick={() => setShowLogout(true)}
                className="p-1.5 rounded-lg text-surface-400 hover:text-error-500 hover:bg-error-50 transition shrink-0"
                title="Déconnexion">
                <LogOut size={15} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {showLogout && (
        <ConfirmModal
          type="logout"
          title="Se déconnecter ?"
          message="Vous serez déconnecté de votre compte."
          onConfirm={() => dispatch(logout())}
          onClose={() => setShowLogout(false)}
        />
      )}
    </>
  )
}

export const adminNavItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
  { label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  { label: 'Cours', icon: BookOpen, path: '/admin/courses' },
  { label: 'Leçons', icon: FileText, path: '/admin/lessons' },
  { label: 'Quiz', icon: ClipboardList, path: '/admin/quizzes' },
  { label: 'Signalements', icon: AlertTriangle, path: '/admin/signals' },
  { label: 'Paramètres', icon: Settings, path: '/admin/settings' },
]

export const professorNavItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/professor' },
  { label: 'Mes cours', icon: BookOpen, path: '/professor/courses' },
  { label: 'Quiz', icon: ClipboardList, path: '/professor/quizzes' },
  { label: 'Étudiants', icon: Users, path: '/professor/students' },
  { label: 'Statistiques', icon: BarChart3, path: '/professor/stats' },
]

export const studentNavItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/student' },
  { label: 'Mes cours', icon: BookOpen, path: '/student/courses' },
  { label: 'Quiz', icon: ClipboardList, path: '/student/quizzes' },
  { label: 'Résultats', icon: FileText, path: '/student/results' },
  { label: 'Certificats', icon: GraduationCap, path: '/student/certificates' },
]

export const moderatorNavItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/moderator' },
  { label: 'Signalements', icon: AlertTriangle, path: '/moderator/signals' },
  { label: 'Contenu à valider', icon: BookOpen, path: '/moderator/review' },
]
