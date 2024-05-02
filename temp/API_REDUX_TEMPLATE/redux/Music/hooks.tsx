import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export const useRotateThumnailMusic = () => {
  const rotateThumbail = useSelector(
    (appState: RootState) => appState.musicReducer.isRotateThumnail,
  )
  return rotateThumbail
}

export const useLottieMusic = () => {
  const lottie = useSelector(
    (appState: RootState) => appState.musicReducer.isLottie,
  )
  return lottie
}

export const useSong = () => {
  const song = useSelector((appState: RootState) => appState.musicReducer.song)
  return song
}

export const useIndexSong = () => {
  const indexSong = useSelector((appState: RootState) => appState.musicReducer.indexSong)
  return indexSong
}

