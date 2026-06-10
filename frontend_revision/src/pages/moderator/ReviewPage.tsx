import { useEffect, useState } from 'react'
import { Check, X, Eye, BookOpen, FileText, ClipboardList, X as XIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCours, approveCours, rejectCours } from '../../features/cours/coursThunks'
import { selectAllCours, selectCoursLoading } from '../../features/cours/coursSelectors'
import { fetchLessons, approveLesson, rejectLesson } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { fetchQuizzes, approveQuiz, rejectQuiz } from '../../features/quiz/quizThunks'
import { selectAllQuizzes, selectQuizLoading } from '../../features/quiz/quizSelectors'
import { useToast } from '../../components/ui/Toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

type TabKey = 'cours' | 'lessons' | 'quizzes'

export default function ReviewPage() {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const cours = useAppSelector(selectAllCours)
  const coursLoading = useAppSelector(selectCoursLoading)
  const lessons = useAppSelector(selectAllLessons)
  const lessonLoading = useAppSelector(selectLessonLoading)
  const quizzes = useAppSelector(selectAllQuizzes)
  const quizLoading = useAppSelector(selectQuizLoading)

  const [activeTab, setActiveTab] = useState<TabKey>('cours')
  const [viewItem, setViewItem] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchCours())
    dispatch(fetchLessons({}))
    dispatch(fetchQuizzes())
  }, [dispatch])

  const pendingCours = cours.filter((c) => c.status === 'en_attente')
  const pendingLessons = lessons.filter((l) => l.status === 'en_attente')
  const pendingQuizzes = quizzes.filter((q) => q.status === 'en_attente')

  const tabs: { key: TabKey; label: string; icon: typeof BookOpen; count: number }[] = [
    { key: 'cours', label: 'Cours', icon: BookOpen, count: pendingCours.length },
    { key: 'lessons', label: 'Leçons', icon: FileText, count: pendingLessons.length },
    { key: 'quizzes', label: 'Quiz', icon: ClipboardList, count: pendingQuizzes.length },
  ]

  const handleApproveCours = (id: number) => {
    dispatch(approveCours(id)).then((r) => {
      if (approveCours.fulfilled.match(r)) showToast('Cours approuvé', 'success')
      else showToast("Erreur d'approbation", 'error')
    })
  }
  const handleRejectCours = (id: number) => {
    dispatch(rejectCours(id)).then((r) => {
      if (rejectCours.fulfilled.match(r)) showToast('Cours rejeté', 'warning')
      else showToast('Erreur de rejet', 'error')
    })
  }
  const handleApproveLesson = (id: string) => {
    dispatch(approveLesson(id)).then((r) => {
      if (approveLesson.fulfilled.match(r)) showToast('Leçon approuvée', 'success')
      else showToast("Erreur d'approbation", 'error')
    })
  }
  const handleRejectLesson = (id: string) => {
    dispatch(rejectLesson(id)).then((r) => {
      if (rejectLesson.fulfilled.match(r)) showToast('Leçon rejetée', 'warning')
      else showToast('Erreur de rejet', 'error')
    })
  }
  const handleApproveQuiz = (id: number) => {
    dispatch(approveQuiz(id)).then((r) => {
      if (approveQuiz.fulfilled.match(r)) showToast('Quiz approuvé', 'success')
      else showToast("Erreur d'approbation", 'error')
    })
  }
  const handleRejectQuiz = (id: number) => {
    dispatch(rejectQuiz(id)).then((r) => {
      if (rejectQuiz.fulfilled.match(r)) showToast('Quiz rejeté', 'warning')
      else showToast('Erreur de rejet', 'error')
    })
  }

  const loading = coursLoading || lessonLoading || quizLoading

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Contenu à valider</h1>
        <p className="text-surface-500 mt-1">
          {pendingCours.length + pendingLessons.length + pendingQuizzes.length} élément{pendingCours.length + pendingLessons.length + pendingQuizzes.length !== 1 ? 's' : ''} en attente
        </p>
      </div>

      <div className="flex gap-1 bg-surface-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-white text-surface-900 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}>
              <Icon size={16} />
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-semibold">
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="text-center py-12 text-surface-400">Chargement...</div>
      ) : (
        <>
          {activeTab === 'cours' && (
            <Card padding={false}>
              {pendingCours.length === 0 ? (
                <div className="text-center py-12 text-surface-400">Aucun cours en attente</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-200">
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Titre</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Professeur</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Matière</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingCours.map((c) => (
                        <tr key={c.id} className="border-b border-surface-100 hover:bg-surface-50 transition">
                          <td className="py-3 px-4 font-medium text-surface-900">{c.titre}</td>
                          <td className="py-3 px-4 text-surface-600">{c.professor || 'N/A'}</td>
                          <td className="py-3 px-4 text-surface-600">{c.category || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setViewItem({ type: 'cours', data: c })}
                                className="p-1.5 rounded-lg text-primary-500 hover:bg-primary-50 transition" title="Voir">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleApproveCours(c.id)}
                                className="p-1.5 rounded-lg text-success-500 hover:bg-success-50 transition" title="Approuver">
                                <Check size={16} />
                              </button>
                              <button onClick={() => handleRejectCours(c.id)}
                                className="p-1.5 rounded-lg text-error-500 hover:bg-error-50 transition" title="Rejeter">
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'lessons' && (
            <Card padding={false}>
              {pendingLessons.length === 0 ? (
                <div className="text-center py-12 text-surface-400">Aucune leçon en attente</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-200">
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Titre</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Cours</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingLessons.map((l) => (
                        <tr key={l.id} className="border-b border-surface-100 hover:bg-surface-50 transition">
                          <td className="py-3 px-4 font-medium text-surface-900">{l.titre}</td>
                          <td className="py-3 px-4 text-surface-600">
                            <Badge variant="default">{l.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-surface-600">{l.cours_id?.slice(0, 8)}...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setViewItem({ type: 'lesson', data: l })}
                                className="p-1.5 rounded-lg text-primary-500 hover:bg-primary-50 transition" title="Voir">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleApproveLesson(l.id)}
                                className="p-1.5 rounded-lg text-success-500 hover:bg-success-50 transition" title="Approuver">
                                <Check size={16} />
                              </button>
                              <button onClick={() => handleRejectLesson(l.id)}
                                className="p-1.5 rounded-lg text-error-500 hover:bg-error-50 transition" title="Rejeter">
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'quizzes' && (
            <Card padding={false}>
              {pendingQuizzes.length === 0 ? (
                <div className="text-center py-12 text-surface-400">Aucun quiz en attente</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-200">
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Titre</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Questions</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Cours</th>
                        <th className="text-left py-3 px-4 font-medium text-surface-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingQuizzes.map((q) => (
                        <tr key={q.id} className="border-b border-surface-100 hover:bg-surface-50 transition">
                          <td className="py-3 px-4 font-medium text-surface-900">{q.titre}</td>
                          <td className="py-3 px-4 text-surface-600">{q.questions?.length || 0} questions</td>
                          <td className="py-3 px-4 text-surface-600">{q.cours_id?.slice(0, 8)}...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setViewItem({ type: 'quiz', data: q })}
                                className="p-1.5 rounded-lg text-primary-500 hover:bg-primary-50 transition" title="Voir">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleApproveQuiz(q.id)}
                                className="p-1.5 rounded-lg text-success-500 hover:bg-success-50 transition" title="Approuver">
                                <Check size={16} />
                              </button>
                              <button onClick={() => handleRejectQuiz(q.id)}
                                className="p-1.5 rounded-lg text-error-500 hover:bg-error-50 transition" title="Rejeter">
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {viewItem && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">
                {viewItem.type === 'cours' ? 'Détail du cours' : viewItem.type === 'lesson' ? 'Détail de la leçon' : 'Détail du quiz'}
              </h2>
              <button onClick={() => setViewItem(null)} className="p-1 hover:bg-surface-100 rounded-lg transition">
                <XIcon size={20} className="text-surface-400" />
              </button>
            </div>

            {viewItem.type === 'cours' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Titre</p>
                  <p className="text-sm font-medium text-surface-900">{viewItem.data.titre}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Professeur</p>
                  <p className="text-sm text-surface-700">{viewItem.data.professor || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Matière</p>
                  <p className="text-sm text-surface-700">{viewItem.data.category || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Description</p>
                  <p className="text-sm text-surface-700 whitespace-pre-wrap">{viewItem.data.description || 'Aucune description'}</p>
                </div>
              </div>
            )}

            {viewItem.type === 'lesson' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Titre</p>
                  <p className="text-sm font-medium text-surface-900">{viewItem.data.titre}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Type</p>
                  <Badge variant="default">{viewItem.data.type}</Badge>
                </div>
                {viewItem.data.duree && (
                  <div>
                    <p className="text-xs text-surface-400 uppercase tracking-wide">Durée</p>
                    <p className="text-sm text-surface-700">{viewItem.data.duree}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Contenu</p>
                  <div className="text-sm text-surface-700 whitespace-pre-wrap bg-surface-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                    {viewItem.data.contenu || 'Aucun contenu'}
                  </div>
                </div>
              </div>
            )}

            {viewItem.type === 'quiz' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Titre</p>
                  <p className="text-sm font-medium text-surface-900">{viewItem.data.titre}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-wide">Nombre de questions</p>
                  <p className="text-sm text-surface-700">{viewItem.data.questions?.length || 0}</p>
                </div>
                {viewItem.data.questions && viewItem.data.questions.length > 0 && (
                  <div>
                    <p className="text-xs text-surface-400 uppercase tracking-wide mb-2">Questions</p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {viewItem.data.questions.map((q: any, i: number) => (
                        <div key={q.id || i} className="bg-surface-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-surface-900 mb-1">{i + 1}. {q.texte}</p>
                          {q.options && (
                            <div className="space-y-1 ml-4">
                              {q.options.map((opt: any) => (
                                <p key={opt.id} className={`text-xs ${opt.correct ? 'text-emerald-600 font-semibold' : 'text-surface-500'}`}>
                                  {opt.correct ? '✓' : '○'} {opt.texte}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4 mt-4 border-t border-surface-200">
              <button onClick={() => {
                if (viewItem.type === 'cours') handleApproveCours(viewItem.data.id)
                else if (viewItem.type === 'lesson') handleApproveLesson(viewItem.data.id)
                else handleApproveQuiz(viewItem.data.id)
                setViewItem(null)
              }} className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
                <Check size={16} /> Approuver
              </button>
              <button onClick={() => {
                if (viewItem.type === 'cours') handleRejectCours(viewItem.data.id)
                else if (viewItem.type === 'lesson') handleRejectLesson(viewItem.data.id)
                else handleRejectQuiz(viewItem.data.id)
                setViewItem(null)
              }} className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
                <X size={16} /> Rejeter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
