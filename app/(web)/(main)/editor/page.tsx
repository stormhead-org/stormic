'use client'

import dynamic from 'next/dynamic'

export default function CreateNewPage() {
	const EditorWrapper = dynamic(
		() => import('../../../../shared/components/editorjs/EditorWrapper'),
		{ ssr: false }
	)
	return (
		<div>
			<h1>Create New Blog</h1>
			<EditorWrapper />
		</div>
	)
}
