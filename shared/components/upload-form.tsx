'use client'

import React, { useState } from 'react'

const UploadForm: React.FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [uploading, setUploading] = useState(false)
	const [fileUrl, setFileUrl] = useState<string | null>(null)
	
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0])
		}
	}
	
	const handleUpload = async () => {
		if (!file) return
		
		setUploading(true)
		
		const formData = new FormData()
		formData.append('file', file)
		
		try {
			const response = await fetch('/api/uploads', {
				method: 'POST',
				body: formData
			})
			
			if (response.ok) {
				const data = await response.json()
				setFileUrl(data.filePath) // путь к файлу, возвращаемый сервером
			} else {
				console.error('Upload failed')
			}
		} catch (error) {
			console.error('An error occurred during the uploadthing', error)
		} finally {
			setUploading(false)
		}
	}
	
	return (
		<div>
			<input type='file' onChange={handleFileChange} />
			<button onClick={handleUpload} disabled={uploading}>
				{uploading ? 'Uploading...' : 'Upload'}
			</button>
			
			{fileUrl && (
				<div>
					<p>File uploaded successfully!</p>
					<a href={fileUrl} target='_blank' rel='noopener noreferrer'>
						{fileUrl}
					</a>
				</div>
			)}
		</div>
	)
}

export default UploadForm
