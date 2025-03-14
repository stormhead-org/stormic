import type { JSX } from 'react'

type SelectIntrinsicProps = JSX.IntrinsicElements['select']
interface SelectProps extends SelectIntrinsicProps {
	label: string
}

export default function Select({
	children,
	label,
	className,
	...other
}: SelectProps): JSX.Element {
	return (
		<div className='flex flex-col mb-2.5'>
			<label style={{ marginTop: '-1em' }} className='text-gray-600'>
				{label}
			</label>
			<select
				{...other}
				className={`min-w-[160px] max-w-[290px] border border-[#393939] rounded-sm py-1 px-2 text-base cursor-pointer bg-gradient-to-b from-white to-[#e5e5e5] ${className}`}
			>
				{children}
			</select>
		</div>
	)
}
