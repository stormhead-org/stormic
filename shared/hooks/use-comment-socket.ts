'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocket } from '../providers/SocketProvider'

export const UseCommentSocket = ({
	addKey,
	updateKey,
	queryKey
}: {
	addKey: string
	updateKey: string
	queryKey: string
}) => {
	const { socket } = useSocket()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) return

		socket.on(addKey, (newComment: any) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) {
					return { pages: [{ items: [newComment] }], pageParams: [1] }
				}

				const newData = [...oldData.pages]
				const firstPage = { ...newData[0] }

				// Функция для добавления дочернего комментария в нужное место в массиве items
				const addToChildren = (comments: any[], parentId: string): boolean => {
					for (let comment of comments) {
						if (comment.id === parentId) {
							comment.childrenComments = [
								...(comment.childrenComments || []),
								newComment
							]
							return true
						}
						if (comment.childrenComments?.length) {
							if (addToChildren(comment.childrenComments, parentId)) return true
						}
					}
					return false
				}

				if (newComment.parentComment) {
					// Если это ответ, ищем родительский комментарий по id
					const parentId = newComment.parentComment
					addToChildren(firstPage.items || [], parentId)
				} else {
					// Иначе добавляем его в корневой список
					firstPage.items = [...(firstPage.items || []), newComment]
				}

				newData[0] = firstPage
				return { ...oldData, pages: newData }
			})
		})

		socket.on(updateKey, (updatedComment: any) => {
			queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages) return oldData

				const newData = oldData.pages.map((page: any) => ({
					...page,
					items: updateCommentRecursively(page.items || [], updatedComment)
				}))

				return {
					...oldData,
					pages: newData
				}
			})
		})

		return () => {
			socket.off(addKey)
			socket.off(updateKey)
		}
	}, [queryClient, addKey, updateKey, queryKey, socket])
}

function updateCommentRecursively(items: any[], updatedComment: any): any[] {
	return items.map(item => {
		if (item.id === updatedComment.id) return updatedComment
		if (item.childrenComments?.length > 0) {
			return {
				...item,
				childrenComments: updateCommentRecursively(
					item.childrenComments,
					updatedComment
				)
			}
		}
		return item
	})
}
