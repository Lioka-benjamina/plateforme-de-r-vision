import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchAll',
  async (statusFilter?: string, { rejectWithValue }) => {
    try {
      const params = statusFilter ? { status: statusFilter } : {}
      const response = await axios.get(API.quiz, { params })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des quiz')
    }
  }
)

export const fetchQuizzesByCourse = createAsyncThunk(
  'quiz/fetchByCourse',
  async ({ coursId, status }: { coursId: string; status?: string }, { rejectWithValue }) => {
    try {
      const params = status ? { status } : {}
      const response = await axios.get(`${API.quiz}/course/${coursId}`, { params })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des quiz du cours')
    }
  }
)

export const approveQuiz = createAsyncThunk(
  'quiz/approve',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.quiz}/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur d'approbation")
    }
  }
)

export const rejectQuiz = createAsyncThunk(
  'quiz/reject',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.quiz}/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de rejet')
    }
  }
)

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.quiz}/${id}`)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement du quiz')
    }
  }
)

export const createQuiz = createAsyncThunk(
  'quiz/create',
  async (data: { titre: string; coursId: number; questions?: { id: string; texte: string; options: { id: string; texte: string; correct: boolean }[] }[] }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const payload = {
        titre: data.titre,
        cours_id: data.coursId,
        questions: data.questions,
      }
      const response = await axios.post(API.quiz, payload, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur de création du quiz")
    }
  }
)

export const submitQuizAttempt = createAsyncThunk(
  'quiz/submitAttempt',
  async (
    { quizId, answers }: { quizId: number; answers: Record<string, number> },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState
      const response = await axios.post(`${API.quiz}/${quizId}/attempt`, { answers }, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur lors de la soumission")
    }
  }
)

export const updateQuiz = createAsyncThunk(
  'quiz/update',
  async ({ id, ...data }: { id: number; titre?: string; coursId?: number; questions?: any[] }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const payload: any = {}
      if (data.titre !== undefined) payload.titre = data.titre
      if (data.coursId !== undefined) payload.cours_id = data.coursId
      if (data.questions !== undefined) payload.questions = data.questions
      const response = await axios.patch(`${API.quiz}/${id}`, payload, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur de mise à jour du quiz")
    }
  }
)

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      await axios.delete(`${API.quiz}/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return id
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur de suppression du quiz")
    }
  }
)

export const fetchResults = createAsyncThunk(
  'quiz/fetchResults',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.get(`${API.quiz}/results`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des résultats')
    }
  }
)
