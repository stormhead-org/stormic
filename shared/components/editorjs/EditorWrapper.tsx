'use client'

import { OutputData } from '@editorjs/editorjs'
import EditorJsHtml from 'editorjs-html'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'

let Editor = dynamic(() => import('./Editor'), {
	ssr: false
})

const EditorWrapper: React.FC = () => {
	const [content, setContent] = useState<OutputData | null>(null)
	const [htmlContent, setHtmlContent] = useState<string>('')

	const handleChange = useCallback((newContent: OutputData) => {
		setContent(newContent)
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (content) {
			console.log(content)
			// Преобразуем JSON контент в HTML с помощью editorjs-html
			const edjsParser = EditorJsHtml()
			const htmlOutput = edjsParser.parse(content)
			setHtmlContent(htmlOutput)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Editor data={content} onChange={handleChange} holder='editor_create' />
				<button type='submit'>Создать пост</button>
			</form>
		</div>
	)
}

export default EditorWrapper
