'use client'

import { UploadDropzone } from '@/shared/lib/uploadthing'
import { FileIcon, X } from 'lucide-react'

import '@uploadthing/react/styles.css'

interface FileUploadProps {
	onChange: (url?: string) => void
	value: string
	endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
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
		// <UploadButton
		// 	endpoint='imageUploader'
		// 	onClientUploadComplete={res => {
		// 		onChange(res?.[0].url)
		// 	}}
		// 	onUploadError={(error: Error) => {
		// 		console.log(error)
		// 	}}
		// />
		<UploadDropzone
			endpoint='imageUploader'
			onClientUploadComplete={res => {
				onChange(res?.[0].url)
			}}
			onUploadError={(error: Error) => {
				console.log(error)
			}}
		/>
	)
}
