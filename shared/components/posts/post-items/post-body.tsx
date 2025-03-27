import { Title } from '@/shared/components/title'
import { cn } from '@/shared/lib/utils'
import { OutputData } from '@editorjs/editorjs'
import Link from 'next/link'
import React from 'react'
import RichText from '../../editorjs/render'

interface Props {
	postTitle: string
	postContent: OutputData | null
	heroImage?: string
	postUrl: string
	className?: string
	maxLength: number
}

// const truncateEditorState = (
// 	serializedState: SerializedEditorState,
// 	maxLength: number
// ): SerializedEditorState => {
// 	if (!serializedState || !serializedState.root) return serializedState

// 	let charCount = 0

// 	const truncateNode = (node: any): any => {
// 		if (charCount >= maxLength) return null

// 		if (node.children) {
// 			const newChildren = []
// 			for (const child of node.children) {
// 				const newChild = truncateNode(child)
// 				if (!newChild) break
// 				newChildren.push(newChild)
// 			}
// 			return { ...node, children: newChildren }
// 		} else if (node.text) {
// 			const remaining = maxLength - charCount
// 			const truncatedText = node.text.slice(0, remaining)
// 			charCount += truncatedText.length
// 			return { ...node, text: truncatedText }
// 		}

// 		return node
// 	}

// 	return {
// 		...serializedState,
// 		root: truncateNode(serializedState.root)
// 	}
// }

export const PostBody: React.FC<Props> = ({
	postTitle,
	postContent,
	heroImage,
	postUrl,
	className,
	maxLength
}) => {
	return (
		<div className={cn('', className)}>
			<Link href={postUrl}>
				<Title text={postTitle} size='sm' className='font-extrabold my-2' />
				<RichText
					//data={truncateEditorState(postContent, maxLength)}
					data={postContent}
				/>

				{heroImage && (
					<img
						className='rounded-md mt-4 object-cover h-80 w-full'
						src={heroImage}
						alt={postTitle}
					/>
				)}
			</Link>
		</div>
	)
}
