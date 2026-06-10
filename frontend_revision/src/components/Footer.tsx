import { Link } from 'react-router-dom'
import logo from '../assets/logoRevision.png'

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 font-bold text-lg text-white mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <img src={logo} alt="Revision" className="w-5 h-5 object-contain brightness-0 invert" />
              </div>
              Revision
            </div>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs">
              Plateforme de révision en ligne pour le suivi des cours, des progrès et des formations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-3 text-sm text-surface-400">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li><Link to="/catalog" className="hover:text-primary-400 transition-colors">Catalogue</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Connexion</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-surface-400">
              <li>contact@revision.com</li>
              <li>+261 34 00 000 00</li>
              <li>Antananarivo, Madagascar</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-surface-800 text-center text-sm text-surface-500">
          &copy; {new Date().getFullYear()} Revision. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
