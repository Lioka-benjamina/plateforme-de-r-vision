import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchSignals = createAsyncThunk(
  'signal/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.signal)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des signalements')
    }
  }
)

export const approveSignal = createAsyncThunk(
  'signal/approve',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.signal}/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur lors de l'approbation")
    }
  }
)

export const rejectSignal = createAsyncThunk(
  'signal/reject',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.signal}/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur lors du rejet')
    }
  }
)

export const escalateSignal = createAsyncThunk(
  'signal/escalate',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.signal}/${id}/escalate`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur lors de l'escalade")
    }
  }
)
