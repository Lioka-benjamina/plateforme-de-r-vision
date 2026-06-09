import { useEffect } from 'react'
import { Award, Download } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCertificates } from '../../features/certificate/certificateThunks'
import { selectAllCertificates, selectCertificateLoading } from '../../features/certificate/certificateSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function CertificatesPage() {
  const dispatch = useAppDispatch()
  const certificates = useAppSelector(selectAllCertificates)
  const loading = useAppSelector(selectCertificateLoading)

  useEffect(() => {
    dispatch(fetchCertificates())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          <Award size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Mes certificats</h1>
          <p className="text-surface-500 text-sm">{certificates.length} certificats obtenus</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-surface-400">Chargement...</div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-12 text-surface-400">Aucun certificat pour le moment</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-6 text-center hover:shadow-card-hover transition">
              <div className="w-16 h-16 rounded-full bg-success-50 text-success-600 flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-semibold text-surface-900 mb-1">{cert.titre}</h3>
              <p className="text-sm text-surface-500 mb-1">{cert.coursTitre}</p>
              <Badge variant="success">{new Date(cert.dateObtention).toLocaleDateString()}</Badge>
              <button className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-200 rounded-lg px-3 py-2 hover:bg-primary-50 transition">
                <Download size={16} /> Télécharger
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
