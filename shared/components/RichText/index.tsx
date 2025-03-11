import { MediaBlock } from '@/modules/collections/blocks/MediaBlock/Component'
import {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedLinkNode
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
	JSXConvertersFunction,
	LinkJSXConverter,
	RichText as RichTextWithoutBlocks
} from '@payloadcms/richtext-lexical/react'

import {
	CodeBlock,
	CodeBlockProps
} from '@/modules/collections/blocks/Code/Component'

import { BannerBlock } from '@/modules/collections/blocks/Banner/Component'
import type {
	BannerBlock as BannerBlockProps,
	MediaBlock as MediaBlockProps
} from '@/payload-types'
import { cn } from '@/shared/lib/utils'

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc!
	if (typeof value !== 'object') {
		throw new Error('Expected value to be an object')
	}
	const id = value.id
	return relationTo === 'posts' ? `/p/${id}` : `/${id}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	blocks: {
		banner: ({ node }) => (
			<BannerBlock className='col-start-2 mb-4' {...node.fields} />
		),
		mediaBlock: ({ node }) => (
			<MediaBlock
				className='col-start-1 col-span-3'
				imgClassName='m-0'
				{...node.fields}
				captionClassName='mx-auto max-w-[48rem]'
				enableGutter={false}
				disableInnerContainer={true}
			/>
		),
		code: ({ node }) => <CodeBlock className='col-start-2' {...node.fields} />
	}
})

type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return (
		<RichTextWithoutBlocks
			converters={jsxConverters}
			className={cn(
				{
					'container ': enableGutter,
					'max-w-none': !enableGutter,
					'mx-auto prose md:prose-md dark:prose-invert ': enableProse
				},
				className
			)}
			{...rest}
		/>
	)
}
