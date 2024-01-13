'use client'

import { Provider } from 'react-redux'
import { store } from './store'

// export const ReduxProvider = (props: React.PropsWithChildren) => {
// 	return <Provider store={store}>{props.children}</Provider>
// }

function ReduxProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
