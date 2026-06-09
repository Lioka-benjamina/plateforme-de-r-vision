import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchSignals, approveSignal, rejectSignal, escalateSignal } from './signalThunks'

interface Signal {
  id: number
  targetType: string
  targetName: string
  reportedBy: string
  reason: string
  status: string
  date: string
}

interface SignalState {
  items: Signal[]
  loading: boolean
  error: string | null
}

const initialState: SignalState = {
  items: [],
  loading: false,
  error: null,
}

const signalSlice = createSlice({
  name: 'signal',
  initialState,
  reducers: {
    clearSignalError(state) { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignals.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchSignals.fulfilled, (state, action: PayloadAction<Signal[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchSignals.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(approveSignal.fulfilled, (state, action: PayloadAction<Signal>) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(rejectSignal.fulfilled, (state, action: PayloadAction<Signal>) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(escalateSignal.fulfilled, (state, action: PayloadAction<Signal>) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearSignalError } = signalSlice.actions
export default signalSlice.reducer
