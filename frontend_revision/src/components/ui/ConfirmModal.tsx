import { useState } from 'react'
import { AlertTriangle, Trash2, LogOut } from 'lucide-react'

interface ConfirmModalProps {
  type: 'delete' | 'logout'
  title: string
  message: string
  onConfirm: () => Promise<void> | void
  onClose: () => void
}

export default function ConfirmModal({ type, title, message, onConfirm, onClose }: ConfirmModalProps) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    const start = Date.now()

    try {
      const result = onConfirm()
      if (result && typeof (result as Promise<void>).then === 'function') {
        await result
      }
    } catch {
      setLoading(false)
      return
    }

    const elapsed = Date.now() - start
    const minDelay = type === 'logout' ? 1200 : 600
    const remaining = Math.max(0, minDelay - elapsed)

    if (remaining > 0) {
      await new Promise((r) => setTimeout(r, remaining))
    }

    setDone(true)
    setTimeout(() => onClose(), 500)
  }

  const Icon = type === 'logout' ? LogOut : Trash2
  const confirmBg = type === 'logout'
    ? 'bg-warning-500 hover:bg-warning-700'
    : 'bg-error-500 hover:bg-error-700'

  return (
    <div className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-modal relative overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
            <div className="w-12 h-12 border-[3px] border-surface-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-sm text-surface-500 font-medium">
              {done ? (
                <span className="text-success-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {type === 'logout' ? 'Déconnexion...' : 'Supprimé !'}
                </span>
              ) : (
                type === 'logout' ? 'Déconnexion en cours...' : 'Suppression en cours...'
              )}
            </p>
          </div>
        )}

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-opacity ${loading ? 'opacity-30' : ''} ${
          type === 'logout' ? 'bg-warning-50 text-warning-500' : 'bg-error-50 text-error-500'
        }`}>
          <Icon size={28} />
        </div>

        <div className={`transition-opacity ${loading ? 'opacity-30' : ''}`}>
          <h2 className="text-xl font-bold text-surface-900 mb-2">{title}</h2>
          <p className="text-sm text-surface-500 mb-8 leading-relaxed">{message}</p>
        </div>

        <div className={`flex gap-3 transition-opacity ${loading ? 'opacity-0 pointer-events-none' : ''}`}>
          <button
            onClick={handleConfirm}
            className={`flex-1 inline-flex items-center justify-center gap-2 text-white py-3 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] ${confirmBg}`}
          >
            <Icon size={16} />
            {type === 'logout' ? 'Se déconnecter' : 'Supprimer'}
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
