import { Button } from '@/shared/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { LexicalEditor } from 'lexical'
import { JSX, useState } from 'react'

const LAYOUTS = [
	{ label: '2 columns (equal width)', value: '1fr 1fr' },
	{ label: '2 columns (25% - 75%)', value: '1fr 3fr' },
	{ label: '3 columns (equal width)', value: '1fr 1fr 1fr' },
	{ label: '3 columns (25% - 50% - 25%)', value: '1fr 2fr 1fr' },
	{ label: '4 columns (equal width)', value: '1fr 1fr 1fr 1fr' }
]

export default function InsertLayoutDialog({
	activeEditor,
	onClose
}: {
	activeEditor: LexicalEditor
	onClose: () => void
}): JSX.Element {
	const [layout, setLayout] = useState(LAYOUTS[0].value)

	const onClick = () => {
		activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout)
		onClose()
	}

	return (
		<div className='flex items-center space-x-2'>
			<Select value={layout} onValueChange={setLayout}>
				<SelectTrigger className='w-[250px]'>
					<SelectValue placeholder='Select a layout' />
				</SelectTrigger>
				<SelectContent>
					{LAYOUTS.map(({ label, value }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button onClick={onClick}>Insert</Button>
		</div>
	)
}
