import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET() {
	const comments = await prisma.comment.findMany({
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true
				}
			},
			post: {
				select: {
					title: true
				}
			}
		}
	})
	
	const commentsWithDetails = await Promise.all(
		comments.map(async (comment) => {
			return {
				...comment,
				publication_date: format(new Date(comment.publication_date), 'dd.MM.yy')
			}
		})
	)
	
	return NextResponse.json(commentsWithDetails)
}
