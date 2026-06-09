import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, Circle, ChevronLeft, ChevronRight, FileText, Video, FileDown, BookOpen, ClipboardList, CheckSquare, XCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchLessons, fetchLessonById } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectCurrentLesson, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { fetchMyEnrollments, updateProgress } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments } from '../../features/enrollment/enrollmentSelectors'
import { setCurrentLesson } from '../../features/lesson/lessonSlice'
import { fetchQuizzesByCourse } from '../../features/quiz/quizThunks'
import { selectCourseQuizzes } from '../../features/quiz/quizSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: FileText, text: FileText, exercice: FileText }

const tabs = [
  { key: 'lessons', label: 'Leçons', icon: BookOpen },
  { key: 'exercices', label: 'Exercices', icon: ClipboardList },
] as const

type TabKey = (typeof tabs)[number]['key']

export default function CourseViewPage() {
  const { id: courseId } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<TabKey>('lessons')

  const lessons = useAppSelector(selectAllLessons)
  const currentLesson = useAppSelector(selectCurrentLesson)
  const loading = useAppSelector(selectLessonLoading)
  const enrollments = useAppSelector(selectMyEnrollments)
  const courseQuizzes = useAppSelector(selectCourseQuizzes)
  const enrollment = enrollments.find((e) => String(e.coursId) === courseId)
  const completedLessons: string[] = enrollment?.completedLessons || []

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons({ coursId: courseId, status: 'publié' }))
      dispatch(fetchMyEnrollments())
      dispatch(fetchQuizzesByCourse({ coursId: courseId, status: 'publié' }))
    }
    return () => { dispatch(setCurrentLesson(null)) }
  }, [dispatch, courseId])

  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      dispatch(fetchLessonById(lessons[0].id))
    }
  }, [lessons, currentLesson, dispatch])

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson?.id)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const isCurrentCompleted = currentLesson ? completedLessons.includes(currentLesson.id) : false

  const handleLessonClick = (lessonId: string) => {
    dispatch(fetchLessonById(lessonId))
  }

  const handleComplete = async () => {
    if (courseId && currentLesson) {
      const result = await dispatch(updateProgress({ coursId: courseId, lessonId: currentLesson.id }))
      if (updateProgress.fulfilled.match(result)) {
        dispatch(fetchMyEnrollments())
      }
    }
  }

  const renderLessonContent = () => {
    if (!currentLesson) return null
    const { type, contenu } = currentLesson

    if (type === 'video' && contenu) {
      const videoUrl = contenu.startsWith('http') ? contenu : `${API_BASE}${contenu}`
      return (
        <div className="bg-black rounded-lg overflow-hidden mb-6">
          <video controls className="w-full max-h-[500px] outline-none" key={videoUrl}>
            <source src={videoUrl} />
          </video>
        </div>
      )
    }

    if (type === 'pdf' && contenu) {
      const pdfUrl = contenu.startsWith('http') ? contenu : `${API_BASE}${contenu}`
      return (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-surface-500">Document PDF</p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
              <FileDown size={16} /> Télécharger
            </a>
          </div>
          <iframe src={pdfUrl} className="w-full h-[500px] rounded-lg border border-surface-200" />
        </div>
      )
    }

    if (type === 'exercice' && contenu) {
      return (
        <div className="min-h-[300px] bg-surface-50 rounded-lg p-8 text-surface-700 mb-6 whitespace-pre-wrap leading-relaxed">
          {contenu}
        </div>
      )
    }

    return (
      <div className="min-h-[300px] bg-surface-50 rounded-lg p-8 text-surface-700 mb-6 whitespace-pre-wrap leading-relaxed">
        {contenu || 'Contenu à venir...'}
      </div>
    )
  }

  const renderLessonsTab = () => (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-72 shrink-0">
        <Card padding={false}>
          <div className="p-4 border-b border-surface-200">
            <h2 className="font-semibold text-surface-900 text-sm">Contenu du cours</h2>
            <p className="text-xs text-surface-400">{enrollment?.progress || 0}% complété</p>
            <div className="w-full bg-surface-100 rounded-full h-1.5 mt-2">
              <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${enrollment?.progress || 0}%` }} />
            </div>
          </div>
          <div className="divide-y divide-surface-100 max-h-[60vh] overflow-y-auto">
            {lessons.map((lesson) => {
              const Icon = typeIcons[lesson.type] || FileText
              const isActive = lesson.id === currentLesson?.id
              const isCompleted = completedLessons.includes(lesson.id)
              return (
                <button key={lesson.id} onClick={() => handleLessonClick(lesson.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 transition ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-surface-50 text-surface-600'
                  }`}>
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-success-500 shrink-0" />
                  ) : (
                    <Circle size={16} className="text-surface-300 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-primary-700' : 'text-surface-700'}`}>
                      {lesson.titre}
                    </p>
                    <span className="text-xs text-surface-400 flex items-center gap-1">
                      <Icon size={12} /> {lesson.duree || 'N/A'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0">
        {loading && !currentLesson ? (
          <div className="text-center py-20 text-surface-400">Chargement de la leçon...</div>
        ) : currentLesson ? (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-surface-400">Leçon {currentIndex + 1} sur {lessons.length}</p>
                <h1 className="text-2xl font-bold text-surface-900 mt-1">{currentLesson.titre}</h1>
              </div>
              <Badge variant="info">{currentLesson.type}</Badge>
            </div>

            {renderLessonContent()}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button onClick={handleComplete}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                    isCurrentCompleted
                      ? 'text-warning-600 bg-warning-50 hover:bg-warning-100'
                      : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                  }`}>
                  {isCurrentCompleted ? <XCircle size={16} /> : <CheckSquare size={16} />}
                  {isCurrentCompleted ? 'Annuler' : 'Marquer comme terminé'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-surface-200">
              <Link to={prevLesson ? '#' : ''} onClick={(e) => { if (prevLesson) { e.preventDefault(); handleLessonClick(prevLesson.id) } }}
                className={`flex items-center gap-1 text-sm font-medium ${prevLesson ? 'text-primary-600 hover:text-primary-700' : 'text-surface-300 pointer-events-none'}`}>
                <ChevronLeft size={16} /> Précédent
              </Link>
              <span className="text-sm text-surface-400">{currentIndex + 1}/{lessons.length}</span>
              <Link to={nextLesson ? '#' : ''} onClick={(e) => { if (nextLesson) { e.preventDefault(); handleLessonClick(nextLesson.id) } }}
                className={`flex items-center gap-1 text-sm font-medium ${nextLesson ? 'text-primary-600 hover:text-primary-700' : 'text-surface-300 pointer-events-none'}`}>
                Suivant <ChevronRight size={16} />
              </Link>
            </div>
          </Card>
        ) : (
          <div className="text-center py-20 text-surface-400">Sélectionnez une leçon pour commencer</div>
        )}
      </div>
    </div>
  )

  const renderExercicesTab = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-surface-900">Exercices et quiz</h2>
      {courseQuizzes.length === 0 ? (
        <div className="text-center py-12 text-surface-400">Aucun exercice disponible pour ce cours.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courseQuizzes.map((quiz) => (
            <Card key={quiz.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ClipboardList size={20} className="text-primary-600" />
                  <h3 className="font-semibold text-surface-900">{quiz.titre}</h3>
                </div>
                <Badge variant="info">Quiz</Badge>
              </div>
              <p className="text-sm text-surface-500 mb-4">
                {quiz.questions?.length || 0} question{(quiz.questions?.length || 0) > 1 ? 's' : ''}
              </p>
              <Link to={`/student/quiz/${quiz.id}`}
                className="inline-flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
                Commencer
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 w-fit">
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
            </button>
          )
        })}
      </div>

      {activeTab === 'lessons' ? renderLessonsTab() : renderExercicesTab()}
    </div>
  )
}
