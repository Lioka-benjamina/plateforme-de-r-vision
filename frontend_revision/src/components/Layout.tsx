import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isLanding ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Outlet />
      </main>
      {isLanding && <Footer />}
    </div>
  )
}