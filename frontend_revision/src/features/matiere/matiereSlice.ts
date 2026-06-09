import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchMatieres, createMatiere, updateMatiere, deleteMatiere } from './matiereThunks'

interface Matiere {
  id: number
  nom: string
  description?: string
  createdAt?: string
}

interface MatiereState {
  items: Matiere[]
  loading: boolean
  error: string | null
}

const initialState: MatiereState = {
  items: [],
  loading: false,
  error: null,
}

const matiereSlice = createSlice({
  name: 'matiere',
  initialState,
  reducers: {
    clearMatiereError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatieres.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMatieres.fulfilled, (state, action: PayloadAction<Matiere[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchMatieres.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createMatiere.pending, (state) => {
        state.loading = true
      })
      .addCase(createMatiere.fulfilled, (state, action: PayloadAction<Matiere>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createMatiere.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateMatiere.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMatiere.fulfilled, (state, action: PayloadAction<Matiere>) => {
        state.loading = false
        const index = state.items.findIndex((m) => m.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(updateMatiere.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteMatiere.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteMatiere.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        state.items = state.items.filter((m) => m.id !== action.payload)
      })
      .addCase(deleteMatiere.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearMatiereError } = matiereSlice.actions
export default matiereSlice.reducer
