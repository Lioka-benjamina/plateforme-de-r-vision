import type { RootState } from '../../app/store'

export const selectAllCertificates = (state: RootState) => state.certificate.items
export const selectCertificateLoading = (state: RootState) => state.certificate.loading
export const selectCertificateError = (state: RootState) => state.certificate.error
