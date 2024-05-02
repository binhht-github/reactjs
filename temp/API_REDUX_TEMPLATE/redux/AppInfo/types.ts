import { REHYDRATE } from 'redux-persist'

export interface AppInfoType {
  isSplash: boolean
  language: string
  isShowLanguage: boolean
  isCredentials: boolean
  isSuggest: boolean
  haveSuggestAuth: boolean
  isCredentialsPin: boolean
  OTP: 'sms' | 'mail'
  userInfo: InvestorInfo
  scrollY: number
}

export const app_info_types = {
  SET_SKIP_INTRODUCTION: 'SET_SKIP_INTRODUCTION',
  SET_FCM_TOKEN: 'SET_FCM_TOKEN',
  SET_LANGUAGE: 'SET_LANGUAGE',
  INIT_APP: REHYDRATE as string,
}

export interface LanguagePayload {
  language: string
}

export type InvestorInfo = {
  name: string
  phone: string
  email: string
  faceImageUrl: string
}
