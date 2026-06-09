import type { RootState } from '../../app/store'

export const selectContactLoading = (state: RootState) => state.contact.loading
export const selectContactSuccess = (state: RootState) => state.contact.success
export const selectContactError = (state: RootState) => state.contact.error
