import { useEffect } from 'react'
import { ClipboardList, HelpCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchQuizzes } from '../../features/quiz/quizThunks'
import { selectAllQuizzes, selectQuizLoading } from '../../features/quiz/quizSelectors'
import { fetchMyEnrollments } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments } from '../../features/enrollment/enrollmentSelectors'
import Card from '../../components/ui/Card'

interface QuizItem {
  id: string
  titre: string
  cours_id: string
  questions?: { length: number }
}

export default function StudentQuizzesPage() {
  const dispatch = useAppDispatch()
  const quizzes = useAppSelector(selectAllQuizzes)
  const loading = useAppSelector(selectQuizLoading)
  const enrollments = useAppSelector(selectMyEnrollments)

  useEffect(() => {
    dispatch(fetchQuizzes())
    dispatch(fetchMyEnrollments())
  }, [dispatch])

  const enrolledCourseIds = enrollments.map((e) => String(e.coursId))
  const availableQuizzes = quizzes.filter((q: QuizItem) =>
    enrolledCourseIds.includes(String(q.cours_id))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Quiz disponibles</h1>
        <p className="text-surface-500 mt-1">Testez vos connaissances sur les cours que vous suivez.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-surface-400">Chargement...</div>
      ) : availableQuizzes.length === 0 ? (
        <div className="text-center py-20 text-surface-400">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="font-medium">Aucun quiz disponible</p>
          <p className="text-sm mt-1">Inscrivez-vous à des cours pour voir les quiz associés.</p>
          <Link to="/student/courses" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
            Voir mes cours <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableQuizzes.map((q: QuizItem) => (
            <Card key={q.id} className="p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-surface-900 text-sm truncate">{q.titre}</p>
                  <p className="text-xs text-surface-400">{q.questions?.length || 0} questions</p>
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-surface-100">
                <Link
                  to={`/student/quiz/${q.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  Commencer <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
