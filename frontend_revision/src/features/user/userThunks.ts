import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.get(API.user, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des utilisateurs')
    }
  }
)

export const updateUserStatus = createAsyncThunk(
  'user/updateStatus',
  async ({ id, status }: { id: number; status: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.user}/${id}`, { status }, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de mise à jour')
    }
  }
)
