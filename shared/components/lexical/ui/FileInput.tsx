import type { JSX } from 'react'

type Props = Readonly<{
	'data-test-id'?: string
	accept?: string
	label: string
	onChange: (files: FileList | null) => void
}>

export default function FileInput({
	accept,
	label,
	onChange,
	'data-test-id': dataTestId
}: Props): JSX.Element {
	return (
		<div className='flex items-center mb-2'>
			<label className='flex-1 text-gray-600'>{label}</label>
			<input
				type='file'
				accept={accept}
				className='flex-2 border border-gray-400 px-2 py-1 text-base rounded-md min-w-0'
				onChange={e => onChange(e.target.files)}
				data-test-id={dataTestId}
			/>
		</div>
	)
}
