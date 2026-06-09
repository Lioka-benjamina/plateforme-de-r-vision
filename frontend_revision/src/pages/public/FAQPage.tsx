import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Comment créer un compte sur la plateforme ?',
    answer: 'Rendez-vous sur la page d\'inscription, choisissez votre rôle (professeur, étudiant ou parent) et remplissez le formulaire avec vos informations. Vous recevrez un email de confirmation pour activer votre compte.',
  },
  {
    question: 'Les cours sont-ils gratuits ?',
    answer: 'Certains cours sont gratuits, d\'autres sont payants. Le prix est indiqué sur chaque fiche de cours. Les cours gratuits sont accessibles sans abonnement.',
  },
  {
    question: 'Comment suivre ma progression ?',
    answer: 'Votre tableau de bord affiche l\'avancement de chaque cours que vous suivez. Vous pouvez voir les leçons complétées, le temps passé et les notes obtenues.',
  },
  {
    question: 'Puisz-je télécharger les cours ?',
    answer: 'Oui, les cours sont disponibles en téléchargement au format PDF pour les leçons, et en vidéo pour les supports multimédia. Vous pouvez y accéder hors ligne depuis votre espace personnel.',
  },
  {
    question: 'Comment contacter un professeur ?',
    answer: 'Chaque cours dispose d\'un espace de discussion. Vous pouvez poser vos questions directement au professeur depuis la page du cours.',
  },
  {
    question: 'Les certificats sont-ils délivrés ?',
    answer: 'Oui, à la fin de chaque cours payant, un certificat de réussite est délivré si vous validez l\'évaluation finale. Il est téléchargeable depuis votre profil.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero */}
      <section className="rounded-xl bg-primary-600 p-10 md:p-14">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Questions fréquentes</h1>
            <p className="text-primary-200 mt-1.5 text-sm">Retrouvez les réponses aux questions les plus posées.</p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
              openIndex === index ? 'border-primary-200' : 'border-surface-100 hover:border-surface-200'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="font-medium text-surface-900 pr-4 text-sm leading-relaxed">{faq.question}</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                openIndex === index ? 'bg-primary-50 text-primary-600' : 'bg-surface-100 text-surface-400'
              }`}>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-5 text-sm text-surface-500 leading-relaxed border-t border-surface-50 pt-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}