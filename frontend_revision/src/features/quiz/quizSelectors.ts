import type { RootState } from '../../app/store'

export const selectAllQuizzes = (state: RootState) => state.quiz.items
export const selectCourseQuizzes = (state: RootState) => state.quiz.courseQuizzes
export const selectCurrentQuiz = (state: RootState) => state.quiz.currentQuiz
export const selectQuizLoading = (state: RootState) => state.quiz.loading
export const selectQuizError = (state: RootState) => state.quiz.error
export const selectResults = (state: RootState) => state.quiz.results
export const selectLastAttempt = (state: RootState) => state.quiz.lastAttempt
