'use client'

import { useState } from 'react'

export default function S3Page() {
	const [file, setFile] = useState<File | null>(null)
	const [uploading, setUploading] = useState(false)
	const [fileUrl, setFileUrl] = useState<string | null>(null)
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		if (!file) {
			alert('Please select a file to upload.')
			return
		}
		
		setUploading(true)
		
		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + '/api/s3/upload',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ filename: file.name, contentType: file.type })
				}
			)
			
			if (response.ok) {
				const { url, fields, key } = await response.json()
				
				const formData = new FormData()
				Object.entries(fields).forEach(([key, value]) => {
					formData.append(key, value as string)
				})
				formData.append('file', file)
				
				console.log('Uploading to:', url)
				console.log('FormData:', formData)
				
				const uploadResponse = await fetch(url, {
					method: 'POST',
					body: formData,
					mode: 'cors' // Убедитесь, что mode: 'cors' используется для разрешения CORS
				})
				
				if (uploadResponse.ok) {
					const finalUrl = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.timeweb.cloud/${key}`
					setFileUrl(finalUrl)
					alert('Upload successful! File URL: ' + finalUrl)
				} else {
					console.error('S3 Upload Error:', uploadResponse)
					const errorText = await uploadResponse.text()
					console.error('Error details:', errorText)
					alert('Upload failed. See console for details.')
				}
			} else {
				console.error('Failed to get pre-signed URL:', response)
				alert('Failed to get pre-signed URL.')
			}
		} catch (error) {
			console.error('Upload Error:', error)
			alert('An error occurred during the upload. See console for details.')
		} finally {
			setUploading(false)
		}
	}
	
	return (
		<main>
			<h1>Upload a File to S3</h1>
			<form onSubmit={handleSubmit}>
				<input
					id='file'
					type='file'
					onChange={(e) => {
						const files = e.target.files
						if (files) {
							setFile(files[0])
						}
					}}
					accept='image/png, image/jpeg'
				/>
				<button type='submit' disabled={uploading}>
					{uploading ? 'Uploading...' : 'Upload'}
				</button>
			</form>
			{fileUrl && (
				<p>
					File uploaded successfully. You can access it here:{' '}
					<a href={fileUrl} target='_blank' rel='noopener noreferrer'>
						{fileUrl}
					</a>
				</p>
			)}
		</main>
	)
}
