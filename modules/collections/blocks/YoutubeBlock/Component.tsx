// modules/collections/blocks/YouTubeBlock/Component.tsx
import React from 'react'
import { YouTubePreview } from './YouTubePreview.client'

type Props = {
	videoID: string
	className?: string
}

export const YouTubeBlockComponent: React.FC<Props> = ({
	videoID,
	className
}) => {
	return (
		<div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
			<YouTubePreview videoID={videoID} />
		</div>
	)
}
