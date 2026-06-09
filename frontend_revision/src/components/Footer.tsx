import { Link } from 'react-router-dom'
import logo from '../assets/logoRevision.png'

export default function Footer() {
  return (
    <footer className="bg-surface-50 border-t border-surface-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-surface-900 mb-4">
              <img src={logo} alt="Revision" className="w-7 h-7 object-contain" />
              Revision
            </div>
            <p className="text-sm text-surface-500 leading-relaxed">
              Plateforme de révision en ligne pour le suivi des cours, des progrès et des formations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-surface-900 mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-surface-500">
              <li><Link to="/" className="hover:text-primary-600 transition">Accueil</Link></li>
              <li><Link to="/catalog" className="hover:text-primary-600 transition">Catalogue</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600 transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 transition">Contact</Link></li>
              <li><Link to="/login" className="hover:text-primary-600 transition">Connexion</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-surface-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-surface-500">
              <li>contact@revision.com</li>
              <li>+261 34 00 000 00</li>
              <li>Antananarivo, Madagascar</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-surface-200 text-center text-sm text-surface-400">
          &copy; {new Date().getFullYear()} Revision. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
