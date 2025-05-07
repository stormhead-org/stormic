'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/shared/lib/utils'

interface AutoResizeTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	maxHeight?: number // Опционально: максимальная высота в пикселях
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
	className,
	maxHeight,
	...props
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		const textarea = textareaRef.current
		if (!textarea) return

		const adjustHeight = () => {
			textarea.style.height = 'auto' // Сбрасываем высоту, чтобы получить актуальный scrollHeight
			const scrollHeight = textarea.scrollHeight
			if (maxHeight && scrollHeight > maxHeight) {
				textarea.style.height = `${maxHeight}px`
				textarea.style.overflowY = 'auto' // Включаем прокрутку, если превышена максимальная высота
			} else {
				textarea.style.height = `${scrollHeight}px`
				textarea.style.overflowY = 'hidden' // Скрываем прокрутку
			}
		}

		// Устанавливаем начальную высоту при монтировании
		adjustHeight()

		// Добавляем обработчики событий для отслеживания ввода
		textarea.addEventListener('input', adjustHeight)

		// Очищаем обработчики при размонтировании
		return () => {
			textarea.removeEventListener('input', adjustHeight)
		}
	}, [maxHeight])

	return (
		<textarea
			ref={textareaRef}
			className={cn(
				'flex w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	)
}

export { AutoResizeTextarea }
