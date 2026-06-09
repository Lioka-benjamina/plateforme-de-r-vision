import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'

interface CreateMatiereData {
  nom: string
  description?: string
}

interface UpdateMatiereData {
  id: number
  nom?: string
  description?: string
}

export const fetchMatieres = createAsyncThunk(
  'matiere/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.matiere)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de chargement des matières')
    }
  }
)

export const createMatiere = createAsyncThunk(
  'matiere/create',
  async (data: CreateMatiereData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const response = await axios.post(API.matiere, data, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue("Erreur de création de la matière")
    }
  }
)

export const updateMatiere = createAsyncThunk(
  'matiere/update',
  async ({ id, ...data }: UpdateMatiereData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const response = await axios.patch(`${API.matiere}/${id}`, data, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de mise à jour de la matière')
    }
  }
)

export const deleteMatiere = createAsyncThunk(
  'matiere/delete',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      await axios.delete(`${API.matiere}/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return id
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de suppression de la matière')
    }
  }
)
