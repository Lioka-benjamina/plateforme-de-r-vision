import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AuthInitializer from './components/AuthInitializer'
import {
  adminNavItems, professorNavItems, studentNavItems, moderatorNavItems
} from './components/layout/Sidebar'

// Public
import LandingPage from './pages/LandingPage'
import CatalogPage from './pages/public/CatalogPage'
import CourseDetailPage from './pages/public/CourseDetailPage'
import ContactPage from './pages/public/ContactPage'
import FAQPage from './pages/public/FAQPage'

// Auth
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Admin
import AdminDashboard from './pages/admin/DashboardPage'
import AdminUsers from './pages/admin/UsersPage'
import AdminCourses from './pages/admin/CoursesPage'
import AdminQuizzes from './pages/admin/QuizzesPage'
import AdminSignals from './pages/admin/SignalsPage'
import AdminSettings from './pages/admin/SettingsPage'

// Professor
import ProfessorDashboard from './pages/professor/DashboardPage'
import ProfessorCourses from './pages/professor/CoursesPage'
import ProfessorCourseForm from './pages/professor/CourseFormPage'
import ProfessorLessons from './pages/professor/LessonsPage'
import ProfessorQuizzes from './pages/professor/QuizzesPage'
import ProfessorQuizForm from './pages/professor/QuizFormPage'
import ProfessorStudents from './pages/professor/StudentsPage'

// Student
import StudentDashboard from './pages/student/DashboardPage'
import StudentCourses from './pages/student/MyCoursesPage'
import StudentCourseView from './pages/student/CourseViewPage'
import StudentQuiz from './pages/student/QuizPage'
import StudentQuizzes from './pages/student/QuizzesPage'
import StudentResults from './pages/student/ResultsPage'
import StudentCertificates from './pages/student/CertificatesPage'

// Moderator
import ModeratorDashboard from './pages/moderator/DashboardPage'
import ModeratorSignals from './pages/moderator/SignalsPage'
import ModeratorReview from './pages/moderator/ReviewPage'

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer>
      <Routes>

        {/* ====== Public routes ====== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cours/:id" element={<CourseDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* ====== Admin routes ====== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout navItems={adminNavItems} allowedRoles={['admin']} />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/quizzes" element={<AdminQuizzes />} />
          <Route path="/admin/signals" element={<AdminSignals />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* ====== Professor routes ====== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout navItems={professorNavItems} allowedRoles={['admin', 'prof', 'professor']} />
            </ProtectedRoute>
          }
        >
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/professor/courses" element={<ProfessorCourses />} />
          <Route path="/professor/courses/new" element={<ProfessorCourseForm />} />
          <Route path="/professor/courses/:id/edit" element={<ProfessorCourseForm />} />
          <Route path="/professor/courses/:id/lessons" element={<ProfessorLessons />} />
          <Route path="/professor/quizzes" element={<ProfessorQuizzes />} />
          <Route path="/professor/quizzes/new" element={<ProfessorQuizForm />} />
          <Route path="/professor/quizzes/:id" element={<ProfessorQuizForm />} />
          <Route path="/professor/quizzes/:id/edit" element={<ProfessorQuizForm />} />
          <Route path="/professor/students" element={<ProfessorStudents />} />
        </Route>

        {/* ====== Student routes ====== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout navItems={studentNavItems} allowedRoles={['admin', 'eleve', 'student', 'parent']} />
            </ProtectedRoute>
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/courses/:id" element={<StudentCourseView />} />
          <Route path="/student/quizzes" element={<StudentQuizzes />} />
          <Route path="/student/quiz/:id" element={<StudentQuiz />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/certificates" element={<StudentCertificates />} />
        </Route>

        {/* ====== Moderator routes ====== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout navItems={moderatorNavItems} allowedRoles={['admin', 'moderator', 'mod']} />
            </ProtectedRoute>
          }
        >
          <Route path="/moderator" element={<ModeratorDashboard />} />
          <Route path="/moderator/signals" element={<ModeratorSignals />} />
          <Route path="/moderator/review" element={<ModeratorReview />} />
        </Route>

        {/* ====== Fallback ====== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AuthInitializer>
    </BrowserRouter>
  )
}

export default App
