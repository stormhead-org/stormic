import type { JSX } from 'react'
import { HTMLInputTypeAttribute } from 'react'

type Props = Readonly<{
	'data-test-id'?: string
	label: string
	onChange: (val: string) => void
	placeholder?: string
	value: string
	type?: HTMLInputTypeAttribute
}>

export default function TextInput({
	label,
	value,
	onChange,
	placeholder = '',
	'data-test-id': dataTestId,
	type = 'text'
}: Props): JSX.Element {
	return (
		<div className='flex flex-row items-center mb-2.5'>
			<label className='flex-1 text-gray-600'>{label}</label>
			<input
				type={type}
				className='flex-2 border border-gray-400 py-1.5 px-2 text-base rounded-md min-w-0'
				placeholder={placeholder}
				value={value}
				onChange={e => {
					onChange(e.target.value)
				}}
				data-test-id={dataTestId}
			/>
		</div>
	)
}
