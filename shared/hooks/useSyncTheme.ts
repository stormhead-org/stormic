'use client'

import canUseDOM from '@/shared/lib/canUseDOM'
import { useEffect } from 'react'

export function useSyncTheme() {
	useEffect(() => {
		if (!canUseDOM) return

		const payloadTheme = document.cookie
			.split('; ')
			.find(row => row.startsWith('payload-theme='))
			?.split('=')[1]

		const themeFromCookies = payloadTheme || 'light'

		if (themeFromCookies === 'dark') {
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('light')
		} else {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
		}
	}, [])
}
