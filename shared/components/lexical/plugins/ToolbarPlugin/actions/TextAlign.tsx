import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import {
	ElementFormatType,
	FORMAT_ELEMENT_COMMAND,
	LexicalEditor,
} from 'lexical'
import {
	AlignCenter,
	AlignEndVertical,
	AlignJustify,
	AlignLeft,
	AlignRight,
	AlignStartVertical, IndentDecrease, IndentIncrease,
	RotateCcw
} from 'lucide-react'
import React from 'react'

const ELEMENT_FORMAT_OPTIONS: Record<
	Exclude<ElementFormatType, ''>,
	{ icon: string; iconRTL: string; name: string }
> = {
	center: {
		icon: 'center-align',
		iconRTL: 'center-align',
		name: 'По центру'
	},
	end: { icon: 'right-align', iconRTL: 'left-align', name: 'End Align' },
	justify: {
		icon: 'justify-align',
		iconRTL: 'justify-align',
		name: 'По ширине'
	},
	left: { icon: 'left-align', iconRTL: 'left-align', name: 'Слева' },
	right: { icon: 'right-align', iconRTL: 'right-align', name: 'Справа' },
	start: { icon: 'left-align', iconRTL: 'right-align', name: 'Start Align' }
}

interface Props {
	editor: LexicalEditor
	value: ElementFormatType
	isRTL: boolean
	disabled: boolean
	className?: string
}

export const TextAlign: React.FC<Props> = ({ editor, value, isRTL, disabled = false, className }) => {
	
	const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left']
	
	const handleFormat = (val: string) => {
		const actions: Record<string, () => void> = {
			left: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
			center: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
			right: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
			justify: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify'),
			// start: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start'),
			// end: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end'),
			// outdent: () => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined),
			// indent: () => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
		}
		actions[val]?.()
	}
	
	return (
		<div className={cn(className, '')}>
			<Select disabled={disabled} onValueChange={handleFormat}>
				<SelectTrigger
					className={`toolbar-item spaced alignment ${isRTL ? formatOption.iconRTL : formatOption.icon}`}
				>
					<SelectValue placeholder={formatOption.name} />
				</SelectTrigger>
				<SelectContent>
					{[
						{ value: 'left', icon: AlignLeft, label: 'Слева' },
						{ value: 'right', icon: AlignRight, label: 'Справа' },
						{ value: 'center', icon: AlignCenter, label: 'По центру' },
						{ value: 'justify', icon: AlignJustify, label: 'По ширине' },
						// { value: 'start', icon: AlignStartVertical, label: 'Start Align' },
						// { value: 'end', icon: AlignEndVertical, label: 'End Align' },
						// { value: 'outdent', icon: IndentDecrease, label: 'Outdent' },
						// { value: 'indent', icon: IndentIncrease, label: 'Indent' }
					].map(({ value, icon: Icon, label }) => (
						<SelectItem key={value} value={value}>
							<div className='flex items-center'>
								<Icon size={16} />
								<span className='ml-2'>{label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
