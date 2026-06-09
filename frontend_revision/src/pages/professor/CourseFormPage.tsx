import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createCours, updateCours, fetchCours } from '../../features/cours/coursThunks'
import { fetchMatieres } from '../../features/matiere/matiereThunks'

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items: matieres } = useAppSelector((s) => s.matiere)
  const { items: coursList, loading, error } = useAppSelector((s) => s.cours)

  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [matiereId, setMatiereId] = useState('')

  useEffect(() => {
    dispatch(fetchMatieres())
    if (isEdit) dispatch(fetchCours())
  }, [dispatch, isEdit])

  useEffect(() => {
    if (isEdit && id) {
      const course = coursList.find((c: any) => String(c.id) === id)
      if (course) {
        setTitre((course as any).titre || '')
        setDescription((course as any).description || '')
        setMatiereId((course as any).matiereId || '')
      }
    }
  }, [isEdit, id, coursList])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && id) {
      const result = await dispatch(updateCours({ id: id as any, titre, description, matiereId: matiereId as any } as any))
      if (updateCours.fulfilled.match(result)) {
        navigate('/professor/courses')
      }
    } else {
      const result = await dispatch(createCours({ titre, description, matiereId } as any))
      if (createCours.fulfilled.match(result)) {
        navigate('/professor/courses')
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-surface-900">{isEdit ? 'Modifier le cours' : 'Nouveau cours'}</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">Titre</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} required
            className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
            className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical" />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">Matière</label>
          <select value={matiereId} onChange={(e) => setMatiereId(e.target.value)} required
            className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
            <option value="">Sélectionner une matière</option>
            {matieres.map((m: any) => (
              <option key={m.id} value={m.id}>{m.nom}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-error-500 text-sm">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition disabled:opacity-60">
            {loading ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer le cours'}
          </button>
          <button type="button" onClick={() => navigate('/professor/courses')}
            className="inline-flex items-center gap-2 bg-surface-100 text-surface-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-200 transition">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
