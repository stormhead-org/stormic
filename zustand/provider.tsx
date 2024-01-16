'use client'

import { useRef, type PropsWithChildren } from 'react'
import type { StoreInterface, StoreType } from './store'
import { Provider, initializeStore } from './store'

export interface PreloadedStoreInterface
	extends Pick<StoreInterface, 'lastUpdate'> {}

export default function StoreProvider({
	children,
	...props
}: PropsWithChildren<PreloadedStoreInterface>) {
	const storeRef = useRef<StoreType>()

	if (!storeRef.current) {
		storeRef.current = initializeStore(props)
	}

	return <Provider value={storeRef.current}>{children}</Provider>
}
