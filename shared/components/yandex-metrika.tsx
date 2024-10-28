'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
	interface Window {
		ym: (counterId: number, action: string, url: string) => void
	}
}

export default function YandexMetrika() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA
	
	useEffect(() => {
		const url = `${pathname}?${searchParams}`
		
		if (typeof window !== 'undefined' && window.ym && counterId) {
			window.ym(Number(counterId), 'hit', url)
		}
		
	}, [pathname, searchParams, counterId])
	
	return null
}
