import { createSlice } from '@reduxjs/toolkit'
import { submitContact } from './contactThunks'

interface ContactState {
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact(state) {
      state.loading = false
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => { state.loading = true; state.error = null; state.success = false })
      .addCase(submitContact.fulfilled, (state) => { state.loading = false; state.success = true })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { resetContact } = contactSlice.actions
export default contactSlice.reducer
