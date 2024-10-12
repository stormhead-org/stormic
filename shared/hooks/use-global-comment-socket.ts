import { useSocket } from '@/shared/components/providers/items/socket-provider'
import { Comment, User } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

type CommentWithUser = Comment & {
	user: User;
	children?: CommentWithUser[];
};

export const UseGlobalCommentSocket = (queryKey: string) => {
	const { socket } = useSocket()
	const queryClient = useQueryClient()
	
	useEffect(() => {
		if (!socket) return
		
		const globalKey = 'global:comments'
		
		// Событие добавления нового комментария
		socket.on(globalKey, (newComment: CommentWithUser) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return {
						pages: {
							items: [newComment]
						}
					}
				}
				
				const newData = [...oldData.pages]
				newData[0] = {
					...newData[0],
					items: [newComment, ...newData[0].items]
				}
				
				return {
					...oldData,
					pages: newData
				}
			})
			
			// Инвалидация кеша для обновления через сервер
			queryClient.invalidateQueries({ queryKey: [queryKey] })
		})
		
		return () => {
			socket.off(globalKey)
		}
	}, [queryClient, queryKey, socket])
}
