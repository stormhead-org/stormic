import { useSocket } from '@/shared/components/providers/items/socket-provider'
import { Comment, User } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

type CommentWithUser = Comment & {
	user: User;
	children?: CommentWithUser[];
};

export const UseGlobalCommentSocket = (queryKey: string, globalUpdateKey: string) => {
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
		
		// Событие обновления комментария
		socket.on(globalUpdateKey, (updatedComment: CommentWithUser) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return oldData // Если нет старых данных, просто возвращаем их
				}
				
				const newData = oldData.pages.map((page: any) => {
					return {
						...page,
						items: updateCommentRecursively(page.items, updatedComment) // Функция для обновления
					}
				})
				
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
			socket.off(globalUpdateKey)
		}
	}, [queryClient, queryKey, socket, globalUpdateKey])
}

// Рекурсивное обновление комментария
function updateCommentRecursively(
	items: CommentWithUser[],
	updatedComment: CommentWithUser
): CommentWithUser[] {
	return items.map((item) => {
		if (item.comment_id === updatedComment.comment_id) {
			return updatedComment
		}
		
		// Если у комментария есть дочерние комментарии, обновляем их рекурсивно
		if (item.children && item.children.length > 0) {
			return {
				...item,
				children: updateCommentRecursively(item.children, updatedComment)
			}
		}
		
		return item
	})
}
