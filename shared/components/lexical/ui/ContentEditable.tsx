import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import type { JSX } from 'react'

type Props = {
	className?: string
	placeholderClassName?: string
	placeholder: string
}

export default function LexicalContentEditable({
	className,
	placeholder,
	placeholderClassName
}: Props): JSX.Element {
	return (
		<ContentEditable
			className={
				className ??
				'block border-0 text-sm p-2.5 pl-7 pr-7 pb-10 min-h-[150px] outline-none'
			}
			aria-placeholder={placeholder}
			placeholder={
				<div
					className={
						placeholderClassName ??
						'absolute text-sm text-gray-400 top-2 left-7 right-7 overflow-hidden whitespace-nowrap pointer-events-none'
					}
				>
					{placeholder}
				</div>
			}
		/>
	)
}
