'use client'

import { useSyncTheme } from '@/shared/hooks/useSyncTheme'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { ShadcnThemeProvider } from './ShadcnTheme'

const ThemeContext = createContext({
	theme: 'light',
	setTheme: (theme: 'light' | 'dark') => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setThemeState] = useState<'light' | 'dark'>('light')

	// Функция для установки темы через класс
	const setTheme = useCallback((themeToSet: 'light' | 'dark') => {
		if (themeToSet === 'dark') {
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('light')
		} else {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
		}

		setThemeState(themeToSet)

		// Сохраняем тему в cookies
		document.cookie = `payload-theme=${themeToSet}; path=/; max-age=31536000;`
	}, [])

	// Используем хук синхронизации с темой из cookies
	useSyncTheme()

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<ShadcnThemeProvider
				attribute='class'
				defaultTheme='dark'
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ShadcnThemeProvider>
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
