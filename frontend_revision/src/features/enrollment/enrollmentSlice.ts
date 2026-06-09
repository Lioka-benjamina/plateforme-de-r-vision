import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchMyEnrollments, enrollCourse, updateProgress, fetchStudentEnrollments } from './enrollmentThunks'

interface Enrollment {
  id: number
  coursId: number
  coursTitre: string
  coursDescription?: string
  professor: string
  category?: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  completedLessons?: string[]
}

interface EnrollmentState {
  items: Enrollment[]
  loading: boolean
  error: string | null
}

const initialState: EnrollmentState = {
  items: [],
  loading: false,
  error: null,
}

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    clearEnrollmentError(state) { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEnrollments.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchMyEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchMyEnrollments.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(enrollCourse.pending, (state) => { state.loading = true })
      .addCase(enrollCourse.fulfilled, (state, action: PayloadAction<Enrollment>) => {
        state.loading = false; state.items.push(action.payload)
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(updateProgress.fulfilled, (state, action: PayloadAction<Enrollment>) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(fetchStudentEnrollments.pending, (state) => { state.loading = true })
      .addCase(fetchStudentEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchStudentEnrollments.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { clearEnrollmentError } = enrollmentSlice.actions
export default enrollmentSlice.reducer
