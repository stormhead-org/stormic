import { ToggleGroupItem, ToggleGroup } from '@/shared/components/ui/toggle-group'
import { cn } from '@/shared/lib/utils'
import { FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType, UNDO_COMMAND } from 'lexical'
import { Bold, Italic, Underline } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const Toggles: React.FC<Props> = ({ editor, activeEditor, className }) => {
	
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	
	return (
		<div className={cn(className, '')}>
			<ToggleGroup type='multiple' variant='outline'>
				{[
					{ value: 'bold', icon: Bold },
					{ value: 'italic', icon: Italic },
					{ value: 'underline', icon: Underline }
				].map(({ value, icon: Icon }) => (
					<ToggleGroupItem
						key={value}
						disabled={!isEditable}
						value={value}
						aria-label={`Toggle ${value}`}
						onClick={() =>
							activeEditor.dispatchCommand(
								FORMAT_TEXT_COMMAND,
								value as TextFormatType
							)
						}
					>
						<Icon size={16} />
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	)
}
