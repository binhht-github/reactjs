import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { MusicState } from './type'
import { ISong } from '@/api/types'

const initialState: MusicState = {
  isRotateThumnail: true,
  isLottie: true,
  song: null,
  indexSong: 0,
}

export const musicReducer = createSlice({
  name: 'musicReducer',
  initialState,
  reducers: {
    setRotateThumnail: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isRotateThumnail: action.payload,
      }
    },
    setLottie: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLottie: action.payload,
      }
    },
    setSong: (state, action: PayloadAction<ISong>) => {
      return {
        ...state,
        song: action.payload,
      }
    },
    setIndexSong: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        indexSong: action.payload,
      }
    },
  },
})
export const { setRotateThumnail, setLottie, setSong, setIndexSong } =
  musicReducer.actions

export const selectMusic = (state: RootState) => state.musicReducer
export default musicReducer.reducer
