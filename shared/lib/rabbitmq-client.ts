import amqplib, { Message } from 'amqplib'

let connection: amqplib.Connection | null = null
let channel: amqplib.Channel | null = null

// Функция для подключения к RabbitMQ
export async function connectToRabbitMQ() {
	if (!connection) {
		connection = await amqplib.connect(process.env.RABBITMQ_URL as string)
	}
	if (!channel) {
		channel = await connection.createChannel()
	}
}

// Функция для отправки сообщений в очередь
export async function sendMessageToQueue(queue: string, message: any) {
	if (!channel) {
		await connectToRabbitMQ()
	}
	
	if (channel) {
		await channel.assertQueue(queue, { durable: true })
		channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })
	} else {
		throw new Error('Channel is not initialized')
	}
}

// Функция для получения сообщений из очереди
export async function consumeFromQueue(queue: string, onMessage: (msg: Message) => Promise<void>) {
	if (!channel) {
		await connectToRabbitMQ()
	}
	
	if (channel) {
		await channel.assertQueue(queue, { durable: true })
		channel.consume(queue, async (msg) => {
			if (msg !== null && channel !== null) {
				try {
					await onMessage(msg)
					channel.ack(msg)
				} catch (error) {
					console.error('Failed to process message:', error)
					channel.nack(msg, false, true) // Отметить сообщение как неудачно обработанное
				}
			}
		})
		console.log(`Consuming from queue ${queue}`)
	} else {
		throw new Error('Channel is not initialized')
	}
}

// Функция для обработки сообщений о просмотрах постов
export const sendPostViewMessage = async (postId: number) => {
	await sendMessageToQueue('postViewQueue', { postId })
}

export async function consumePostViewQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('postViewQueue', onMessage)
}

// Добавление лайков к постам
export async function sendPostLikeMessage(message: { action: string, postId: number, userId: number }) {
	await sendMessageToQueue('postLikeQueue', message)
}

export async function consumePostLikeQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('postLikeQueue', onMessage)
}

// Добавление постов в закладки
export async function sendBookmarkAddMessage(message: { action: string, postId: number, userId: number }) {
	await sendMessageToQueue('bookmarkAddQueue', message)
}

export async function consumeBookmarkAddMQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('bookmarkAddQueue', onMessage)
}

// Добавление лайков комментам
export async function sendCommentLikeMessage(message: { action: string, commentId: number, userId: number }) {
	await sendMessageToQueue('commentLikeQueue', message)
}

export async function consumeCommentLikeQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('commentLikeQueue', onMessage)
}

// Добавление новой очереди для подписок на пользователей
export async function sendFollowMessage(message: { action: string, followerId: number, followingId: number }) {
	await sendMessageToQueue('userFollowQueue', message);
}

export async function consumeFollowQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('userFollowQueue', onMessage);
}

// Добавление новой очереди для подписок на сообщества
export async function sendCommunityFollowMessage(message: { action: string, userId: number, categoryId: number }) {
	await sendMessageToQueue('communityFollowQueue', message);
}

export async function consumeCommunityFollowQueue(onMessage: (msg: Message) => Promise<void>) {
	await consumeFromQueue('communityFollowQueue', onMessage);
}
