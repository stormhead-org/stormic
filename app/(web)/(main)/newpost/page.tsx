'use client'

import { Editor, EditorComposer } from '@drcpythonmfe/lexical-playground'
import '@drcpythonmfe/lexical-playground/editor.css'
import '@drcpythonmfe/lexical-playground/theme.css'
import { JSX, useState } from 'react'

function App({
	html,
	setHtml
}: {
	html: string
	setHtml: (newHtml: string) => void
}): JSX.Element {
	return (
		<Editor
			isRichText={true}
			onChange={(htmlString: string) => {
				console.log('onChange:', htmlString) // Проверка вывода
				setHtml(htmlString)
			}}
		/>
	)
}

async function publishPost(content: string): Promise<void> {
	try {
		const response = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: content, // Передаем содержимое редактора
				title: 'Новый пост', // Добавьте заголовок, если нужно
				// Другие поля, если требуются вашему API
				author: 1,
				community: 1
			})
		})

		if (!response.ok) {
			throw new Error('Ошибка при публикации поста')
		}

		const result = await response.json()
		console.log('Пост успешно опубликован:', result)
	} catch (error) {
		console.error('Ошибка:', error)
	}
}

export default function NewPostPage(): JSX.Element {
	const [html, setHtml] = useState('')

	const handlePublish = async () => {
		if (!html.trim()) {
			alert('Пожалуйста, введите текст перед публикацией')
			return
		}
		await publishPost(html) // Отправляем содержимое в API
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Новый пост</h1>
			<EditorComposer>
				<App html={html} setHtml={setHtml} />
			</EditorComposer>
			<div dangerouslySetInnerHTML={{ __html: html }} className='mt-4' />
			<button
				onClick={handlePublish}
				className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
			>
				Опубликовать
			</button>
		</div>
	)
}
