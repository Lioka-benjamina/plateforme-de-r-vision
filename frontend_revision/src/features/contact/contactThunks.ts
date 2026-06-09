import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../app/api'

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (data: { nom: string; email: string; sujet: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.contact, data)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response.data.message)
      return rejectWithValue("Erreur d'envoi du message")
    }
  }
)
