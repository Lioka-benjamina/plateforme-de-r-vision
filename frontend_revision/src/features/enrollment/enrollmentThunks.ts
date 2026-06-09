import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchMyEnrollments = createAsyncThunk(
  'enrollment/fetchMine',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.get(API.enrollment, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur de chargement des inscriptions")
    }
  }
)

export const enrollCourse = createAsyncThunk(
  'enrollment/enroll',
  async (coursId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.post(API.enrollment, { coursId }, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur lors de l'inscription")
    }
  }
)

export const updateProgress = createAsyncThunk(
  'enrollment/progress',
  async ({ coursId, lessonId }: { coursId: string; lessonId: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.enrollment}/${coursId}/progress`, { lessonId }, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de mise à jour de la progression')
    }
  }
)

export const fetchStudentEnrollments = createAsyncThunk(
  'enrollment/fetchStudents',
  async (coursId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.get(`${API.enrollment}/course/${coursId}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des étudiants')
    }
  }
)
