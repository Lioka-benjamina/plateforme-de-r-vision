import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers, updateUserStatus } from './userThunks'

interface UserProfile {
  id: number
  email: string
  nom: string
  prenom: string
  role: string
  status?: string
  createdAt?: string
}

interface UserState {
  items: UserProfile[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserProfile[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(updateUserStatus.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        const idx = state.items.findIndex((u) => u.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearUserError } = userSlice.actions
export default userSlice.reducer
