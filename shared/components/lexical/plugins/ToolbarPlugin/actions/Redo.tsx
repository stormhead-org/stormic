import { useToolbarState } from '@/shared/components/lexical/context/ToolbarContext'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { LexicalEditor, REDO_COMMAND, UNDO_COMMAND } from 'lexical'
import { RotateCcw, RotateCw } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const Redo: React.FC<Props> = ({ editor, activeEditor, className }) => {
	
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const { toolbarState, updateToolbarState } = useToolbarState()
	
	return (
		<div className={cn(className, '')}>
			<Button
				type='button'
				variant='default'
				disabled={!toolbarState.canRedo || !isEditable}
				onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
			>
				<RotateCw size={16} />
			</Button>
		</div>
	)
}
