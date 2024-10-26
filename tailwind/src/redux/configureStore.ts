import { combineReducers, configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './reducer/currentUser/slide'
import nhanvienReduces from './reducer/nhanVienSlide'

const rootReducer = combineReducers({
  currentUserReducer,
})
export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer.reducer,
    nhanViens: nhanvienReduces.reducer
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch