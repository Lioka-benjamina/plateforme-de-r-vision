import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQuiz, updateQuiz, fetchQuizzes } from '../../features/quiz/quizThunks'
import { fetchCours } from '../../features/cours/coursThunks'
import { Plus, Trash2 } from 'lucide-react'

interface QuestionInput {
  id: string
  texte: string
  options: { id: string; texte: string; correct: boolean }[]
}

export default function QuizFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items: coursList } = useAppSelector((s) => s.cours)
  const { items: quizzes, loading, error } = useAppSelector((s) => s.quiz)

  const [titre, setTitre] = useState('')
  const [coursId, setCoursId] = useState('')
  const [questions, setQuestions] = useState<QuestionInput[]>([])

  useEffect(() => {
    dispatch(fetchCours())
    if (isEdit) dispatch(fetchQuizzes())
  }, [dispatch, isEdit])

  useEffect(() => {
    if (isEdit && id) {
      const quiz = quizzes.find((q: any) => String(q.id) === id)
      if (quiz) {
        setTitre((quiz as any).titre || '')
        setCoursId((quiz as any).cours_id || '')
        if ((quiz as any).questions) {
          setQuestions((quiz as any).questions.map((q: any) => ({
            id: q.id,
            texte: q.texte,
            options: q.options.map((o: any) => ({
              id: o.id,
              texte: o.texte,
              correct: o.correct || false,
            })),
          })))
        }
      }
    }
  }, [isEdit, id, quizzes])

  const addQuestion = () => {
    setQuestions([...questions, {
      id: crypto.randomUUID(),
      texte: '',
      options: [
        { id: crypto.randomUUID(), texte: '', correct: false },
        { id: crypto.randomUUID(), texte: '', correct: false },
      ],
    }])
  }

  const removeQuestion = (qId: string) => setQuestions(questions.filter((q) => q.id !== qId))
  const updateQuestion = (qId: string, texte: string) => setQuestions(questions.map((q) => q.id === qId ? { ...q, texte } : q))

  const addOption = (qId: string) => setQuestions(questions.map((q) => q.id === qId ? {
    ...q, options: [...q.options, { id: crypto.randomUUID(), texte: '', correct: false }],
  } : q))

  const updateOption = (qId: string, oId: string, texte: string) => setQuestions(questions.map((q) => q.id === qId ? {
    ...q, options: q.options.map((o) => o.id === oId ? { ...o, texte } : o),
  } : q))

  const toggleCorrect = (qId: string, oId: string) => setQuestions(questions.map((q) => q.id === qId ? {
    ...q, options: q.options.map((o) => ({ ...o, correct: o.id === oId })),
  } : q))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      titre,
      coursId,
      questions: questions.map((q) => ({
        id: q.id,
        texte: q.texte,
        options: q.options.map((o) => ({ id: o.id, texte: o.texte, correct: o.correct })),
      })),
    }
    if (isEdit && id) {
      const result = await dispatch(updateQuiz({ id: id as any, ...payload } as any))
      if (updateQuiz.fulfilled.match(result)) navigate('/professor/quizzes')
    } else {
      const result = await dispatch(createQuiz(payload as any))
      if (createQuiz.fulfilled.match(result)) navigate('/professor/quizzes')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-surface-900 tracking-tight">{isEdit ? 'Modifier le quiz' : 'Nouveau quiz'}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-1">Titre du quiz</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} required
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-surface-700 mb-1">Cours associé</label>
          <select value={coursId} onChange={(e) => setCoursId(e.target.value)} required
            className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 bg-white transition-all">
            <option value="">Sélectionner un cours</option>
            {coursList.map((c: any) => (
              <option key={c.id} value={c.id}>{c.titre}</option>
            ))}
          </select>
        </div>
        <div className="border-t border-surface-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-surface-900">Questions</h2>
            <button type="button" onClick={addQuestion}
              className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all shadow-soft active:scale-[0.98]">
              <Plus size={16} /> Ajouter une question
            </button>
          </div>
          {questions.map((q, qi) => (
            <div key={q.id} className="border border-surface-200 rounded-2xl p-4 mb-3 bg-surface-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-surface-900">Question {qi + 1}</span>
                <button type="button" onClick={() => removeQuestion(q.id)} className="p-2 text-error-500 hover:text-error-600 transition-all rounded-xl hover:bg-error-50"><Trash2 size={16} /></button>
              </div>
              <input value={q.texte} onChange={(e) => updateQuestion(q.id, e.target.value)} placeholder="Texte de la question" required
                className="w-full px-4 py-3 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 mb-3 transition-all" />
              <div className="space-y-2">
                {q.options.map((o) => (
                  <label key={o.id} className={`flex items-center gap-2 p-1.5 rounded-xl cursor-pointer ${o.correct ? 'bg-success-50' : ''}`}>
                    <input type="radio" name={`correct-${q.id}`} checked={o.correct} onChange={() => toggleCorrect(q.id, o.id)} className="text-primary-500" />
                    <input value={o.texte} onChange={(e) => updateOption(q.id, o.id, e.target.value)} placeholder={`Option ${q.options.indexOf(o) + 1}`} required
                      className="flex-1 px-3 py-2 border border-surface-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
                  </label>
                ))}
                <button type="button" onClick={() => addOption(q.id)}
                  className="text-xs text-surface-500 hover:text-surface-700 border border-dashed border-surface-300 rounded-xl px-3 py-1.5 transition-all">
                  + Ajouter une option
                </button>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-error-500 text-sm">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 shadow-soft active:scale-[0.98]">
            {loading ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer le quiz'}
          </button>
          <button type="button" onClick={() => navigate('/professor/quizzes')}
            className="inline-flex items-center gap-2 bg-surface-100 text-surface-700 px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-surface-200 transition-all active:scale-[0.98]">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
