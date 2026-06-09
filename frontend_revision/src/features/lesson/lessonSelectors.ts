import type { RootState } from '../../app/store'

export const selectAllLessons = (state: RootState) => state.lesson.items
export const selectCurrentLesson = (state: RootState) => state.lesson.currentLesson
export const selectLessonLoading = (state: RootState) => state.lesson.loading
export const selectLessonError = (state: RootState) => state.lesson.error
