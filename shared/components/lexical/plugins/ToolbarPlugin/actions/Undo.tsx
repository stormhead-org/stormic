import { useToolbarState } from '@/shared/components/lexical/context/ToolbarContext'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { LexicalEditor, UNDO_COMMAND } from 'lexical'
import { RotateCcw } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const Undo: React.FC<Props> = ({ editor, activeEditor, className }) => {
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const { toolbarState, updateToolbarState } = useToolbarState()

	return (
		<div className={cn(className, '')}>
			<Button
				type='button'
				variant='default'
				disabled={!toolbarState.canUndo || !isEditable}
				onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
				className='text-primary bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800'
			>
				<RotateCcw size={16} />
			</Button>
		</div>
	)
}
