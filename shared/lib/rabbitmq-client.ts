import amqplib from 'amqplib'

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
		channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true }) // persistent для сохранности сообщений
	} else {
		throw new Error('Channel is not initialized')
	}
}

// Функция для получения сообщений из очереди
export async function consumeFromQueue(queue: string, onMessage: (msg: any) => void) {
	if (!channel) {
		await connectToRabbitMQ()
	}
	
	if (channel) {
		await channel.assertQueue(queue, { durable: true })
		channel.consume(queue, (message) => {
			if (message !== null) {
				const parsedMessage = JSON.parse(message.content.toString()) // Парсинг сообщения
				onMessage(parsedMessage) // Передаем уже объект
				if (channel) {
					channel.ack(message) // Подтверждаем сообщение
				}
			}
		})
	} else {
		throw new Error('Channel is not initialized')
	}
}

// Функция для отправки сообщения в очередь лайков постов
export async function sendPostLikeMessage(message: any) {
	await sendMessageToQueue('postLikeQueue', message)
}

// Функция для получения сообщений из очереди лайков постов
export async function consumePostLikeQueue(onMessage: (msg: any) => void) {
	await consumeFromQueue('postLikeQueue', onMessage)
}

// Функция для отправки сообщения в очередь лайков комментариев
export async function sendCommentLikeMessage(message: any) {
	await sendMessageToQueue('commentLikeQueue', message)
}

// Функция для получения сообщений из очереди лайков комментариев
export async function consumeCommentLikeQueue(onMessage: (msg: any) => void) {
	await consumeFromQueue('commentLikeQueue', onMessage)
}
