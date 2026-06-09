import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchCertificates = createAsyncThunk(
  'certificate/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.get(API.certificate, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des certificats')
    }
  }
)
