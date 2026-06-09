import type { RootState } from '../../app/store'

export const selectAllCours = (state: RootState) => state.cours.items
export const selectCoursLoading = (state: RootState) => state.cours.loading
export const selectCoursError = (state: RootState) => state.cours.error
export const selectCoursById = (id: number) => (state: RootState) =>
  state.cours.items.find((c) => c.id === id)
