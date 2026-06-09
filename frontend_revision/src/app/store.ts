import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import coursReducer from '../features/cours/coursSlice'
import matiereReducer from '../features/matiere/matiereSlice'
import quizReducer from '../features/quiz/quizSlice'
import lessonReducer from '../features/lesson/lessonSlice'
import signalReducer from '../features/signal/signalSlice'
import userReducer from '../features/user/userSlice'
import enrollmentReducer from '../features/enrollment/enrollmentSlice'
import certificateReducer from '../features/certificate/certificateSlice'
import contactReducer from '../features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cours: coursReducer,
    matiere: matiereReducer,
    quiz: quizReducer,
    lesson: lessonReducer,
    signal: signalReducer,
    user: userReducer,
    enrollment: enrollmentReducer,
    certificate: certificateReducer,
    contact: contactReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
