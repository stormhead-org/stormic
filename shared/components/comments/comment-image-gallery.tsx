import 'photoswipe/dist/photoswipe.css'
import { useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

interface CommentImageGalleryProps {
	images: string[]
}

const CommentImageGallery = ({ images }: CommentImageGalleryProps) => {
	const [imageSizes, setImageSizes] = useState<
		{ width: number; height: number }[]
	>([])

	useEffect(() => {
		const loadImageSizes = async () => {
			const sizes = await Promise.all(
				images.map(src => {
					return new Promise<{ width: number; height: number }>(resolve => {
						const img = new Image()
						img.src = src
						img.onload = () => {
							resolve({
								width: img.naturalWidth,
								height: img.naturalHeight
							})
						}
						img.onerror = () => {
							resolve({ width: 1024, height: 768 })
						}
					})
				})
			)
			setImageSizes(sizes)
		}

		if (images.length > 0) {
			loadImageSizes()
		}
	}, [images])

	return (
		<Gallery>
			<div className='image-gallery w-full h-full'>
				{images.map((src, index) => {
					const { width, height } = imageSizes[index] || {
						width: 1024,
						height: 768
					}

					return (
						<Item
							key={index}
							original={src}
							thumbnail={src}
							width={width}
							height={height}
						>
							{({ ref, open }) => (
								<img
									ref={ref}
									onClick={open}
									src={src}
									alt={`Image ${index + 1}`}
									className='object-cover rounded-md cursor-pointer w-full h-full'
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
