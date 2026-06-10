import { useState } from 'react'
import Card from '../../components/ui/Card'

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState('EduTrack')
  const [description, setDescription] = useState("Plateforme de révision en ligne")
  const [email, setEmail] = useState('contact@edutrack.mg')
  const [language, setLanguage] = useState('fr')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Paramètres</h1>
        <p className="text-surface-500 mt-1">Configuration générale de la plateforme</p>
      </div>

      {saved && (
        <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-2xl text-sm font-medium">
          Paramètres enregistrés avec succès.
        </div>
      )}

      <form onSubmit={handleSave}>
        <Card className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-2">Nom de la plateforme</label>
            <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)}
              className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-2">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 resize-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-2">Email de contact</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-2">Langue</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 bg-white transition-all">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="mg">Malagasy</option>
            </select>
          </div>
          <button type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl transition-all font-semibold text-sm active:scale-[0.98] shadow-soft">
            Enregistrer
          </button>
        </Card>
      </form>
    </div>
  )
}
