// components/lexical/LexicalEditor.tsx
'use client'

import { CodeNode } from '@lexical/code'
import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { HeadingNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ToolbarContext } from './context/ToolbarContext'
import Toolbar from './elements/toolbar'

const initialConfig = {
	namespace: 'MyEditor',
	onError: (error: Error) => console.error(error),
	nodes: [
		HeadingNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		ListNode,
		ListItemNode,
		CodeNode,
		LinkNode
	] as any[]
}

export default function LexicalEditor() {
	return (
		<ToolbarContext>
			<LexicalComposer initialConfig={initialConfig}>
				<Toolbar />
				<RichTextPlugin
					contentEditable={
						<ContentEditable className='min-h-[200px] border border-gray-300 p-4 outline-none' />
					}
					placeholder={
						<div className='pointer-events-none absolute top-4 left-4 text-gray-500'>
							Введите текст...
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				<ListPlugin />
				<LinkPlugin />
				<TablePlugin />
			</LexicalComposer>
		</ToolbarContext>
	)
}
