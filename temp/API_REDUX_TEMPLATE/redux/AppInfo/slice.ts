import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppInfoType } from './types'
import type { RootState } from '../store'

const initialState: AppInfoType = {
  isSplash: false,
  isSuggest: false,
  language: '',
  isShowLanguage: false,
  isCredentials: false,
  haveSuggestAuth: false,
  isCredentialsPin: false,
  OTP: 'sms',
  userInfo: {
    name: '',
    phone: '',
    email: '',
    faceImageUrl: '',
  },
  scrollY: 0
}

export const appInfoSlice = createSlice({
  name: 'appInfoReducer',
  initialState,
  reducers: {
    setSplash: (state, action: PayloadAction<boolean>) => {
      state.isSplash = action.payload
    },
    setCredentials: (state, action: PayloadAction<boolean>) => {
      state.isCredentials = action.payload
    },
    setHaveSuggestAuth: (state, action: PayloadAction<boolean>) => {
      state.haveSuggestAuth = action.payload
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload
    },
  },
})

export const { setHaveSuggestAuth, setSplash, setCredentials, setScrollY } = appInfoSlice.actions

export const selectAppInfo = (state: RootState) => state.appInfoReducer
export default appInfoSlice.reducer
