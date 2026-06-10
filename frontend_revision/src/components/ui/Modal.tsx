import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-modal w-full max-w-lg max-h-[85vh] overflow-y-auto border border-surface-100/50 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-surface-100">
          <h2 className="text-base font-bold text-surface-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  )
}
