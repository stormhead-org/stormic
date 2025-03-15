'use client'

import { Community } from '@/payload-types'
import PlaygroundEditorTheme from '@/shared/components/lexical/themes/PlaygroundEditorTheme'
import { PostWriteHeader } from '@/shared/components/post-write/items/post-write-header'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Maximize2, Minimize2 } from 'lucide-react'
import React, { useState } from 'react'
import { SharedHistoryContext } from '../../lexical/context/SharedHistoryContext'
import { ToolbarContext } from '../../lexical/context/ToolbarContext'
import Editor from '../../lexical/Editor'
import PlaygroundNodes from '../../lexical/nodes/PlaygroundNodes'

interface Props {
	authorAvatar: string
	authorName: string
	communities: Community[]
	authorUrl: string
	open: boolean
	onClose: () => void
	authorId?: number
	communityId?: number
}

const EditorWithContext: React.FC<{ onSave: (content: any) => void }> = ({
	onSave
}) => {
	const [editor] = useLexicalComposerContext()

	const handleSave = () => {
		const editorState = editor.getEditorState()
		const jsonState = editorState.toJSON()
		onSave(jsonState)
	}

	return (
		<>
			<Editor />
			<button
				onClick={handleSave}
				className='my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
			>
				Опубликовать
			</button>
		</>
	)
}

export const WriteModal: React.FC<Props> = ({
	authorAvatar,
	authorName,
	communities,
	authorUrl,
	open,
	onClose,
	authorId = 1,
	communityId = 1
}) => {
	const [isFullScreen, setIsFullScreen] = useState(false)

	const handleToggleSize = () => {
		setIsFullScreen(!isFullScreen)
	}

	const handleSave = async (content: any) => {
		if (!content?.root?.children?.length) {
			console.error('Контент пустой')
			return
		}

		const postData = {
			content,
			title: 'Новый пост',
			author: authorId,
			community: communityId
		}
		console.log(content)
		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			})

			if (response.ok) {
				console.log('Пост успешно опубликован')
				onClose()
			} else {
				console.error('Ошибка при публикации:', response.statusText)
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

	const initialConfig = {
		namespace: 'NewPost',
		nodes: [...PlaygroundNodes],
		theme: PlaygroundEditorTheme,
		onError: (error: Error) => {
			console.error(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`bg-secondary transition-all duration-300 p-2 ${
					isFullScreen ? 'min-w-full min-h-full' : 'min-w-[60rem] min-h-[620px]'
				}`}
			>
				{isFullScreen ? (
					<Minimize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				) : (
					<Maximize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				)}
				<div className='flex mx-auto'>
					<div className='p-2'>
						<PostWriteHeader
							authorName={authorName}
							authorUrl={authorUrl}
							authorAvatar={authorAvatar}
							communities={communities}
						/>
						<div
							className={`max-w-[58rem] my-2 ${
								isFullScreen
									? 'min-w-[600px] min-h-[88%]'
									: 'min-w-[600px] min-h-[600px]'
							}`}
						>
							<LexicalComposer initialConfig={initialConfig}>
								<SharedHistoryContext>
									<ToolbarContext>
										<div className='mx-auto my-5 rounded-md max-w-[1100px] text-black relative leading-7 font-normal'>
											<EditorWithContext onSave={handleSave} />
										</div>
									</ToolbarContext>
								</SharedHistoryContext>
							</LexicalComposer>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
