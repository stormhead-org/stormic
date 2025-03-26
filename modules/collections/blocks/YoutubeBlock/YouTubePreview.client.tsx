'use client'
import React from 'react'

type Props = {
	videoID: string
}

export const YouTubePreview: React.FC<Props> = ({ videoID }) => {
	return (
		<div className='youtube-block-preview'>
			<iframe
				width='560'
				height='315'
				src={`https://www.youtube-nocookie.com/embed/${videoID}`}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='YouTube video'
			/>
		</div>
	)
}
