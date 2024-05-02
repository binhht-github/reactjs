import { combineReducers } from 'redux'
import appInfoReducer from './AppInfo/slice'
import musicReducer from './Music/slice'
import type { AppInfoType } from './AppInfo/types'

export interface ApplicationState {
  appInfo: AppInfoType
}

const rootReducer = combineReducers({
  appInfoReducer,
  musicReducer,
})

export default rootReducer
