import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProfile } from '../features/auth/authThunks'
import { finishInitialization } from '../features/auth/authSlice'
import { selectToken } from '../features/auth/authSelectors'

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile())
    } else {
      dispatch(finishInitialization())
    }
  }, [dispatch, token])

  return <>{children}</>
}
