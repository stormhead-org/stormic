'use client'

import { UploadButton, UploadDropzone } from '@/shared/lib/uploadthing'
import { cn } from '@/shared/lib/utils'
import { FileIcon, X } from 'lucide-react'

import '@uploadthing/react/styles.css'

interface FileUploadProps {
	className?: string
	description?: boolean
	label?: boolean
	onChange: (url?: string) => void
	value: string
	endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ className, description, label = true, onChange, value, endpoint }: FileUploadProps) => {
	const fileType = value?.split('.').pop()
	
	if (value && fileType !== 'pdf') {
		return (
			<div className='relative aspect-video w-32 h-18'>
				<img
					sizes='100%'
					src={value}
					alt='Upload'
					className='object-cover rounded-md'
				/>
				<button
					onClick={() => onChange('')}
					className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
					type='button'
				>
					<X className='h-4 w-4' />
				</button>
			</div>
		)
	}
	
	if (value && fileType === 'pdf') {
		return (
			<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
				<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
				<a
					href={value}
					target='_blank'
					rel='noopener noreferrer'
					className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
				>
					{value}
				</a>
				<button
					onClick={() => onChange('')}
					className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
					type='button'
				>
					<X className='h-4 w-4' />
				</button>
			</div>
		)
	}
	
	return (
		<UploadButton
			className={cn('', className)}
			endpoint='imageUploader'
			onClientUploadComplete={res => {
				onChange(res?.[0].url)
			}}
			onUploadError={(error: Error) => {
				console.log(error)
			}}
			content={{
				button({ ready }) {
					if (ready) return <div>{label && 'Загрузить'}</div>;
					return "Секундочку...";
				},
				allowedContent({ ready, fileTypes, isUploading }) {
					if (!ready) return "Готовим загрузчик...";
					if (isUploading) return "Загрузка...";
					return `Доступно для загрузки: ${fileTypes.join(", ")}`;
				},
			}}
		/>
		// <UploadDropzone
		// 	endpoint='imageUploader'
		// 	onClientUploadComplete={res => {
		// 		onChange(res?.[0].url)
		// 	}}
		// 	onUploadError={(error: Error) => {
		// 		console.log(error)
		// 	}}
		// />
	)
}
