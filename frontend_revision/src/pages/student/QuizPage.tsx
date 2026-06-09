import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchQuizById, submitQuizAttempt } from '../../features/quiz/quizThunks'
import { selectCurrentQuiz, selectQuizLoading, selectLastAttempt } from '../../features/quiz/quizSelectors'
import { resetAttempt } from '../../features/quiz/quizSlice'
import Card from '../../components/ui/Card'

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(selectCurrentQuiz)
  const loading = useAppSelector(selectQuizLoading)
  const attempt = useAppSelector(selectLastAttempt)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  useEffect(() => {
    if (quizId) dispatch(fetchQuizById(Number(quizId)))
    return () => { dispatch(resetAttempt()) }
  }, [dispatch, quizId])

  const questions = quiz?.questions || []
  const total = questions.length
  const answeredCount = Object.keys(answers).length

  const handleAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleSubmit = () => {
    if (quizId) {
      dispatch(submitQuizAttempt({ quizId: Number(quizId), answers }))
    }
  }

  if (loading && !quiz) return <div className="text-center py-20 text-surface-400">Chargement du quiz...</div>
  if (!quiz) return <div className="text-center py-20 text-surface-400">Quiz introuvable</div>

  if (attempt) {
    const percentage = Math.round((attempt.score / attempt.total) * 100)
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Card className="p-10">
          <div className="w-20 h-20 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Quiz terminé !</h2>
          <p className="text-surface-500 mb-6">Voici votre score</p>
          <div className="text-5xl font-bold text-primary-600 mb-2">{percentage}%</div>
          <p className="text-surface-600">{attempt.score} / {attempt.total} bonnes réponses</p>
        </Card>
      </div>
    )
  }

  const q = questions[currentQuestion]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{quiz.titre}</h1>
          <p className="text-sm text-surface-500">{answeredCount}/{total} questions répondues</p>
        </div>
      </div>

      <div className="w-full bg-surface-100 rounded-full h-2">
        <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${(answeredCount / total) * 100}%` }} />
      </div>

      {q && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-surface-400">Question {currentQuestion + 1} sur {total}</span>
          </div>
          <h2 className="text-xl font-semibold text-surface-900 mb-6">{q.texte}</h2>

          <div className="space-y-3 mb-8">
            {q.options.map((option) => (
              <button key={option.id} onClick={() => handleAnswer(q.id, option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  answers[q.id] === option.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-surface-200 hover:border-primary-300 text-surface-700'
                }`}>
                {option.texte}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-surface-200">
            <button onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))} disabled={currentQuestion === 0}
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 disabled:text-surface-300 disabled:pointer-events-none">
              <ChevronLeft size={16} /> Précédent
            </button>

            {currentQuestion < total - 1 ? (
              <button onClick={() => setCurrentQuestion((p) => Math.min(total - 1, p + 1))}
                className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
                Suivant <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={answeredCount < total}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium disabled:opacity-50">
                <Send size={16} /> Soumettre
              </button>
            )}
          </div>
        </Card>
      )}

      {total === 0 && (
        <div className="text-center py-12 text-surface-400">Ce quiz ne contient pas encore de questions.</div>
      )}
    </div>
  )
}
