import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import reducer from './reducer'
import saga from './saga'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  whitelist: ['appInfoReducer'],
  blacklist: ['musicReducer']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware()
// @ts-ignore
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(saga)
export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState> // A global type to access reducers types
export type AppDispatch = typeof store.dispatch
