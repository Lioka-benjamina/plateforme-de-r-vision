import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useAppDispatch } from '../../app/hooks'
import { createSignal } from '../../features/signal/signalThunks'
import { useToast } from './Toast'

interface ReportModalProps {
  targetType: string
  targetId: string
  targetName: string
  onClose: () => void
}

const reasons = [
  'Contenu inapproprié',
  'Informations erronées',
  'Spam ou publicité',
  'Violence ou harcèlement',
  'Mauvaise qualité pédagogique',
  'Contenu copié (plagiat)',
  'Problème technique',
  'Autre',
]

export default function ReportModal({ targetType, targetId, targetName, onClose }: ReportModalProps) {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const [selectedReason, setSelectedReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    const reason = selectedReason === 'Autre' ? customReason : selectedReason
    if (!reason.trim()) return

    setSubmitting(true)
    const result = await dispatch(createSignal({
      targetType,
      targetId,
      targetName,
      reason,
    }))
    setSubmitting(false)

    if (createSignal.fulfilled.match(result)) {
      showToast('Signalement envoyé. Merci pour votre retour.', 'success')
      onClose()
    } else {
      showToast('Erreur lors de l\'envoi du signalement', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-surface-900">Signaler</h2>
              <p className="text-xs text-surface-400">{targetName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-100 rounded-lg transition">
            <X size={20} className="text-surface-400" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-surface-700">Motif du signalement</p>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`px-3 py-2 text-sm rounded-lg border text-left transition ${
                  selectedReason === r
                    ? 'border-amber-400 bg-amber-50 text-amber-800 font-medium'
                    : 'border-surface-200 text-surface-600 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {selectedReason === 'Autre' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-surface-700 mb-1">Précisez</label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={3}
              placeholder="Décrivez le problème..."
              className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 resize-none"
            />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'Autre' && !customReason.trim()) || submitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AlertTriangle size={16} />
            {submitting ? 'Envoi...' : 'Envoyer le signalement'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-surface-600 bg-surface-100 rounded-lg hover:bg-surface-200 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
