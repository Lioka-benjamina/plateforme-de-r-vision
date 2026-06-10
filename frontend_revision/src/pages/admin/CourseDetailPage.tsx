import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BookOpen, Clock, BarChart3, User, FileText, CheckCircle,
  ChevronRight, HelpCircle, ClipboardList, Check, X,
  AlertTriangle, Shield,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCours } from "../../features/cours/coursThunks";
import { selectAllCours, selectCoursLoading } from "../../features/cours/coursSelectors";
import { fetchQuizzes } from "../../features/quiz/quizThunks";
import { fetchLessons } from "../../features/lesson/lessonThunks";
import { selectAllLessons, selectLessonLoading } from "../../features/lesson/lessonSelectors";
import { approveCours, rejectCours } from "../../features/cours/coursThunks";
import { useToast } from "../../components/ui/Toast";
import Badge from "../../components/ui/Badge";

export default function AdminCourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'lessons' | 'exercices'>('lessons');
  const [processing, setProcessing] = useState<'approve' | 'reject' | null>(null);

  const cours = useAppSelector(selectAllCours);
  const lessons = useAppSelector(selectAllLessons);
  const quizzes = useAppSelector((s) => s.quiz.items);
  const coursLoading = useAppSelector(selectCoursLoading);
  const lessonLoading = useAppSelector(selectLessonLoading);

  const course = cours.find((c) => String(c.id) === id);
  const courseLessons = lessons;
  const courseQuizzes = quizzes.filter((q: any) => String(q.cours_id) === id);

  useEffect(() => {
    dispatch(fetchCours());
    dispatch(fetchQuizzes());
    if (id) dispatch(fetchLessons({ coursId: id }));
  }, [dispatch, id]);

  const handleApprove = async () => {
    if (!id) return;
    setProcessing('approve');
    try {
      await dispatch(approveCours(id)).unwrap();
      showToast('Cours approuvé et publié', 'success');
    } catch {
      showToast("Erreur lors de l'approbation", 'error');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async () => {
    if (!id) return;
    setProcessing('reject');
    try {
      await dispatch(rejectCours(id)).unwrap();
      showToast('Cours rejeté', 'success');
    } catch {
      showToast('Erreur lors du rejet', 'error');
    } finally {
      setProcessing(null);
    }
  };

  if (coursLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!course) return (
    <div className="text-center py-20 text-surface-400 text-sm">Cours introuvable</div>
  );

  const statusColors: Record<string, string> = {
    'en_attente': 'bg-amber-100 text-amber-700',
    'publié': 'bg-emerald-100 text-emerald-700',
    'rejeté': 'bg-red-100 text-red-700',
    'brouillon': 'bg-surface-100 text-surface-600',
  };
  const statusLabels: Record<string, string> = {
    'en_attente': 'En attente',
    'publié': 'Publié',
    'rejeté': 'Rejeté',
    'brouillon': 'Brouillon',
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto mb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-surface-400">
        <Link to="/admin" className="hover:text-primary-600 transition-colors">Admin</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/admin/courses" className="hover:text-primary-600 transition-colors">Cours</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-surface-600 font-medium truncate max-w-[200px]">{course.titre}</span>
      </nav>

      {/* Hero */}
      <section className="rounded-xl bg-primary-600 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {course.category && <Badge>{course.category}</Badge>}
              {course.niveau && <Badge variant="info">{course.niveau}</Badge>}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[course.status] || 'bg-surface-100 text-surface-600'}`}>
                <Shield className="w-3 h-3 mr-1" />
                {statusLabels[course.status] || course.status}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 leading-snug">{course.titre}</h1>
            <p className="text-primary-200 mb-6 max-w-xl text-sm leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap gap-5 text-xs text-primary-200">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{course.professor || "Professeur"}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{course.duree || "N/A"}</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" />{course.niveau || "Tous niveaux"}</span>
            </div>
          </div>
          <div className={`w-full md:w-56 h-36 rounded-xl ${course.imageUrl ? '' : (course.color || 'bg-white/10')} flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden`}>
            {course.imageUrl ? (
              <img src={`http://localhost:3000${course.imageUrl}`} alt={course.titre} className="w-full h-full object-cover" />
            ) : (
              <BookOpen className="w-10 h-10 text-white/60" />
            )}
          </div>
        </div>
      </section>

      {/* Approval actions */}
      {course.status === 'en_attente' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 font-medium flex-1">Ce cours attend votre validation.</p>
          <div className="flex gap-3">
            <button onClick={handleReject} disabled={!!processing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-50 transition disabled:opacity-50">
              {processing === 'reject' ? <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" /> : <X size={16} />}
              Rejeter
            </button>
            <button onClick={handleApprove} disabled={!!processing}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50">
              {processing === 'approve' ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check size={16} />}
              Approuver
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 w-fit">
            <button onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'lessons' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}>
              <FileText size={16} /> Leçons ({courseLessons.length})
            </button>
            <button onClick={() => setActiveTab('exercices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'exercices' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}>
              <ClipboardList size={16} /> Quiz ({courseQuizzes.length})
            </button>
          </div>

          {activeTab === 'lessons' ? (
            <div className="bg-white rounded-xl border border-surface-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center"><FileText className="w-4 h-4 text-primary-600" /></div>
                <h2 className="text-base font-semibold text-surface-900">Programme du cours</h2>
              </div>
              {lessonLoading ? (
                <div className="p-6 text-sm text-surface-400">Chargement des leçons...</div>
              ) : courseLessons.length === 0 ? (
                <div className="p-8 text-center text-sm text-surface-400">Aucune leçon pour le moment</div>
              ) : (
                <ul className="divide-y divide-surface-50">
                  {courseLessons.map((lesson: any, index: number) => (
                    <li key={lesson.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50/80 transition-colors">
                      <span className="w-7 h-7 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-surface-900 text-sm truncate">{lesson.titre}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{lesson.duree || "À venir"}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${lesson.status === 'publié' ? 'bg-emerald-50 text-emerald-600' : lesson.status === 'en_attente' ? 'bg-amber-50 text-amber-600' : 'bg-surface-100 text-surface-500'}`}>
                        {lesson.status === 'publié' ? 'Publié' : lesson.status === 'en_attente' ? 'En attente' : lesson.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center"><HelpCircle className="w-4 h-4 text-amber-600" /></div>
                <h2 className="text-base font-semibold text-surface-900">Quiz ({courseQuizzes.length})</h2>
              </div>
              {courseQuizzes.length === 0 ? (
                <div className="p-8 text-center text-sm text-surface-400">Aucun quiz pour ce cours</div>
              ) : (
                <ul className="divide-y divide-surface-50">
                  {courseQuizzes.map((q: any) => (
                    <li key={q.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50/80 transition-colors">
                      <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0"><HelpCircle size={14} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-surface-900 text-sm">{q.titre}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{q.questions?.length || 0} questions</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${q.status === 'publié' ? 'bg-emerald-50 text-emerald-600' : q.status === 'en_attente' ? 'bg-amber-50 text-amber-600' : 'bg-surface-100 text-surface-500'}`}>
                        {q.status === 'publié' ? 'Publié' : q.status === 'en_attente' ? 'En attente' : q.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-surface-100 p-6 sticky top-24 space-y-4">
            <div className="text-center">
              <p className="text-3xl font-black text-surface-900 tracking-tight">
                {course.prix === null || course.prix === undefined ? (
                  <span className="text-emerald-600">Gratuit</span>
                ) : (
                  <>{course.prix.toLocaleString()} <span className="text-lg font-semibold text-surface-500">Ar</span></>
                )}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${course.status === 'publié' ? 'bg-emerald-500' : course.status === 'en_attente' ? 'bg-amber-500' : 'bg-surface-400'}`} />
              <span className="text-surface-600 font-medium">{statusLabels[course.status] || course.status}</span>
            </div>
            <div className="text-xs text-surface-400 text-center">
              Créé le {new Date(course.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
