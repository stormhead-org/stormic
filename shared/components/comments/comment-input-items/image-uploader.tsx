'use client'

import { Media } from '@/payload-types'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { Plus } from 'lucide-react'
import React, { useRef } from 'react'
import { toast } from 'sonner'

interface ImageUploaderProps {
	setCommentImage: (media: Media | undefined) => void
	setIsUploading: (isUploading: boolean) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	setCommentImage,
	setIsUploading
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleUpload = async (file: File) => {
		setIsUploading(true)
		const formData = new FormData()
		formData.append('file', file)
		try {
			const result = await createMedia(formData)
			setCommentImage(result.doc)
		} catch (error) {
			toast.error('Ошибка при загрузке изображения', { icon: '❌' })
		} finally {
			setIsUploading(false)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			handleUpload(file)
		}
	}

	return (
		<div>
			<button
				type='button'
				className='group-hover:text-blue-700 font-bold transition rounded-full flex items-center justify-center'
				onClick={e => {
					e.stopPropagation()
					inputRef.current?.click()
				}}
			>
				<Plus
					className='group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1'
					size={36}
				/>
			</button>
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				className='hidden'
				onChange={handleFileChange}
			/>
		</div>
	)
}
