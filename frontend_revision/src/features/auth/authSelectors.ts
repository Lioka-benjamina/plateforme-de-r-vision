import type { RootState } from '../../app/store'

export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error
export const selectToken = (state: RootState) => state.auth.token
export const selectAuthInitialized = (state: RootState) => state.auth.initialized
