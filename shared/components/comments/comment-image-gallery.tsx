import { useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

interface CommentImageGalleryProps {
	images: string[];
}

const CommentImageGallery = ({ images }: CommentImageGalleryProps) => {
	const [imageSizes, setImageSizes] = useState<{ width: number; height: number }[]>([])
	
	useEffect(() => {
		// Функция для загрузки всех изображений и получения их размеров
		const loadImageSizes = async () => {
			const sizes = await Promise.all(
				images.map((src) => {
					return new Promise<{ width: number; height: number }>((resolve) => {
						const img = new Image()
						img.src = src
						img.onload = () => {
							resolve({
								width: img.naturalWidth,
								height: img.naturalHeight
							})
						}
					})
				})
			)
			setImageSizes(sizes)
		}
		
		loadImageSizes()
	}, [images])
	
	const calculateDimensions = (width: number, height: number) => {
		const screenWidth = window.innerWidth * 0.85 // 85% ширины экрана
		const screenHeight = window.innerHeight * 0.85 // 85% высоты экрана
		
		const aspectRatio = width / height
		
		let newWidth = width
		let newHeight = height
		
		if (width > screenWidth) {
			newWidth = screenWidth
			newHeight = screenWidth / aspectRatio
		}
		
		if (newHeight > screenHeight) {
			newHeight = screenHeight
			newWidth = screenHeight * aspectRatio
		}
		
		return { newWidth, newHeight }
	}
	
	return (
		<Gallery>
			<div className='image-gallery'>
				{images.map((src, index) => {
					const { width, height } = imageSizes[index] || { width: 1024, height: 768 }
					const { newWidth, newHeight } = calculateDimensions(width, height)
					
					return (
						<Item
							key={index}
							original={src}
							thumbnail={src}
							width={newWidth} // Ограниченные размеры
							height={newHeight} // Ограниченные размеры
						>
							{({ ref, open }) => (
								<img
									ref={ref}
									onClick={open}
									src={src}
									alt={`Image ${index + 1}`}
									sizes='100%'
									className='object-contain rounded-md cursor-pointer'
									style={{ maxWidth: '100%', maxHeight: '100%' }}
								/>
							)}
						</Item>
					)
				})}
			</div>
		</Gallery>
	)
}

export default CommentImageGallery
