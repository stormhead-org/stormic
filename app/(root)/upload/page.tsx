'use client'

import { UploadButton } from '@/shared/lib/uploadthing'

export default function UploadPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-between p-24'>
			<UploadButton
				endpoint='imageUploader'
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log('Files: ', res)
					alert('Upload Completed')
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`)
				}}
			/>
		</div>
	)
}
