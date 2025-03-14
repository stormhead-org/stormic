import type { JSX } from 'react'
import { ReactNode } from 'react'

import joinClasses from '../utils/joinClasses'

export default function Button({
	'data-test-id': dataTestId,
	children,
	className,
	onClick,
	disabled,
	small,
	title
}: {
	'data-test-id'?: string
	children: ReactNode
	className?: string
	disabled?: boolean
	onClick: () => void
	small?: boolean
	title?: string
}): JSX.Element {
	return (
		<button
			disabled={disabled}
			className={joinClasses(
				'px-4 py-2 border-0 bg-gray-200 rounded cursor-pointer text-sm hover:bg-gray-300',
				disabled && 'cursor-not-allowed bg-gray-200 hover:bg-gray-200',
				small && 'px-2 py-1 text-xs',
				className
			)}
			onClick={onClick}
			title={title}
			aria-label={title}
			{...(dataTestId && { 'data-test-id': dataTestId })}
		>
			{children}
		</button>
	)
}
