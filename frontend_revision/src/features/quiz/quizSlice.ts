import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  fetchQuizzes,
  fetchQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  fetchResults,
} from './quizThunks'

interface Question {
  id: number
  texte: string
  options: { id: number; texte: string }[]
}

interface Quiz {
  id: number
  titre: string
  coursId: number
  questions?: Question[]
}

interface QuizResult {
  id: number
  quizId: number
  quizTitre: string
  score: number
  total: number
  date: string
}

interface QuizState {
  items: Quiz[]
  currentQuiz: Quiz | null
  results: QuizResult[]
  lastAttempt: { score: number; total: number } | null
  loading: boolean
  error: string | null
}

const initialState: QuizState = {
  items: [],
  currentQuiz: null,
  results: [],
  lastAttempt: null,
  loading: false,
  error: null,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearQuizError(state) {
      state.error = null
    },
    resetAttempt(state) {
      state.lastAttempt = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(fetchQuizById.pending, (state) => { state.loading = true })
      .addCase(fetchQuizById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false; state.currentQuiz = action.payload
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(createQuiz.pending, (state) => { state.loading = true })
      .addCase(createQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false; state.items.push(action.payload)
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(updateQuiz.pending, (state) => { state.loading = true })
      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        const idx = state.items.findIndex((q: any) => String(q.id) === String(action.payload.id))
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(deleteQuiz.pending, (state) => { state.loading = true })
      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.items = state.items.filter((q: any) => String(q.id) !== String(action.payload))
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(submitQuizAttempt.pending, (state) => { state.loading = true })
      .addCase(submitQuizAttempt.fulfilled, (state, action: PayloadAction<{ score: number; total: number }>) => {
        state.loading = false; state.lastAttempt = action.payload
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(fetchResults.pending, (state) => { state.loading = true })
      .addCase(fetchResults.fulfilled, (state, action: PayloadAction<QuizResult[]>) => {
        state.loading = false; state.results = action.payload
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { clearQuizError, resetAttempt } = quizSlice.actions
export default quizSlice.reducer
