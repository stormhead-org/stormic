import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
	}
})

export const uploadFile = async (file: File): Promise<string> => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME as string,
		Key: `${Date.now()}-${file.name}`, // Уникальное имя файла
		Body: file,
		ContentType: file.type
	}
	
	try {
		const command = new PutObjectCommand(params)
		await s3.send(command)
		
		const location = `https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT}/${params.Key}`
		return location
	} catch (error) {
		console.error('Error uploading file:', error)
		throw new Error('File upload failed')
	}
}


// const location = `https://${process.env.AWS_S3_BUCKET_NAME}.${process.env.AWS_ALIAS_HOST}${params.Key}`
//
// const s3 = new S3Client({
// 	region: process.env.AWS_REGION,
// 	credentials: {
// 		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
// 		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
// 	}
// })
