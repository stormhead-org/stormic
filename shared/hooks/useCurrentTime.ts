import { useState, useEffect } from 'react'

export const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState<string>(
		new Date().toISOString()
	)

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date().toISOString())
		}, 1000) // Обновляем время каждую секунду

		// Очистка интервала при размонтировании компонента
		return () => clearInterval(timer)
	}, [])

	return currentTime
}
