import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCertificates } from './certificateThunks'

interface Certificate {
  id: number
  titre: string
  coursTitre: string
  dateObtention: string
}

interface CertificateState {
  items: Certificate[]
  loading: boolean
  error: string | null
}

const initialState: CertificateState = {
  items: [],
  loading: false,
  error: null,
}

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    clearCertificateError(state) { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchCertificates.fulfilled, (state, action: PayloadAction<Certificate[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { clearCertificateError } = certificateSlice.actions
export default certificateSlice.reducer
