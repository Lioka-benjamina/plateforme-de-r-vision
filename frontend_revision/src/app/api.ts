const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const API = {
  auth: `${API_BASE}/auth`,
  cours: `${API_BASE}/cours`,
  matiere: `${API_BASE}/matiere`,
  quiz: `${API_BASE}/quiz`,
  lesson: `${API_BASE}/lessons`,
  signal: `${API_BASE}/signals`,
  user: `${API_BASE}/users`,
  enrollment: `${API_BASE}/enrollments`,
  certificate: `${API_BASE}/certificates`,
  contact: `${API_BASE}/contact`,
  stats: `${API_BASE}/stats`,
}
