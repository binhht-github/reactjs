import { app_info_types, LanguagePayload } from './types'

/** lưu lại ngôn ngữ */
export const setLanguageToStore = (payload: LanguagePayload) => {
  return {
    type: app_info_types.SET_LANGUAGE,
    payload,
  }
}