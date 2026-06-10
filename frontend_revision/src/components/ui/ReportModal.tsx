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
    <div className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md p-7 shadow-modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warning-50 text-warning-500 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-surface-900">Signaler</h2>
              <p className="text-xs text-surface-400">{targetName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-100 rounded-xl transition">
            <X size={18} className="text-surface-400" />
          </button>
        </div>

        <div className="space-y-2.5 mb-5">
          <p className="text-sm font-semibold text-surface-700">Motif du signalement</p>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`px-3.5 py-2.5 text-sm rounded-xl border text-left transition-all ${
                  selectedReason === r
                    ? 'border-warning-400 bg-warning-50 text-warning-800 font-medium shadow-soft'
                    : 'border-surface-200 text-surface-600 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {selectedReason === 'Autre' && (
          <div className="mb-5">
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Précisez</label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={3}
              placeholder="Décrivez le problème..."
              className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-warning-500/20 focus:border-warning-400 resize-none transition-all"
            />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'Autre' && !customReason.trim()) || submitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-warning-500 text-white py-3 rounded-2xl text-sm font-semibold hover:bg-warning-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AlertTriangle size={16} />
            {submitting ? 'Envoi...' : 'Envoyer le signalement'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-surface-600 bg-surface-100 rounded-2xl hover:bg-surface-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
