import { useSelector} from 'react-redux'
import type { RootState } from '../store'
import { useAppSelector } from '../hooks'

export const useAppInfoIsSplash = () => {
  const isSplash = useAppSelector(
    (appState: RootState) => appState.appInfoReducer.isSplash,
  )
  return isSplash
}

export const useAppInfoScrollY = () => {
  const scrollY = useAppSelector(
    (appState: RootState) => appState.appInfoReducer.scrollY,
  )
  return scrollY
}