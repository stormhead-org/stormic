import { useToolbarState } from '@/shared/components/lexical/context/ToolbarContext'
import { sanitizeUrl } from '@/shared/components/lexical/utils/url'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import { LexicalEditor, UNDO_COMMAND } from 'lexical'
import { Link, RotateCcw } from 'lucide-react'
import React, { Dispatch, useCallback, useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	setIsLinkEditMode: Dispatch<boolean>
	className?: string
}

export const InsertLink: React.FC<Props> = ({
	editor,
	activeEditor,
	setIsLinkEditMode,
	className
}) => {
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const { toolbarState, updateToolbarState } = useToolbarState()

	const insertLink = useCallback(() => {
		setIsLinkEditMode(!toolbarState.isLink)
		activeEditor.dispatchCommand(
			TOGGLE_LINK_COMMAND,
			toolbarState.isLink ? null : sanitizeUrl('https://')
		)
	}, [activeEditor, setIsLinkEditMode, toolbarState.isLink])

	return (
		<div className={cn(className, '')}>
			<Button
				disabled={!isEditable}
				onClick={insertLink}
				className={
					toolbarState.isLink
						? 'bg-gray-500 hover:bg-gray-500 w-10 h-10 border-0 text-primary'
						: 'bg-gray-600 hover:bg-gray-500 w-10 h-10 border-0 text-primary'
				}
				variant='default'
				type='button'
			>
				<Link size={16} />
			</Button>
		</div>
	)
}
