import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
	const { filename, contentType } = await request.json()
	
	try {
		const client = new S3Client({
			region: process.env.AWS_REGION,
			endpoint: process.env.AWS_ENDPOINT, // Замена на ваш конечный URL
			forcePathStyle: false, // Использование стиля пути
			logger: console // Логирование запросов
		})
		
		// Добавляем проверку и добавляем расширение к ключу
		const fileExtension = filename.split('.').pop()
		const key = `${uuidv4()}.${fileExtension}`
		
		const { url, fields } = await createPresignedPost(client, {
			Bucket: String(process.env.AWS_BUCKET_NAME),
			Key: key,
			Conditions: [
				['content-length-range', 0, 10485760], // до 10 МБ
				['starts-with', '$Content-Type', contentType]
			],
			Fields: {
				acl: 'public-read',
				'Content-Type': contentType
			},
			Expires: 600 // Срок действия ссылки в секундах
		})
		
		console.log('Pre-signed URL created:', { url, fields, key })
		
		return Response.json({ url, fields, key })
	} catch (error) {
		console.error('Error creating pre-signed URL:', error)
		
		let errorMessage = 'Unknown error occurred'
		
		if (error instanceof Error) {
			errorMessage = error.message
		}
		
		return new Response(JSON.stringify({ error: errorMessage }), { status: 500 })
	}
	
}

// import { GetObjectCommand } from '@aws-sdk/client-s3'
// import { NextResponse } from 'next/server'
//
// type ResponseData = {
// 	url: string,
// }
//
// export async function GET(): Promise<ResponseData> {
// 	try {
// 		const command = new GetObjectCommand({
// 			Bucket: process.env.AWS_BUCKET_NAME!,
// 			Key: 'defaultBanner.jpg'
// 		})
//
// 		const { Bucket, Key } = (command as any).input
// 		const url = `https://${Bucket}.${process.env.AWS_ENDPOINT}/${Key}`
//
// 		return new NextResponse(url)
// 	} catch (error) {
// 		console.error('Error fetching image from S3:', error)
// 		return new NextResponse('Error fetching image from S3')
// 	}
// }
