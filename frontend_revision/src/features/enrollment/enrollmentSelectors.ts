import type { RootState } from '../../app/store'

export const selectMyEnrollments = (state: RootState) => state.enrollment.items
export const selectEnrollmentLoading = (state: RootState) => state.enrollment.loading
export const selectEnrollmentError = (state: RootState) => state.enrollment.error
