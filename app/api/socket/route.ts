import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

interface Comment {
	postId: number;
	id: number;
	text: string;
	userId: number;
	children?: Comment[]; // Опционально, добавляем массив детей комментария
}

const io = new Server(3001, {
	cors: {
		origin: 'http://localhost:3000', // Измените на адрес вашего клиента
		methods: ['GET', 'POST'],
	},
});

// Хранение комментариев по postId
let comments: Comment[] = [];

io.on('connection', (socket) => {
	console.log('New client connected');
	
	// Обрабатываем postId, чтобы отправить только соответствующие комментарии
	socket.on('joinPost', (postId: number) => {
		const postComments = comments.filter(comment => comment.postId === postId);
		socket.emit('loadComments', postComments);
	});
	
	socket.on('addComment', (comment: Comment) => {
		// Инициализируем children как пустой массив, если он не задан
		comment.children = comment.children || [];
		comments.push(comment);
		io.emit('newComment', comment); // Отправляем новый комментарий всем клиентам
	});
	
	socket.on('deleteComment', (commentId: number) => {
		comments = comments.filter((comment) => comment.id !== commentId);
		io.emit('commentDeleted', commentId); // Уведомляем всех клиентов об удалении комментария
	});
	
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

export async function GET() {
	return NextResponse.json({ message: 'Socket server running on port 3001' });
}
