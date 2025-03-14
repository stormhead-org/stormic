'use client'

import { ToolbarContext } from '@/shared/components/lexical/context/ToolbarContext'
import Editor from '@/shared/components/lexical/Editor'
import PlaygroundNodes from '@/shared/components/lexical/nodes/PlaygroundNodes'
import { SharedHistoryContext } from '@/shared/components/lexical/old/context/SharedHistoryContext'
import PlaygroundEditorTheme from '@/shared/components/lexical/themes/PlaygroundEditorTheme'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { JSX } from 'react'

function NewPost(): JSX.Element {
	const initialConfig = {
		namespace: 'NewPost',
		nodes: [...PlaygroundNodes],
		theme: PlaygroundEditorTheme,
		onError: (error: Error) => {
			console.error(error)
		}
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<SharedHistoryContext>
				<ToolbarContext>
					<div className='mx-auto my-5 rounded-md max-w-[1100px] text-black relative leading-7 font-normal'>
						<Editor />
					</div>
				</ToolbarContext>
			</SharedHistoryContext>
		</LexicalComposer>
	)
}

export default NewPost
