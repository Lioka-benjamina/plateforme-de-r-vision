import type { RootState } from '../../app/store'

export const selectAllUsers = (state: RootState) => state.user.items
export const selectUserLoading = (state: RootState) => state.user.loading
export const selectUserError = (state: RootState) => state.user.error
