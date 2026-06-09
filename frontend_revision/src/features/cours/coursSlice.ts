import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCours, createCours, updateCours, deleteCours, approveCours, rejectCours } from './coursThunks'

interface Cours {
  id: number
  titre: string
  description: string
  matiereId: number
  professor?: string
  professorId?: number
  category?: string
  niveau?: string
  duree?: string
  prix?: number | null
  status?: string
  lessonCount?: number
  studentCount?: number
  color?: string
  imageUrl?: string
  createdAt?: string
}

interface CoursState {
  items: Cours[]
  loading: boolean
  error: string | null
}

const initialState: CoursState = {
  items: [],
  loading: false,
  error: null,
}

const coursSlice = createSlice({
  name: 'cours',
  initialState,
  reducers: {
    clearCoursError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCours.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCours.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createCours.pending, (state) => {
        state.loading = true
      })
      .addCase(createCours.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createCours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateCours.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCours.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        const index = state.items.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(updateCours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(approveCours.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            status: 'publié',
          }
        }
      })
      .addCase(rejectCours.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            status: 'rejeté',
          }
        }
      })
      .addCase(deleteCours.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCours.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.items = state.items.filter((c) => c.id !== action.payload)
      })
      .addCase(deleteCours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCoursError } = coursSlice.actions
export default coursSlice.reducer
