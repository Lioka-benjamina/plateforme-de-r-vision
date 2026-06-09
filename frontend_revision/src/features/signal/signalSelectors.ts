import type { RootState } from '../../app/store'

export const selectAllSignals = (state: RootState) => state.signal.items
export const selectSignalLoading = (state: RootState) => state.signal.loading
export const selectSignalError = (state: RootState) => state.signal.error
