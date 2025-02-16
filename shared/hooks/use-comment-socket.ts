
import { User } from '@/payload-types'
import { useSocket } from '@/shared/providers/SocketProvider'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

type CommentSocketProps = {
	addKey: string
	updateKey: string
	queryKey: string
}

type CommentWithUser = Comment & {
	user: User
	children?: CommentWithUser[] // Рекурсивный тип для вложенных комментариев
}

export const UseCommentSocket = ({
	addKey,
	updateKey,
	queryKey,
}: CommentSocketProps) => {
	const { socket } = useSocket()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) {
			return
		}

		// Событие добавления комментария
		socket.on(addKey, (newComment: CommentWithUser) => {
			// Обновляем локальные данные
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return {
						pages: {
							items: [newComment],
						},
					}
				}

				const newData = [...oldData.pages]
				newData[0] = {
					...newData[0],
					items: [newComment, ...newData[0].items],
				}

				return {
					...oldData,
					pages: newData,
				}
			})

			// Инвалидация кеша для обновления через сервер
			queryClient.invalidateQueries({ queryKey: [queryKey] })
		})

		// Событие обновления комментария
		socket.on(updateKey, (updatedComment: CommentWithUser) => {
			// Обновляем локальные данные
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return oldData // Если нет старых данных, просто возвращаем их
				}

				const newData = oldData.pages.map((page: any) => {
					return {
						...page,
						items: updateCommentRecursively(page.items, updatedComment), // Функция для обновления
					}
				})

				return {
					...oldData,
					pages: newData,
				}
			})

			// Инвалидация кеша для обновления через сервер
			queryClient.invalidateQueries({ queryKey: [queryKey] })
		})

		return () => {
			socket.off(addKey)
			socket.off(updateKey)
		}
	}, [queryClient, addKey, queryKey, socket, updateKey])
}

// Рекурсивное обновление комментария
function updateCommentRecursively(
	items: CommentWithUser[],
	updatedComment: CommentWithUser
): CommentWithUser[] {
	return items.map(item => {
		if (item.id === updatedComment.id) {
			return updatedComment
		}

		// Если у комментария есть дочерние комментарии, обновляем их рекурсивно
		if (item.children && item.children.length > 0) {
			return {
				...item,
				children: updateCommentRecursively(item.children, updatedComment),
			}
		}

		return item
	})
}
