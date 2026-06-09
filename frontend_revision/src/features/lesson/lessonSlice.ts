import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchLessons, fetchLessonById, createLesson, updateLesson, deleteLesson } from './lessonThunks'

interface Lesson {
  id: number
  titre: string
  type: string
  contenu: string
  duree?: string
  ordre: number
  coursId: number
}

interface LessonState {
  items: Lesson[]
  currentLesson: Lesson | null
  loading: boolean
  error: string | null
}

const initialState: LessonState = {
  items: [],
  currentLesson: null,
  loading: false,
  error: null,
}

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    clearLessonError(state) { state.error = null },
    setCurrentLesson(state, action: PayloadAction<Lesson | null>) { state.currentLesson = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchLessons.fulfilled, (state, action: PayloadAction<Lesson[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(fetchLessonById.pending, (state) => { state.loading = true })
      .addCase(fetchLessonById.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.loading = false; state.currentLesson = action.payload
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(createLesson.pending, (state) => { state.loading = true })
      .addCase(createLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.loading = false; state.items.push(action.payload)
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(updateLesson.pending, (state) => { state.loading = true })
      .addCase(updateLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.loading = false
        const idx = state.items.findIndex((l) => l.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(deleteLesson.pending, (state) => { state.loading = true })
      .addCase(deleteLesson.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false; state.items = state.items.filter((l) => l.id !== action.payload)
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { clearLessonError, setCurrentLesson } = lessonSlice.actions
export default lessonSlice.reducer
