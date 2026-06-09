import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchLessons = createAsyncThunk(
  'lesson/fetchAll',
  async ({ coursId, status }: { coursId?: string; status?: string } = {}, { rejectWithValue }) => {
    try {
      const params: Record<string, string> = {}
      if (coursId) params.coursId = coursId
      if (status) params.status = status
      const response = await axios.get(API.lesson, { params })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement des leçons')
    }
  }
)

export const fetchLessonById = createAsyncThunk(
  'lesson/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.lesson}/${id}`)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de chargement de la leçon')
    }
  }
)

export const approveLesson = createAsyncThunk(
  'lesson/approve',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.lesson}/${id}/approve`, {}, {
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

export const rejectLesson = createAsyncThunk(
  'lesson/reject',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.lesson}/${id}/reject`, {}, {
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

export const uploadFile = createAsyncThunk(
  'lesson/uploadFile',
  async (file: File, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post(`${API.lesson}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur d'upload")
    }
  }
)

export const createLesson = createAsyncThunk(
  'lesson/create',
  async (data: { titre: string; type: string; contenu: string; coursId: string; duree?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.post(API.lesson, {
        titre: data.titre,
        type: data.type,
        contenu: data.contenu,
        cours_id: data.coursId,
        duree: data.duree,
      }, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur de création de la leçon")
    }
  }
)

export const updateLesson = createAsyncThunk(
  'lesson/update',
  async ({ id, ...data }: { id: string; titre?: string; type?: string; contenu?: string; duree?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.patch(`${API.lesson}/${id}`, data, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de mise à jour de la leçon')
    }
  }
)

export const deleteLesson = createAsyncThunk(
  'lesson/delete',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      await axios.delete(`${API.lesson}/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return id
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue('Erreur de suppression de la leçon')
    }
  }
)
