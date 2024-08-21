import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query') || ''
	
	const posts = await prisma.post.findMany({
		where: {
			title: {
				contains: query,
				mode: 'insensitive'
			}
		},
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true
				}
			}
		},
		take: 5
	})
	
	return NextResponse.json(posts)
}
