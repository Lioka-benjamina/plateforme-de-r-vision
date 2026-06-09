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
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Paramètres</h1>
        <p className="text-surface-500 mt-1">Configuration générale de la plateforme</p>
      </div>

      {saved && (
        <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded text-sm">
          Paramètres enregistrés avec succès.
        </div>
      )}

      <form onSubmit={handleSave}>
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-600 mb-1">Nom de la plateforme</label>
            <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)}
              className="w-full border border-surface-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-600 mb-1">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-surface-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-600 mb-1">Email de contact</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-surface-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-600 mb-1">Langue</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-surface-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="mg">Malagasy</option>
            </select>
          </div>
          <button type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg transition font-medium">
            Enregistrer
          </button>
        </Card>
      </form>
    </div>
  )
}
