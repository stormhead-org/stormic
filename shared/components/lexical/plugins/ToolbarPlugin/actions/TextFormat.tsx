import { clearFormatting } from '@/shared/components/lexical/plugins/ToolbarPlugin/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { FORMAT_TEXT_COMMAND, LexicalEditor, } from 'lexical'
import {
	ArrowBigUpDash,
	CaseLower, CaseSensitive,
	CaseUpper, CircleX,
	Strikethrough
} from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const TextFormat: React.FC<Props> = ({ editor, activeEditor, className }) => {
	
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	
	return (
		<div className={cn(className, '')}>
			<Select
				disabled={!isEditable}
				onValueChange={value => {
					const actions: Record<string, () => void> = {
						lowercase: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'lowercase'
							),
						uppercase: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'uppercase'
							),
						capitalize: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'capitalize'
							),
						strikethrough: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'strikethrough'
							),
						subscript: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'subscript'
							),
						superscript: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'superscript'
							),
						highlight: () =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								'highlight'
							),
						clearing: () => clearFormatting(activeEditor)
					}
					actions[value]?.()
				}}
			>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Форматирование'/>
				</SelectTrigger>
				<SelectContent>
					{[
						{ value: 'lowercase', icon: CaseLower, label: 'Строчные' },
						{ value: 'uppercase', icon: CaseUpper, label: 'Заглавные' },
						{
							value: 'capitalize',
							icon: ArrowBigUpDash,
							label: 'С заглавной'
						},
						{
							value: 'strikethrough',
							icon: Strikethrough,
							label: 'Зачеркнутый'
						},
						// { value: 'subscript', icon: Subscript, label: 'Subscript' },
						// {
						// 	value: 'superscript',
						// 	icon: Superscript,
						// 	label: 'Superscript'
						// },
						// { value: 'highlight', icon: Highlighter, label: 'Highlight' },
						{ value: 'clearing', icon: CircleX, label: 'Очистить' }
					].map(({ value, icon: Icon, label }) => (
						<SelectItem key={value} value={value}>
							<div className='flex'>
								<Icon className='mr-2' size={16} />
								{label}
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
