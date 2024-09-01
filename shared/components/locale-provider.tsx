'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface LocaleContextType {
	locale: string;
	setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [locale, setLocale] = useState<string>('en')
	
	// Обработка на клиентской стороне
	useEffect(() => {
		const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null
		if (savedLocale) {
			setLocale(savedLocale)
		} else {
			const browserLocale = navigator.language.split('-')[0] || 'en'
			setLocale(browserLocale)
		}
	}, [])
	
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('locale', locale)
		}
	}, [locale])
	
	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			{children}
		</LocaleContext.Provider>
	)
}

export const useLocale = (): LocaleContextType => {
	const context = useContext(LocaleContext)
	if (context === undefined) {
		throw new Error('useLocale must be used within a LocaleProvider')
	}
	return context
}
