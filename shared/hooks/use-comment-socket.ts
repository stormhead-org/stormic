'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from '../providers/items/SocketProvider';

type CommentSocketProps = {
	addKey: string;
	updateKey: string;
	queryKey: string;
};

// Уточнённый тип CommentWithChildren
export type CommentWithChildren = {
	id: string;
	parentPost: string; // Можно заменить на { id: string } или Post
	community: string; // Можно заменить на { id: string } или Community
	author: { id: string; name?: string }; // Уточнили вместо any
	content: string;
	media?: string | null;
	hasDeleted?: boolean | null;
	parentComment?: string | null;
	childrenComments: CommentWithChildren[];
	likes?: { id: string }[] | null; // Уточнили вместо any
	updatedAt: string;
	createdAt: string;
};

// Тип для данных запроса
interface CommentPage {
	docs: CommentWithChildren[];
}

interface QueryData {
	pages: CommentPage[];
	pageParams: number[];
}

const COMMENTS_PAGE_SIZE = 40;

export const UseCommentSocket = ({
	                                 addKey,
	                                 updateKey,
	                                 queryKey,
                                 }: CommentSocketProps) => {
	const { socket } = useSocket();
	const queryClient = useQueryClient();
	
	useEffect(() => {
		if (!socket) return;
		
		// Обработка события добавления нового комментария
		socket.on(addKey, (newComment: CommentWithChildren) => {
			queryClient.setQueryData([queryKey], (oldData: QueryData | undefined) => {
				// Если нет ранее загруженных данных – инициализируем структуру
				if (!oldData || !oldData.pages) {
					return {
						pages: [{ docs: [newComment] }],
						pageParams: [1],
					};
				}
				
				// Если новый комментарий – топ-уровневый (нет parentComment)
				if (!newComment.parentComment) {
					// Собираем все топ-уровневые комментарии из всех страниц
					const allComments = oldData.pages.flatMap((page) => page.docs || []);
					// Если такой комментарий уже есть, ничего не делаем
					if (allComments.find((c) => c.id === newComment.id)) {
						return oldData;
					}
					allComments.push(newComment);
					// Сортировка по времени создания (старые в начале)
					allComments.sort(
						(a: CommentWithChildren, b: CommentWithChildren) =>
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
					// Разбиваем на страницы с размером COMMENTS_PAGE_SIZE
					const newPages = [];
					for (let i = 0; i < allComments.length; i += COMMENTS_PAGE_SIZE) {
						newPages.push({
							docs: allComments.slice(i, i + COMMENTS_PAGE_SIZE),
						});
					}
					return { ...oldData, pages: newPages };
				} else {
					// Если новый комментарий является ответом – обновляем дерево комментариев
					const updateReplies = (
						comments: CommentWithChildren[]
					): CommentWithChildren[] => {
						return comments.map((comment) => {
							if (comment.id === newComment.parentComment) {
								// Если в массиве ответов ещё нет данного комментария – добавляем его
								if (!comment.childrenComments.find((c) => c.id === newComment.id)) {
									const updatedChildren = [...comment.childrenComments, newComment];
									// Сортировка дочерних комментариев (новые сверху)
									updatedChildren.sort(
										(a: CommentWithChildren, b: CommentWithChildren) =>
											new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
									);
									return { ...comment, childrenComments: updatedChildren };
								}
								return comment;
							}
							if (comment.childrenComments && comment.childrenComments.length > 0) {
								return {
									...comment,
									childrenComments: updateReplies(comment.childrenComments),
								};
							}
							return comment;
						});
					};
					const newPages = oldData.pages.map((page) => ({
						...page,
						docs: updateReplies(page.docs || []),
					}));
					return { ...oldData, pages: newPages };
				}
			});
			// Чтобы обновить данные с сервера
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		});
		
		// Обработка события обновления комментария
		socket.on(updateKey, (updatedComment: CommentWithChildren) => {
			queryClient.setQueryData([queryKey], (oldData: QueryData | undefined) => {
				if (!oldData || !oldData.pages) return oldData;
				
				if (!updatedComment.parentComment) {
					// Обновляем топ-уровневый комментарий
					const allComments = oldData.pages.flatMap((page) => page.docs || []);
					const newAll = allComments.map((c) =>
						c.id === updatedComment.id ? updatedComment : c
					);
					newAll.sort(
						(a: CommentWithChildren, b: CommentWithChildren) =>
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
					const newPages = [];
					for (let i = 0; i < newAll.length; i += COMMENTS_PAGE_SIZE) {
						newPages.push({ docs: newAll.slice(i, i + COMMENTS_PAGE_SIZE) });
					}
					return { ...oldData, pages: newPages };
				} else {
					// Обновляем ответ: рекурсивно пробегаем по дереву комментариев
					const updateTree = (
						comments: CommentWithChildren[]
					): CommentWithChildren[] => {
						return comments.map((comment) => {
							if (comment.id === updatedComment.id) return updatedComment;
							if (comment.childrenComments && comment.childrenComments.length > 0) {
								return {
									...comment,
									childrenComments: updateTree(comment.childrenComments),
								};
							}
							return comment;
						});
					};
					const newPages = oldData.pages.map((page) => ({
						...page,
						docs: updateTree(page.docs || []),
					}));
					return { ...oldData, pages: newPages };
				}
			});
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		});
		
		return () => {
			socket.off(addKey);
			socket.off(updateKey);
		};
	}, [queryClient, addKey, queryKey, socket, updateKey]);
};