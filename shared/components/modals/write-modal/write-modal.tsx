'use client'

import { PostWriteHeader } from '@/shared/components/post-write/items/post-write-header'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import CodeTool from '@editorjs/code'
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import { Maximize2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
	authorAvatar: string
	authorName: string
	authorUrl: string,
	open: boolean
	onClose: () => void
}

export const WriteModal: React.FC<Props> = ({ authorAvatar, authorName, authorUrl, open, onClose }) => {
	const [isEditorInitialized, setIsEditorInitialized] = useState(false)
	const editorRef = useRef<EditorJS | null>(null)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const handleToggleSize = () => {
		setIsFullScreen(!isFullScreen)
	}
	
	useEffect(() => {
		if (open && !editorRef.current) {
			editorRef.current = new EditorJS({
				holder: 'editorjs',
				tools: {
					header: Header,
					image: {
						class: ImageTool as unknown as ToolConstructable,
						config: {
							endpoints: {
								byFile: '/api/uploadFile', // URL для загрузки изображения с компьютера
								byUrl: '/api/fetchUrl' // URL для загрузки изображения по URL
							},
							field: 'image',
							types: 'image/jpeg,image/png,image/webp',
							captionPlaceholder: 'Подпись изображения...'
						}
					},
					code: CodeTool as unknown as ToolConstructable,
					list: List,
					paragraph: {
						class: Paragraph,
						inlineToolbar: true
					}
				},
				data: {
					blocks: []
				},
				onReady: () => {
					console.log('Editor.js is ready to work!')
				},
				onChange: async () => {
					const content = await editorRef.current?.save()
					console.log('Content was changed:', content)
				}
			})
			
			setIsEditorInitialized(true)
		}
		
		return () => {
			if (editorRef.current) {
				editorRef.current.destroy?.()
				editorRef.current = null
				setIsEditorInitialized(false)
			}
		}
	}, [open])
	
	const handleSave = async () => {
		const savedData: OutputData | undefined = await editorRef.current?.save()
		console.log('Saved data:', savedData)
	}
	
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`bg-secondary transition-all duration-300-p-2 ${
					isFullScreen ? 'min-w-full min-h-full' : 'min-w-[720px] min-h-[620px]'
				}`}
			>
				<Maximize2 onClick={handleToggleSize} className='cursor-pointer absolute top-4 right-10' size={15} />
				
				<div className='flex mx-auto'>
					<div className='p-2'>
						<PostWriteHeader authorName={authorName} authorUrl={authorUrl} authorAvatar={authorAvatar} />
						<div id='editorjs' className={`max-w-[600px] my-2 ${
							isFullScreen ? 'min-w-[600px] min-h-[88%]' : 'min-w-[600px] min-h-[600px] '
						}`} />
						<button
							onClick={handleSave}
							className='my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						>
							Опубликовать
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
