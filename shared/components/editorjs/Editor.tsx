'use client'

import { cn } from '@/shared/lib/utils'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import Code from '@editorjs/code'
// import Delimiter from '@editorjs/delimiter'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import React, { useEffect, useRef } from 'react'

interface EditorProps {
	data: OutputData | null
	onChange: (content: OutputData) => void
	holder: string
	className?: string
}

const EDITOR_TOOLS: { [key: string]: any } = {
	code: Code,
	header: {
		class: Header,
		shortcut: 'CMD+H',
		inlineToolbar: true,
		config: {
			placeholder: 'Заголовок',
			levels: [2, 3, 4],
			defaultLevel: 2
		}
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true
	},
	list: List,
	quote: Quote,
	// delimiter: Delimiter,
	image: {
		class: ImageTool,
		config: {
			uploader: {
				uploadByFile(file: File) {
					const formData = new FormData()
					formData.append('file', file)
					return createMedia(formData)
						.then(result => {
							return {
								success: 1,
								file: {
									url: result.doc.url
								}
							}
						})
						.catch(error => {
							console.error('Ошибка загрузки изображения:', error)
							return {
								success: 0,
								file: null
							}
						})
				}
			}
		}
	},
	embed: {
		class: Embed,
		inlineToolbar: true,
		config: {
			services: {
				youtube: true,
				twitter: true,
				'twitch-video': true,
				'twitch-channel': true,
				vimeo: true,
				imgur: true,
				'yandex-music-track': true,
				'yandex-music-album': true,
				'yandex-music-playlist': true,
				github: true
			}
		}
	}
}

const Editor: React.FC<EditorProps> = ({
	data,
	onChange,
	holder,
	className
}) => {
	const ref = useRef<EditorJS | null>(null)

	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder: holder,
				placeholder: 'Однажды, в холодную, зимнюю пору...',
				tools: EDITOR_TOOLS,
				data: data || undefined,
				async onChange(api) {
					const content = await api.saver.save()
					onChange(content)
				}
			})
			ref.current = editor
		}

		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy()
			}
		}
	}, [holder, onChange])

	return <div id={holder} className={cn(className, '')} />
}

export default Editor
