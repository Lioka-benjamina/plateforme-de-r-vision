import { Link } from 'react-router-dom'
import { BookOpen, BarChart3, TrendingUp, GraduationCap, Users, ClipboardList, ArrowRight, CheckCircle2, Play, Star } from 'lucide-react'

const features = [
  {
    title: 'Cours en ligne',
    desc: 'Accédez à des cours structurés par matière, avec des contenus pédagogiques adaptés à chaque niveau.',
    icon: BookOpen,
    tag: 'Apprentissage',
    gradient: 'from-violet-500 to-purple-600',
    soft: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Suivi de progression',
    desc: 'Visualisez l\'avancement de chaque étudiant avec des indicateurs clairs et des statistiques détaillées.',
    icon: BarChart3,
    tag: 'Analytique',
    gradient: 'from-sky-500 to-blue-600',
    soft: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Suivi de formation',
    desc: 'Planifiez et suivez les parcours de formation avec des objectifs clairs et des échéances personnalisées.',
    icon: TrendingUp,
    tag: 'Planification',
    gradient: 'from-emerald-500 to-teal-600',
    soft: 'bg-emerald-50 text-emerald-600',
  },
]

const stats = [
  { label: 'Étudiants actifs', value: '500+', sub: 'et en croissance' },
  { label: 'Cours disponibles', value: '120+', sub: 'mis à jour régulièrement' },
  { label: 'Matières couvertes', value: '25+', sub: 'tous niveaux' },
  { label: 'Formateurs experts', value: '40+', sub: 'certifiés' },
]

const roles = [
  {
    role: 'Professeur',
    desc: 'Créez, publiez et gérez vos cours depuis un tableau de bord intuitif.',
    icon: GraduationCap,
    perks: ['Création de cours', 'Gestion des étudiants', 'Statistiques détaillées'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    role: 'Étudiant',
    desc: 'Accédez à vos cours, suivez votre progression et préparez vos évaluations.',
    icon: Users,
    perks: ['Accès illimité', 'Suivi de progression', 'Quiz & évaluations'],
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    featured: true,
  },
  {
    role: 'Parent',
    desc: 'Restez informé des résultats de vos enfants et suivez leur parcours académique.',
    icon: ClipboardList,
    perks: ['Tableau de bord famille', 'Rapports de progression', 'Alertes & notifications'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── HERO ── split layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* left half bg */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-surface-950" />
        {/* right half bg */}
        <div className="absolute inset-y-0 right-0 w-0 lg:w-1/2 bg-white" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[90vh] py-20">

            {/* Left: text */}
            <div className="lg:pr-16 xl:pr-24">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex -space-x-2">
                  {['V', 'M', 'A', 'L'].map((l, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-surface-900 bg-primary-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-surface-400">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-surface-500">· 500+ apprenants</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-6">
                La plateforme<br />
                qui{' '}
                <span className="relative">
                  <span className="text-primary-400">transforme</span>
                </span>
                <br />vos révisions
              </h1>

              <p className="text-surface-400 text-base leading-relaxed mb-10 max-w-md">
                Cours structurés, suivi de progression en temps réel et outils pédagogiques pour professeurs, étudiants et parents.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-primary-900/40"
                >
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all text-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Voir le catalogue
                </Link>
              </div>
            </div>

            {/* Right: stats cards */}
            <div className="lg:pl-16 xl:pl-24">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl p-6 border ${
                      i === 1
                        ? 'bg-primary-600 border-primary-500 col-span-1'
                        : 'bg-white border-surface-100'
                    }`}
                  >
                    <p className={`text-3xl font-black tracking-tight ${i === 1 ? 'text-white' : 'text-surface-900'}`}>
                      {s.value}
                    </p>
                    <p className={`text-sm font-semibold mt-0.5 ${i === 1 ? 'text-primary-100' : 'text-surface-700'}`}>
                      {s.label}
                    </p>
                    <p className={`text-xs mt-1 ${i === 1 ? 'text-primary-200' : 'text-surface-400'}`}>
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── horizontal scroll-like cards */}
      <section className="py-28 bg-surface-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Ce qu'on offre</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-surface-900 tracking-tight leading-tight">
                Tout ce dont vous<br />avez besoin
              </h2>
            </div>
            <p className="text-sm text-surface-500 max-w-xs leading-relaxed md:text-right">
              Une plateforme conçue pour simplifier l'apprentissage et le suivi pédagogique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={f.title} className={`relative rounded-2xl overflow-hidden ${i === 1 ? 'md:-translate-y-4' : ''}`}>
                  {/* gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${f.gradient}`} />
                  <div className="bg-white border border-surface-100 border-t-0 rounded-b-2xl p-8">
                    <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${f.soft}`}>
                      {f.tag}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${f.gradient}`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ROLES ── asymmetric */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Qui utilise Revision ?</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-surface-900 tracking-tight">
              Pour tous les acteurs<br />de l'éducation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {roles.map((r) => {
              const Icon = r.icon
              return (
                <div
                  key={r.role}
                  className={`rounded-2xl p-7 transition-all duration-200 ${
                    r.featured
                      ? `bg-surface-950 border ${r.border}`
                      : `bg-white ${r.border} hover:shadow-md hover:-translate-y-0.5`
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${r.featured ? 'bg-primary-600' : r.bg}`}>
                    <Icon size={20} className={r.featured ? 'text-white' : r.color} />
                  </div>
                  <h3 className={`text-xl font-bold mb-1.5 ${r.featured ? 'text-primary-600' : 'text-surface-900'}`}>
                    {r.role}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${r.featured ? 'text-surface-400' : 'text-surface-500'}`}>
                    {r.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {r.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${r.featured ? 'text-primary-400' : 'text-emerald-500'}`} />
                        <span className={r.featured ? 'text-surface-300' : 'text-surface-600'}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── full-width dark band */}
      <section className="bg-surface-950 py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">Prêt à démarrer ?</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black  tracking-tight leading-tight">
                Rejoignez des centaines<br />d'apprenants dès aujourd'hui
              </h2>
              <p className="mt-4 text-surface-400 text-sm leading-relaxed max-w-sm">
                Inscription gratuite, accès immédiat. Aucune carte de crédit requise.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-start xl:items-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-[0.98] text-base shadow-xl shadow-primary-900/50"
              >
                Créer un compte gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 border border-surface-700 hover:border-surface-500 text-surface-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all text-sm"
              >
                Explorer le catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}