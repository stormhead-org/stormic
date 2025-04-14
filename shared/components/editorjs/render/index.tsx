'use client'

import { OutputData } from '@editorjs/editorjs'
import EditorJsHtml from 'editorjs-html'
import React from 'react'

interface RichTextProps {
	data: OutputData | null
	className?: string
}

const RichText: React.FC<RichTextProps> = ({ data, className }) => {
	if (!data) return null

	const edjsParser = EditorJsHtml()
	// Если parse возвращает строку, используем её напрямую
	const htmlOutput = edjsParser.parse(data)

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: htmlOutput }}
		/>
	)
}

export default RichText
