import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createCours, updateCours, fetchCours } from '../../features/cours/coursThunks'
import { fetchMatieres } from '../../features/matiere/matiereThunks'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items: matieres } = useAppSelector((s) => s.matiere)
  const { items: coursList, loading, error } = useAppSelector((s) => s.cours)
  const { token } = useAppSelector((s) => s.auth)

  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [matiereId, setMatiereId] = useState('')
  const [duree, setDuree] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    dispatch(fetchMatieres())
    if (isEdit) dispatch(fetchCours())
  }, [dispatch, isEdit])

  useEffect(() => {
    if (isEdit && id) {
      const course = coursList.find((c: { id: number; titre: string; description: string; matiereId: number; duree?: string; imageUrl?: string }) => String(c.id) === id)
      if (course) {
        setTitre(course.titre || '')
        setDescription(course.description || '')
        setMatiereId(String(course.matiereId) || '')
        setDuree(course.duree || '')
        setImageUrl(course.imageUrl || '')
      }
    }
  }, [isEdit, id, coursList])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post(`${API_BASE}/cours/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      })
      setImageUrl(res.data.url)
    } catch {
      alert("Erreur lors de l'upload de l'image")
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && id) {
      const result = await dispatch(updateCours({
        id: id as unknown as number,
        titre,
        description,
        matiereId: matiereId as unknown as number,
        duree,
        imageUrl,
      } as unknown as Parameters<typeof updateCours>[0]))
      if (updateCours.fulfilled.match(result)) {
        navigate('/professor/courses')
      }
    } else {
      const result = await dispatch(createCours({
        titre,
        description,
        matiereId,
        duree,
        imageUrl,
      } as unknown as Parameters<typeof createCours>[0]))
      if (createCours.fulfilled.match(result)) {
        navigate('/professor/courses')
      }
    }
  }

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <h1 className="text-2xl font-bold text-surface-900 tracking-tight">{isEdit ? 'Modifier le cours' : 'Nouveau cours'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-2">Titre</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} required
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 resize-vertical transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-2">Matière</label>
          <select value={matiereId} onChange={(e) => setMatiereId(e.target.value)} required
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 bg-white transition-all">
            <option value="">Sélectionner une matière</option>
            {matieres.map((m: { id: number; nom: string }) => (
              <option key={m.id} value={m.id}>{m.nom}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-2">Durée estimée</label>
          <input
            type="text"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            placeholder="ex: 12 heures, 3 semaines, 45 min"
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
          <p className="text-xs text-surface-400 mt-1.5">Durée totale estimée du cours</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-2">Image de présentation</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-surface-200 rounded-2xl p-8 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all">
            {imageUrl ? (
              <div className="text-center">
                <img src={`${API_BASE}${imageUrl}`} alt="Aperçu" className="max-h-32 rounded-2xl mb-2" />
                <p className="text-xs text-surface-400">Cliquez pour changer l'image</p>
              </div>
            ) : (
              <>
                <Upload size={24} className="text-surface-400 mb-2" />
                <p className="text-sm text-surface-500">Image du cours (JPEG, PNG)</p>
              </>
            )}
            <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
        </div>

        {error && <p className="text-error-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading || uploading}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all active:scale-[0.98] disabled:opacity-60 shadow-soft">
            {uploading ? 'Upload...' : loading ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer le cours'}
          </button>
          <button type="button" onClick={() => navigate('/professor/courses')}
            className="inline-flex items-center gap-2 bg-surface-100 text-surface-700 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-surface-200 transition-colors">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
