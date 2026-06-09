import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, Circle, ChevronLeft, ChevronRight, FileText, Video } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchLessons, fetchLessonById } from '../../features/lesson/lessonThunks'
import { selectAllLessons, selectCurrentLesson, selectLessonLoading } from '../../features/lesson/lessonSelectors'
import { fetchMyEnrollments, updateProgress } from '../../features/enrollment/enrollmentThunks'
import { selectMyEnrollments } from '../../features/enrollment/enrollmentSelectors'
import { setCurrentLesson } from '../../features/lesson/lessonSlice'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: FileText, text: FileText, image: FileText }

export default function CourseViewPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const dispatch = useAppDispatch()
  const lessons = useAppSelector(selectAllLessons)
  const currentLesson = useAppSelector(selectCurrentLesson)
  const loading = useAppSelector(selectLessonLoading)
  const enrollments = useAppSelector(selectMyEnrollments)
  const enrollment = enrollments.find((e) => e.coursId === Number(courseId))

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons(Number(courseId)))
      dispatch(fetchMyEnrollments())
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

  const handleLessonClick = (lessonId: number) => {
    dispatch(fetchLessonById(lessonId))
    if (courseId) dispatch(updateProgress({ coursId: Number(courseId), lessonId }))
  }

  return (
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
              return (
                <button key={lesson.id} onClick={() => handleLessonClick(lesson.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 transition ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-surface-50 text-surface-600'
                  }`}>
                  {lesson.id <= (currentIndex + 1) ? (
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

            <div className="min-h-[300px] bg-surface-50 rounded-lg flex items-center justify-center text-surface-400 mb-6">
              {currentLesson.type === 'video' ? (
                <div className="text-center">
                  <Video size={48} className="mx-auto mb-2 text-primary-300" />
                  <p>Lecteur vidéo</p>
                </div>
              ) : (
                <div className="p-8 text-surface-600 max-w-2xl">
                  <p>{currentLesson.contenu || 'Contenu à venir...'}</p>
                </div>
              )}
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
}
