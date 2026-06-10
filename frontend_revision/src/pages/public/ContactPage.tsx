import { useState, useEffect } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { submitContact } from '../../features/contact/contactThunks'
import { selectContactLoading, selectContactSuccess, selectContactError } from '../../features/contact/contactSelectors'
import { resetContact } from '../../features/contact/contactSlice'
const inputClass = "w-full border border-surface-200 rounded-2xl px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all bg-surface-50"

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectContactLoading)
  const success = useAppSelector(selectContactSuccess)
  const error = useAppSelector(selectContactError)

  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [sujet, setSujet] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    return () => { dispatch(resetContact()) }
  }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(submitContact({ nom, email, sujet, message }))
    if (!error) {
      setNom('')
      setEmail('')
      setSujet('')
      setMessage('')
    }
  }

  const infoCards = [
    { icon: Mail, label: 'Email', value: 'contact@revision.mg' },
    { icon: Phone, label: 'Téléphone', value: '+261 34 00 000 00' },
    { icon: MapPin, label: 'Adresse', value: 'Antananarivo, Madagascar' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="rounded-3xl bg-primary-600 p-10 md:p-14 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Contactez-nous</h1>
        <p className="text-primary-200 mt-2 text-sm">Une question, une suggestion ? Nous sommes à votre écoute.</p>
      </section>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-surface-100/80 shadow-card p-5 text-center hover:shadow-card-hover transition-all duration-300">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-surface-900 text-sm tracking-tight">{label}</h3>
            <p className="text-sm text-surface-400 mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-surface-100/80 shadow-card p-6 md:p-8">
        <h2 className="text-lg font-semibold text-surface-900 mb-6 tracking-tight">Envoyez-nous un message</h2>

        {success && (
          <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3.5 rounded-2xl text-sm mb-6">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </div>
        )}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3.5 rounded-2xl text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Nom</label>
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required placeholder="Votre nom" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="votre@email.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Sujet</label>
            <input type="text" value={sujet} onChange={(e) => setSujet(e.target.value)} required placeholder="Objet de votre message" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Message</label>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Écrivez votre message ici..." className={inputClass} style={{ resize: 'none' }} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-3 rounded-2xl transition-all active:scale-[0.98] shadow-soft"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  )
}
