import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen, AlertTriangle, Settings,
  GraduationCap, FileText, BarChart3, ClipboardList, ChevronLeft, Menu,
  type LucideIcon
} from 'lucide-react'
import logo from '../../assets/logoRevision.png'

export interface NavItem {
  label: string
  icon: LucideIcon
  path: string
}

interface SidebarProps {
  items: NavItem[]
}

export default function Sidebar({ items }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-card border border-surface-200 text-surface-600"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-white border-r border-surface-200
        transition-all duration-300 flex flex-col
        ${collapsed ? 'w-[68px]' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-surface-200 shrink-0">
          <img src={logo} alt="Revision" className="w-8 h-8 object-contain shrink-0" />
          {!collapsed && <span className="font-bold text-surface-900">Revision</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse button desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-5 h-12 border-t border-surface-200 text-surface-400 hover:text-surface-600 transition shrink-0"
        >
          <ChevronLeft size={18} className={`transition ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span className="text-sm">Réduire</span>}
        </button>
      </aside>
    </>
  )
}

// Navigation presets
export const adminNavItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
  { label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  { label: 'Cours', icon: BookOpen, path: '/admin/courses' },
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
  { label: 'Cours à examiner', icon: BookOpen, path: '/moderator/review' },
]
