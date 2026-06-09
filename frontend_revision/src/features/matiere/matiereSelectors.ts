import type { RootState } from '../../app/store'

export const selectAllMatieres = (state: RootState) => state.matiere.items
export const selectMatiereLoading = (state: RootState) => state.matiere.loading
export const selectMatiereError = (state: RootState) => state.matiere.error
export const selectMatiereById = (id: number) => (state: RootState) =>
  state.matiere.items.find((m) => m.id === id)
