import { generateComponents } from '@uploadthing/react'

import type { OurFileRouter } from '@/app/api/(community)/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } =
	generateComponents<OurFileRouter>()
