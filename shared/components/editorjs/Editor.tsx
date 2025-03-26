'use client'

import { cn } from '@/shared/lib/utils'
import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import Table from '@editorjs/table'
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
			levels: [1, 2, 3, 4],
			defaultLevel: 1
		}
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true
	},
	inlineCode: InlineCode,
	table: Table,
	list: List,
	quote: Quote,
	delimiter: Delimiter,
	checklist: CheckList,
	raw: Raw
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

// {
// 				width: '100%',
// 				minHeight: 500,
// 				borderRadius: '7px',
// 				background: '#003'
// 			}
