import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchResults } from '../../features/quiz/quizThunks'
import { selectResults, selectQuizLoading } from '../../features/quiz/quizSelectors'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function ResultsPage() {
  const dispatch = useAppDispatch()
  const results = useAppSelector(selectResults)
  const loading = useAppSelector(selectQuizLoading)

  useEffect(() => {
    dispatch(fetchResults())
  }, [dispatch])

  const avgScore = results.length
    ? Math.round(results.reduce((s, r) => s + (r.score / r.total) * 100, 0) / results.length)
    : 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Mes résultats</h1>
        <p className="text-surface-500 mt-1">{results.length} quiz tentés</p>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-primary-600">{results.length}</p>
            <p className="text-sm text-surface-500">Quiz tentés</p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-success-500">{avgScore}%</p>
            <p className="text-sm text-surface-500">Score moyen</p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-primary-600">
              {results.filter((r) => r.score >= r.total * 0.6).length}
            </p>
            <p className="text-sm text-surface-500">Réussites</p>
          </Card>
        </div>
      )}

      <Card>
        {loading ? (
          <div className="text-center py-8 text-surface-400">Chargement...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-surface-400">Aucun résultat pour le moment</div>
        ) : (
          <div className="divide-y divide-surface-100">
            {results.map((r, i) => {
              const percentage = Math.round((r.score / r.total) * 100)
              return (
                <div key={i} className="flex items-center justify-between py-4 px-4">
                  <div>
                    <p className="font-medium text-surface-900">{r.quizTitre}</p>
                    <p className="text-xs text-surface-400">{r.date ? new Date(r.date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-surface-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${
                        percentage >= 80 ? 'bg-success-500' : percentage >= 60 ? 'bg-warning-500' : 'bg-error-500'
                      }`} style={{ width: `${percentage}%` }} />
                    </div>
                    <Badge variant={percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'error'}>
                      {r.score}/{r.total}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
