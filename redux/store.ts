import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper-future'
import { userReducer } from './slices/user'

// import counterReducer from '/'

export function makeStore() {
	return configureStore({
		reducer: { user: userReducer }
	})
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export const wrapper = createWrapper<RootStore>(makeStore)
