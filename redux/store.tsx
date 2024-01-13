import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/user'

// import counterReducer from '/'

export function makeStore() {
	return configureStore({
		reducer: { user: userReducer }
	})
}

export const store = makeStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
