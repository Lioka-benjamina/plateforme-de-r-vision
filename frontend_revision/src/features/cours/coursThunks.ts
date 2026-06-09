import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'

interface UpdateCoursData {
  id: number
  titre?: string
  description?: string
  matiereId?: number
  status?: string
  professor?: string
  category?: string
  niveau?: string
  duree?: string
  prix?: number | null
  lessonCount?: number
  studentCount?: number
  color?: string
  imageUrl?: string
}

export const fetchCours = createAsyncThunk(
  'cours/fetchAll',
  async (statusFilter?: string, { rejectWithValue }) => {
    try {
      const params = statusFilter ? { status: statusFilter } : {}
      const response = await axios.get(API.cours, { params })
      return (response.data || []).map((res: any) => ({
        id: res.id,
        titre: res.titre,
        description: res.contenu || '',
        matiereId: res.matiere_id,
        professorId: res.auteur?.id,
        professor: res.auteur ? `${res.auteur.prenom} ${res.auteur.nom}` : '',
        category: res.matiere?.nom,
        imageUrl: res.image_url || '',
        createdAt: res.date_publication,
        status: res.status || (res.valide ? 'publié' : 'brouillon'),
      }))
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de chargement des cours')
    }
  }
)

export const approveCours = createAsyncThunk(
  'cours/approve',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const response = await axios.patch(`${API.cours}/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue("Erreur d'approbation")
    }
  }
)

export const rejectCours = createAsyncThunk(
  'cours/reject',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const response = await axios.patch(`${API.cours}/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue("Erreur de rejet")
    }
  }
)

export const createCours = createAsyncThunk(
  'cours/create',
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const payload: Record<string, unknown> = {
        titre: data.titre,
        contenu: data.description,
        matiere_id: data.matiereId,
      }
      if (data.imageUrl) payload.image_url = data.imageUrl
      const response = await axios.post(API.cours, payload, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      const res = response.data
      return {
        id: res.id,
        titre: res.titre,
        description: res.contenu || '',
        matiereId: res.matiere_id,
        professorId: res.auteur?.id,
        professor: res.auteur ? `${res.auteur.prenom} ${res.auteur.nom}` : '',
        imageUrl: res.image_url || '',
        createdAt: res.date_publication,
        status: res.status || 'en_attente',
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue("Erreur de création du cours")
    }
  }
)

export const updateCours = createAsyncThunk(
  'cours/update',
  async ({ id, ...data }: UpdateCoursData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      const payload: Record<string, unknown> = {}
      if (data.titre !== undefined) payload.titre = data.titre
      if (data.description !== undefined) payload.contenu = data.description
      if (data.matiereId !== undefined) payload.matiere_id = data.matiereId
      if (data.imageUrl !== undefined) payload.image_url = data.imageUrl
      if (data.status !== undefined) payload.status = data.status
      const response = await axios.patch(`${API.cours}/${id}`, payload, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de mise à jour du cours')
    }
  }
)

export const deleteCours = createAsyncThunk(
  'cours/delete',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string } }
      await axios.delete(`${API.cours}/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      return id
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue('Erreur de suppression du cours')
    }
  }
)
