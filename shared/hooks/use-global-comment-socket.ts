import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocket } from '../providers/SocketProvider'

export const UseGlobalCommentSocket = (
	queryKey: string,
	globalUpdateKey: string
) => {
	const { socket } = useSocket()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) return

		const globalKey = 'global:comments'

		socket.on(globalKey, (newComment: any) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return {
						pages: [{ docs: [newComment], hasNextPage: false }],
						pageParams: [1]
					}
				}

				const newData = [...oldData.pages]
				newData[0] = {
					...newData[0],
					docs: [newComment, ...(newData[0].docs || [])]
				}

				return {
					...oldData,
					pages: newData
				}
			})
		})

		socket.on(globalUpdateKey, (updatedComment: any) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) return oldData

				const newData = oldData.pages.map((page: any) => ({
					...page,
					docs: updateCommentRecursively(page.docs || [], updatedComment)
				}))

				return {
					...oldData,
					pages: newData
				}
			})
		})

		return () => {
			socket.off(globalKey)
			socket.off(globalUpdateKey)
		}
	}, [queryClient, queryKey, socket, globalUpdateKey])
}

function updateCommentRecursively(items: any[], updatedComment: any): any[] {
	return items.map(item => {
		if (item.comment_id === updatedComment.comment_id) return updatedComment
		if (item.children?.length > 0) {
			return {
				...item,
				children: updateCommentRecursively(item.children, updatedComment)
			}
		}
		return item
	})
}
