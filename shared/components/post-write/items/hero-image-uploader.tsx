'use client'

import { Media } from '@/payload-types'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { Plus, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

interface HeroImageUploaderProps {
	heroImage: Media | undefined
	setHeroImage: (media: Media | undefined) => void
}

export const HeroImageUploader: React.FC<HeroImageUploaderProps> = ({
	heroImage,
	setHeroImage
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isUploading, setIsUploading] = useState(false)

	const handleUpload = async (file: File) => {
		setIsUploading(true)
		const formData = new FormData()
		formData.append('file', file)
		try {
			const result = await createMedia(formData)
			setHeroImage(result.doc)
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

	const handleRemove = () => {
		setHeroImage(undefined)
	}

	const handleClick = () => {
		if (!heroImage) {
			inputRef.current?.click()
		}
	}

	return (
		<div
			className='relative w-full h-32 bg-secondary rounded-md flex items-center justify-center cursor-pointer px-2'
			onClick={handleClick}
			style={{
				backgroundImage: heroImage ? `url(${heroImage.url})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
		>
			{heroImage ? (
				<button
					className='bg-red-500 text-primary p-1 rounded-full'
					onClick={e => {
						e.stopPropagation()
						handleRemove()
					}}
				>
					<X size={36} />
				</button>
			) : (
				<button className='bg-primary text-secondary p-1 rounded-full'>
					<Plus size={36} />
				</button>
			)}
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				className='hidden'
				onChange={handleFileChange}
			/>
			{isUploading && (
				<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
					<p className='text-white'>Загрузка...</p>
				</div>
			)}
		</div>
	)
}

// export const HeroImageUploaderIcon: React.FC<HeroImageUploaderProps> = ({
// 	heroImage,
// 	setHeroImage
// }) => {
// 	const inputRef = useRef<HTMLInputElement>(null)
// 	const [isUploading, setIsUploading] = useState(false)

// 	const handleUpload = async (file: File) => {
// 		setIsUploading(true)
// 		const formData = new FormData()
// 		formData.append('file', file)
// 		try {
// 			const result = await createMedia(formData)
// 			setHeroImage(result.doc)
// 		} catch (error) {
// 			toast.error('Ошибка при загрузке изображения', { icon: '❌' })
// 		} finally {
// 			setIsUploading(false)
// 		}
// 	}

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0]
// 		if (file) {
// 			handleUpload(file)
// 		}
// 	}

// 	const handleRemove = () => {
// 		setHeroImage(undefined)
// 	}

// 	const handleClick = () => {
// 		if (!heroImage) {
// 			inputRef.current?.click()
// 		}
// 	}

// 	return (
// 		<>
// 			{heroImage ? (
// 				<button
// 					className='bg-red-500 text-primary p-1 rounded-full'
// 					onClick={e => {
// 						e.stopPropagation()
// 						handleRemove()
// 					}}
// 				>
// 					<X size={16} />
// 				</button>
// 			) : (
// 				<button
// 					className='bg-primary text-secondary p-1 rounded-full'
// 					onClick={handleClick}
// 				>
// 					<ImagePlus size={16} />
// 				</button>
// 			)}
// 			<input
// 				type='file'
// 				accept='image/*'
// 				ref={inputRef}
// 				className='hidden'
// 				onChange={handleFileChange}
// 			/>
// 		</>
// 	)
// }
