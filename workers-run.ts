import { spawn } from 'child_process'

const workers = [
	'shared/workers/post-view-counter-worker.ts',
	'shared/workers/post-like-worker.ts',
	'shared/workers/comment-like-worker.ts',
	'shared/workers/user-follow-worker.ts',
	'shared/workers/community-follow-worker.ts',
	'shared/workers/post-bookmark-worker.ts',
]

workers.forEach(workerPath => {
	const worker = spawn('ts-node', [workerPath], {
		stdio: 'inherit',
		shell: true
	})
	
	worker.on('close', code => {
		console.log(`${workerPath} завершился с кодом ${code}`)
	})
	
	worker.on('error', err => {
		console.error(`Ошибка при запуске ${workerPath}:`, err)
	})
})
