export function createVisibilityObserver() {
	async function handleIntersection(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const postId = parseInt(
					entry.target.getAttribute('data-post-id') || '0',
					10
				)
				if (postId) {
					try {
						// Отправляем сообщение в очередь RabbitMQ
						await fetch(`/api/posts/${postId}/views`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ postId })
						})
					} catch (error) {
						console.error('Error sending view data:', error)
					}
				}
			}
		}
	}

	return new IntersectionObserver(handleIntersection, { threshold: 0.1 })
}
