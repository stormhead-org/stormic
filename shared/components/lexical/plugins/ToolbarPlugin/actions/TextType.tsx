import {
	blockTypeToBlockName,
	useToolbarState
} from '@/shared/components/lexical/context/ToolbarContext'
import {
	formatBulletList,
	formatCheckList,
	formatCode,
	formatHeading,
	formatNumberedList,
	formatParagraph,
	formatQuote
} from '@/shared/components/lexical/plugins/ToolbarPlugin/utils'
import { Button } from '@/shared/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { LexicalEditor, UNDO_COMMAND } from 'lexical'
import {
	Circle,
	Code,
	Heading1,
	Heading2,
	Heading3,
	ListChecks,
	ListOrdered,
	Quote,
	RotateCcw,
	WrapText
} from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	blockType: keyof typeof blockTypeToBlockName
	disabled?: boolean
	className?: string
}

export const TextType: React.FC<Props> = ({
	editor,
	blockType,
	disabled = false,
	className
}) => {
	const handleBlockFormat = (value: string) => {
		const actions: Record<string, () => void> = {
			paragraph: () => formatParagraph(editor),
			h1: () => formatHeading(editor, blockType, 'h1'),
			h2: () => formatHeading(editor, blockType, 'h2'),
			h3: () => formatHeading(editor, blockType, 'h3'),
			bullet: () => formatBulletList(editor, blockType),
			number: () => formatNumberedList(editor, blockType),
			check: () => formatCheckList(editor, blockType),
			quote: () => formatQuote(editor, blockType),
			code: () => formatCode(editor, blockType)
		}
		actions[value]?.()
	}

	return (
		<div className={cn(className, '')}>
			<Select disabled={disabled} onValueChange={handleBlockFormat}>
				<SelectTrigger
					className={`${blockType} bg-gray-600 hover:bg-gray-500 border-0`}
				>
					<SelectValue placeholder={blockTypeToBlockName[blockType]} />
				</SelectTrigger>
				<SelectContent className='mt-1'>
					{[
						{ value: 'paragraph', icon: WrapText, label: 'Обычный' },
						// { value: 'h1', icon: Heading1, label: 'Заголовок 1' },
						// { value: 'h2', icon: Heading2, label: 'Заголовок 2' },
						// { value: 'h3', icon: Heading3, label: 'Заголовок 3' },
						// { value: 'bullet', icon: Circle, label: 'Список' },
						// { value: 'number', icon: ListOrdered, label: 'Нумерация' },
						{ value: 'check', icon: ListChecks, label: 'Чек-лист' }
						// { value: 'quote', icon: Quote, label: 'Цитата' },
						// { value: 'code', icon: Code, label: 'Code Block' }
					].map(({ value, icon: Icon, label }) => (
						<SelectItem
							key={value}
							value={value}
							className='cursor-pointer hover:bg-primary/10'
						>
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
