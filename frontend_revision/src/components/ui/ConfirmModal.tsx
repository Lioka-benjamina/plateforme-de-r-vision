import { useState } from 'react'
import { AlertTriangle, Trash2, LogOut, X } from 'lucide-react'

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
    ? 'bg-amber-600 hover:bg-amber-700'
    : 'bg-red-600 hover:bg-red-700'

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
            <div className="w-10 h-10 border-[3px] border-surface-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-sm text-surface-500 font-medium">
              {done ? (
                <span className="text-emerald-600 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-opacity ${loading ? 'opacity-30' : ''} ${
          type === 'logout' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'
        }`}>
          <Icon size={24} />
        </div>

        {/* Content */}
        <div className={`transition-opacity ${loading ? 'opacity-30' : ''}`}>
          <h2 className="text-lg font-semibold text-surface-900 mb-2">{title}</h2>
          <p className="text-sm text-surface-500 mb-6">{message}</p>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 transition-opacity ${loading ? 'opacity-0 pointer-events-none' : ''}`}>
          <button
            onClick={handleConfirm}
            className={`flex-1 inline-flex items-center justify-center gap-2 text-white py-2.5 rounded-lg text-sm font-medium transition ${confirmBg}`}
          >
            <Icon size={16} />
            {type === 'logout' ? 'Se déconnecter' : 'Supprimer'}
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
