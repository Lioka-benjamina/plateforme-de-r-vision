import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'
import type { RootState } from '../../app/store'

export const fetchLessons = createAsyncThunk(
  'lesson/fetchAll',
  async (coursId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.lesson}?coursId=${coursId}`)
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
  async (id: number, { rejectWithValue }) => {
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

export const createLesson = createAsyncThunk(
  'lesson/create',
  async (data: { titre: string; type: string; contenu: string; coursId: number; duree?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axios.post(API.lesson, data, {
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
  async ({ id, ...data }: { id: number; titre?: string; type?: string; contenu?: string; duree?: string }, { getState, rejectWithValue }) => {
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
  async (id: number, { getState, rejectWithValue }) => {
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
