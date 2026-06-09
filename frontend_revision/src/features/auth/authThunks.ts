import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'

interface LoginCredentials {
  email: string
  password: string
  role: string
}

interface RegisterData {
  email: string
  password: string
  nom: string
  prenom: string
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.auth}/login`, credentials)
      const { access_token, user } = response.data
      localStorage.setItem('token', access_token)
      return { user, token: access_token }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de connexion')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const payload = { ...data, mot_de_pass: data.password }
      delete (payload as any).password
      const response = await axios.post(`${API.auth}/register`, payload)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue("Erreur d'inscription")
    }
  }
)

export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string | null } }
      const token = state.auth.token
      const response = await axios.get(`${API.auth}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de récupération du profil')
    }
  }
)
