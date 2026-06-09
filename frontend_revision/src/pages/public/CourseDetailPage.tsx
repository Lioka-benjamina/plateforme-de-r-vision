import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  BarChart3,
  User,
  Play,
  FileText,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  ClipboardList,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCours } from "../../features/cours/coursThunks";
import {
  selectAllCours,
  selectCoursLoading,
} from "../../features/cours/coursSelectors";
import { fetchQuizzes } from "../../features/quiz/quizThunks";
import { selectIsAuthenticated, selectUser } from "../../features/auth/authSelectors";
import { fetchLessons } from "../../features/lesson/lessonThunks";
import {
  selectAllLessons,
  selectLessonLoading,
} from "../../features/lesson/lessonSelectors";
import { enrollCourse, fetchMyEnrollments } from "../../features/enrollment/enrollmentThunks";
import { selectMyEnrollments } from "../../features/enrollment/enrollmentSelectors";
import Badge from "../../components/ui/Badge";

interface QuizItem {
  id: string;
  titre: string;
  cours_id: string;
  questions?: { length: number };
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lessons' | 'exercices'>('lessons')
  const cours = useAppSelector(selectAllCours);
  const lessons = useAppSelector(selectAllLessons);
  const quizzes = useAppSelector((s) => s.quiz.items);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const coursLoading = useAppSelector(selectCoursLoading);
  const lessonLoading = useAppSelector(selectLessonLoading);

  const course = cours.find((c) => String(c.id) === id);
  const courseQuizzes = quizzes.filter(
    (q: QuizItem) => String(q.cours_id) === id,
  );
  const user = useAppSelector(selectUser);
  const enrollments = useAppSelector(selectMyEnrollments);
  const isEnrolled = enrollments.some((e) => String(e.coursId) === id);
  const isStudent = user?.role === 'student' || user?.role === 'eleve' || user?.role === 'parent';

  useEffect(() => {
    dispatch(fetchCours());
    dispatch(fetchQuizzes());
    if (id) {
      dispatch(fetchLessons({ coursId: id, status: 'publié' }));
      if (isAuthenticated) dispatch(fetchMyEnrollments());
    }
  }, [dispatch, id, isAuthenticated]);

  const handleEnroll = () => {
    if (id && !isEnrolled) {
      dispatch(enrollCourse(id));
      navigate("/student/courses/" + id);
    }
  };

  if (coursLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (!course)
    return (
      <div className="text-center py-20 text-surface-400 text-sm">
        Cours introuvable
      </div>
    );

  return (
    <div className="space-y-6 max-w-6xl mx-auto mb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-surface-400">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/cours" className="hover:text-primary-600 transition-colors">
          Catalogue
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-surface-600 font-medium truncate max-w-[200px]">
          {course.titre}
        </span>
      </nav>

      {/* Hero */}
      <section className="rounded-xl bg-primary-600 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {course.category && <Badge>{course.category}</Badge>}
              {course.niveau && <Badge variant="info">{course.niveau}</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 leading-snug">
              {course.titre}
            </h1>
            <p className="text-primary-200 mb-6 max-w-xl text-sm leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-5 text-xs text-primary-200">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {course.professor || "Professeur"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {course.duree || "N/A"}
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                {course.niveau || "Tous niveaux"}
              </span>
            </div>
          </div>
          <div
            className={`w-full md:w-56 h-36 rounded-xl ${course.imageUrl ? '' : (course.color || 'bg-white/10')} flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden`}
          >
            {course.imageUrl ? (
              <img src={`http://localhost:3000${course.imageUrl}`} alt={course.titre} className="w-full h-full object-cover" />
            ) : (
              <BookOpen className="w-10 h-10 text-white/60" />
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 w-fit">
            <button onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'lessons'
                  ? 'bg-white text-surface-900 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}>
              <FileText size={16} />
              Leçons
            </button>
            <button onClick={() => setActiveTab('exercices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'exercices'
                  ? 'bg-white text-surface-900 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}>
              <ClipboardList size={16} />
              Exercices
            </button>
          </div>

          {activeTab === 'lessons' ? (
            <div className="bg-white rounded-xl border border-surface-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-600" />
                </div>
                <h2 className="text-base font-semibold text-surface-900">
                  Programme du cours
                </h2>
              </div>
              {lessonLoading ? (
                <div className="p-6 text-sm text-surface-400">
                  Chargement des leçons...
                </div>
              ) : lessons.length === 0 ? (
                <div className="p-8 text-center text-sm text-surface-400">
                  Aucune leçon pour le moment
                </div>
              ) : (
                <ul className="divide-y divide-surface-50">
                  {lessons.map((lesson, index) => (
                    <li
                      key={lesson.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50/80 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-surface-900 text-sm truncate">
                          {lesson.titre}
                        </p>
                        <p className="text-xs text-surface-400 mt-0.5">
                          {lesson.duree || "À venir"}
                        </p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-base font-semibold text-surface-900">
                  Quiz
                  <span className="ml-2 text-xs font-normal text-surface-400">
                    ({courseQuizzes.length})
                  </span>
                </h2>
              </div>
              {courseQuizzes.length === 0 ? (
                <div className="p-8 text-center text-sm text-surface-400">
                  Aucun quiz pour ce cours
                </div>
              ) : (
                <ul className="divide-y divide-surface-50">
                  {courseQuizzes.map((q) => (
                    <li
                      key={q.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50/80 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <HelpCircle size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-surface-900 text-sm">
                          {q.titre}
                        </p>
                        <p className="text-xs text-surface-400 mt-0.5">
                          {q.questions?.length || 0} questions
                        </p>
                      </div>
                      <Link
                        to={isAuthenticated ? `/student/quiz/${q.id}` : "/login"}
                        className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {isAuthenticated ? "Commencer" : "Connexion requise"}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4">
          {/* Enroll */}
          <div className="bg-white rounded-xl border border-surface-100 p-6 sticky top-24">
            <div className="text-center mb-5">
              <p className="text-3xl font-black text-surface-900 tracking-tight">
                {course.prix === null || course.prix === undefined ? (
                  <span className="text-emerald-600">Gratuit</span>
                ) : (
                  <>
                    {course.prix.toLocaleString()}{" "}
                    <span className="text-lg font-semibold text-surface-500">
                      Ar
                    </span>
                  </>
                )}
              </p>
            </div>
            {!isAuthenticated ? (
              <button onClick={() => navigate("/login")}
                className="w-full bg-surface-200 hover:bg-surface-300 text-surface-600 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-3">
                <LogIn className="w-4 h-4" /> Connectez-vous pour suivre le cours
              </button>
            ) : isEnrolled ? (
              <Link to={`/student/courses/${id}`}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-3">
                <ArrowRight className="w-4 h-4" /> Accéder au cours
              </Link>
            ) : (
              <button onClick={handleEnroll}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-3">
                <Play className="w-4 h-4 fill-white" /> Suivre le cours
              </button>
            )}
            <p className="text-xs text-surface-400 text-center">
              Accès illimité à tout le contenu
            </p>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-xl border border-surface-100 p-6">
            <h3 className="text-sm font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary-500" />
              Votre instructeur
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                {(course.professor || "P")[0]}
              </div>
              <div>
                <p className="font-semibold text-surface-900 text-sm">
                  {course.professor || "Professeur"}
                </p>
                <p className="text-xs text-surface-400">Professeur</p>
              </div>
            </div>
            <p className="text-xs text-surface-500 leading-relaxed">
              Instructeur expérimenté dans ce domaine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
